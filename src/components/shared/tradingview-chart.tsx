import { memo, useEffect, useRef } from "react";

import {
  type ChartingLibraryWidgetOptions,
  type LanguageCode,
  type ResolutionString,
  widget,
  // @ts-ignore
} from "@/public/static/charting_library/charting_library.esm";
import { FunDataFeed } from "@/services/trading-chart";

export const TradingViewChart = memo(
  (
    props: Partial<ChartingLibraryWidgetOptions> & {
      funId: string;
      symbol: string;
    }
  ) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const datafeedRef = useRef<FunDataFeed | null>(null);

    useEffect(() => {
      const datafeed = new FunDataFeed({}, props.funId);
      datafeedRef.current = datafeed;

      const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: props.symbol,
        theme: "light",
        datafeed,
        timezone: props.timezone,
        interval: "1" as ResolutionString,
        container: chartContainerRef.current as HTMLElement,
        library_path: "/static/charting_library/",
        locale: "en" as LanguageCode,
        disabled_features: [
          "popup_hints",
          "study_templates",
          "header_symbol_search",
          "header_compare",
          "header_quick_search",
          "header_indicators",
          "header_screenshot",
        ],
        enabled_features: [
          "study_templates",
          "iframe_loading_compatibility_mode",
          "save_chart_properties_to_local_storage",
          "use_localstorage_for_settings",
        ],
        favorites: { chartTypes: ["Candles"] },
        charts_storage_api_version: "1.1",
        fullscreen: false,
        autosize: true,
      };

      const tvWidget = new widget(widgetOptions);

      tvWidget.onChartReady(() => {
        tvWidget.headerReady().then(() => {
          const priceScale = tvWidget
            .activeChart()
            .getPanes()[0]
            .getRightPriceScales()[0];
          priceScale.setMode(1);
        });
      });

      return () => {
        datafeedRef.current?.cleanup();
        tvWidget.remove();
      };
    }, [props]);

    return <div ref={chartContainerRef} className="w-full h-full" />;
  }
);
