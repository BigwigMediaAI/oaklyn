"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import footerBg from "../assets/footer-bg.jpg";
import { useState } from "react";
import { FormEvent } from "react";

interface SubscribeResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    email: string;
  };
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/subscribers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const text = await res.text();

      let data: SubscribeResponse;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setSuccess(true);
      setMessage("Thanks for subscribing! 🎉");
      setEmail("");
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error ? error.message : "Subscription failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative text-white overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={footerBg}
          alt="Footer background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* ================= GET IN TOUCH ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-10 border-b border-white/20">
          <h3 className="font-heading text-3xl mb-8">Oaklyn Real Estate</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PHONE / EMAIL */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span className="font-body">042863789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span className="font-body">sales@oaklynrealty.ae</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span className="font-body">
                  {" "}
                  Oxford tower, 607, 6th floor, business bay
                </span>
              </div>
            </div>

            {/* EMAIL SUBSCRIBER */}
            <div>
              <h4 className="font-heading text-lg mb-2">Stay in the loop ✨</h4>
              <p className="text-sm text-gray-300 mb-4">
                Get latest property updates, offers & insights directly in your
                inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md bg-transparent border border-white/30 text-white placeholder:text-gray-400 focus:outline-none focus:border-white"
                  required
                  disabled={loading}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="min-w-[110px] px-5 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-60 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>

              {message && (
                <p
                  className={`mt-3 text-sm ${
                    success ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= LINKS ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-16 border-b border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* ABOUT */}
            <div className="lg:col-span-2 lg:max-w-md">
              <h4 className="font-heading text-lg mb-4">Oaklyn Real Estate</h4>
              <p className="font-body text-sm text-gray-300 leading-relaxed text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-1">
              <h4 className="font-heading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-sm text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/project" className="hover:text-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contacts
                  </Link>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="lg:col-span-1">
              <h4 className="font-heading text-lg mb-4"> Services</h4>
              <ul className="space-y-2 font-body text-sm text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Buy Property
                  </Link>
                </li>
                <li>
                  <Link href="/sell-property" className="hover:text-white">
                    Sell Property
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Rent Property
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Lease Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-6 mb-10 md:mb-0 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>
            <p>© {new Date().getFullYear()} Oaklyn. All rights reserved.</p>
          </div>
          <div className="md:ml-48">
            <p>
              Made & Designed By{" "}
              <span className="text-white">
                <Link href="#">Bigwig Media</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
