import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { TeamMember } from "../../types";

export const TeamList = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      alert("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Team Members</h1>
        <Link
          to="/admin/team/new"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Member
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {member.image_url ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={member.image_url}
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                          <Users size={20} />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {member.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.category === "executive"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {member.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {member.display_order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <Link
                      to={`/admin/team/${member.id}/edit`}
                      className="text-primary hover:text-primary-dark"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
