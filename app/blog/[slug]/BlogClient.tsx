"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import MiniNavbar from "@/app/components/Mininavbar";
import Footer from "@/app/components/Footer";
import PopupForm from "@/app/components/Popup";
import BlogSidebar from "@/app/components/BlogSidebar";
import heroImg from "../../assets/hero/for-blog.svg";

export default function BlogClient({
  blog,
  relatedBlogs,
}: {
  blog: any;
  relatedBlogs: any[];
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Listen for popup buttons inside blog HTML
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-open-popup='true']")) {
        setIsPopupOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className=" min-h-screen">
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

      {/* GRID BACKGROUND */}
      <div className="relative  py-16">
        <div className="relative w-11/12 md:w-5/6  mx-auto">
          {/* BLOG HEADER (GLASS) */}
          <section className=" rounded-3xl mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              {blog.title}
            </h1>

            <p className=" mt-4 text-sm md:text-base">
              By <span className=" font-semibold">{blog.author}</span> •{" "}
              {new Date(blog.datePublished).toLocaleDateString()}
            </p>
          </section>

          {/* COVER IMAGE */}
          {blog.coverImage && (
            <div className="relative w-full h-[260px] sm:h-[380px] md:h-[520px] lg:h-[650px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={blog.coverImage}
                alt={blog.coverImageAlt || blog.title}
                fill
                className="object-cover"
                priority
              />

              {/* DARK OVERLAY FOR PREMIUM LOOK */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}

          {/* BLOG CONTENT + SIDEBAR */}
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* LEFT – BLOG CONTENT */}
            <article className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>

            {/* RIGHT – SIDEBAR */}
            <aside className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl lg:sticky lg:top-32">
                <BlogSidebar relatedBlogs={relatedBlogs} />
              </div>
            </aside>
          </section>
        </div>
      </div>

      <Footer />
      <PopupForm open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      {/* MOBILE CTA BAR */}
      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-40">
        <a
          href="tel:+918368573451"
          className="w-1/2 bg-[var(--primary-color)] backdrop-blur-md border-t border-white/10 text-white py-3 flex justify-center gap-2"
        >
          <FaPhoneAlt /> Call Us
        </a>

        <a
          href="https://wa.me/+918368573451"
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/2 bg-[var(--secondary-color)] text-black py-3 flex justify-center gap-2 font-semibold"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>
    </div>
  );
}
