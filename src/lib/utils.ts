import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string) {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function headAddress(address: string) {
  return `${address.slice(0, 6)}`;
}

export const formatImageUrl = (url?: string) => {
  if (!url) {
    return "";
  }

  if (!url.startsWith("https://")) {
    const cleanedUrl = url.replace("/api/file-upload/", "");
    const baseUrl = "/api/file-upload/";

    return baseUrl + cleanedUrl;
  }

  return url;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isObjectEmpty = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const intervalToDuration = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  if (!start || !end || start > end) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const duration = end - start;

  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const getTimeDifference = (timestamp: number) => {
  const currentTimestamp = new Date().getTime();
  const end = timestamp < currentTimestamp ? currentTimestamp : timestamp;
  const durations = intervalToDuration({ start: currentTimestamp, end });

  return {
    days: durations.days || 0,
    hours: durations.hours || 0,
    minutes: durations.minutes || 0,
    seconds: durations.seconds || 0,
  };
};

export const padZero = (num: number, length = 2) => {
  return num.toString().padStart(length, "0");
};

export async function sleep(time: number) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export const loopAsync = async (
  times: number,
  callback: (index: number) => Promise<void>,
  delays: number
) => {
  for (let i = 0; i < times; i++) {
    await callback(i);
    await sleep(delays);
  }
};

export const generateTokenId = customAlphabet("1234567890", 32);
