"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/about/whyDubai.webp";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";

const WhyDubai = () => {
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
        </section>

        {/* ================= INTRO ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <span
              data-aos="fade-up"
              className="inline-block mb-4 text-sm tracking-widest text-[var(--primary-color)] uppercase"
            >
              Global Investment Hub
            </span>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            >
              Where Visionary Investors Build the Future
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-3xl mx-auto text-[var(--text-muted)] leading-relaxed text-lg"
            >
              Dubai has transformed itself into one of the world’s most powerful
              investment destinations. With progressive government policies,
              tax-free income, and a booming real estate market, the city offers
              unmatched opportunities for investors seeking stability, growth,
              and global exposure.
            </p>
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold  mb-4">
                Investment Advantages That Matter
              </h2>
              <p className=" max-w-2xl mx-auto">
                Dubai offers a rare combination of financial freedom, global
                connectivity, and long-term growth potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card */}
              {[
                {
                  title: "Tax-Free Returns",
                  desc: "No income tax, no capital gains tax, and no property tax — allowing investors to retain maximum profits.",
                },
                {
                  title: "High Rental Yields",
                  desc: "Consistently ranked among the top cities globally for rental returns, especially in prime locations.",
                },
                {
                  title: "Future-Ready Infrastructure",
                  desc: "Smart cities, iconic developments, and world-class connectivity drive sustained property demand.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-[var(--secondary-bg)] p-8 rounded-2xl border border-[var(--border-color)] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-1 w-12 bg-[var(--primary-color)] mb-6 rounded-full" />

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

        {/* ================= INVESTOR CONFIDENCE ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Why Global Investors Choose Dubai
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Trusted by millions of investors worldwide, Dubai continues to
                set benchmarks in safety, transparency, and growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {[
                {
                  title: "Strategic Location",
                  desc: "Connecting Europe, Asia, and Africa within an 8-hour flight radius.",
                },
                {
                  title: "Investor Protection",
                  desc: "Strong legal framework and transparent regulations safeguard investments.",
                },
                {
                  title: "Economic Stability",
                  desc: "A diversified economy backed by visionary leadership and long-term planning.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="p-6"
                >
                  <h4 className="font-heading text-2xl font-semibold text-[var(--primary-color)] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
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

export default WhyDubai;
