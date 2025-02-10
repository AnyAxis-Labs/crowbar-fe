import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
  containerClassName?: string;
}

export const GradientCard = ({ children, className, containerClassName }: Props) => {
  return (
    <div className={cn("relative gradient-card isolate", containerClassName)}>
      <div className="gradient-card-top z-10" />
      <div className="gradient-card-bottom z-10" />
      <div className={cn("gradient-card-content", className)}>{children}</div>
    </div>
  );
};
