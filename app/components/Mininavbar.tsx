"use client";

import {
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { BiMobile } from "react-icons/bi";

export default function MiniNavbar() {
  return (
    <div className="hidden md:block w-full  text-sm">
      <div className="w-11/12 mx-auto flex items-center justify-between py-3">
        {/* LEFT — LOCATION | PHONE */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>oxford tower, 607, 6th floor, business bay</span>
          </div>

          {/* DIVIDER */}
          <span className="mx-4 h-4 w-px bg-white/30" />

          <div className="flex items-center gap-2">
            <BiMobile size={14} />
            <span>+971 585835230</span>
          </div>
          <span className="mx-4 h-4 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>042863789</span>
          </div>
        </div>

        {/* RIGHT — EMAIL | SOCIALS */}
        <div className="flex items-center">
          {/* EMAIL */}
          <Link
            href="mailto:sales@oaklynrealty.ae"
            className="flex items-center gap-2 hover:text-[var(--primary-color)] transition"
          >
            <Mail size={14} />
            <span>sales@oaklynrealty.ae</span>
          </Link>

          {/* DIVIDER */}
          <span className="mx-4 h-4 w-px bg-white/30" />

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </Link>

            <Link
              href="#"
              className="hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </Link>

            <Link
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="#"
              className="hover:text-red-500 transition"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
