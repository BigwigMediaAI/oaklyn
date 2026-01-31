"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/hero/about-us.svg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";
import PopupForm from "../components/Popup";
import { Building2 } from "lucide-react";

const Project = () => {
  const [openForm, setOpenForm] = useState(false);
  /* ================= AOS INIT ================= */
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <>
      <div className="relative">
        <MiniNavbar />
        <Navbar />

        {/* ================= HERO ================= */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
          <Image
            src={heroImg}
            alt="Projects"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-11/12 md:w-5/6 mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Projects
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Projects</span>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto flex justify-center">
            <div
              className="
            max-w-xl
            text-center
            border border-[var(--border-color)]
            rounded-3xl
            p-10 md:p-14
            bg-[var(--secondary-bg)]
          "
            >
              {/* ICON */}
              <div className="mx-auto mb-6 w-14 h-14 rounded-full border border-[var(--primary-color)] flex items-center justify-center">
                <Building2 className="text-[var(--primary-color)]" size={28} />
              </div>

              {/* HEADING */}
              <h2 className="font-heading text-3xl text-[var(--text-light)] mb-4">
                Projects Coming Soon
              </h2>

              {/* TEXT */}
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                We are currently curating a selection of upcoming and exclusive
                projects. Our team will be happy to assist you with early
                insights, availability, and recommendations.
              </p>

              {/* CTA */}
              <button
                onClick={() => setOpenForm(true)}
                className="
              inline-flex items-center justify-center
              px-8 h-12 rounded-xl
              bg-[var(--primary-color)]
              text-[var(--primary-bg)]
              font-body font-semibold
              hover:opacity-90 transition
            "
              >
                Contact Us
              </button>

              {/* OPTIONAL LINK */}
              <p className="mt-6 text-sm text-[var(--text-muted)]">
                Prefer WhatsApp?{" "}
                <a
                  href="https://wa.me/9711234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  Chat with us
                </a>
              </p>
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
      <PopupForm open={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
};

export default Project;
