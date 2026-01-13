import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/ui/Button";
import { ImageUpload } from "../../components/ui/ImageUpload";
import { supabase } from "../../lib/supabase";
import { ArrowLeft, Save } from "lucide-react";

export const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientCategories, fetchClients } = useData();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    is_highlighted: false,
    image: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      // Find client in loaded categories
      const foundClient = clientCategories
        .flatMap((c) => c.clients || [])
        .find((c) => c.id === id);

      if (foundClient) {
        setFormData({
          name: foundClient.name,
          category_id: foundClient.category_id,
          is_highlighted: foundClient.is_highlighted,
          image: foundClient.image || "",
          details: foundClient.details || "",
        });
      }
    } else if (clientCategories.length > 0 && !formData.category_id) {
      setFormData((prev) => ({ ...prev, category_id: clientCategories[0].id }));
    }
  }, [id, clientCategories, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        const { error } = await supabase
          .from("clients")
          .update(formData)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("clients").insert(formData);
        if (error) throw error;
      }

      fetchClients();
      navigate("/admin/clients");
    } catch (error: any) {
      console.error("Error saving client:", error);
      alert(`Failed to save: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/admin/clients")}
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-primary">
          {isEditMode ? "Edit Client" : "Add New Client"}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
            >
              {clientCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Logo */}
          <div>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Client Logo"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Details (Optional - shows on hover)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={3}
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="e.g. Deep piling works in progress"
            />
          </div>

          {/* Highlighted */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_highlighted"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={formData.is_highlighted}
              onChange={(e) =>
                setFormData({ ...formData, is_highlighted: e.target.checked })
              }
            />
            <label
              htmlFor="is_highlighted"
              className="text-sm font-medium text-neutral-700 select-none"
            >
              Highlight as Key Partner
            </label>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Client"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
