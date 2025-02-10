import { useState } from "react";
import { toast } from "sonner";

import { ToastCard } from "@/components/shared/toast-card";

export interface useCopyToClipboardProps {
  timeout?: number;
  showToast?: boolean;
}

export function useCopyToClipboard({
  timeout = 2000,
  showToast = true,
}: useCopyToClipboardProps = {}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyImageToClipboard = async (value: string) => {
    if (!value) {
      return;
    }

    try {
      const res = await fetch(value);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setIsCopied(true);
      if (showToast)
        toast.custom((t) => (
          <ToastCard variant="success" title="Image copied to clipboard" toastId={t} />
        ));

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    } catch (error) {
      if (showToast)
        toast.custom((t) => (
          <ToastCard variant="error" title="Failed to copy image to clipboard" toastId={t} />
        ));
    }
  };

  const copyToClipboard = (value: string) => {
    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      if (showToast)
        toast.custom((t) => (
          <ToastCard variant="success" title="Copied to clipboard" toastId={t} />
        ));

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard, copyImageToClipboard };
}
