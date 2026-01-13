import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/home/Marquee";
import { CollageBand } from "../components/home/CollageBand";
import { Overview } from "../components/home/Overview";
import { RecentProjects } from "../components/home/RecentProjects";
import { LatestNews } from "../components/home/LatestNews";
import { ProjectMap } from "../components/ui/ProjectMap";

export const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <CollageBand />
      <Overview />
      <RecentProjects />
      <ProjectMap />
      <LatestNews />
    </>
  );
};
