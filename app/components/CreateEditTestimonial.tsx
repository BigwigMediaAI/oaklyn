"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface TestimonialData {
  _id?: string;
  name: string;
  message: string;
  image?: string;
  designation?: string;
  rating?: number;
  isActive: boolean;
}

interface Props {
  initialData?: TestimonialData | null;
  onClose: () => void;
  onSuccess: () => void;
}

const TestimonialModal = ({ initialData, onClose, onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [isActive, setIsActive] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // ================= PREFILL (EDIT MODE) =================
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setMessage(initialData.message);
      setDesignation(initialData.designation || "");
      setRating(initialData.rating ?? 5);
      setIsActive(initialData.isActive);
      setExistingImage(initialData.image || null);
    }
  }, [initialData]);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!name || !message) {
      alert("Name and message are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);
      formData.append("designation", designation);
      formData.append("rating", String(rating));
      formData.append("isActive", String(isActive));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = initialData
        ? `${process.env.NEXT_PUBLIC_API_BASE}/testimonial/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_API_BASE}/testimonial`;

      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData, // ✅ multipart/form-data
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onSuccess();
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#111] w-full max-w-xl max-h-[90vh] rounded-xl border border-gray-800 shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Testimonial" : "Create Testimonial"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <input
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2"
          />

          <input
            placeholder="Designation (optional)"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="Testimonial message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 resize-none"
          />

          {/* ⭐ RATING */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Client Image (optional)
            </label>

            {existingImage && !imageFile && (
              <img
                src={existingImage}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover mb-2"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>

          {/* ACTIVE */}
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active (visible on website)
          </label>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-[var(--primary-color)] rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
