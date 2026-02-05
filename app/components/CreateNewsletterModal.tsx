"use client";

import { X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateNewsletterModal = ({ onClose, onSuccess }: Props) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !content) {
      alert("Subject and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    files.forEach((f) => formData.append("attachments", f));

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      onSuccess();
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 py-6">
      <div className="bg-[#111] w-full max-w-2xl rounded-lg shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 shrink-0">
          <h2 className="text-lg font-semibold">Create Newsletter</h2>
          <button onClick={onClose} className="hover:text-gray-300">
            <X />
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-3 py-2"
          />

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Newsletter Content
            </label>

            <div className="bg-black text-white rounded border border-gray-700">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write newsletter content here..."
                className="newsletter-editor"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }], // 🎨 color tools
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          <input
            type="file"
            multiple
            onChange={(e) =>
              setFiles(e.target.files ? Array.from(e.target.files) : [])
            }
            className="text-sm"
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-[var(--primary-color)] rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Newsletter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsletterModal;
