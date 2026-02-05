"use client";

import { Eye, Trash2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import CreateNewsletterModal from "@/app/components/CreateNewsletterModal";

interface Attachment {
  name: string;
  url: string;
  type?: string;
  size?: number;
}

interface NewsletterListItem {
  _id: string;
  subject: string;
  totalRecipients: number;
  sentAt: string;
  createdAt: string;
}

interface NewsletterDetails extends NewsletterListItem {
  content: string;
  attachments: Attachment[];
}

const ITEMS_PER_PAGE = 10;

const AdminNewsletter = () => {
  const [newsletters, setNewsletters] = useState<NewsletterListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedNewsletter, setSelectedNewsletter] =
    useState<NewsletterDetails | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ================= FETCH LIST =================
  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter`,
        { cache: "no-store" },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setNewsletters(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  // ================= FETCH SINGLE =================
  const handleView = async (id: string) => {
    try {
      setViewLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter/${id}`,
        { cache: "no-store" },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setSelectedNewsletter(json.data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to load newsletter");
    } finally {
      setViewLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm("This will permanently delete the newsletter. Continue?"))
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter/${id}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setNewsletters((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // ================= PAGINATION =================
  const totalPages = Math.ceil(newsletters.length / ITEMS_PER_PAGE);

  const currentNewsletters = newsletters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getFileIcon = (type?: string) => {
    if (!type) return "📎";
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";
    if (type.includes("word")) return "📝";
    if (type.includes("excel")) return "📊";
    return "📎";
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  // ================= RENDER =================
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-700">
        <div className="p-4 sm:p-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Newsletters</h1>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 flex gap-3 items-center py-2 rounded-lg border hover:text-[var(--primary-color)]"
          >
            <Plus size={18} /> Create Newsletter
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {loading && <p className="text-gray-400">Loading newsletters...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && newsletters.length === 0 && (
          <p className="text-gray-400">No newsletters found.</p>
        )}

        {!loading && newsletters.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-sm">
              <thead className="bg-[#1e1e1e]">
                <tr>
                  <th className="px-4 py-3 text-left border-b border-gray-700">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-700">
                    Sent At
                  </th>
                  <th className="px-4 py-3 text-center border-b border-gray-700">
                    Recipients
                  </th>
                  <th className="px-4 py-3 text-center border-b border-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentNewsletters.map((n) => (
                  <tr key={n._id} className="even:bg-[#111] hover:bg-[#222]">
                    <td className="px-4 py-3 font-medium">{n.subject}</td>
                    <td className="px-4 py-3">
                      {new Date(n.sentAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {n.totalRecipients}
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleView(n._id)}
                        className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(n._id)}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-6 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-3 py-1 bg-[var(--primary-color)] rounded">
              {currentPage}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {selectedNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#111] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-gray-800">
            {/* HEADER */}
            <div className="flex justify-between items-start px-6 py-4 border-b border-gray-700">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedNewsletter.subject}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Sent on {new Date(selectedNewsletter.sentAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedNewsletter(null)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
              {viewLoading ? (
                <p className="text-gray-400">Loading newsletter...</p>
              ) : (
                <>
                  {/* EMAIL CONTENT */}
                  <div className="bg-black rounded-lg p-4 border border-gray-800">
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: selectedNewsletter.content,
                      }}
                    />
                  </div>

                  {/* ATTACHMENTS */}
                  {selectedNewsletter.attachments?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        Attachments
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedNewsletter.attachments.map((a, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-3 bg-[#0b0b0b] border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-xl">
                                {getFileIcon(a.type)}
                              </span>

                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {a.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {formatFileSize(a.size)}
                                </p>
                              </div>
                            </div>

                            <a
                              href={a.url}
                              target="_blank"
                              className="text-xs px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
                            >
                              Download
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreateModal && (
        <CreateNewsletterModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchNewsletters}
        />
      )}
    </div>
  );
};

export default AdminNewsletter;
