import { toast } from "sonner";
import { IconBell, IconCheck, IconDanger, IconToastClose, IconWarning } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface ToastCardProps {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  toastId: string | number;
}

const iconMap = {
  success: (
    <div className="rounded-full w-6 h-6 bg-success flex items-center justify-center">
      <IconCheck className="w-4 h-4 text-primary-dark" />
    </div>
  ),
  error: <IconDanger className="w-6 h-6 text-error" />,
  warning: (
    <div className="rounded-full w-6 h-6 text-warning">
      <IconWarning className="w-[14px] h-[14px]" />
    </div>
  ),
  info: <IconBell className="w-6 h-6" />,
};

export const ToastCard = ({ variant, title, description, toastId }: ToastCardProps) => {
  return (
    <div className="rounded-[12px] overflow-hidden w-[398px] flex items-start gap-3 p-[14px] pb-4 border border-solid border-white/5 bg-neutral-900">
      <div className="relative">{iconMap[variant]}</div>
      <div className="flex flex-col flex-1">
        <p className="text-sm font-medium text-app-white">{title}</p>
        {description && <p className="text-sm text-app-gray">{description}</p>}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5"
        onClick={() => toast.dismiss(toastId)}
      >
        <IconToastClose className="h-5 w-5" />
      </Button>
    </div>
  );
};
