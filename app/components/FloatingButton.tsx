"use client";

import { Phone } from "lucide-react";
import ScrollToTopButton from "./ScrollToTop";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function FloatingActions() {
  const pathname = usePathname();

  // ❌ Hide floating actions on home page only
  if (pathname === "/") return null;

  return (
    <>
      {/* ================= DESKTOP FLOATING ACTIONS ================= */}
      <div className="hidden md:flex fixed right-6 bottom-20 z-50 flex-col gap-4">
        {/* WhatsApp */}
        <a
          href="https://wa.me/971501234567" // replace number
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          {/* Glow */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-xl opacity-0 transition group-hover:opacity-100" />
          <FaWhatsapp className="relative z-10 text-white" size={22} />
        </a>

        {/* Scroll to top */}
        <ScrollToTopButton />
      </div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full md:hidden">
        {/* Call */}
        <a
          href="tel:+971123456" // replace number
          className="flex w-1/2 items-center justify-center gap-2 bg-[var(--primary-bg)] py-4 text-sm font-medium text-white border-t border-white/10"
        >
          <Phone size={18} />
          Call Now
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/971123456"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-1/2 items-center justify-center gap-2 bg-[var(--primary-color)] py-4 text-sm font-semibold text-black"
        >
          <FaWhatsapp size={18} />
          WhatsApp
        </a>
      </div>
    </>
  );
}
