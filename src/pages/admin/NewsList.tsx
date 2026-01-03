import React from "react";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Plus } from "lucide-react";
import { ConfirmationModal } from "../../components/ui/ConfirmationModal";
import { useState } from "react";

export const NewsList = () => {
  const { news, deleteNews } = useData();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteNews(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        confirmLabel="Delete"
        isDestructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">News & Insights</h1>
        <Link to="/admin/news/new">
          <Button>
            <Plus size={18} className="mr-2" /> New Article
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-100">
            <tr>
              <th className="p-4 font-bold text-neutral-600">Title</th>
              <th className="p-4 font-bold text-neutral-600">Category</th>
              <th className="p-4 font-bold text-neutral-600">Date</th>
              <th className="p-4 font-bold text-neutral-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {news.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50 transition-colors"
              >
                <td className="p-4 font-medium text-primary">{item.title}</td>
                <td className="p-4 text-neutral-500">{item.category}</td>
                <td className="p-4 text-neutral-500">{item.date}</td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    to={`/admin/news/${item.id}/edit`}
                    className="inline-block p-2 text-neutral-400 hover:text-accent"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="inline-block p-2 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {news.length === 0 && (
          <div className="p-8 text-center text-neutral-400">
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
};
