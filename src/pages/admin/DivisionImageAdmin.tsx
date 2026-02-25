import React, { useEffect, useMemo, useState } from "react";
import { Image as ImageIcon, RefreshCcw, Save } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useData } from "../../context/DataContext";
import { CroppedImageUpload } from "../../components/ui/CroppedImageUpload";
import { Button } from "../../components/ui/Button";

interface DivisionMediaRow {
  slug: string;
  hero_image_url: string;
}

export const DivisionImageAdmin = () => {
  const { divisions, reloadDivisions } = useData();
  const [loading, setLoading] = useState(true);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const defaultBySlug = useMemo(() => {
    return divisions.reduce(
      (acc, division) => {
        acc[division.slug] = division.heroImage;
        return acc;
      },
      {} as Record<string, string>
    );
  }, [divisions]);

  const fetchDivisionMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("division_media")
        .select("slug, hero_image_url");

      if (error) throw error;

      const map = (data || []).reduce((acc: Record<string, string>, row: any) => {
        if (row.slug && row.hero_image_url) {
          acc[row.slug] = row.hero_image_url;
        }
        return acc;
      }, {});

      setOverrides(map);
      setDrafts(map);
    } catch (err: any) {
      setError(
        err?.message?.includes("Could not find the table")
          ? "The Supabase table `division_media` is missing. Run `scripts/migrate-division-media.sql` first."
          : "Could not load division image overrides."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisionMedia();
  }, []);

  const getCurrentValue = (slug: string) =>
    drafts[slug] || overrides[slug] || defaultBySlug[slug] || "";

  const isDirty = (slug: string) => {
    const original = overrides[slug] || defaultBySlug[slug] || "";
    return getCurrentValue(slug) !== original;
  };

  const saveDivisionImage = async (slug: string) => {
    const url = getCurrentValue(slug);
    if (!url) {
      alert("Please upload an image first.");
      return;
    }

    try {
      setSavingSlug(slug);
      const { error } = await supabase.from("division_media").upsert(
        {
          slug,
          hero_image_url: url,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      );

      if (error) throw error;

      const next = { ...overrides, [slug]: url };
      setOverrides(next);
      setDrafts(next);
      await reloadDivisions();
    } catch (err) {
      console.error("Error saving division image override:", err);
      alert("Could not save division image override");
    } finally {
      setSavingSlug(null);
    }
  };

  const resetDivisionImage = async (slug: string) => {
    try {
      setSavingSlug(slug);
      const { error } = await supabase.from("division_media").delete().eq("slug", slug);
      if (error) throw error;

      const nextOverrides = { ...overrides };
      delete nextOverrides[slug];

      const nextDrafts = { ...drafts };
      delete nextDrafts[slug];

      setOverrides(nextOverrides);
      setDrafts(nextDrafts);
      await reloadDivisions();
    } catch (err) {
      console.error("Error resetting division image override:", err);
      alert("Could not reset division image");
    } finally {
      setSavingSlug(null);
    }
  };

  if (loading) return <div>Loading division images...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Division Images</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Upload and crop hero images for each division.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={fetchDivisionMedia}>
          <RefreshCcw size={16} className="mr-2" /> Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-4 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {divisions.map((division) => (
          <div
            key={division.slug}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary">{division.name}</h3>
                <p className="text-xs uppercase tracking-wider text-neutral-500">
                  {division.slug}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <ImageIcon size={18} />
              </div>
            </div>

            <CroppedImageUpload
              value={getCurrentValue(division.slug)}
              onChange={(url) =>
                setDrafts((prev) => ({
                  ...prev,
                  [division.slug]: url,
                }))
              }
              label="Hero Image (16:9 Crop)"
              aspect={16 / 9}
              uploadBucket="media"
              uploadFolder={`division-heroes/${division.slug}`}
            />

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => saveDivisionImage(division.slug)}
                disabled={!isDirty(division.slug) || savingSlug === division.slug}
              >
                <Save size={16} className="mr-2" />
                {savingSlug === division.slug ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => resetDivisionImage(division.slug)}
                disabled={savingSlug === division.slug || !overrides[division.slug]}
              >
                Reset to Default
              </Button>
              {overrides[division.slug] && (
                <span className="text-xs text-neutral-500">Custom image active</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
