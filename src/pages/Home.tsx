import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/home/Marquee";
import { Welcome } from "../components/home/Welcome";
import { Statistics } from "../components/home/Statistics";
import { Divisions } from "../components/home/Divisions";
import { RecentProjects } from "../components/home/RecentProjects";
import { LatestNews } from "../components/home/LatestNews";
import { ProjectMap } from "../components/ui/ProjectMap";

export const Home = () => {
  return (
    <>
      <Hero />
      <Welcome />
      <Statistics />
      <Divisions />
      <RecentProjects />
      <ProjectMap />
      <LatestNews />
      <Marquee />
      {/* Clients section placed last per requested order */}
    </>
  );
};
