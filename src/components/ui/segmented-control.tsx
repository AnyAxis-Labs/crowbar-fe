import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface StyledSegmentedControlItem {
  value: string;
  label?: string;
}

export interface SegmentedControlProps extends PropsWithChildren {
  value: string;
  items: StyledSegmentedControlItem[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const SegmentedControl = ({ value, onChange, className, items }: SegmentedControlProps) => {
  return (
    <div className={cn("p-1 rounded-full flex flex-row bg-white/5", className)}>
      {items.map((item) => (
        <button
          type="button"
          key={item.value}
          className={cn(
            "py-2 px-6 md:px-8 rounded-full text-sm md:text-base text-white/50 text-center transition-all duration-300",
            value === item.value ? "text-primary font-semibold bg-white/10" : "hover:text-white",
          )}
          onClick={() => onChange(item.value)}
        >
          {item.label ?? item.value}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
