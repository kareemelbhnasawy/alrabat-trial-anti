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
  const { projects, addProject, updateProject, divisions } = useData();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    category: "Projects",
    divisionSlugs: [],
    location: "",
    year: new Date().getFullYear().toString(),
    summary: "",
    heroImage: "",
    gallery: [],
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
        gallery: [],
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
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Coordinates (Latitude)
            </label>
            <input
              type="number"
              step="any"
              value={formData.coordinates?.lat || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coordinates: {
                    lng: prev.coordinates?.lng || 0,
                    lat: parseFloat(e.target.value),
                  },
                }))
              }
              className="w-full p-3 border rounded focus:border-accent outline-none"
              placeholder="e.g. 25.2048"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Coordinates (Longitude)
            </label>
            <input
              type="number"
              step="any"
              value={formData.coordinates?.lng || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coordinates: {
                    lat: prev.coordinates?.lat || 0,
                    lng: parseFloat(e.target.value),
                  },
                }))
              }
              className="w-full p-3 border rounded focus:border-accent outline-none"
              placeholder="e.g. 55.2708"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2 col-span-1">
            <label className="text-sm font-bold text-neutral-600 block mb-2">
              Divisions
            </label>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 h-40 overflow-y-auto space-y-2">
              {divisions.map((div) => (
                <label
                  key={div.slug}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={div.slug}
                    checked={formData.divisionSlugs?.includes(div.slug)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev) => {
                        const current = prev.divisionSlugs || [];
                        if (checked) {
                          return {
                            ...prev,
                            divisionSlugs: [...current, div.slug],
                          };
                        } else {
                          return {
                            ...prev,
                            divisionSlugs: current.filter(
                              (s) => s !== div.slug
                            ),
                          };
                        }
                      });
                    }}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-neutral-700">{div.name}</span>
                </label>
              ))}
            </div>
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
            Project Gallery
          </label>
          <p className="text-xs text-neutral-400 mb-2">
            Upload images and assign them to a specific division (optional) for
            filtering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {formData.gallery?.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-3 border border-neutral-200 rounded-lg bg-neutral-50 relative group"
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-24 h-24 object-cover rounded shrink-0 bg-neutral-200"
                />
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase">
                    Division Tag
                  </label>
                  <select
                    value={item.divisionSlug || ""}
                    onChange={(e) => {
                      const newGallery = [...(formData.gallery || [])];
                      newGallery[i] = {
                        ...newGallery[i],
                        divisionSlug: e.target.value,
                      };
                      setFormData((prev) => ({ ...prev, gallery: newGallery }));
                    }}
                    className="w-full p-2 text-sm border rounded bg-white"
                  >
                    <option value="">(None / General)</option>
                    {divisions.map((div) => (
                      <option key={div.slug} value={div.slug}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Caption (optional)"
                    value={item.caption || ""}
                    onChange={(e) => {
                      const newGallery = [...(formData.gallery || [])];
                      newGallery[i] = {
                        ...newGallery[i],
                        caption: e.target.value,
                      };
                      setFormData((prev) => ({ ...prev, gallery: newGallery }));
                    }}
                    className="w-full p-2 text-xs border rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      gallery: prev.gallery?.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center p-6 border-2 border-dashed border-neutral-200 rounded-lg bg-white">
            <div className="text-center">
              <ImageUpload
                value=""
                onChange={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    gallery: [
                      ...(prev.gallery || []),
                      { url, divisionSlug: prev.divisionSlugs?.[0] || "" },
                    ],
                  }))
                }
              />
              <span className="text-xs text-neutral-400 block mt-2">
                Click to upload new photos
              </span>
            </div>
          </div>
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
