import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import type { Project } from "../../types";
import { ImageUpload } from "../../components/ui/ImageUpload";

export const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useData();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    category: "Projects",
    divisionSlug: "foundations",
    location: "",
    year: new Date().getFullYear().toString(),
    summary: "",
    heroImage: "",
    scope: [],
    challenges: [],
    solutions: [],
    tags: [],
    metrics: {},
  });

  useEffect(() => {
    if (isEdit && id) {
      const found = projects.find((p) => p.id === id);
      if (found) setFormData(found);
    }
  }, [id, isEdit, projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && id) {
      updateProject(id, formData);
    } else {
      addProject({
        ...formData,
        id: `proj-${Date.now()}`,
        slug: formData.title?.toLowerCase().replace(/\s+/g, "-") || "untitled",
        scope: formData.scope || [],
        challenges: formData.challenges || [],
        solutions: formData.solutions || [],
        tags: formData.tags || [],
        gallery: [], // todo
        metrics: formData.metrics || {},
      } as Project);
    }
    navigate("/admin/projects");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/admin/projects")}
        className="flex items-center text-neutral-500 hover:text-primary mb-6 text-sm font-bold uppercase tracking-wider"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-bold text-primary mb-8">
        {isEdit ? "Edit Project" : "New Project"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-neutral-200"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Project Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:border-accent outline-none"
              placeholder="e.g. Sky Tower Foundations"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:border-accent outline-none"
              placeholder="e.g. Dubai, UAE"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Division
            </label>
            <select
              name="divisionSlug"
              value={formData.divisionSlug}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:border-accent outline-none"
            >
              <option value="foundations">Foundations</option>
              <option value="ground-improvement">Ground Improvement</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="marine">Marine</option>
              <option value="equipment">Equipment</option>
              <option value="consulting">Consulting</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:border-accent outline-none"
            >
              <option value="Projects">Projects</option>
              <option value="Major Projects">Major Projects</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">Year</label>
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-600">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:border-accent outline-none h-32"
            placeholder="Brief overview..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-600">
            Hero Image
          </label>
          <ImageUpload
            value={formData.heroImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, heroImage: url }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-600">
            Scope of Work (one item per line)
          </label>
          <textarea
            value={formData.scope?.join("\n") || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                scope: e.target.value.split("\n"),
              }))
            }
            className="w-full p-3 border rounded focus:border-accent outline-none h-32"
            placeholder="Item 1&#10;Item 2&#10;Item 3"
          />
        </div>

        <div className="pt-6 border-t border-neutral-100 flex justify-end space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/admin/projects")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Project</Button>
        </div>
      </form>
    </div>
  );
};
