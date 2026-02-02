"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";

/* ================= TYPES ================= */
interface FeaturedProperty {
  _id: string;
  title: string;
  slug: string;
  location: string;
  price: number;
  image: string;
  createdAt: string;
}

/* ================= SLUG HELPER ================= */
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function AdminFeaturedPropertyPage() {
  const [properties, setProperties] = useState<FeaturedProperty[]>([]);
  const [loading, setLoading] = useState(true); // ONLY for fetch
  const [saving, setSaving] = useState(false); // ONLY for submit

  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] =
    useState<FeaturedProperty | null>(null);

  const [isSlugManual, setIsSlugManual] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    price: "",
    image: null as File | null,
  });

  /* ================= FETCH ================= */
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/featuredProperty`,
      );
      const data = await res.json();
      setProperties(data.properties || data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /* ================= OPEN MODALS ================= */
  const openAddModal = () => {
    setEditingProperty(null);
    setIsSlugManual(false);
    setFormData({
      title: "",
      slug: "",
      location: "",
      price: "",
      image: null,
    });
    setShowModal(true);
  };

  const openEditModal = (property: FeaturedProperty) => {
    setEditingProperty(property);
    setIsSlugManual(true);
    setFormData({
      title: property.title,
      slug: property.slug,
      location: property.location,
      price: property.price.toString(),
      image: null,
    });
    setShowModal(true);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!formData.title || !formData.location || !formData.price) {
      alert("All fields are required");
      return;
    }

    setSaving(true);

    const body = new FormData();
    body.append("title", formData.title);
    body.append("slug", formData.slug);
    body.append("location", formData.location);
    body.append("price", formData.price);
    if (formData.image) body.append("image", formData.image);

    try {
      const url = editingProperty
        ? `${process.env.NEXT_PUBLIC_API_BASE}/featuredProperty/${editingProperty._id}`
        : `${process.env.NEXT_PUBLIC_API_BASE}/featuredProperty`;

      const method = editingProperty ? "PUT" : "POST";

      const res = await fetch(url, { method, body });
      if (!res.ok) throw new Error("Save failed");

      setShowModal(false);
      fetchProperties();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this featured property?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/featuredProperty/${id}`, {
      method: "DELETE",
    });
    fetchProperties();
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-700 p-6 flex justify-between">
        <h1 className="text-3xl font-bold">Featured Properties</h1>
        <button
          onClick={openAddModal}
          className="px-5 py-2 rounded-lg border hover:text-[var(--primary-color)]"
        >
          Add Property
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : properties.length === 0 ? (
          <p className="text-gray-400">No featured properties found.</p>
        ) : (
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-[#1e1e1e]">
              <tr>
                <th className="px-4 py-3 border-b text-left">Property</th>
                <th className="px-4 py-3 border-b text-left">Location</th>
                <th className="px-4 py-3 border-b text-left">Price</th>
                <th className="px-4 py-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="even:bg-[#111] hover:bg-[#222]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        className="h-12 w-20 rounded-md object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.location}</td>
                  <td className="px-4 py-3">₹{p.price} cr. Onwards</td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0f0f0f] text-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-[#111]">
              <h2 className="font-semibold">
                {editingProperty
                  ? "Edit Featured Property"
                  : "Add Featured Property"}
              </h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="p-6 space-y-4">
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                    slug: isSlugManual
                      ? prev.slug
                      : generateSlug(e.target.value),
                  }))
                }
                className="w-full p-3 bg-[#1a1a1a] border rounded-xl"
              />

              <input
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) => {
                  setIsSlugManual(true);
                  setFormData({
                    ...formData,
                    slug: generateSlug(e.target.value),
                  });
                }}
                className="w-full p-3 bg-[#1a1a1a] border rounded-xl"
              />

              <input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-3 bg-[#1a1a1a] border rounded-xl"
              />

              <input
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-3 bg-[#1a1a1a] border rounded-xl"
              />

              <input
                type="file"
                onChange={(e) =>
                  e.target.files &&
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>

            <div className="px-6 py-4 border-t border-gray-700 bg-[#111] flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-blue-600 px-6 py-2 rounded-lg disabled:opacity-60 flex items-center gap-2"
              >
                {saving && (
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {saving ? "Saving..." : "Save Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
