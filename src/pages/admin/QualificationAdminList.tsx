import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  ShieldCheck,
  Building2,
  FileCheck,
  Zap,
  Award,
  Landmark,
  HelpCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Qualification } from "../../types";
import { DynamicIcon } from "../../components/ui/DynamicIcon";

export const QualificationAdminList = () => {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("qualifications")
        .select("*")
        .order("created_at", { ascending: true }); // Or order by some other field

      if (error) throw error;
      setQualifications(data || []);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
      alert("Failed to delete qualification");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this qualification?"))
      return;

    try {
      const { error } = await supabase
        .from("qualifications")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Refresh list
      fetchQualifications();
    } catch (error) {
      console.error("Error deleting qualification:", error);
      alert("Failed to delete qualification");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          Qualifications & Accreditations
        </h1>
        <Link
          to="/admin/qualifications/new"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Qualification
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Authority
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Fallback Icon
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {qualifications.map((q) => (
              <tr key={q.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-primary">
                    <DynamicIcon
                      iconName={q.fallback_icon_name}
                      logoUrl={q.logo_url}
                      className="w-6 h-6"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {q.authority}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {q.fallback_icon_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <Link
                      to={`/admin/qualifications/${q.id}/edit`}
                      className="text-primary hover:text-primary-dark"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {qualifications.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-neutral-500"
                >
                  No qualifications found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
