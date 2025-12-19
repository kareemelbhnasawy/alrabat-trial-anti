import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Newspaper, Settings, LogOut } from 'lucide-react';
import { ProjectList } from './ProjectList';
import { ProjectForm } from './ProjectForm';
import { NewsList } from './NewsList';
import { NewsForm } from './NewsForm';
import { Button } from '../../components/ui/Button';

const Login = ({ onLogin }: { onLogin: () => void }) => (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
                <p className="text-neutral-400 text-sm">Alrabat Context Management</p>
            </div>
            <input type="text" placeholder="Username" className="w-full p-3 border rounded mb-4" />
            <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-6" />
            <Button className="w-full" onClick={onLogin}>Login</Button>
            <p className="text-xs text-neutral-400 mt-4">Mock Mode: Any credentials work</p>
        </div>
    </div>
);

const AdminLayout = ({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) => {
    const location = useLocation();
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
        { icon: Newspaper, label: 'News', path: '/admin/news' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-neutral-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-dark text-white flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <span className="font-display font-bold text-xl tracking-tight">ALRABAT ADMIN</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-3 rounded-lg transition-colors ${location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                    ? 'bg-accent text-white'
                                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className="mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={onLogout} className="flex items-center text-neutral-400 hover:text-white transition-colors w-full p-3">
                        <LogOut size={20} className="mr-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <AdminLayout onLogout={() => setIsAuthenticated(false)}>
            <Routes>
                <Route index element={<div className="text-2xl font-bold">Welcome to Dashboard</div>} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/:id/edit" element={<ProjectForm />} />
                <Route path="news" element={<NewsList />} />
                <Route path="news/new" element={<NewsForm />} />
                <Route path="news/:id/edit" element={<NewsForm />} />
                <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
        </AdminLayout>
    );
};
