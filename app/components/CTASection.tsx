"use client";
import Link from "next/link";
import PopupForm from "./Popup";
import { useState } from "react";

export default function CTASection() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="bg-[var(--secondary-bg)] py-16">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border border-[var(--border-color)]
            px-8 py-12 md:px-14 md:py-16
            text-center
          "
        >
          {/* SUBTLE ACCENT */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--primary-color)] to-transparent pointer-events-none" />

          {/* CONTENT */}
          <p className="relative z-10 text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body font-semibold">
            Let’s Work Together
          </p>

          <h2 className="relative z-10 mt-4 text-3xl md:text-5xl font-heading text-[var(--text-light)]">
            Find a Property That Truly Feels Like Home
          </h2>

          <p className="relative z-10 mt-4 max-w-2xl mx-auto text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Whether you are buying, selling, or investing, our team provides
            expert guidance, market insight, and a seamless experience from
            start to finish.
          </p>

          {/* ACTIONS */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setOpenForm(true)}
              className="inline-flex cursor-pointer items-center justify-center px-8 h-12 rounded-xl bg-[var(--primary-color)] text-[var(--primary-bg)] font-body font-semibold transition hover:opacity-90"
            >
              Get in Touch
            </button>

            <Link
              href="/buy-property"
              className="
                inline-flex items-center justify-center
                px-8 h-12
                rounded-xl
                border border-[var(--primary-color)]
                text-[var(--primary-color)]
                font-body font-semibold
                transition
                hover:bg-[var(--primary-color)]
                hover:text-white
              "
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
      <PopupForm open={openForm} onClose={() => setOpenForm(false)} />
    </section>
  );
}
