import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { get } from "es-toolkit/compat";
import { createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "usehooks-ts";

import { IconLoading } from "@/components/icons";
import { ChatCard } from "@/components/project-detail/chat-card";
import { ProjectInfoCard } from "@/components/project-detail/project-info-card";
import { SwapForm } from "@/components/project-detail/swap-form";
import { TokenStatistic } from "@/components/project-detail/token-statistic";
import { Empty } from "@/components/shared/empty";
import { useTaxFarmControllerFindOne } from "@/services/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/project/$id")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { id } = Route.useParams();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    overview: null,
    swap: null,
    statistics: null,
    chat: null,
  });

  const { data: projectResponse, isLoading } = useTaxFarmControllerFindOne(id);

  const project = get(projectResponse, "data", null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!navRef.current || !isMobile) return;

    const navElement = navRef.current;
    const navOffsetTop = navElement.offsetTop;

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsFixed(scrollPosition > navOffsetTop);

      // Check which section is currently in view
      const currentSection = Object.entries(sectionRefs.current).find(([_, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return rect.top <= 300 && rect.bottom >= 300;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection[0]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, navRef.current, project]);

  const navItemClass = (section: string) =>
    cn(
      "flex items-center justify-center border-b-[2px] border-solid p-3 text-sm font-medium",
      activeSection === section
        ? "text-primary border-primary"
        : "text-foreground border-transparent",
    );

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] justify-center">
        <IconLoading className="animate-spin w-14 h-14 mt-20" />
      </div>
    );
  }

  if (!project) {
    return <Empty description="Project not found" className="my-[100px] h-[calc(100vh-500px)]" />;
  }

  if (isMobile) {
    return (
      <>
        <div
          ref={navRef}
          className={cn(
            "grid px-2 grid-cols-4 w-screen bg-background-surface z-10 transition-all duration-300",
            isFixed ? "fixed top-0" : "",
          )}
        >
          <div className={navItemClass("overview")}>Overview</div>
          <div className={navItemClass("swap")}>Swap</div>
          <div className={navItemClass("statistics")}>Statistics</div>
          <div className={navItemClass("chat")}>Chat</div>
        </div>
        <div className={cn("flex flex-col gap-4 container mt-4 mb-8", isFixed ? "pt-[50px]" : "")}>
          <div id="project-info-card" ref={(el) => (sectionRefs.current.overview = el)}>
            <ProjectInfoCard project={project} />
          </div>
          <div id="swap-form" ref={(el) => (sectionRefs.current.swap = el)}>
            <SwapForm project={project} />
          </div>
          <div id="token-statistic" ref={(el) => (sectionRefs.current.statistics = el)}>
            <TokenStatistic project={project} />
          </div>
          <div id="chat-card" ref={(el) => (sectionRefs.current.chat = el)}>
            <ChatCard hash={id} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex gap-4 container mt-8 mb-10">
      <div className="flex-1 flex flex-col w-full gap-4">
        <ProjectInfoCard project={project} />
        <ChatCard hash={id} />
      </div>
      <div className="flex flex-col gap-4 w-[406px]">
        <SwapForm project={project} />
        <TokenStatistic project={project} />
      </div>
    </div>
  );
}
