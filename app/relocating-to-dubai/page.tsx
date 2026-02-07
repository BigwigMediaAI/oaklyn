"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/about/about dubai.webp";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";

const RelocatingToDubai = () => {
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
            alt="Buyer Guide"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-11/12 md:w-5/6 mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Relocating To Dubai
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white"> Relocating To Dubai</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= RELOCATION INTRO ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <span
              data-aos="fade-up"
              className="inline-block mb-4 text-sm tracking-widest text-[var(--primary-color)] uppercase"
            >
              Start a New Chapter
            </span>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            >
              Your Complete Guide to Relocating to Dubai
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-3xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed"
            >
              Relocating to Dubai opens the door to a world of opportunity,
              safety, and lifestyle excellence. From career growth and business
              prospects to world-class living standards, Dubai attracts
              individuals and families from across the globe.
            </p>
          </div>
        </section>

        {/* ================= WHY DUBAI ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold  mb-4">
                Why People Choose Dubai
              </h2>
              <p className=" max-w-2xl mx-auto">
                A city that combines opportunity, security, and global
                connectivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Career & Business Opportunities",
                  desc: "Dubai is a global hub for finance, trade, technology, and entrepreneurship.",
                },
                {
                  title: "Tax-Free Income",
                  desc: "Enjoy tax-free salaries and business earnings, allowing greater financial growth.",
                },
                {
                  title: "Safe & Stable Environment",
                  desc: "Consistently ranked among the safest cities in the world.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-[var(--secondary-bg)] p-8 rounded-2xl border border-[var(--border-color)] shadow-lg"
                >
                  <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LIVING IN DUBAI ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Living in Dubai
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Everything you need to know about life in Dubai.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {[
                {
                  title: "Housing & Communities",
                  desc: "From luxury apartments to family-friendly communities, Dubai offers diverse housing options.",
                },
                {
                  title: "Education & Healthcare",
                  desc: "International schools and world-class healthcare facilities ensure peace of mind.",
                },
                {
                  title: "Lifestyle & Culture",
                  desc: "A vibrant mix of global cultures, fine dining, entertainment, and outdoor living.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="p-6"
                >
                  <h3 className="font-heading text-2xl font-semibold text-[var(--primary-color)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW WE HELP ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-bold  mb-6"
            >
              How We Support Your Relocation
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className=" max-w-2xl mx-auto mb-12"
            >
              Our team provides end-to-end assistance to make your transition to
              Dubai smooth and stress-free.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Property Selection & Guidance",
                "Local Market & Lifestyle Advice",
                "Ongoing Support After You Move",
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="bg-[var(--primary-bg)]/5 border border-white/10 rounded-xl p-6 "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default RelocatingToDubai;
