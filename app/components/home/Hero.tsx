"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../../assets/hero/hero4.jpg";
import hero2 from "../../assets/hero/hero5.jpg";
import hero3 from "../../assets/hero/hero6.jpg";
import PopupForm from "../Popup";

const slides = [
  {
    image: hero1,
    tag: "Premium Real Estate",
    title: "Spaces That Reflect\nYour Way of Living",
    desc: "Curated homes, prime plots, and investment opportunities in high-growth locations.",
  },
  {
    image: hero2,
    tag: "Luxury Living",
    title: "Designed for Comfort\nBuilt for the Future",
    desc: "Thoughtfully planned residences offering lifestyle, security, and long-term value.",
  },
  {
    image: hero3,
    tag: "Trusted Developments",
    title: "Invest with Confidence\nLive with Pride",
    desc: "A portfolio of verified projects across the most promising destinations.",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const nextSlide = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setAnimating(false), 1200);
  }, [animating]);

  const prevSlide = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 1200);
  }, [animating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      <section className="relative h-[70vh] lg:h-screen w-full overflow-hidden">
        {/* IMAGE STACK */}
        <div className="absolute inset-0">
          <Image
            src={slides[index].image}
            alt="Shivaksh Real Estate"
            fill
            priority
            className="object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/25 backdrop-blur-[1px]" />

          {/* LIGHT SWEEP TRANSITION */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              animating ? "animate-sweep" : ""
            }`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-20 h-full flex items-center mt-10">
          <div className="w-11/12 md:w-5/6 mx-auto text-white">
            <span
              key={`tag-${index}`}
              className="inline-block mb-6 px-4 py-1 text-xs tracking-[0.35em] uppercase border border-white/40 animate-tag"
            >
              {slides[index].tag}
            </span>

            <h1
              key={`title-${index}`}
              className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight max-w-4xl animate-title delay-200"
            >
              {slides[index].title.split("\n").map((line, i) => (
                <span
                  key={i}
                  className={
                    i === 1 ? "text-[var(--primary-color)] block" : "block"
                  }
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              key={`desc-${index}`}
              className="mt-6 max-w-xl text-white/80 text-lg animate-desc delay-400"
            >
              {slides[index].desc}
            </p>

            <div
              key={`cta-${index}`}
              className="mt-10 flex gap-6 animate-cta delay-600"
            >
              <Link
                href="/projects"
                className="px-3 md:px-9 py-2  md:py-4 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold tracking-wide hover:opacity-90 transition"
              >
                View Projects
              </Link>

              <button
                onClick={() => setOpenForm(true)}
                className="cursor-pointer px-3 md:px-9 py-2  md:py-4 border border-white/60 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute md:left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30   text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition"
        >
          <ChevronLeft size={72} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute md:right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30   text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition"
        >
          <ChevronRight size={72} />
        </button>

        {/* ANIMATIONS */}
        <style jsx>{`
          /* TEXT ANIMATIONS */
          .animate-tag {
            animation: fadeIn 1s ease both;
          }

          .animate-title {
            animation: riseIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          .animate-desc {
            animation: riseIn 1.2s ease both;
          }

          .animate-cta {
            animation: riseIn 1.2s ease both;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
          .delay-600 {
            animation-delay: 0.6s;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes riseIn {
            from {
              opacity: 0;
              transform: translateY(32px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* LIGHT SWEEP */
          .animate-sweep::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              120deg,
              transparent 30%,
              rgba(255, 255, 255, 0.18),
              transparent 70%
            );
            animation: sweep 1.2s ease-in-out;
          }

          @keyframes sweep {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(100%);
            }
          }
        `}</style>
      </section>

      <section className="bg-[var(--secondary-bg)] ">
        <div className="w-11/12 md:w-5/6 mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-heading text-5xl text-[var(--primary-color)]">
                10+
              </p>
              <p className="text-xl pt-2   text-[var(--text-muted)]">
                Years of Market Experience
              </p>
            </div>

            <div>
              <p className="font-heading text-5xl text-[var(--primary-color)]">
                100%
              </p>
              <p className="text-xl  pt-2 font-body text-[var(--text-muted)]">
                Verified Properties
              </p>
            </div>

            <div>
              <p className="font-heading text-5xl text-[var(--primary-color)]">
                25+
              </p>
              <p className="text-xl  pt-2 font-body text-[var(--text-muted)]">
                Prime Locations Covered
              </p>
            </div>

            <div>
              <p className="font-heading text-5xl text-[var(--primary-color)]">
                24/7
              </p>
              <p className="text-xl pt-2 font-body text-[var(--text-muted)]">
                Buying & Investment Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT — CONTENT */}
            <div className="max-w-xl">
              <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                Who We Are
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
                A Real Estate Advisory Built on Trust
              </h2>

              <div className="mt-8 space-y-5">
                <p className="text-[var(--text-muted)] text-base font-body leading-relaxed">
                  We are a boutique real estate advisory focused on premium
                  residential, commercial, and investment properties. Our
                  approach is simple — honest guidance, verified listings, and
                  long-term value for our clients.
                </p>

                <p className="text-[var(--text-muted)] text-base  font-body leading-relaxed">
                  With deep market knowledge and hands-on experience, we help
                  buyers, investors, and families make confident property
                  decisions without pressure or confusion.
                </p>
              </div>
            </div>

            {/* RIGHT — PHILOSOPHY CARD */}
            <div className="relative p-12 bg-[#1F3D2B] shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl">
              {/* Accent line */}
              <span className="absolute left-0 top-8 h-16 w-1 bg-[#E0B15C] rounded"></span>

              <h3 className="text-2xl font-bold font-heading tracking-widest text-white mb-8">
                Our Philosophy
              </h3>

              <ul className="space-y-6">
                {[
                  "Transparency over transactions",
                  "Verified properties only",
                  "Client-first advisory approach",
                  "Long-term value, not short-term sales",
                ].map((item, index) => (
                  <li key={index} className="flex gap-4  text-white">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#E0B15C]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PopupForm open={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
}
