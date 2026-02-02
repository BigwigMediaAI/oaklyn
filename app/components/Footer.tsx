"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import footerBg from "../assets/footer-bg.jpg";

export default function Footer() {
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
        <div className="w-11/12 md:w-5/6 mx-auto py-16 border-b border-white/20">
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
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1" />
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                oxford tower, 607, 6th floor, business bay
              </p>
            </div>

            {/* SOCIAL REMOVED */}
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
