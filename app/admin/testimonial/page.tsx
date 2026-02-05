"use client";

import TestimonialModal from "@/app/components/CreateEditTestimonial";
import { Eye, Trash2, Plus, X, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  image?: string;
  designation?: string;
  isActive: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Testimonial | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // ================= FETCH =================
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/testimonial`,
        { cache: "no-store" },
      );
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial permanently?")) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/testimonial/${id}`, {
      method: "DELETE",
    });

    setTestimonials((prev) => prev.filter((t) => t._id !== id));
  };

  // ================= PAGINATION =================
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const visibleItems = testimonials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-700">
        <div className="p-6 flex justify-between">
          <h1 className="text-3xl font-bold">Testimonials</h1>

          <button
            onClick={() => {
              setEditData(null); // CREATE MODE
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2 border rounded-lg hover:text-[var(--primary-color)]"
          >
            <Plus size={18} /> Add Testimonial
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && (
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-[#1e1e1e]">
              <tr>
                <th className="px-4 py-3 text-left w-1/4">Client</th>
                <th className="px-4 py-3 text-left w-2/4">Message</th>
                <th className="px-4 py-3 text-center w-1/8">Status</th>
                <th className="px-4 py-3 text-center w-1/8">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleItems.map((t) => (
                <tr key={t._id} className="even:bg-[#111] hover:bg-[#222]">
                  {/* CLIENT */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--primary-color)] flex items-center justify-center">
                        {t.image ? (
                          <img
                            src={t.image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-semibold">
                            {t.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.designation}</p>
                      </div>
                    </div>
                  </td>

                  {/* MESSAGE */}
                  <td className="px-4 py-3 text-gray-300">
                    <div className="line-clamp-2 break-words">{t.message}</div>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded text-xs ${
                        t.isActive ? "bg-green-600" : "bg-gray-600"
                      }`}
                    >
                      {t.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3 flex justify-center gap-3">
                    {/* VIEW */}
                    <button
                      onClick={() => setSelected(t)}
                      className="text-cyan-400"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setEditData(t); // EDIT MODE
                        setShowModal(true);
                      }}
                      className="text-yellow-400"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-6 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              Prev
            </button>

            <span className="px-3 py-1 bg-[var(--primary-color)] rounded">
              {currentPage}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111] w-full max-w-xl rounded-xl border border-gray-800">
            <div className="flex justify-between p-5 border-b border-gray-700">
              <h2 className="text-xl font-semibold">{selected.name}</h2>
              <button onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-300">{selected.message}</p>
              <p className="text-sm text-gray-400">
                Status: {selected.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CREATE + EDIT MODAL */}
      {showModal && (
        <TestimonialModal
          initialData={editData}
          onClose={() => setShowModal(false)}
          onSuccess={fetchTestimonials}
        />
      )}
    </div>
  );
};

export default AdminTestimonials;
