"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/about/sellerguide_image-resize.webp";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";

const SellerGuide = () => {
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
                Seller’s Guide
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Seller’s Guide</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= SELLER INTRO ================= */}
        <section className="bg-[var(--secondary-bg)] py-20">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <span
              data-aos="fade-up"
              className="inline-block mb-4 text-sm tracking-widest text-[var(--primary-color)] uppercase"
            >
              Sell With Confidence
            </span>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            >
              A Clear & Strategic Guide to Selling Property in Dubai
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-3xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed"
            >
              Selling property in Dubai is a structured and transparent process.
              With the right pricing strategy, professional marketing, and
              expert guidance, you can achieve the best possible value while
              ensuring a smooth and secure transaction.
            </p>
          </div>
        </section>

        {/* ================= SELLING PROCESS ================= */}
        <section className="bg-[var(--primary-bg)] py-20">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Step-by-Step Selling Process
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                A structured approach designed to maximize value and minimize
                stress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Property Evaluation",
                  desc: "We assess your property based on market trends, location, and demand to determine optimal pricing.",
                },
                {
                  step: "02",
                  title: "Listing & Marketing",
                  desc: "Your property is professionally marketed across digital platforms and our investor network.",
                },
                {
                  step: "03",
                  title: "Buyer Screening",
                  desc: "We qualify potential buyers to ensure serious interest and smooth negotiations.",
                },
                {
                  step: "04",
                  title: "Offer & Negotiation",
                  desc: "We negotiate on your behalf to secure the best possible price and terms.",
                },
                {
                  step: "05",
                  title: "Sales Agreement",
                  desc: "A Memorandum of Understanding (MOU) is signed outlining agreed terms.",
                },
                {
                  step: "06",
                  title: "Ownership Transfer",
                  desc: "Final transfer is completed at the Dubai Land Department.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-[var(--secondary-bg)] p-8 rounded-2xl border border-[var(--border-color)] shadow-lg"
                >
                  <div className="text-[var(--primary-color)] font-heading text-4xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-3">
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

        {/* ================= MAXIMIZE VALUE ================= */}
        <section className="bg-[var(--secondary-bg)] py-20">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div data-aos="fade-right">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                How to Maximize Your Property Value
              </h2>

              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Achieving the best price requires more than just listing your
                property. Strategic presentation, timing, and professional
                negotiation play a crucial role.
              </p>

              <p className="text-[var(--text-muted)] leading-relaxed">
                Our experts help position your property to attract serious
                buyers and premium offers.
              </p>
            </div>

            <div
              data-aos="fade-left"
              className="bg-[var(--primary-bg)] p-10 rounded-2xl border border-[var(--border-color)]"
            >
              <ul className="space-y-5 text-white/80">
                {[
                  "Accurate market-driven pricing strategy",
                  "Professional photography and marketing",
                  "Targeted exposure to qualified buyers",
                  "Expert negotiation and deal structuring",
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="h-2 w-2 mt-2 rounded-full bg-[var(--primary-color)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= WHY SELL WITH US ================= */}
        <section className="bg-gradient-to-b from-[var(--primary-bg)] to-[#142a1e] py-20">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Why Sell With Us
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-white/70 max-w-2xl mx-auto mb-12"
            >
              We combine local expertise, data-driven strategies, and
              personalized service to deliver exceptional results for sellers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Accurate Property Valuation",
                "Strong Buyer Network",
                "End-to-End Sales Support",
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

export default SellerGuide;
