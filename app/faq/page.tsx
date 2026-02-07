"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/about/about dubai.webp";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";

interface AccordionItemProps {
  question: string;
  answer: string;
  delay?: number;
}

const Faq = () => {
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
            alt="FAQ"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-11/12 md:w-5/6 mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                FAQ
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">FAQ</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="bg-[var(--secondary-bg)] py-20">
          <div className="w-11/12 md:w-4/5 mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span
                data-aos="fade-up"
                className="inline-block mb-4 text-sm tracking-widest text-[var(--primary-color)] uppercase"
              >
                Need Help?
              </span>

              <h2
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4"
              >
                Frequently Asked Questions
              </h2>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-[var(--text-muted)] max-w-2xl mx-auto"
              >
                Answers to the most common questions about buying, selling, and
                relocating to Dubai.
              </p>
            </div>

            {/* Accordion */}
            <div className="space-y-5 max-w-3xl mx-auto">
              {[
                {
                  q: "Can foreigners buy property in Dubai?",
                  a: "Yes, international buyers can purchase freehold properties in designated areas across Dubai with full ownership rights.",
                },
                {
                  q: "Is Dubai a safe place to invest in real estate?",
                  a: "Dubai has a highly regulated real estate market, strong legal frameworks, and is consistently ranked among the safest cities globally.",
                },
                {
                  q: "Are there any property taxes in Dubai?",
                  a: "Dubai does not charge annual property taxes or capital gains tax, making it highly attractive for investors.",
                },
                {
                  q: "What is the process of buying property in Dubai?",
                  a: "The process includes selecting a property, making an offer, signing an agreement, paying a deposit, and transferring ownership at the Dubai Land Department.",
                },
                {
                  q: "Can buying property help me get residency in Dubai?",
                  a: "Yes, property investment may qualify you for residency options such as investor or long-term visas, subject to eligibility criteria.",
                },
                {
                  q: "Do you assist with relocation and after-sales support?",
                  a: "Absolutely. We provide end-to-end support including property guidance, relocation advice, and ongoing assistance after purchase.",
                },
              ].map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.q}
                  answer={item.a}
                  delay={index * 100}
                />
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

export default Faq;

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  delay = 0,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="border border-[var(--border-color)] rounded-xl overflow-hidden "
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-6 py-4 text-left transition hover:bg-[var(--primary-color)]/60"
      >
        <span className="font-medium text-[var(--text-primary)]">
          {question}
        </span>

        <span
          className={`transform text-2xl transition-transform duration-300 text-[var(--primary-color)] ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* Divider */}
          <div className=" h-px bg-[var(--border-color)]" />

          {/* Answer */}
          <div className="px-6 py-4 text-[var(--text-muted)] leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};
