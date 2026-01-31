"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../assets/4.png";
import { usePathname } from "next/navigation";
import ButtonFill from "./Button";
import PopupForm from "./Popup";
import ThemeSliderToggle from "./Theme-toggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobilePropOpen, setMobilePropOpen] = useState(false);
  const pathname = usePathname();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed left-0 w-full z-40 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[var(--primary-bg)] top-0 text-[var(--text-light)] border-black/10 shadow-lg"
            : "bg-transparent top-0 md:top-10 text-white border-white/30"
        }`}
      >
        <nav className="relative w-11/12 mx-auto flex items-center justify-between text-white py-3">
          {/* LEFT — LOGO */}
          <Link href="/home" className="flex items-center">
            <Image src={logo} alt="Logo" width={80} height={80} priority />
          </Link>

          {/* CENTER — MENU */}
          <ul
            className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-medium ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            {[
              { name: "Home", link: "/home" },
              { name: "About", link: "/about" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`pb-1 transition-all duration-300 ${
                    pathname === item.link
                      ? "border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]"
                      : "hover:text-[var(--primary-color)]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* PROPERTIES DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <Link
                href="/properties"
                className="flex items-center gap-1 py-10 transition hover:text-[var(--primary-color)]"
              >
                Properties <ChevronDown size={16} />
              </Link>

              {productOpen && (
                <div className="absolute top-full left-0 bg-white w-52 border border-white/10 shadow-xl">
                  <Link
                    href="/buy-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Buy Property
                  </Link>
                  <Link
                    href="/sell-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Sell Property
                  </Link>
                  <Link
                    href="/rent-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Rent Property
                  </Link>
                  <Link
                    href="/lease-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Lease Property
                  </Link>
                </div>
              )}
            </li>

            {[
              { name: "Projects", link: "/projects" },
              { name: "Blogs", link: "/blog" },
              { name: "Contact", link: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`pb-1 transition ${
                    pathname === item.link
                      ? "border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]"
                      : scrolled
                        ? "hover:text-[var(--primary-color)]"
                        : "hover:text-[var(--primary-color)]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT — PHONE */}
          <div className="hidden lg:flex gap-5 items-center">
            <ThemeSliderToggle />
            {/* GET IN TOUCH BUTTON */}
            <ButtonFill
              onClick={() => setOpenForm(true)}
              text="Get in touch"
              className="h-12 rounded-xl text-base"
            />
          </div>
          <PopupForm open={openForm} onClose={() => setOpenForm(false)} />

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center gap-4 z-[60]">
            {/* THEME TOGGLE (MOBILE) */}
            <ThemeSliderToggle />

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(!open)}
              className={scrolled ? "text-white" : "text-white"}
            >
              {open ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </nav>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <aside
          className={`absolute right-0 top-0 h-full w-80 md:w-[50%] bg-[var(--primary-bg)] text-white transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4"
          >
            <X size={26} />
          </button>

          {/* MENU CONTENT */}
          <nav className="mt-16 px-6 flex flex-col gap-6 text-lg font-medium">
            <Link href="/home" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            {/* PROPERTIES (ACCORDION) */}
            <button
              onClick={() => setMobilePropOpen(!mobilePropOpen)}
              className="flex items-center justify-between"
            >
              Properties <ChevronDown size={18} />
            </button>

            {mobilePropOpen && (
              <div className="ml-4 flex flex-col gap-4 text-base text-gray-300">
                <Link href="/buy-property" onClick={() => setOpen(false)}>
                  Buy Property
                </Link>
                <Link href="/sell-property" onClick={() => setOpen(false)}>
                  Sell Property
                </Link>
                <Link href="/rent-property" onClick={() => setOpen(false)}>
                  Rent Property
                </Link>
                <Link href="/lease-property" onClick={() => setOpen(false)}>
                  Lease Property
                </Link>
              </div>
            )}

            <Link href="/projects" onClick={() => setOpen(false)}>
              Projects
            </Link>

            <Link href="/blogs" onClick={() => setOpen(false)}>
              Blogs
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            {/* PHONE */}
            <div className="mt-8 flex items-center gap-3 text-sm border-t border-white/20 pt-4">
              <Phone size={16} />
              <span>042863789</span>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
