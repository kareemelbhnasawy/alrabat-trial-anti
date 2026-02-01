import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { DynamicIcon } from "../../components/ui/DynamicIcon";

interface StatInput {
  id?: string;
  description: string;
  count: number;
  display_order: number;
  is_deleted?: boolean;
}

export const QualificationAdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [authority, setAuthority] = useState("");
  const [fallbackIconName, setFallbackIconName] = useState("ShieldCheck");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<StatInput[]>([]);

  useEffect(() => {
    if (isEditing) {
      fetchData();
    } else {
      // Initialize with one empty stat for convenience
      setStats([{ description: "", count: 1, display_order: 1 }]);
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("qualifications")
        .select("*, stats:qualification_stats(*)")
        .eq("id", id)
        .single();

      if (error) throw error;

      setAuthority(data.authority);
      setFallbackIconName(data.fallback_icon_name);
      setLogoUrl(data.logo_url);

      if (data.stats) {
        setStats(
          data.stats.sort(
            (a: any, b: any) => a.display_order - b.display_order,
          ),
        );
      }
    } catch (error) {
      console.error("Error fetching qualification:", error);
      navigate("/admin/qualifications");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `qualifications/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("icons") // Assuming 'icons' bucket exists, user instruction mentioned this
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("icons").getPublicUrl(filePath);

      setLogoUrl(data.publicUrl);
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert(
        'Error uploading logo. Ensure "icons" bucket exists and policies allow upload.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upsert Qualification
      const qualificationData = {
        authority,
        fallback_icon_name: fallbackIconName,
        logo_url: logoUrl,
      };

      let qualificationId = id;

      if (isEditing) {
        const { error } = await supabase
          .from("qualifications")
          .update(qualificationData)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("qualifications")
          .insert(qualificationData)
          .select()
          .single();
        if (error) throw error;
        qualificationId = data.id;
      }

      // 2. Handle Stats
      // Filter out empty stats
      const validStats = stats.filter((s) => s.description.trim() !== "");

      for (const stat of validStats) {
        const statData = {
          qualification_id: qualificationId,
          description: stat.description,
          count: stat.count,
          display_order: stat.display_order,
        };

        if (stat.is_deleted && stat.id) {
          await supabase.from("qualification_stats").delete().eq("id", stat.id);
        } else if (stat.id) {
          await supabase
            .from("qualification_stats")
            .update(statData)
            .eq("id", stat.id);
        } else if (!stat.is_deleted) {
          await supabase.from("qualification_stats").insert(statData);
        }
      }

      navigate("/admin/qualifications");
    } catch (error) {
      console.error("Error saving qualification:", error);
      alert("Error saving qualification");
    } finally {
      setLoading(false);
    }
  };

  const addStat = () => {
    setStats([
      ...stats,
      { description: "", count: 1, display_order: stats.length + 1 },
    ]);
  };

  const updateStat = (index: number, field: keyof StatInput, value: any) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const removeStat = (index: number) => {
    const newStats = [...stats];
    if (newStats[index].id) {
      // Mark for deletion if it exists in DB
      newStats[index].is_deleted = true;
    } else {
      // Just remove from array if it's new
      newStats.splice(index, 1);
    }
    setStats(newStats);
  };

  // Filter visible stats (not marked for deletion)
  const visibleStats = stats.filter((s) => !s.is_deleted);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/admin/qualifications")}
          className="mr-4 text-neutral-500 hover:text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-primary">
          {isEditing ? "Edit Qualification" : "New Qualification"}
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Main Info */}
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <h2 className="text-lg font-bold text-primary mb-4 border-b border-neutral-100 pb-2">
            Basic Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Authority Name
              </label>
              <input
                type="text"
                required
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. Dubai Municipality"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Fallback Icon (Lucide Name)
              </label>
              <input
                type="text"
                required
                value={fallbackIconName}
                onChange={(e) => setFallbackIconName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. ShieldCheck, Building2..."
              />
              <p className="text-xs text-neutral-500 mt-1">
                Used if no custom logo is uploaded. See Lucide React icons.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">
                Custom Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200">
                  <DynamicIcon
                    iconName={fallbackIconName}
                    logoUrl={logoUrl}
                    className="w-8 h-8 text-neutral-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 px-4 py-2 rounded-lg inline-flex items-center transition-colors">
                    <Upload size={18} className="mr-2" />
                    Upload Logo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </label>
                  {logoUrl && (
                    <button
                      type="button"
                      onClick={() => setLogoUrl(null)}
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

        {/* Stats */}
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-100 pb-2">
            <h2 className="text-lg font-bold text-primary">Certified Stats</h2>
            <button
              type="button"
              onClick={addStat}
              className="text-sm text-primary font-bold hover:underline flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Stat
            </button>
          </div>

          <div className="space-y-4">
            {visibleStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100"
              >
                <div className="flex-1">
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={stat.description}
                    onChange={(e) =>
                      updateStat(
                        stats.indexOf(stat),
                        "description",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm"
                    placeholder="e.g. Shoring & Piling Certified"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    Count
                  </label>
                  <input
                    type="number"
                    value={stat.count}
                    onChange={(e) =>
                      updateStat(
                        stats.indexOf(stat),
                        "count",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={stat.display_order}
                    onChange={(e) =>
                      updateStat(
                        stats.indexOf(stat),
                        "display_order",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(stats.indexOf(stat))}
                  className="mt-6 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {visibleStats.length === 0 && (
              <p className="text-center text-neutral-400 py-4 italic">
                No stats added yet.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/qualifications")}
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
            {loading ? "Saving..." : "Save Qualification"}
          </button>
        </div>
      </form>
    </div>
  );
};
