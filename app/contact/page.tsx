"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/hero/for-contact.svg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "../components/Footer";
import EnquiryForm from "../components/EnquiryForm";
import MiniNavbar from "../components/Mininavbar";

const Contact = () => {
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
                Contact Us
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Contacts</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section className="relative py-16 bg-[var(--secondary-bg)]">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* LEFT INFO */}
              <div data-aos="fade-up">
                {/* EYEBROW */}
                <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                  Get in Touch
                </p>

                {/* HEADING */}
                <h2 className="mt-4 mb-6 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
                  Let’s Start a Conversation
                </h2>

                {/* DESCRIPTION */}
                <p className="text-[var(--text-muted)] max-w-md mb-12 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit quos doloremque odit sit repellat.
                </p>

                {/* CONTACT DETAILS */}
                <div className="space-y-8 text-[var(--text-primary)]">
                  {/* ADDRESS */}
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-[var(--primary-color)] mt-1 shrink-0" />
                    <p className="leading-relaxed">
                      oxford tower, 607, 6th floor, business bay
                    </p>
                  </div>

                  {/* PHONE */}
                  <div className="flex gap-4 items-start">
                    <Phone className="text-[var(--primary-color)] mt-1 shrink-0" />
                    <p className="leading-relaxed">042863789</p>
                  </div>

                  {/* EMAIL */}
                  <div className="flex gap-4 items-start">
                    <Mail className="text-[var(--primary-color)] mt-1 shrink-0" />
                    <p className="leading-relaxed">
                      <a
                        href="mailto:sales@oaklynrealty.ae"
                        className="hover:text-[var(--primary-color)] transition"
                      >
                        sales@oaklynrealty.ae
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT FORM */}
              <div
                className="bg-[var(--seondary-bg)] border border-[var(--primary-bg)] p-10 md:p-14 shadow-sm"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>

                <EnquiryForm variant="default" btnText="SEND MESSAGE" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAP ================= */}
        <section className="relative h-[420px]" data-aos="zoom-in">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.7733336052597!2d55.27073687437612!3d25.177130332515098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f683509d47ed1%3A0xe12f8b0fa343d29c!2sOxford%20Tower!5e0!3m2!1sen!2sin!4v1769772930352!5m2!1sen!2sin"
            width="600"
            height="450"
            loading="lazy"
            className="w-full"
          />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
