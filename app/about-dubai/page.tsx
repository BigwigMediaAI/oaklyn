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

const AboutDubai = () => {
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
            alt="Contact Us"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-11/12 md:w-5/6 mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                About Dubai
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">About Dubai</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= ABOUT OVERVIEW ================= */}
        <section className="bg-[var(--secondary-bg)] py-20">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <span
              data-aos="fade-up"
              className="inline-block mb-4 text-sm tracking-widest text-[var(--primary-color)] uppercase"
            >
              The City of Possibilities
            </span>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            >
              A Global City Built on Vision, Innovation & Ambition
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-3xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed"
            >
              Dubai is one of the world’s most dynamic and forward-thinking
              cities. Rising from the desert to become a global icon, it is
              known for its modern skyline, world-class infrastructure, and
              commitment to excellence. Today, Dubai stands as a bridge between
              cultures, economies, and opportunities.
            </p>
          </div>
        </section>

        {/* ================= VISION & GROWTH ================= */}
        <section className="bg-[var(--primary-bg)] py-20">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div data-aos="fade-right">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                A City Designed for the Future
              </h2>

              <p className="text-white/80 leading-relaxed mb-4">
                Guided by visionary leadership, Dubai has consistently focused
                on long-term growth, innovation, and sustainability. Strategic
                planning, investor-friendly regulations, and smart city
                initiatives have shaped Dubai into one of the most future-ready
                cities in the world.
              </p>

              <p className="text-white/80 leading-relaxed">
                From cutting-edge architecture to digital governance and
                sustainable urban development, Dubai continues to set global
                benchmarks for progress and ambition.
              </p>
            </div>

            {/* Right */}
            <div
              data-aos="fade-left"
              className="bg-[var(--secondary-bg)] p-10 rounded-2xl border border-[var(--border-color)] shadow-xl"
            >
              <ul className="space-y-5">
                {[
                  "Strategic global trade and business hub",
                  "Strong governance and transparent regulations",
                  "Smart city and sustainability initiatives",
                  "Long-term economic diversification vision",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="h-2 w-2 mt-2 rounded-full bg-[var(--primary-color)]" />
                    <p className="text-[var(--text-muted)]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= LIFESTYLE & CULTURE ================= */}
        <section className="bg-[var(--secondary-bg)] py-20">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                An Exceptional Quality of Life
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Dubai offers a lifestyle that blends luxury, safety, culture,
                and global diversity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {[
                {
                  title: "World-Class Lifestyle",
                  desc: "Luxury residences, premium shopping, fine dining, and iconic attractions.",
                },
                {
                  title: "Safety & Stability",
                  desc: "One of the safest cities in the world with strong law enforcement.",
                },
                {
                  title: "Cultural Diversity",
                  desc: "Home to over 200 nationalities living and working in harmony.",
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

        {/* ================= DUBAI TODAY ================= */}
        <section className="bg-gradient-to-b from-[var(--primary-bg)] to-[#142a1e] py-20">
          <div className="w-11/12 md:w-5/6 mx-auto text-center">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-bold text-white mb-10"
            >
              Dubai Today
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                "Global Business & Tourism Hub",
                "Innovation-Driven Economy",
                "Luxury Real Estate Market",
                "Future-Focused Urban Planning",
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-white/90"
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

export default AboutDubai;
