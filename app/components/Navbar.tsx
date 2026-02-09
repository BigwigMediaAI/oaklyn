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
import LanguageSelector from "./LanguageSelector";
import { BiMobileAlt } from "react-icons/bi";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

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

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };
    const loadGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    loadGoogleTranslateScript();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "top-0 text-[var(--text-light)]"
            : "top-0 md:top-10 text-white"
        }`}
      >
        {/* Glass layer */}
        {scrolled && (
          <div
            className="
      absolute inset-0
      bg-[var(--primary-bg)]/50
      backdrop-blur-2xl
      border-b border-black/10
      shadow-lg
      -z-10
    "
          />
        )}
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
              <li className="flex items-center gap-1 py-10 transition hover:text-[var(--primary-color)]">
                Properties <ChevronDown size={16} />
              </li>

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
                </div>
              )}
            </li>

            {[
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
            <div className="notranslate">
              <LanguageSelector />
            </div>
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
            <div className="notranslate">
              <LanguageSelector />
            </div>
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
              </div>
            )}

            <Link href="/blogs" onClick={() => setOpen(false)}>
              Blogs
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <div className="mt-8 flex items-center gap-3 text-sm border-t border-white/20 pt-4">
              <BiMobileAlt size={16} />
              <span>+971 585835230</span>
            </div>
            {/* PHONE */}
            <div className=" flex items-center gap-3 text-sm ">
              <Phone size={16} />
              <span>042863789</span>
            </div>
          </nav>
        </aside>
        <div id="google_translate_element" className="hidden" />
      </div>
    </>
  );
}
