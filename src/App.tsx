import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Divisions } from './pages/Divisions';
import { DivisionDetail } from './pages/DivisionDetail';
import { Clients } from './pages/Clients';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/admin/Dashboard';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="divisions" element={<Divisions />} />
                <Route path="divisions/:slug" element={<DivisionDetail />} />
                <Route path="clients" element={<Clients />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:slug" element={<ProjectDetail />} />
                <Route path="news" element={<News />} />
                <Route path="news/:slug" element={<NewsDetail />} />
                <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
