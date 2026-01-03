import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import type { NewsArticle } from "../../types";
import { ImageUpload } from "../../components/ui/ImageUpload";

export const NewsForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news, addNews, updateNews } = useData();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: "",
    category: "Corporate",
    date: new Date().toISOString().split("T")[0],
    readingTime: "3 min",
    excerpt: "",
    heroImage: "",
    bodyBlocks: [],
  });

  const [bodyText, setBodyText] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      const found = news.find((n) => n.id === id);
      if (found) {
        setFormData(found);
        // Simplistic flattening of body blocks for editing
        setBodyText(
          found.bodyBlocks
            .map((b) =>
              b.type === "paragraph"
                ? b.content
                : `[${b.type.toUpperCase()}] ${b.content}`
            )
            .join("\n\n")
        );
      }
    }
  }, [id, isEdit, news]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert text back to blocks (very basic)
    const blocks = bodyText.split("\n\n").map((p) => {
      if (p.startsWith("[QUOTE]"))
        return {
          type: "quote" as const,
          content: p.replace("[QUOTE] ", ""),
          author: "Unknown",
        };
      if (p.startsWith("[IMAGE]"))
        return { type: "image" as const, content: p.replace("[IMAGE] ", "") };
      return { type: "paragraph" as const, content: p };
    });

    const payload = {
      ...formData,
      bodyBlocks: blocks,
    };

    if (isEdit && id) {
      updateNews(id, payload);
    } else {
      addNews({
        ...payload,
        id: `news-${Date.now()}`,
        slug: formData.title?.toLowerCase().replace(/\s+/g, "-") || "untitled",
        relatedSlugs: [],
      } as NewsArticle);
    }
    navigate("/admin/news");
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
        onClick={() => navigate("/admin/news")}
        className="flex items-center text-neutral-500 hover:text-primary mb-6 text-sm font-bold uppercase tracking-wider"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-bold text-primary mb-8">
        {isEdit ? "Edit Article" : "New Article"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-neutral-200"
      >
        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-600">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:border-accent outline-none"
            placeholder="Article Title"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
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
              <option value="Corporate">Corporate</option>
              <option value="Contract Wins">Contract Wins</option>
              <option value="Equipment">Equipment</option>
              <option value="Insights">Insights</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:border-accent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Read Time
            </label>
            <input
              name="readingTime"
              value={formData.readingTime}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-600">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:border-accent outline-none h-24"
            placeholder="Short summary..."
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
            Article Body
          </label>
          <p className="text-xs text-neutral-400">
            Use regular text for paragraphs. Start line with [QUOTE] for quotes,
            [IMAGE] for images.
          </p>
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            className="w-full p-3 border rounded focus:border-accent outline-none h-64 font-mono text-sm"
            placeholder="Paragraph text here...&#10;&#10;[QUOTE] This is a quote.&#10;&#10;More text..."
          />
        </div>

        <div className="pt-6 border-t border-neutral-100 flex justify-end space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/admin/news")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Article</Button>
        </div>
      </form>
    </div>
  );
};
