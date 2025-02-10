import NiceModal, { useModal } from "@ebay/nice-modal-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IconLoading } from "@/components/icons";

export const ModalProcessing = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible}>
      <DialogContent className="max-w-[380px]" closeButton={false}>
        <VisuallyHidden.Root>
          <DialogTitle>Processing</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex flex-col items-center">
          <IconLoading className="w-[120px] h-[120px] animate-spin mt-2" />
          <p className="mt-8 text-[24px] text-app-white font-bold">Hold on, traveler!</p>
          <p className="text-sm text-app-gray mt-2">
            We're preparing your request in the cosmos...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
});
