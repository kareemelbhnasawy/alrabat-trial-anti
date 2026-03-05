import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./Layout";
import { useShouldReduceMotion } from "./hooks/useShouldReduceMotion";

const Home = React.lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home })),
);
const OurStory = React.lazy(() =>
  import("./pages/OurStory").then((module) => ({ default: module.OurStory })),
);
const OurTeam = React.lazy(() =>
  import("./pages/OurTeam").then((module) => ({ default: module.OurTeam })),
);
const Divisions = React.lazy(() =>
  import("./pages/Divisions").then((module) => ({ default: module.Divisions })),
);
const DivisionDetail = React.lazy(() =>
  import("./pages/DivisionDetail").then((module) => ({
    default: module.DivisionDetail,
  })),
);
const Clients = React.lazy(() =>
  import("./pages/Clients").then((module) => ({ default: module.Clients })),
);
const Projects = React.lazy(() =>
  import("./pages/Projects").then((module) => ({ default: module.Projects })),
);
const ProjectDetail = React.lazy(() =>
  import("./pages/ProjectDetail").then((module) => ({
    default: module.ProjectDetail,
  })),
);
const News = React.lazy(() =>
  import("./pages/News").then((module) => ({ default: module.News })),
);
const NewsDetail = React.lazy(() =>
  import("./pages/NewsDetail").then((module) => ({
    default: module.NewsDetail,
  })),
);
const Contact = React.lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact })),
);
const Careers = React.lazy(() =>
  import("./pages/Careers").then((module) => ({ default: module.Careers })),
);
const Dashboard = React.lazy(() =>
  import("./pages/admin/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);

function App() {
  const location = useLocation();
  const shouldReduceMotion = useShouldReduceMotion();

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about/story" element={<OurStory />} />
        <Route path="about/team" element={<OurTeam />} />
        <Route path="divisions" element={<Divisions />} />
        <Route path="divisions/:slug" element={<DivisionDetail />} />
        <Route path="clients" element={<Clients />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<NewsDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="careers" element={<Careers />} />
      </Route>
      <Route path="/admin/*" element={<Dashboard />} />
    </Routes>
  );

  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center text-neutral-400">
          Loading...
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}

export default App;
