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
  return (
    <>
      <Hero />
      <Welcome />
      <Statistics />
      <Divisions />
      <RecentProjects />
      <Suspense
        fallback={
          <div className="h-[600px] w-full bg-neutral-900 flex items-center justify-center text-white/20">
            Loading Map...
          </div>
        }
      >
     
      </Suspense>
      <LatestNews />
      <Marquee />
         <ProjectMap />
      {/* Clients section placed last per requested order */}
    </>
  );
};
