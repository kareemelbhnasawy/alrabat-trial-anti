import React from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  Settings as SettingsIcon,
  LogOut,
  Home,
} from "lucide-react";
import { ProjectList } from "./ProjectList";
import { ProjectForm } from "./ProjectForm";
import { NewsList } from "./NewsList";
import { NewsForm } from "./NewsForm";
import { Login } from "./Login";
import { Settings } from "./Settings";
import { useAuth } from "../../context/AuthContext";

import { useData } from "../../context/DataContext";

const AdminLayout = ({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) => {
  const location = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: FolderKanban, label: "Projects", path: "/admin/projects" },
    { icon: Newspaper, label: "News", path: "/admin/news" },
    { icon: SettingsIcon, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <span className="font-display font-bold text-xl tracking-tight">
            ALRABAT ADMIN
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === item.path ||
                (item.path !== "/admin" &&
                  location.pathname.startsWith(item.path))
                  ? "bg-accent text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center text-neutral-400 hover:text-white transition-colors w-full p-3 hover:bg-white/5 rounded-lg"
          >
            <Home size={20} className="mr-3" /> Back to Website
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center text-neutral-400 hover:text-white transition-colors w-full p-3 hover:bg-white/5 rounded-lg"
          >
            <LogOut size={20} className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

const DashboardOverview = () => {
  const { projects, news } = useData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="text-neutral-500 font-bold text-sm uppercase tracking-wider mb-2">
            System Status
          </h3>
          <p className="text-2xl font-bold text-green-600 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600 mr-2 animate-pulse"></span>
            Online
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="text-neutral-500 font-bold text-sm uppercase tracking-wider mb-2">
            Database
          </h3>
          <p className="text-2xl font-bold text-primary">Live</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="text-neutral-500 font-bold text-sm uppercase tracking-wider mb-2">
            Total Content
          </h3>
          <div className="flex space-x-6">
            <div>
              <p className="text-2xl font-bold text-neutral-800">
                {projects.length}
              </p>
              <p className="text-xs text-neutral-500 uppercase">Projects</p>
            </div>
            <div className="w-px bg-neutral-200"></div>
            <div>
              <p className="text-2xl font-bold text-neutral-800">
                {news.length}
              </p>
              <p className="text-xs text-neutral-500 uppercase">Articles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Routes>
      <Route
        path="login"
        element={isAuthenticated ? <Navigate to="/admin" /> : <Login />}
      />

      <Route
        path="*"
        element={
          isAuthenticated ? (
            <AdminLayout onLogout={logout}>
              <Routes>
                <Route index element={<DashboardOverview />} />
                <Route path="projects">
                  <Route index element={<ProjectList />} />
                  <Route path="new" element={<ProjectForm />} />
                  <Route path=":id/edit" element={<ProjectForm />} />
                </Route>
                <Route path="news">
                  <Route index element={<NewsList />} />
                  <Route path="new" element={<NewsForm />} />
                  <Route path=":id/edit" element={<NewsForm />} />
                </Route>
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </Routes>
            </AdminLayout>
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      />
    </Routes>
  );
};
