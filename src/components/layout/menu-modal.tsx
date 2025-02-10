import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  IconChevronRight,
  IconClose,
  IconLink,
  IconLogoIcon,
  IconUniSymbol,
  IconTelegram,
  IconWallet,
  IconX,
} from "@/components/icons";
import ModalTutorial from "@/components/shared/modal-tutorial";
import { UserAvatar } from "@/components/shared/user-avatar";
import { headAddress, shortAddress } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

export const ModalMenu = NiceModal.create(() => {
  const modal = useModal();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Staking", path: "/staking" },
    { name: "Token Support", path: "/token-support" },
    { name: "Doc", path: "https://docs.planetverse.io" },
    { name: "Tutorial", path: "#tutorial" },
  ];

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="w-full max-w-[unset] top-0 left-0 right-0 translate-x-0 translate-y-0 !rounded-none !rounded-b-[32px] data-[state=open]:!slide-in-from-left-0 data-[state=closed]:!slide-out-to-left-0">
        <VisuallyHidden.Root>
          <DialogTitle>Menu</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IconLogoIcon className="h-11 w-11 text-primary" />
            <IconUniSymbol className="ml-3 h-11 w-[124px] text-primary" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="flex md:hidden w-11 h-11 items-center justify-center rounded-full bg-white/5 border border-solid border-white/5"
          >
            <IconClose className="w-4 h-auto" />
          </Button>
        </div>

        {address && (
          <div className="flex mt-4 items-center justify-between gap-3 border border-solid border-white/5 rounded-full bg-neutral-900 p-2">
            <UserAvatar name={address} />

            <div className="flex flex-col gap-1 flex-1">
              <span className="text-sm font-semibold text-app-white">{headAddress(address)}</span>
              <span className="text-xs text-primary">{shortAddress(address)}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 mr-2"
              onClick={() => navigate({ to: "/profile/$id", params: { id: address } })}
            >
              <IconChevronRight className="w-6 h-auto text-app-white" />
            </Button>
          </div>
        )}

        <div className="mt-3 mb-8 flex flex-col gap-2">
          {menuItems.map((item) => (
            <div key={item.name} className="py-3 text-foreground text-base font-semibold">
              {item.path.startsWith("http") ? (
                <a href={item.path} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              ) : item.path.startsWith("#tutorial") ? (
                <a
                  href={item.path}
                  onClick={() => {
                    NiceModal.show(ModalTutorial);
                  }}
                >
                  {item.name}
                </a>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex w-11 h-11 rounded-full mr-2 bg-white/10"
            >
              <IconTelegram className="w-6 h-6 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex w-11 h-11 rounded-full mr-4 bg-white/10"
            >
              <IconX className="w-5 h-5 text-white" />
            </Button>
          </div>

          {!address ? (
            <Button
              variant="secondary"
              onClick={() => open()}
              className="flex items-center gap-2 rounded-full py-2 px-4 bg-white"
            >
              <IconWallet className="w-6 h-6 text-app-black" />
              <span className="text-app-black font-semibold text-sm tracking-[0.07px] leading-[20px]">
                Connect Wallet
              </span>
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => disconnect()}
              className="flex items-center gap-2 rounded-full py-2 px-4 bg-transparent border border-solid border-error"
            >
              <IconLink className="w-6 h-6 text-error" />
              <span className="text-error font-semibold text-sm tracking-[0.07px] leading-[20px]">
                Disconnect
              </span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});
