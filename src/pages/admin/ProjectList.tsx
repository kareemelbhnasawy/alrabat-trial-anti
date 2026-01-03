import React from "react";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Plus } from "lucide-react";

export const ProjectList = () => {
  const { projects, deleteProject, divisions } = useData();

  const getDivisionColor = (slug: string) => {
    return divisions.find((d) => d.slug === slug)?.accentColor || "#E5E7EB";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Projects</h1>
        <Link to="/admin/projects/new">
          <Button>
            <Plus size={18} className="mr-2" /> New Project
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-100">
            <tr>
              <th className="p-4 font-bold text-neutral-600">Title</th>
              <th className="p-4 font-bold text-neutral-600">Category</th>
              <th className="p-4 font-bold text-neutral-600">Division</th>
              <th className="p-4 font-bold text-neutral-600">Location</th>
              <th className="p-4 font-bold text-neutral-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-neutral-50 transition-colors"
              >
                <td className="p-4 font-medium text-primary flex items-center">
                  <span
                    className="w-2.5 h-2.5 rounded-full mr-3 shrink-0"
                    style={{
                      backgroundColor: getDivisionColor(project.divisionSlug),
                    }}
                    title={project.divisionSlug}
                  />
                  {project.title}
                </td>
                <td className="p-4 text-neutral-500">{project.category}</td>
                <td className="p-4 text-neutral-500">{project.divisionSlug}</td>
                <td className="p-4 text-neutral-500">{project.location}</td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    className="inline-block p-2 text-neutral-400 hover:text-accent"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="inline-block p-2 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="p-8 text-center text-neutral-400">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};
