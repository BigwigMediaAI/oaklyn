"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

const AdminSubscriber = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH =================
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/subscribers`,
        { cache: "no-store" },
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to fetch subscribers");
      }

      const sorted = json.data.sort(
        (a: Subscriber, b: Subscriber) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setSubscribers(sorted);
      setFilteredSubscribers(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // ================= DATE FILTER =================
  useEffect(() => {
    if (!selectedDate) {
      setFilteredSubscribers(subscribers);
      setCurrentPage(1);
      return;
    }

    const filtered = subscribers.filter((s) =>
      new Date(s.createdAt).toISOString().startsWith(selectedDate),
    );

    setFilteredSubscribers(filtered);
    setCurrentPage(1);
  }, [selectedDate, subscribers]);

  // ================= HARD DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm("This will permanently delete the subscriber. Continue?"))
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/subscribers/${id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setFilteredSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE);

  const currentSubscribers = filteredSubscribers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ================= RENDER =================
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* ================= HEADER (STICKY) ================= */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-700">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Newsletter Subscribers
          </h1>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Filter by date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* STATES */}
        {loading && <p className="text-gray-400">Loading subscribers...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && filteredSubscribers.length === 0 && (
          <p className="text-gray-400">No subscribers found.</p>
        )}

        {/* TABLE */}
        {!loading && filteredSubscribers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-sm">
              <thead className="bg-[#1e1e1e]">
                <tr>
                  <th className="px-4 py-3 text-left border-b border-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-700">
                    Subscribed At
                  </th>
                  <th className="px-4 py-3 text-left border-b border-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center border-b border-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentSubscribers.map((sub) => (
                  <tr key={sub._id} className="even:bg-[#111] hover:bg-[#222]">
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${sub.email}`}
                        className="text-cyan-400 hover:underline"
                      >
                        {sub.email}
                      </a>
                    </td>

                    <td className="px-4 py-3">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          sub.isActive
                            ? "bg-green-600/20 text-green-400"
                            : "bg-red-600/20 text-red-400"
                        }`}
                      >
                        {sub.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="text-red-400 hover:text-red-300"
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
    </div>
  );
};

export default AdminSubscriber;
