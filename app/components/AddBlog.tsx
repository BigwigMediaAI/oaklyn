"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ImageIcon, X } from "lucide-react";
import "quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string;
  coverImage?: string;
  coverImageAlt?: string;
}

const AddBlog = ({
  onClose,
  onSuccess,
  existingBlog = null,
}: {
  onClose: () => void;
  onSuccess: () => void;
  existingBlog?: BlogPost | null;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    coverImageAlt: "",
    coverImage: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog.tags || "",
        coverImageAlt: existingBlog.coverImageAlt || "",
        coverImage: null,
      });
    }
  }, [existingBlog]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, false] }],
    ["link"],
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "title" && !existingBlog) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      setFormData((p) => ({ ...p, title: value, slug: autoSlug }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setFormData((p) => ({ ...p, coverImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const blogData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) blogData.append(key, value as any);
      });

      const res = await fetch(
        existingBlog
          ? `${process.env.NEXT_PUBLIC_API_BASE}/blog/${existingBlog.slug}`
          : `${process.env.NEXT_PUBLIC_API_BASE}/blog/add`,
        {
          method: existingBlog ? "PUT" : "POST",
          body: blogData,
        },
      );

      if (!res.ok) throw new Error("Failed");

      alert(existingBlog ? "Blog updated" : "Blog added");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-[#0b121a] text-white w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-[95vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {existingBlog ? "Edit Blog" : "Create New Blog"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-8"
        >
          {/* BASIC INFO */}
          <section className="space-y-4">
            <h3 className="text-sm uppercase text-gray-400 tracking-wide">
              Basic Information
            </h3>

            <input
              name="title"
              placeholder="Blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            <input
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            <textarea
              name="excerpt"
              placeholder="Meta description"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3"
              required
            />
          </section>

          {/* CONTENT */}
          <section className="space-y-3">
            <h3 className="text-sm uppercase text-gray-400 tracking-wide">
              Blog Content
            </h3>

            <div className="border border-gray-700 rounded-xl p-3 bg-[#111]">
              <ReactQuill
                theme="bubble"
                value={formData.content}
                onChange={(v) => setFormData((p) => ({ ...p, content: v }))}
                modules={{ toolbar: toolbarOptions }}
                className="min-h-[220px]"
              />
            </div>
          </section>

          {/* SEO */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            <input
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3"
            />

            <input
              name="coverImageAlt"
              placeholder="Cover image alt text (SEO)"
              value={formData.coverImageAlt}
              onChange={handleChange}
              className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 md:col-span-2"
            />
          </section>

          {/* IMAGE */}
          <section>
            <label className="flex items-center gap-2 text-gray-400 mb-2">
              <ImageIcon size={18} /> Cover Image
            </label>

            {preview ? (
              <img
                src={preview}
                className="rounded-xl mb-3 max-h-48 object-cover"
              />
            ) : null}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!existingBlog}
            />
          </section>
        </form>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-[#0b121a] border-t border-gray-700 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting
              ? existingBlog
                ? "Updating..."
                : "Publishing..."
              : existingBlog
                ? "Update Blog"
                : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
