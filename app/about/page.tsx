"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero/about-us.svg"; // replace with your image
import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  RefreshCcw,
  KeyRound,
} from "lucide-react";
import img1 from "../assets/fresh-booking.svg";
import img2 from "../assets/resale-property.svg";
import img3 from "../assets/renting-And-leasing.svg";
import img4 from "../assets/Investment-Advisory.svg";
import MiniNavbar from "../components/Mininavbar";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CTASection from "../components/CTASection";

const features = [
  {
    title: "Fresh Booking",
    icon: Building2, // New projects 
    image: img1,
    points: [
      "Direct bookings with top developers",
      "Guidance on new launches and pre-launch opportunities",
      "Project comparisons and investment advisory",
    ],
  },
  {
    title: "Resale Services",
    icon: RefreshCcw, // Buy / sell / resale cycle
    image: img2,
    points: [
      "Buying and selling of pre-owned residential and commercial properties",
      "Accurate property valuation and market analysis",
      "End-to-end transaction support and negotiations",
    ],
  },
  {
    title: "Renting & Leasing",
    icon: KeyRound, // Keys = renting & possession
    image: img3,
    points: [
      "Residential rentals: apartments, builder floors, villas",
      "Commercial leasing: offices, retail spaces, shops",
      "Tenant screening, documentation, and agreement assistance",
    ],
  },
  {
    title: "Investment Advisory",
    icon: TrendingUp, // Growth & ROI
    image: img4,
    points: [
      "Real estate portfolio planning",
      "High-yield residential and commercial investment options",
      "Short-term and long-term investment strategies",
    ],
  },
];

