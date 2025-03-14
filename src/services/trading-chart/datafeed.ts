import {
  type ErrorCallback,
  type HistoryCallback,
  type LibrarySymbolInfo,
  type OnReadyCallback,
  type PeriodParams,
  type ResolutionString,
  type ResolveCallback,
  type SearchSymbolsCallback,
  type SubscribeBarsCallback,
} from "@/public/static/charting_library/charting_library";

import {
  configurationData,
  getAllSymbols,
  makeApiRequest,
  parseFullSymbol,
  resolutionToMiliseconds,
} from "./helpers";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";

export interface DataFeedOptions {
  SymbolInfo?: TradingView.LibrarySymbolInfo;
  DatafeedConfiguration?: TradingView.DatafeedConfiguration;
  getBars?: TradingView.IDatafeedChartApi["getBars"];
}

const previousBarsCache = new Map<string, TradingView.Bar[]>();

export class FunDataFeed
  implements TradingView.IExternalDatafeed, TradingView.IDatafeedChartApi
{
  private options: DataFeedOptions;
  private lastBarsCache: Map<string, TradingView.Bar>;
  private funId: string;
  private refreshInterval: NodeJS.Timeout | null = null;
  private currentSymbolInfo: LibrarySymbolInfo | null = null;
  private currentResolution: ResolutionString | null = null;
  private currentPeriodParams: PeriodParams | null = null;
  private currentHistoryCallback: HistoryCallback | null = null;
  private currentErrorCallback: ErrorCallback | null = null;

  constructor(options: DataFeedOptions, funId: string) {
    this.options = options;
    this.lastBarsCache = new Map();
    this.options.DatafeedConfiguration = configurationData;
    this.funId = funId;
    this.startAutoRefresh();
  }

  private startAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  private async refreshData() {
    if (
      !this.currentSymbolInfo ||
      !this.currentResolution ||
      !this.currentPeriodParams ||
      !this.currentHistoryCallback ||
      !this.currentErrorCallback
    ) {
      return;
    }

    try {
      await this.getBars(
        this.currentSymbolInfo,
        this.currentResolution,
        this.currentPeriodParams,
        this.currentHistoryCallback,
        this.currentErrorCallback
      );
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }

  public onReady(callback: OnReadyCallback) {
    setTimeout(() => callback(configurationData));
  }

  public async resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
    _onResolveErrorCallback: ErrorCallback
  ) {
    const ticker = symbolName.split(":")[1];

    // Symbol information object
    const symbolInfo = {
      ticker: symbolName,
      name: ticker,
      description: ticker,
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC",
      exchange: "crowbar.so",
      minmov: 1,
      pricescale: 1_000_000_000,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "60", "D"],
      visible_plots_set: "ohlc",
      has_weekly_and_monthly: false,
      volume_precision: 2,
      data_status: "streaming",
      listed_exchange: "crowbar.so",
      format: "price",
    } satisfies LibrarySymbolInfo;
    onSymbolResolvedCallback(symbolInfo);
  }

  public async searchSymbols(
    userInput: string,
    exchange: string,
    _symbolType: string,
    onResultReadyCallback: SearchSymbolsCallback
  ) {
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  }

  public async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ): Promise<void> {
    this.currentSymbolInfo = symbolInfo;
    this.currentResolution = resolution;
    this.currentPeriodParams = periodParams;
    this.currentHistoryCallback = onHistoryCallback;
    this.currentErrorCallback = onErrorCallback;

    const { from, to, firstDataRequest } = periodParams;
    const parsedSymbol = parseFullSymbol(symbolInfo.ticker as string);
    if (!parsedSymbol) {
      console.log("Cannot parse symbol");
      onErrorCallback("Cannot parse symbol");
      return;
    }

    const milisFrom = from;
    const milisTo = to;
    const tenDays = 10 * 24 * 60 * 60;

    const urlParameters: Record<string, string | number> = {
      symbol: this.funId,
      resolution:
        resolutionToMiliseconds[
          resolution as keyof typeof resolutionToMiliseconds
        ],
      from: milisFrom - tenDays,
      to: milisTo,
    };

    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${urlParameters[name]}`)
      .join("&");
    try {
      const data = await makeApiRequest(`/api/ohlc/history?${query}`);

      if (data.data.data.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }

      let bars: string | any[] = [];
      data.data.data.forEach((bar: any) => {
        if (bar.time >= milisFrom - tenDays && bar.time < milisTo) {
          bars = [
            ...bars,
            {
              time: bar.time * 1000,
              low: bar.l,
              high: bar.h,
              open: bar.o,
              close: bar.c,
            },
          ];
        }
      });

      // check if all the items in bars is the same as previous bars
      const previousBars = previousBarsCache.get(symbolInfo.ticker as string);
      if (
        !firstDataRequest &&
        previousBars &&
        bars.every((bar, index) => bar.time === previousBars[index]?.time)
      ) {
        onHistoryCallback([], { noData: true });
        return;
      }

      previousBarsCache.set(symbolInfo.ticker as string, bars);

      if (firstDataRequest) {
        this.lastBarsCache.set(symbolInfo.ticker as string, {
          ...bars[bars.length - 1],
        });
      }

      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.error("[getBars]: Get error", error);
      onHistoryCallback([], { noData: true });
      onErrorCallback(error as string);
    }
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ): void {
    subscribeOnStream(
      symbolInfo,
      resolution,
      onTick,
      listenerGuid,
      onResetCacheNeededCallback,
      this.funId,
      this.lastBarsCache.get(symbolInfo.name)
    );
  }

  public unsubscribeBars(listenerGuid: string): void {
    unsubscribeFromStream(listenerGuid);
  }

  public cleanup() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}
