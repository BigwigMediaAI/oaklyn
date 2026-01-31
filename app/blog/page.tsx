"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import MiniNavbar from "../components/Mininavbar";
import Footer from "../components/Footer";
import PopupForm from "../components/Popup";

import heroImg from "../assets/hero/for-blog.svg";
import Button from "../components/Button";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  datePublished: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const blogsPerPage = 9;
  const router = useRouter();

  /* ================= FETCH BLOGS ================= */

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get<BlogPost[]>(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`,
      );
      setBlogs(res.data);
      setFilteredBlogs(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setBlogs([]);
      setFilteredBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= SEARCH ================= */

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const fuse = new Fuse(blogs, {
        keys: ["title", "author"],
        threshold: 0.4,
      });
      setFilteredBlogs(fuse.search(searchTerm).map((r) => r.item));
      setCurrentPage(1);
    }
  }, [searchTerm, blogs]);

  /* ================= PAGINATION ================= */

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-[var(--secondary-bg)] text-[var(--text-primary)]">
      <MiniNavbar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[85vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Blogs"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">
              Blogs
            </h1>

            <p className="text-sm tracking-widest text-white/80 uppercase">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">›</span>
              <span>Blogs</span>
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="w-11/12 md:w-5/6 mx-auto py-14 flex flex-col gap-10">
        {/* SEARCH */}
        <div className="sticky top-[80px] z-10 bg-[var(--secondary-bg)] py-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs by title or author"
            className="
              w-full p-4 rounded-xl
              bg-transparent
              border border-[var(--border-color)]
              text-[var(--text-primary)]
              placeholder-[var(--text-muted)]
              focus:outline-none
              focus:ring-1
              focus:ring-[var(--primary-color)]
            "
          />
        </div>

        {/* ================= STATES ================= */}
        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[var(--text-muted)] text-sm tracking-wide uppercase">
              Loading insights...
            </p>
          </div>
        ) : currentBlogs.length === 0 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="max-w-xl w-full text-center border border-[var(--border-color)] rounded-2xl p-10 bg-[var(--secondary-bg)]">
              <h3 className="text-2xl font-heading mb-3 text-[var(--text-light)]">
                No Articles Found
              </h3>

              <p className="text-[var(--text-muted)] text-sm mb-6">
                We couldn’t find any articles matching your search. Our experts
                are always available to guide you with trusted real estate
                insights.
              </p>

              <Button
                onClick={() => setIsPopupOpen(true)}
                text="Speak with an Expert"
              />
            </div>
          </div>
        ) : (
          <>
            {/* ================= BLOG GRID ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="
                    group
                    rounded-2xl overflow-hidden
                    border border-[var(--border-color)]
                    bg-[var(--secondary-bg)]
                    hover:bg-[var(--hover-bg)]
                    transition-all duration-300
                  "
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
                  </div>

                  <div className="p-5 flex flex-col justify-between h-[180px]">
                    <div>
                      <h2 className="font-heading text-lg mb-2 line-clamp-2 text-[var(--text-light)] group-hover:text-[var(--primary-color)] transition-colors">
                        {blog.title}
                      </h2>

                      <p className="text-xs text-[var(--text-muted)] mb-1">
                        {new Date(blog.datePublished).toLocaleDateString()}
                      </p>

                      <p className="text-sm text-[var(--text-primary)]">
                        By <span className="font-medium">{blog.author}</span>
                      </p>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)]">
                      Read More
                      <span className="block w-6 h-px bg-[var(--primary-color)]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 flex-wrap gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 rounded-lg border font-medium transition ${
                      currentPage === idx + 1
                        ? "bg-[var(--primary-color)] text-[var(--primary-bg)] border-[var(--primary-color)]"
                        : "border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <PopupForm open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <Footer />
    </div>
  );
}
