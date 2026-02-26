import React, { Suspense } from "react";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/home/Marquee";
import { Welcome } from "../components/home/Welcome";
import { Statistics } from "../components/home/Statistics";
import { Divisions } from "../components/home/Divisions";
import { RecentProjects } from "../components/home/RecentProjects";
import { LatestNews } from "../components/home/LatestNews";

const ProjectMap = React.lazy(() =>
  import("../components/ui/ProjectMap").then((module) => ({
    default: module.ProjectMap,
  })),
);

export const Home = () => {
  const mapSectionRef = React.useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = React.useState(false);

  React.useEffect(() => {
    const node = mapSectionRef.current;
    if (!node || shouldLoadMap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  return (
    <>
      <Hero />
      <Welcome />
      <Statistics />
      <Divisions />
      <RecentProjects />
      <div ref={mapSectionRef} />
      {shouldLoadMap ? (
        <Suspense
          fallback={
            <div className="h-[600px] w-full bg-neutral-900 flex items-center justify-center text-white/20">
              Loading Map...
            </div>
          }
        >
          <ProjectMap />
        </Suspense>
      ) : (
        <div className="h-[600px] w-full bg-neutral-900/95" />
      )}
      <LatestNews />
      <Marquee />
      {/* Clients section placed last per requested order */}
    </>
  );
};
