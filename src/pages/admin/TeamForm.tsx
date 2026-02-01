import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Upload, Users } from "lucide-react";
import { supabase } from "../../lib/supabase";

export const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState<
    "executive" | "division_head" | "other"
  >("executive");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetchMember();
    }
  }, [id]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setName(data.name);
      setRole(data.role);
      setEmail(data.email || "");
      setBio(data.bio || "");
      setCategory(data.category);
      setDisplayOrder(data.display_order);
      setImageUrl(data.image_url);
    } catch (error) {
      console.error("Error fetching member:", error);
      navigate("/admin/team");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `team/${fileName}`; // Need to make sure 'team' bucket or folder exists/is allowed

      // We'll reuse the 'icons' bucket for simplicity if we can, or assume 'team-photos' bucket.
      // Based on previous task, we created 'icons'. Let's stick to 'icons' for now or create a new one.
      // Actually, best to use a common bucket like 'public' if possible, but we made 'icons'.
      // Let's use 'icons' bucket but put in a folder, or just use 'icons' bucket.
      // Ideally should separate, but user might not want to run another big SQL script just for a bucket name change.
      // Let's assume we can upload to 'icons' bucket for now as it has public access.

      const { error: uploadError } = await supabase.storage
        .from("icons")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("icons").getPublicUrl(filePath);

      setImageUrl(data.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Ensure storage policies are set.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const memberData = {
      name,
      role,
      email: email || null,
      bio: bio || null,
      category,
      display_order: displayOrder,
      image_url: imageUrl,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("team_members")
          .update(memberData)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("team_members")
          .insert(memberData);
        if (error) throw error;
      }
      navigate("/admin/team");
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Error saving member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/admin/team")}
          className="mr-4 text-neutral-500 hover:text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-primary">
          {isEditing ? "Edit Member" : "New Member"}
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Role
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="executive">Executive Leadership</option>
                <option value="division_head">Division Head</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200 overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="text-neutral-400" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 px-4 py-2 rounded-lg inline-flex items-center transition-colors">
                    <Upload size={18} className="mr-2" />
                    Upload Photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl(null)}
                      className="ml-2 text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/team")}
            className="px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark font-bold shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center"
          >
            <Save size={20} className="mr-2" />
            {loading ? "Saving..." : "Save Member"}
          </button>
        </div>
      </form>
    </div>
  );
};
