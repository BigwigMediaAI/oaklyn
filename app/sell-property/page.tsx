"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/hero/about-us.svg";
import sell from "../assets/hero/about-us.svg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";
import SellerFAQ from "../components/SellerFaq";
import PopupForm from "../components/Popup";
import EnquiryForm from "../components/EnquiryForm";

const SellProperty = () => {
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
            alt="Contact Us"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-11/12 md:w-5/6 mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Sell Property
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Sell Property</span>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="relative z-10 w-11/12 md:w-5/6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* LEFT – CONTENT */}
              <div className="max-w-2xl">
                <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                  Sell Your Property
                </p>

                <h2 className="mt-4 mb-6 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
                  Sell with Confidence. <br />
                  Maximize Your Property Value.
                </h2>

                <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-10">
                  We combine accurate pricing, targeted marketing, and strong
                  negotiation to ensure your property is sold efficiently and at
                  the best possible value.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setOpenForm(true)}
                    className="px-8 cursor-pointer h-12 rounded-xl bg-[var(--primary-color)] text-[var(--primary-bg)] font-body font-semibold transition hover:opacity-90"
                  >
                    Get Free Property Valuation
                  </button>

                  <Link
                    href="https://wa.me/9711234567?text=Hi%20I%20want%20to%20sell%20my%20property"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <span className="px-8 h-12 flex items-center justify-center rounded-xl border border-[var(--primary-color)] text-[var(--primary-color)] font-body font-semibold transition hover:bg-[var(--hover-bg)] hover:text-white">
                      Speak with an Expert
                    </span>
                  </Link>
                </div>
              </div>

              {/* RIGHT – IMAGE */}
              <div className="relative h-[280px] sm:h-[360px] lg:h-[440px] overflow-hidden">
                <Image
                  src={sell}
                  alt="Sell Property"
                  fill
                  className="object-cover"
                  priority
                />

                {/* SUBTLE OVERLAY */}
                <div className="absolute inset-0 bg-black/20" />

                {/* GOLD BORDER ACCENT */}
                <div className="absolute inset-0 border border-[var(--primary-color)]/40  pointer-events-none" />
              </div>
            </div>
          </div>

          {/* SUBTLE GOLD ACCENT */}
          <div className="absolute bottom-0 left-0 w-40 h-[2px] bg-[var(--primary-color)] opacity-60" />
        </section>

        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            {/* HEADER */}
            <div className="max-w-2xl mb-10">
              <p className="text-xl mb-4 tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                Why Choose Us
              </p>

              <h2 className="font-heading text-4xl md:text-5xl text-[var(--text-light)] mb-6">
                A Smarter Way to Sell Your Property
              </h2>

              <p className="text-[var(--text-muted)] leading-relaxed">
                Selling a property requires more than listings — it demands the
                right pricing strategy, serious buyers, and experienced
                negotiation. That’s where we make the difference.
              </p>
            </div>

            {/* VALUE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Accurate Market Pricing",
                  desc: "We analyse real transaction data, current demand, and micro-market trends to price your property correctly from day one.",
                },
                {
                  title: "Serious Buyer Network",
                  desc: "Your property is presented only to verified buyers, investors, and corporates — ensuring quality leads and faster closure.",
                },
                {
                  title: "Strategic Marketing",
                  desc: "We position your property with the right narrative and exposure to attract buyers who are willing to pay true value.",
                },
                {
                  title: "Expert Negotiation",
                  desc: "Our advisors protect your interests and negotiate firmly to secure the best possible price and terms.",
                },
                {
                  title: "Transparent Process",
                  desc: "From site visits to documentation, you are kept informed at every stage with complete clarity and honesty.",
                },
                {
                  title: "End-to-End Support",
                  desc: "We manage coordination, paperwork, and closing formalities — allowing you to sell with complete peace of mind.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="
            group
            border border-[var(--border-color)]
            rounded-2xl
            p-6
            bg-[var(--secondary-bg)]
            transition-all duration-300
            hover:bg-[var(--hover-bg)]
          "
                >
                  <h4 className="font-heading text-lg mb-3 text-[var(--text-light)] transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-[var(--text-muted)] transition-colors duration-300 group-hover:text-white/80">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            {/* HEADER */}
            <div className="max-w-2xl mb-10">
              <p className="text-xl mb-4 tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                Our Selling Process
              </p>

              <h2 className="font-heading text-4xl md:text-5xl text-[var(--text-light)] mb-6 leading-tight">
                A Clear, Guided Path <br /> to a Successful Sale
              </h2>

              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Our approach combines structure, market insight, and careful
                execution — ensuring your property is sold efficiently and at
                the right value.
              </p>
            </div>

            {/* PROCESS WRAPPER */}
            <div className="relative">
              {/* VERTICAL LINE (MOBILE & TABLET) */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--primary-color)]/30 lg:hidden" />

              {/* HORIZONTAL LINE (DESKTOP) */}
              <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[var(--primary-color)]/30" />

              {/* STEPS */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-10">
                {[
                  {
                    step: "01",
                    title: "Property Assessment",
                    desc: "We evaluate your property using real transaction data, market demand, and location-specific insights.",
                  },
                  {
                    step: "02",
                    title: "Pricing & Positioning",
                    desc: "Your property is positioned carefully to attract serious buyers without compromising value.",
                  },
                  {
                    step: "03",
                    title: "Targeted Marketing",
                    desc: "We discreetly present your property to verified buyers, investors, and strategic partners.",
                  },
                  {
                    step: "04",
                    title: "Negotiation & Documentation",
                    desc: "Our team manages negotiations, site visits, and paperwork with full transparency.",
                  },
                  {
                    step: "05",
                    title: "Closure & Support",
                    desc: "From final agreement to handover, we ensure a smooth closing and continued assistance.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative flex lg:flex-col gap-6 lg:gap-8"
                  >
                    {/* STEP NODE */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="
                  w-10 h-10
                  lg:w-12 lg:h-12
                  rounded-full
                  bg-[var(--secondary-bg)]
                  border border-[var(--primary-color)]
                  flex items-center justify-center
                  font-heading text-sm lg:text-base
                  text-[var(--primary-color)]
                "
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* CARD */}
                    <div
                      className="
                flex-1
                border border-[var(--border-color)]
                rounded-2xl
                p-6
                bg-[var(--secondary-bg)]
                transition-all duration-300
                
              "
                    >
                      <h4 className="font-heading text-lg text-[var(--text-light)] mb-3 transition-colors ">
                        {item.title}
                      </h4>

                      <p className="text-sm leading-relaxed text-[var(--text-muted)] transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--primary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* LEFT – CONTENT */}
              <div className="max-w-xl">
                <p className="text-xl mb-4 tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                  Free Property Valuation
                </p>

                <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight">
                  Know the True Value <br /> of Your Property
                </h2>

                <p className="text-gray-200 text-lg leading-relaxed mb-10">
                  Before you sell, it’s important to understand what your
                  property is genuinely worth in today’s market. Our valuation
                  is based on real transaction data, buyer demand, and
                  micro-market insights — not guesswork.
                </p>

                {/* TRUST POINTS */}
                <ul className="space-y-4 mb-10">
                  {[
                    "Realistic, market-backed pricing (no inflated promises)",
                    "Confidential & obligation-free consultation",
                    "Backed by local expertise and recent transactions",
                  ].map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/90"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* WHATSAPP CTA */}
                <a
                  href="https://wa.me/9711234567?text=Hi%20I%20would%20like%20a%20property%20valuation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            inline-flex items-center gap-3
            text-[var(--primary-color)]
            font-body font-semibold
            hover:opacity-80 transition
          "
                >
                  Prefer WhatsApp? Speak with an expert
                  <span className="block w-8 h-px bg-[var(--primary-color)]" />
                </a>
              </div>

              {/* RIGHT – FORM */}
              <div
                className="
          bg-[var(--secondary-bg)]
          rounded-3xl
          p-8 md:p-10
          border border-[var(--border-color)]
        "
              >
                {/* FORM HEADING */}
                <h3 className="font-heading text-2xl text-[var(--text-light)] mb-2">
                  Request a Free Valuation
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-8">
                  Share a few details and our advisor will get in touch shortly.
                </p>

                {/* ENQUIRY FORM */}
                {/* IMPORTANT:
           - Pass purpose="Sell" inside your EnquiryForm
           - OR auto-select Sell internally
        */}
                <EnquiryForm
                  btnText="Request Valuation"
                  onSuccess={() => console.log("Valuation submitted")}
                />
              </div>
            </div>
          </div>
        </section>
        <SellerFAQ />
        <CTASection />
        <Footer />
      </div>
      <PopupForm open={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
};

export default SellProperty;
