"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImg from "../assets/hero/buy-property.svg";

import { useEffect } from "react";

// Icons
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  IndianRupee,
  Loader,
  SlidersHorizontal,
} from "lucide-react";
import PopupForm from "../components/Popup";
import EnquiryForm from "../components/EnquiryForm";
import ButtonFill from "../components/Button";
import MiniNavbar from "../components/Mininavbar";

interface Property {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  type: string;
  purpose: "Buy" | "Sell" | "Lease";
  location: string;
  images: string[];
  price: number;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
  builder?: string;
}

// const staticLocations = [
//   "Select Location",
//   "DLF Phase 1",
//   "DLF Phase 2",
//   "DLF Phase 3",
//   "DLF Phase 4",
//   "DLF Phase 5",
//   "Sushant Lok 1",
//   "Sushant Lok 2",
//   "Sushant Lok 3",
//   "Sushant Lok 4",
//   "Sushant Lok 5",
//   "MG Road",
//   "Golf Course Road",
//   "Golf Course Ext. Road",
//   "Sector 77 Gurugram Haryana",
//   "Sector 76 Gurugram Haryana",
//   "Sector 102 Gurugram Haryana",
//   "Sector 59 Gurugram Haryana",
// ];

export default function BuyPageContent() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [bhk, setBhk] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Data fetching on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`);

        const data = await res.json();
        console.log(data);
        if (data.success) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  console.log(properties);

  /* ------------------ FILTER LOGIC ------------------ */
  //

  const filteredProperties = properties
    // ✅ ONLY BUY PROPERTIES
    .filter((property) => property.purpose === "Buy")

    // 🔍 SEARCH FILTER
    .filter((property) => {
      if (!search) return true;

      const query = search.toLowerCase();

      return (
        property.location?.toLowerCase().includes(query) ||
        property.title?.toLowerCase().includes(query) ||
        property.type?.toLowerCase().includes(query) ||
        property.builder?.toLowerCase().includes(query)
      );
    })

    // 🛏 BHK FILTER
    .filter((property) =>
      bhk
        ? property.bedrooms === bhk ||
          (bhk === "4" && Number(property.bedrooms) >= 4)
        : true,
    )

    // 💰 PRICE RANGE FILTER
    .filter((property) => {
      const price = property.price ?? 0;
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      return price >= min && price <= max;
    })

    // 🏠 TYPE + 💰 BUDGET FILTER
    .filter((property) => {
      const matchType = type ? property.type === type : true;

      const matchBudget = budget
        ? (() => {
            const price = property.price ?? 0;

            if (type === "Plot") {
              if (budget === "below-8cr") return price < 80000000;
              if (budget === "8cr-10cr")
                return price >= 80000000 && price <= 100000000;
              if (budget === "above-10cr") return price > 100000000;
            }

            if (type === "Villa") {
              if (budget === "below-10cr") return price < 100000000;
              if (budget === "10cr-12cr")
                return price >= 100000000 && price <= 120000000;
              if (budget === "12cr-14cr")
                return price >= 120000000 && price <= 140000000;
              if (budget === "above-14cr") return price > 140000000;
            }

            if (type === "Apartment" || type === "Builder Floor") {
              if (budget === "below-4cr") return price < 40000000;
              if (budget === "4cr-6cr")
                return price >= 40000000 && price <= 60000000;
              if (budget === "above-6cr") return price > 60000000;
            }

            return true;
          })()
        : true;

      return matchType && matchBudget;
    });

  useEffect(() => {
    setBudget("");
  }, [type]);

  const PageLoader = () => {
    return (
      <div className="col-span-full flex items-center justify-center min-h-75">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-gray-800" />
          <p className="text-sm text-gray-600 tracking-wide">
            Loading properties...
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <MiniNavbar />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src={heroImg}
          alt="Buy Property"
          fill
          priority
          className="object-cover"
        />

        {/* OPTIONAL OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Buy Property
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Buy Property</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-6 bg-[var(--secondary-bg)] border-b border-[var(--border-color)]">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* DESKTOP + TABLET */}
          <div className="hidden md:grid grid-cols-3 gap-4 items-center">
            {/* 🔍 SEARCH */}
            <input
              type="text"
              placeholder="Search location, project, builder"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" border border-[var(--border-color)] rounded-full px-5 py-3 bg-transparent"
            />

            {/* 🏠 TYPE */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-[var(--border-color)] rounded-full px-4 py-3 bg-[var(--secondary-bg)]"
            >
              <option value="">Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Builder Floor">Builder Floor</option>
              <option value="Plot">Plot</option>
            </select>

            {/* 🛏 BHK */}
            <select
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="border border-[var(--border-color)] rounded-full px-4 py-3 bg-[var(--secondary-bg)]"
            >
              <option value="">BHK</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>

            {/* 💰 MIN */}
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-[var(--border-color)] rounded-full px-4 py-3 bg-transparent"
            />

            {/* 💰 MAX */}
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-[var(--border-color)] rounded-full px-4 py-3 bg-transparent"
            />

            {/* 🔄 CLEAR */}
            <ButtonFill
              onClick={() => {
                setSearch("");
                setType("");
                setBhk("");
                setMinPrice("");
                setMaxPrice("");
              }}
              text="Clear"
            />
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search properties"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-[var(--border-color)] rounded-full px-5 py-3 bg-transparent"
            />

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center"
            >
              <SlidersHorizontal
                size={20}
                className="text-[var(--text-primary)]"
              />
            </button>
          </div>
        </div>
      </section>

      {/* PROPERTY LIST */}
      <section className="py-16 bg-[var(--secondary-bg)]">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* LEFT: PROPERTY GRID */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading && <PageLoader />}

            {!loading &&
              filteredProperties.length > 0 &&
              filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className="group rounded-3xl overflow-hidden bg-[var(--secondary-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-xl transition"
                >
                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property.images?.[0] || "/placeholder.jpg"}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />

                    <span className="absolute top-4 left-4 bg-[var(--primary-color)] text-black text-xs px-4 py-1 rounded-full tracking-widest">
                      {property.purpose}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] uppercase mb-1 line-clamp-1">
                      {property.title}
                    </h3>

                    <p className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-3">
                      <MapPin size={16} /> {property.location}
                    </p>

                    <div className="grid grid-cols-3 gap-3 text-xs text-[var(--text-muted)] mb-4">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1">
                          <BedDouble size={14} /> {property.bedrooms}
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath size={14} /> {property.bathrooms}
                        </div>
                      )}
                      {property.areaSqft && (
                        <div className="flex items-center gap-1">
                          <Ruler size={14} /> {property.areaSqft}
                        </div>
                      )}
                    </div>

                    <Link href={`/buy-property/${property.slug}`}>
                      <button className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-2 rounded-full tracking-widest hover:bg-[var(--primary-color)] hover:text-black transition">
                        VIEW DETAILS
                      </button>
                    </Link>
                  </div>
                </div>
              ))}

            {/* NO DATA */}
            {!loading && filteredProperties.length === 0 && (
              <div className="col-span-full text-center py-20">
                <h3 className="font-[var(--font-heading)] text-2xl mb-3">
                  No Properties Found
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-6">
                  Share your requirement and our expert will assist you.
                </p>
                <ButtonFill
                  onClick={() => setOpenPopup(true)}
                  text="Enquire Now"
                />
              </div>
            )}
          </div>

          {/* RIGHT: STICKY ENQUIRY */}
          <aside className="hidden md:col-span-2 lg:block sticky top-28 h-fit">
            <div className="border border-[var(--border-color)] px-6 py-8 rounded-2xl shadow-2xl bg-[var(--secondary-bg)]">
              {/* Heading */}
              <h3 className="font-[var(--font-heading)] text-2xl text-[var(--text-primary)] tracking-widest mb-2">
                Enquire Now
              </h3>

              {/* Sub text */}
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                Share your requirements with us and our property experts will
                help you find the best options in prime locations.
              </p>

              {/* Trust points */}
              <ul className="text-sm text-[var(--text-muted)] space-y-2 mb-6">
                <li>✔ Verified Properties</li>
                <li>✔ Local Market Experts</li>
                <li>✔ Zero Brokerage Assistance</li>
              </ul>

              {/* Actual Form */}
              <EnquiryForm />

              {/* Footer note */}
              <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
                We respect your privacy. Your information is safe with us.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />

      <Footer />

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center">
          <div className="w-full bg-[var(--secondary-bg)] rounded-t-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-[var(--font-heading)] text-xl">Filters</h3>
              <button onClick={() => setShowFilters(false)}>✕</button>
            </div>

            <div className="space-y-4">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-[var(--border-color)] rounded-xl px-4 py-3 bg-[var(--secondary-bg)]"
              >
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Plot">Plot</option>
              </select>

              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full border border-[var(--border-color)] rounded-xl px-4 py-3 bg-[var(--secondary-bg)]"
              >
                <option value="">BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 border border-[var(--border-color)] rounded-xl px-4 py-3"
                />
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 border border-[var(--border-color)] rounded-xl px-4 py-3"
                />
              </div>

              <ButtonFill
                text="Apply Filters"
                onClick={() => setShowFilters(false)}
              />

              <button
                onClick={() => {
                  setSearch("");
                  setType("");
                  setBhk("");
                  setMinPrice("");
                  setMaxPrice("");
                  setShowFilters(false);
                }}
                className="w-full text-sm text-center text-[var(--primary-color)]"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
