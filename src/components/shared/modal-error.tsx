import NiceModal, { useModal } from "@ebay/nice-modal-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IconDanger, IconReload } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const ModalError = NiceModal.create(({ errorMsg }: { errorMsg?: string }) => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="max-w-[380px]" closeButton={false}>
        <VisuallyHidden.Root>
          <DialogTitle>Error</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center bg-error/[0.12] mt-2 rounded-full">
            <IconDanger className="w-[40px] h-[40px] text-error" />
          </div>
          <p className="mt-8 text-[24px] text-error font-bold">Cosmic Error Detected!</p>
          <p className="text-sm text-app-gray mt-2 text-center whitespace-pre-line break-all">
            {errorMsg || "Looks like we’ve hit a snag in space.\nLet’s try again!"}
          </p>

          <div className="w-full flex items-center gap-1 mt-8">
            <Button
              variant="ghost"
              onClick={modal.hide}
              className="flex-1 text-app-white h-11 rounded-full text-sm font-semibold"
            >
              Close
            </Button>
            <Button
              onClick={modal.hide}
              className="flex-1 text-app-black h-11 rounded-full bg-primary-light text-sm font-semibold"
            >
              <IconReload className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
