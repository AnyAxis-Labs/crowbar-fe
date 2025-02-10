import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ModalDisclaimer = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="sm:max-w-[624px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-[24px] font-bold text-app-white mt-2 mb-2">
            Disclaimer
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-[1px] bg-white/[0.15]" />

        <div className="space-y-4 text-sm text-foreground">
          <p>
            <span className="text-error">Do not buy this token.</span> The creator can withdraw the
            liquidity at any moment and you may <span className="text-error">lose your money</span>.
            If you have tokens left in your wallet make sure to{" "}
            <span className="text-error">sell </span>
            them.
          </p>
          <p>Why isn’t the liquidity burned?</p>
          <p>
            If a token does not generate enough fees within{" "}
            <span className="text-error">24 hours</span>, the liquidity is{" "}
            <span className="text-error">withdrawn</span> and sent back to the creator’s wallet.
          </p>
        </div>
        <Button
          className="rounded-full bg-primary-light w-full mx-auto text-primary-dark font-semibold flex items-center gap-2 py-2 px-4 mt-10"
          onClick={() => modal.hide()}
        >
          I understand
        </Button>
      </DialogContent>
    </Dialog>
  );
});
