import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/ui/Button";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

export const ClientList = () => {
  const { clientCategories, deleteProject } = useData(); // Note: deleteClient not yet in context but we'll add logic or placeholder.
  // Actually, clientCategories structure makes flat listing tricky if we want to sort all.
  // But usually for admin we might want to see them by category or flat list.
  // Let's do a flat list with Category column for easier searching.

  // We need to implement deleteClient in context or here directly for now.
  // Since deleteClient isn't in context, I'll assume we might need to add it or handle it here.
  // Let's stick to reading for now and basic UI.

  const [searchTerm, setSearchTerm] = useState("");

  const allClients = clientCategories.flatMap((cat) =>
    (cat.clients || []).map((client) => ({
      ...client,
      categoryName: cat.name,
    }))
  );

  const filteredClients = allClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Clients & Partners</h1>
        <Link to="/admin/clients/new">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Add Client
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-100 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-neutral-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium border-b">Logo</th>
              <th className="p-4 font-medium border-b">Name</th>
              <th className="p-4 font-medium border-b">Category</th>
              <th className="p-4 font-medium border-b">Highlighted</th>
              <th className="p-4 font-medium border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-neutral-50/50 transition-colors"
              >
                <td className="p-4">
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="h-10 w-auto object-contain"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400">
                      No Img
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium text-neutral-800">
                  {client.name}
                </td>
                <td className="p-4 text-sm text-neutral-600">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {client.categoryName}
                  </span>
                </td>
                <td className="p-4">
                  {client.is_highlighted && (
                    <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-bold">
                      Highlight
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/clients/edit/${client.id}`}>
                      <button className="p-2 text-neutral-400 hover:text-primary transition-colors">
                        <Pencil size={18} />
                      </button>
                    </Link>
                    {/* Delete requires implementation */}
                    <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-400">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
