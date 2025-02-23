import NiceModal from "@ebay/nice-modal-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { get, take } from "es-toolkit/compat";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "usehooks-ts";
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";

import {
  IconChevronDown,
  IconLink,
  IconLogoIcon,
  IconMenu,
  IconProfile,
  IconTelegram,
  IconWallet,
  IconX,
} from "@/components/icons";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import ModalTutorial from "@/components/shared/modal-tutorial";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, headAddress, shortAddress } from "@/lib/utils";
import { useMemeControllerQueryPagination } from "@/services/queries";
import { ModalMenu } from "./menu-modal";

function HeaderMarquee() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: tokensResponse } = useMemeControllerQueryPagination({
    pageSize: 10,
    page: 1,
  });
  const tokens = get(tokensResponse, ["data", "data"], []);
  let topTenTokens = take(tokens, 10);

  // If there are less than 10 tokens, loop them to fill the marquee
  if (topTenTokens.length < 10 && topTenTokens.length > 0) {
    const loopedTokens = [];
    while (loopedTokens.length < 10) {
      loopedTokens.push(...topTenTokens);
    }
    topTenTokens = loopedTokens.slice(0, 10);
  }

  if (topTenTokens.length === 0) {
    return null;
  }

  return (
    <div className="w-full container py-3">
      <Marquee gradient={!isMobile} gradientColor="#080A06">
        {topTenTokens.map((item, index) => (
          <div
            key={index.toString()}
            className="flex items-center justify-center gap-1 p-[6px] pl-4 bg-white/10 rounded-full mx-2"
          >
            <span className="text-foreground text-sm leading-[20px] font-semibold tracking-[0.07px]">
              {headAddress(item.creator)}
            </span>
            <span className="text-app-white text-sm font-normal leading-[20px] tracking-[0.07px]">
              created
            </span>
            <span className="text-primary-light font-semibold text-sm leading-[20px] tracking-[0.07px]">
              {item.symbol}
            </span>
            <ImageWithFallback
              src={item.image}
              alt="logo"
              className="w-5 h-5 rounded-full"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

function Header() {
  const {
    location: { pathname },
  } = useRouterState();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  useAccountEffect({
    onConnect: (a) => {
      sessionStorage.setItem("walletAddress", a.address);
    },
    onDisconnect: () => {
      sessionStorage.removeItem("walletAddress");
    },
  });

  const isRouteActive = (path: string) => {
    return (
      path.startsWith("/") && path.split("/")[1] === pathname.split("/")[1]
    );
  };

  const menuItems = [
    { name: "Home", path: "/" },
    // { name: "Staking", path: "/staking" },
    // { name: "Token Support", path: "/token-support" },
    // { name: "Doc", path: "https://docs.planetverse.io" },
    { name: "Tutorial", path: "#tutorial" },
  ];

  return (
    <header className="text-white">
      <HeaderMarquee />
      <div className="py-4 sm:p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="xl:min-w-[300px] flex">
            <Link to="/" className="flex items-center space-x-2">
              <IconLogoIcon className="h-11 w-11 text-primary" />
            </Link>
          </div>
          <nav className="bg-white/[0.05] rounded-full p-1 hidden lg:flex">
            <ul className="flex items-center">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={cn(
                    "bg-transparent rounded-[16px] py-2 px-4 text-white/40",
                    isRouteActive(item.path) && "text-primary bg-white/[0.05]"
                  )}
                >
                  {item.path.startsWith("http") ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                      className="text-inherit text-sm leading-[20px]"
                    >
                      {item.name}
                    </a>
                  ) : item.path.startsWith("#tutorial") ? (
                    <a
                      href={item.path}
                      className="text-inherit text-sm leading-[20px]"
                      onClick={() => {
                        NiceModal.show(ModalTutorial);
                      }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-inherit text-sm leading-[20px]"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center xl:min-w-[300px]">
            <Button
              variant="ghost"
              size="icon"
              className="flex lg:hidden w-11 h-11 items-center justify-center rounded-full bg-white/5 border border-solid border-white/5"
              onClick={() => NiceModal.show(ModalMenu)}
            >
              <IconMenu className="w-5 h-auto" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex w-11 h-11 rounded-full mr-2 bg-white/10"
            >
              <IconTelegram className="w-6 h-6 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex w-11 h-11 rounded-full mr-4 bg-white/10"
            >
              <IconX className="w-5 h-5 text-white" />
            </Button>

            {!isConnected && (
              <Button
                variant="secondary"
                onClick={() => open()}
                className="hidden lg:flex items-center gap-2 rounded-full py-2 px-4 bg-white"
              >
                <IconWallet className="w-6 h-6 text-app-black" />
                <span className="text-app-black font-semibold text-sm tracking-[0.07px] leading-[20px]">
                  Connect Wallet
                </span>
              </Button>
            )}

            {isConnected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden lg:flex bg-transparent text-primary border border-solid border-primary py-2 px-4 items-center gap-2 rounded-full"
                  >
                    <UserAvatar name={address ?? ""} className="w-5 h-5" />
                    <span>{shortAddress(String(address))}</span>
                    <IconChevronDown className="w-4 h-4 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px] bg-[#262626]/70 mt-4 border-none p-0 rounded-[8px]">
                  <Link to={`/profile/${address}`}>
                    <DropdownMenuItem className="py-3 px-4 border border-0 border-solid border-b-[1px] border-white/20 backdrop-blur-[15px] flex items-center gap-2 rounded-none hover:cursor-pointer">
                      <IconProfile className="text-primary w-5 h-5" />
                      <span className="text-xs text-primary">Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => disconnect()}
                    className="py-3 px-4 backdrop-blur-[15px] flex items-center gap-2 rounded-none hover:cursor-pointer"
                  >
                    <IconLink className="w-5 h-5 text-foreground" />
                    <span className="text-xs text-foreground">Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
