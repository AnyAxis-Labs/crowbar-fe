import NiceModal, { useModal } from "@ebay/nice-modal-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IconDanger, IconLoading } from "@/components/icons";

export const ModalDeployingToken = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible}>
      <DialogContent className="max-w-[377px]" closeButton={false}>
        <VisuallyHidden.Root>
          <DialogTitle>Deployment Pending</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[24px] text-app-white font-bold">Deployment Pending</p>
          <p className="text-sm text-app-gray mt-4 text-center">
            If your token isn’t visible on the website after{" "}
            <span className="text-foreground">5 min</span>, you can manually setup your token page
            using the Token Support
          </p>
          <IconLoading className="w-[120px] h-[120px] animate-spin my-8" />
          <div className="w-full rounded-[12px] p-2 bg-[#FF4545]/[0.08] border border-solid border-[#FF4545]/[0.12] flex items-start gap-3">
            <IconDanger className="w-6 h-6 text-[#FF6666]" />
            <span className="text-sm font-normal leading-[20px] text-[#F66]">
              Do NOT close or refresh this window during the process.
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
