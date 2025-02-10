import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconRocket } from "@/components/icons";

const ModalTutorial = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="sm:max-w-[624px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-[24px] font-bold text-app-white mt-2 mb-2">
            How it works
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-[1px] bg-white/[0.15]" />

        <div className="space-y-4 text-sm text-foreground">
          <p>
            UNI ensures optimal security for buyers while offering unique protection for token
            creators:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Each coin is a fair-launch with{" "}
              <span className="text-primary">no presale and team allocation</span>.
            </li>
            <li>
              Deploy for <span className="text-primary">2x less</span> a token thanks to our
              optimized contracts.
            </li>
            <li>
              <span className="text-primary">20%</span> of the supply is clogged to refund and pay
              the creator.
            </li>
          </ul>
          <p>
            If the token generates enough fees to refund at least{" "}
            <span className="text-primary">1 ETH</span> to the creator (the initial liquidity
            provided), the token remains in <span className="text-primary">5/5 tax mode</span> until
            the unclog is complete, after which the taxes drop to{" "}
            <span className="text-primary">0/0</span>.
          </p>
          <p>
            If the token does not generate enough fees within{" "}
            <span className="text-primary">24 hours</span>, the liquidity is withdrawn and sent back
            to the creator's wallet.
          </p>
        </div>
        <Button
          className="rounded-full bg-primary-light w-fit mx-auto text-primary-dark font-semibold flex items-center gap-2 py-2 px-4 mt-2"
          onClick={() => modal.hide()}
        >
          Ready to Deploy
          <IconRocket className="mr-2 h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
});

export default ModalTutorial;
