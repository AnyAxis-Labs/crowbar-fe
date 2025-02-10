import { cn } from "@/lib/utils";

export const SelectToken = () => {
  return (
    <>
      <button
        type="button"
        className={cn(
          "flex flex-row items-center justify-center gap-1",
          "h-full bg-white/10 px-2 rounded-[8px] text-primary text-sm",
          "focus:opacity-50 transition-opacity duration-300",
          "w-[93px]",
        )}
      >
        <img src="/uni-symbol.svg" alt="UNI" className="w-6 h-6" />
        <span className="font-semibold">UNI</span>
      </button>
    </>
  );
};
