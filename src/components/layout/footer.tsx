import { IconTelegram, IconX } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-neutral-900 rounded-t-[24px] md:rounded-t-none mt-10">
      <div className="container py-8 flex flex-col gap-6 md:flex-row justify-between items-center md:items-start">
        <div className="max-w-md flex items-center">
          <img
            className="h-11 aspect-square m-8 object-contain"
            src="/logo.png"
            alt="logo"
          />
        </div>
        <div className="w-full md:w-auto">
          <ul className="flex flex-row gap-2">
            <li className="w-full md:w-auto">
              <a
                // href="https://t.me/planetverse"
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "py-[6px] pl-2 pr-4 bg-white/[0.05]",
                  "border border-solid border-white/[0.03] rounded-[8px]",
                  "flex items-center gap-2",
                  "text-white text-sm leading-[20px] font-semibold"
                )}
              >
                <div className="w-8 h-8 p-[2px]">
                  <div className=" bg-white rounded-full flex items-center justify-center w-7 h-7">
                    <IconTelegram className="text-app-black w-5 h-5" />
                  </div>
                </div>
                Telegram
              </a>
            </li>
            <li className="w-full md:w-auto">
              <a
                // href="https://twitter.com/planetverse"
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "py-[6px] pl-2 pr-4 bg-white/[0.05]",
                  "border border-solid border-white/[0.03] rounded-[8px]",
                  "flex items-center gap-2",
                  "text-white text-sm leading-[20px] font-semibold"
                )}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <IconX className="w-7 h-7" />
                </div>
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
