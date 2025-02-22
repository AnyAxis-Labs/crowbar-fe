import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const walletAddress = sessionStorage.getItem("walletAddress");
  if (walletAddress) {
    config.headers["wallet-address"] = walletAddress;
  }

  return config;
});

export const customClient = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE<T>({
    ...config,
    ...options,
    cancelToken: source.token,
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
