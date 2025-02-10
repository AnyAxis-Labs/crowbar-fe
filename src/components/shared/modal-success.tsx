import NiceModal, { useModal } from "@ebay/nice-modal-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IconCheck } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const ModalSuccess = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="max-w-[380px]" closeButton={false}>
        <VisuallyHidden.Root>
          <DialogTitle>Success</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center bg-success/[0.12] mt-2 rounded-full">
            <IconCheck className="w-[60px] h-[60px] text-success" />
          </div>
          <p className="mt-8 text-[24px] text-success font-bold">Mission Accomplished!</p>
          <p className="text-sm text-foreground mt-2 text-center">
            Your request has been successfully completed in Uni!
          </p>

          <Button
            variant="secondary"
            onClick={modal.hide}
            className="mt-8 w-full text-app-white h-11 rounded-full bg-white/10 text-sm font-semibold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
