"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/about/buyerguide_image-resize.webp";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import CTASection from "../components/CTASection";

const BuyerGuide = () => {
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
                Buyer’s Guide
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Buyer’s Guide</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= BUYER INTRO ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <span
              data-aos="fade-up"
              className="inline-block mb-4 text-sm tracking-widest text-[var(--primary-color)] uppercase"
            >
              Your Property Journey Starts Here
            </span>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            >
              A Simple & Transparent Guide to Buying Property in Dubai
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-3xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed"
            >
              Buying property in Dubai is a secure and well-regulated process.
              Whether you are a first-time buyer or an experienced investor,
              understanding the steps involved helps you make confident and
              informed decisions.
            </p>
          </div>
        </section>

        {/* ================= BUYING PROCESS ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold  mb-4">
                Step-by-Step Buying Process
              </h2>
              <p className=" max-w-2xl mx-auto">
                A clear, structured journey from property selection to
                ownership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Choose the Right Property",
                  desc: "Select a property that aligns with your lifestyle or investment goals, budget, and preferred location.",
                },
                {
                  step: "02",
                  title: "Make an Offer",
                  desc: "Once you finalize a property, an offer is submitted and negotiated with the seller.",
                },
                {
                  step: "03",
                  title: "Sign the Agreement",
                  desc: "A Memorandum of Understanding (MOU) is signed outlining the terms and conditions.",
                },
                {
                  step: "04",
                  title: "Pay the Deposit",
                  desc: "A standard deposit is paid to secure the property, usually held by a trusted third party.",
                },
                {
                  step: "05",
                  title: "Transfer Ownership",
                  desc: "Final payment is made and ownership is transferred at the Dubai Land Department.",
                },
                {
                  step: "06",
                  title: "Receive Your Title Deed",
                  desc: "You officially become the property owner with the issuance of the title deed.",
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

        {/* ================= IMPORTANT NOTES ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div data-aos="fade-right">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                Important Things to Know Before Buying
              </h2>

              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Dubai offers one of the most buyer-friendly real estate markets
                globally, but understanding the essentials ensures a smooth
                experience.
              </p>

              <p className="text-[var(--text-muted)] leading-relaxed">
                Our experts guide you through every legal, financial, and
                administrative step so you can buy with confidence.
              </p>
            </div>

            <div
              data-aos="fade-left"
              className="bg-[var(--primary-bg)]/60 p-10 rounded-2xl border border-[var(--border-color)]"
            >
              <ul className="space-y-5 text-white/80">
                {[
                  "Freehold ownership available for international buyers",
                  "No property tax or annual ownership tax",
                  "Strong legal protection for buyers",
                  "Clear and regulated transfer process",
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

        {/* ================= WHY US ================= */}
        <section className="bg-[var(--secondary-bg)] py-16">
          <div className="w-11/12 md:w-4/5 mx-auto text-center">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-bold  mb-6"
            >
              Why Buy With Us
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className=" max-w-2xl mx-auto mb-12"
            >
              We provide expert guidance, market insights, and end-to-end
              support to ensure a seamless buying experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Trusted Market Expertise",
                "Transparent & Ethical Guidance",
                "End-to-End Buyer Support",
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

export default BuyerGuide;
