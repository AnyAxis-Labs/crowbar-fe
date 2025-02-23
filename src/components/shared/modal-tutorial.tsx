import NiceModal, { useModal } from "@ebay/nice-modal-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
            Crowbar.so enables game developers to launch and monetize their
            games through an AI-powered token launchpad built on Sonic
            blockchain. Players can use the G@M3 token standard to participate
            in games, stake, and train AI agents.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="text-primary">Step 1:</span> Launch a Game Token
              - Create your G@M3 token through our launchpad, set fundraising
              rules, and migrate liquidity via Shadow Exchange.
            </li>
            <li>
              <span className="text-primary">Step 2:</span> Join a Game -
              Players can stake tokens for 1 month to get NFTs or buy at 2x
              price (half for liquidity, half burned).
            </li>
            <li>
              <span className="text-primary">Step 3:</span> Play with AI
              Assistance - AI agents analyze gameplay, suggest optimal moves,
              and track opponents in real-time.
            </li>
            <li>
              <span className="text-primary">Step 4:</span> Earn Rewards -
              Winners claim 99% of prize pools, 1% is burned. Players can mint
              and train AI agent NFTs.
            </li>
            <li>
              <span className="text-primary">Step 5:</span> Trade & Grow - G@M3
              tokens are listed on Shadow Exchange with liquidity managed via
              Zerepy Framework.
            </li>
          </ul>
          <p className="mt-4">
            By using Crowbar.so, developers and players access an AI-driven,
            sustainable gaming economy powered by the G@M3 token standard on
            Sonic blockchain.
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