export default function About() {
  const [active, setActive] = useState(0);
  const current = features[active];
  const Icon = current.icon;

  const prev = () => setActive((p) => (p === 0 ? features.length - 1 : p - 1));
  const next = () => setActive((p) => (p === features.length - 1 ? 0 : p + 1));
  return (
    <>
      <MiniNavbar />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src={heroImg}
          alt="About Us"
          fill
          priority
          className="object-cover"
        />

        {/* DARK OVERLAY (OPTIONAL – improves contrast) */}
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                About
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">About</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT INTRO SECTION ================= */}
      <section className=" bg-[var(--secondary-bg)] relative py-16  overflow-hidden">
        <div className="relative w-11/12 md:w-5/6 mx-auto">
          {/* ===== MOBILE / TABLET SIMPLE LAYOUT ===== */}
          <div className="block lg:hidden space-y-8">
            <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
              Who we are
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
              Trusted Real Estate Consultants with Over 15 Years of Market
              Experience
            </h2>

            <p className="text-[var(--text-light)] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              ipsam eligendi molestias deleniti facilis voluptatem ipsum ullam
              placeat nesciunt atque laudantium aliquid voluptatibus dolore
              rerum sapiente accusamus adipisci dolor iste voluptates, laborum
              velit. Iure, sunt corrupti.
            </p>

            <p className="text-[var(--text-light)] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              odio voluptatibus officia provident molestiae at magni corporis et
              ratione dignissimos, unde nostrum alias quas consequuntur aliquid
              inventore perspiciatis. Unde quisquam fugit quae beatae
              doloremque. Hic, culpa quod. Magnam, totam quaerat?
            </p>
          </div>

          {/* ===== DESKTOP OFFSET PANEL LAYOUT ===== */}
          <div className="hidden lg:block relative">
            {/* BIG RIGHT PANEL */}
            <div className="relative ml-auto w-[58%] border border-[var(--primary-bg)]  py-12 px-16">
              <div className="max-w-xl ml-auto space-y-6 text-[var(--text-light)] leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequatur sequi odio vel dicta, accusamus, repudiandae
                  possimus quis deleniti commodi ipsum explicabo sit mollitia
                  omnis molestias? Quia, est similique nesciunt molestias libero
                  nam magnam accusamus voluptatem temporibus?
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Deleniti excepturi temporibus consequatur iste, labore
                  explicabo nam eum vel. Repudiandae reprehenderit sequi alias
                  doloremque nisi! Dicta sit, fugiat fugit neque voluptates a
                  praesentium cumque vero quisquam nisi non esse, corrupti
                  maiores.
                </p>

                {/* HIGHLIGHTS */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  {[
                    "15+ years of real estate expertise",
                    "Residential & commercial advisory",
                    "Fresh bookings, resale & leasing",
                    "Transparent & client-first approach",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[var(--primary-color)] rounded-full" />
                      <p className="text-sm text-[var(--text-light)] font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SMALL LEFT PANEL (VERTICALLY CENTERED) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[45%] bg-[var(--primary-bg)] px-14 py-12 shadow-sm">
              <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                Who we are
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-heading text-white">
                Lorem ipsum, dolor sit amet consectetur.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--secondary-bg)] py-12 ">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
            Our Core Values
          </p>

          <h2 className="mt-4 mb-10 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
            Principles That Guide Every Client Relationship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                desc: "Transparent dealings and honest guidance in every transaction.",
              },
              {
                title: "Commitment",
                desc: "Dedicated service backed by over 15 years of real estate expertise.",
              },
              {
                title: "Customer First",
                desc: "Solutions carefully tailored around client needs and long-term goals.",
              },
              {
                title: "Excellence",
                desc: "High standards in service delivery, advisory, and market knowledge.",
              },
              {
                title: "Reliability",
                desc: "Long-term relationships built on trust, consistency, and results.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className=" p-6 border border-[var(--primary-bg)] hover:shadow-md transition"
              >
                <h4 className="font-heading text-lg text-[var(--primary-color)] mb-2">
                  {item.title}
                </h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="max-w-2xl mb-10">
            <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
              Our Process
            </p>

            <h2 className="mt-4 mb-10 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
              A Thoughtful Approach to Every Transaction
            </h2>

            <p className="text-[var(--text-muted)] leading-relaxed">
              At Crownpoint Estates, we follow a structured yet flexible process
              designed to deliver clarity, confidence, and exceptional outcomes
              — whether you are buying, selling, or investing.
            </p>
          </div>

          {/* PROCESS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {[
              {
                step: "01",
                title: "Understanding Your Vision",
                desc: "We begin by listening carefully to your goals, preferences, and long-term plans to ensure complete alignment.",
              },
              {
                step: "02",
                title: "Curated Property Selection",
                desc: "Based on your requirements, we shortlist opportunities that truly match your lifestyle, budget, and expectations.",
              },
              {
                step: "03",
                title: "Market Insight & Advisory",
                desc: "Our experts provide clear guidance backed by deep market knowledge, helping you make informed decisions.",
              },
              {
                step: "04",
                title: "Negotiation & Execution",
                desc: "We manage negotiations, documentation, and coordination with precision to ensure a smooth transaction.",
              },
              {
                step: "05",
                title: "Relationship Beyond Closure",
                desc: "Our engagement does not end at possession — we continue to support you as a trusted real estate partner.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
    group
    relative
    border border-[var(--border-color)]
    rounded-2xl
    p-6
    bg-[var(--secondary-bg)]
    transition-all duration-300
    hover:bg-[var(--hover-bg)]
  "
              >
                {/* STEP NUMBER */}
                <span
                  className="
      block font-heading text-4xl mb-4
      text-[var(--primary-color)]
      transition-colors duration-300
      group-hover:text-white
    "
                >
                  {item.step}
                </span>

                {/* TITLE */}
                <h4
                  className="
      font-heading text-lg mb-3
      text-[var(--text-light)]
      transition-colors duration-300
      group-hover:text-white
    "
                >
                  {item.title}
                </h4>

                {/* DESCRIPTION */}
                <p
                  className="
      text-sm leading-relaxed
      text-[var(--text-muted)]
      transition-colors duration-300
      group-hover:text-white/80
    "
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </>
  );
}
