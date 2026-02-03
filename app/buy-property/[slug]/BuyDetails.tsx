"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import { MapPin } from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ButtonFill from "@/app/components/Button";
import BrochureLeadModal from "@/app/components/BrochureLeadModal";

import "yet-another-react-lightbox/styles.css";
import MiniNavbar from "@/app/components/Mininavbar";
import EnquiryForm from "@/app/components/EnquiryForm";
import heroimg from "@/app/assets/hero/about-us.svg";

interface Property {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqft?: number | null;
  images: string[];
  description: string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  googleMapUrl?: string;
  brochure?: string;
}

export default function BuyDetailsClient({ property }: { property: Property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [loadingLead, setLoadingLead] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    countryCode: "+91",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("brochureLeadSubmitted")) {
      setLeadSubmitted(true);
    }
  }, []);

  if (!property) {
    return <p className="text-center py-40 text-xl">Property not found</p>;
  }

  const heroImage = property.images?.[0] || "/placeholder.jpg";
  const galleryImages = property.images.slice(1);

  /* ---------------- LEAD SUBMIT ---------------- */
  const handleSubmitLead = async () => {
    if (!leadData.name || !/^\d{10}$/.test(leadData.phone)) {
      alert("Enter valid name and phone");
      return;
    }

    try {
      setLoadingLead(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/brochure-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      sessionStorage.setItem("brochureLeadSubmitted", "true");
      setLeadSubmitted(true);
      setIsLeadModalOpen(false);
      window.open(property.brochure, "_blank");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoadingLead(false);
    }
  };

  return (
    <div className="bg-[var(--secondary-bg)] text-[var(--text)]">
      <MiniNavbar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[55vh] md:h-[70vh]">
        <Image
          src={heroimg}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-11/12 md:w-5/6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {property.title}
          </h1>
          {property.location && (
            <p className="flex items-center gap-2 text-lg">
              <MapPin size={18} /> {property.location}
            </p>
          )}
        </div>
      </section>

      {/* ================= MAIN ================= */}
      {/* ================= MAIN LAYOUT ================= */}
      <section className="w-11/12 md:w-5/6 mx-auto py-16 grid md:grid-cols-5 gap-12">
        {/* ================= LEFT CONTENT ================= */}
        <div className="md:col-span-3 space-y-14">
          {/* ---------- GALLERY ---------- */}
          {galleryImages.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setPhotoIndex(i + 1);
                      setIsOpen(true);
                    }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={img}
                      alt="Property image"
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- ABOUT ---------- */}
          <section className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">About this property</h2>
            <p className="text-base md:text-lg leading-relaxed text-[var(--text-muted)]">
              {property.description}
            </p>
          </section>

          {/* ---------- HIGHLIGHTS ---------- */}
          {property.highlights?.length > 0 && (
            <section className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Key Highlights</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-full  shadow-sm"
                  >
                    <p className="text-sm leading-snug">{h}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- AMENITIES ---------- */}
          {property.featuresAmenities?.length > 0 && (
            <section className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Amenities & Features
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
                {property.featuresAmenities.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-full border border-[var(--border-color)]  hover:shadow-md transition"
                  >
                    <span className="text-sm leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- NEARBY ---------- */}
          {property.nearby?.length > 0 && (
            <section className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Nearby Places</h2>

              <div className="flex flex-wrap gap-3">
                {property.nearby.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--featured)] shadow-sm"
                  >
                    <span className="text-sm">{n}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- MAP ---------- */}
          {property.googleMapUrl && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="rounded-2xl overflow-hidden border border-[var(--border-color)]">
                <iframe
                  src={property.googleMapUrl}
                  width="100%"
                  height="450"
                  loading="lazy"
                  className="border-0"
                />
              </div>
            </section>
          )}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="md:col-span-2 sticky top-32 self-start">
          <div className=" rounded-3xl border border-[var(--border-color)] bg-[var(--secondary-bg)] shadow-xl p-8 space-y-6">
            {/* PRICE / TITLE */}
            <div>
              <h3 className="text-xl font-semibold mb-1">{property.title}</h3>
              {property.location && (
                <p className="text-sm text-[var(--text-muted)]">
                  📍 {property.location}
                </p>
              )}
              {property.price && (
                <p className="text-lg text-[var(--text-muted)]">
                  AED {property.price}
                </p>
              )}
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              {property.bedrooms && (
                <div className="p-3 rounded-xl bg-[var(--featured)]">
                  🛏 <br /> {property.bedrooms}
                </div>
              )}
              {property.bathrooms && (
                <div className="p-3 rounded-xl bg-[var(--featured)]">
                  🛁 <br /> {property.bathrooms}
                </div>
              )}
              {property.areaSqft && (
                <div className="p-3 rounded-xl bg-[var(--featured)]">
                  📐 <br /> {property.areaSqft}
                </div>
              )}
            </div>

            {/* ENQUIRY FORM */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <h4 className="text-lg font-semibold mb-3">Enquire Now</h4>

              {/* Your existing enquiry form */}
              <EnquiryForm />

              <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                We respect your privacy. No spam.
              </p>
            </div>

            {/* BROCHURE */}
            {property.brochure && (
              <ButtonFill
                text="📄 Download Brochure"
                onClick={() =>
                  leadSubmitted
                    ? window.open(property.brochure, "_blank")
                    : setIsLeadModalOpen(true)
                }
              />
            )}
          </div>
        </aside>
      </section>

      <Footer />

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={property.images.map((img) => ({ src: img }))}
          index={photoIndex}
          plugins={[Fullscreen, Slideshow]}
        />
      )}

      {/* Brochure Lead Modal */}
      <BrochureLeadModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        leadData={leadData}
        setLeadData={setLeadData}
        onSubmit={handleSubmitLead}
        loading={loadingLead}
      />
    </div>
  );
}
