import { cn } from "@/lib/utils";
import { IconEmpty } from "@/components/icons";

interface Props {
  description?: string;
  className?: string;
}

export const Empty = ({ description = "No result found", className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col text-app-white items-center justify-center py-[69px]",
        className,
      )}
    >
      <IconEmpty className="h-[160px] w-[160px]" />
      <span className="font-normal mt-6 text-[30px] font-semibold">{description}</span>
    </div>
  );
};
