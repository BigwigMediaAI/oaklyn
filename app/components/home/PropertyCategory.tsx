"use client";

import Image from "next/image";
import Link from "next/link";

import img1 from "../../assets/hero/aboutpage.jpg";
import img2 from "../../assets/hero/aboutpage.jpg";
import img3 from "../../assets/hero/aboutpage.jpg";
import img4 from "../../assets/hero/aboutpage.jpg";
import img5 from "../../assets/hero/aboutpage.jpg";
import img6 from "../../assets/hero/aboutpage.jpg";
import { useState } from "react";

const categories = [
  {
    title: "Luxury Villas & Independent Homes",
    desc: "Bespoke villas and private residences for premium living.",
    image: img1,
    link: "/properties/luxury",
  },
  {
    title: "Apartments & Builder Floors",
    desc: "Modern homes in prime and emerging locations.",
    image: img2,
    link: "/properties/apartments",
  },
  {
    title: "Commercial Spaces",
    desc: "Retail, office, and business-centric developments.",
    image: img3,
    link: "/properties/commercial",
  },
  {
    title: "Plots & Land",
    desc: "Residential and investment-ready land parcels.",
    image: img4,
    link: "/properties/plots",
  },
  {
    title: "Rentals & Leasing",
    desc: "Residential and commercial rental options.",
    image: img5,
    link: "/properties/rentals",
  },
  {
    title: "Investment Properties",
    desc: "High-growth assets with long-term ROI potential.",
    image: img6,
    link: "/properties/investment",
  },
];

const properties = [
  {
    title: "Luxury Builder Floor",
    location: "DLF Phase 2, Gurgaon",
    price: "₹3.2 Cr Onwards",
    image: img1,
    link: "/properties/luxury-builder-floor",
  },
  {
    title: "Premium 3 BHK Apartment",
    location: "Golf Course Road",
    price: "₹2.1 Cr Onwards",
    image: img2,
    link: "/properties/3bhk-golf-course",
  },
  {
    title: "Independent Villa",
    location: "Sushant Lok",
    price: "₹6.5 Cr Onwards",
    image: img3,
    link: "/properties/independent-villa",
  },
  {
    title: "Commercial Office Space",
    location: "Cyber City",
    price: "₹1.8 Cr Onwards",
    image: img4,
    link: "/properties/commercial-office",
  },
];

export default function PropertyCategoriesHover() {
  const [active, setActive] = useState(0);
  return (
    <>
      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="mb-12 max-w-xl">
            <p
              className="text-xl tracking-[0.2em] uppercase
                text-[var(--primary-color)]
                font-body font-semibold"
            >
              Featured Property
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
              A Curated Selection, Not a Catalogue
            </h2>
          </div>

          {/* SPOTLIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* LIST (Mobile + Desktop) */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 lg:block lg:space-y-4 ">
              {properties.slice(0, 4).map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-4 py-3 sm:px-6 sm:py-4 border transition-all duration-300
          ${
            active === i
              ? "border-[var(--secondary-color)] bg-[var(--primary-bg)]"
              : "border-[var(--border-color)] hover:bg-[var(--primary-bg)]"
          }
        `}
                >
                  <h4
                    className={`font-heading text-sm sm:text-lg transition-colors duration-300 ${
                      active === i ? "text-white" : "text-[var(--text-light)]"
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p
                    className={`text-xs sm:text-sm transition-colors duration-300 ${
                      active === i
                        ? "text-white/80"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {item.location}
                  </p>
                </button>
              ))}

              {/* Browse link full width on mobile */}
              <Link
                href="/properties"
                className="
        col-span-2 lg:col-span-1
        inline-flex items-center gap-2 mt-2 lg:mt-4
        text-sm font-body text-[var(--primary-color)]
      "
              >
                Browse All Properties
                <span className="block w-6 h-px bg-[var(--primary-color)]" />
              </Link>
            </div>

            {/* IMAGE */}
            <div
              className="
      order-2
      lg:order-1
      lg:col-span-2
      relative
      h-[280px] sm:h-[340px] lg:h-[420px]
    "
            >
              <Image
                key={active}
                src={properties[active].image}
                alt={properties[active].title}
                fill
                className="object-cover transition-opacity duration-500"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* INFO */}
              <div className="absolute bottom-5 left-5 text-white max-w-[85%]">
                <h3 className="font-heading text-xl sm:text-2xl mb-1">
                  {properties[active].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80">
                  {properties[active].location}
                </p>

                <p className="mt-2 text-base sm:text-lg font-semibold text-[var(--primary-color)]">
                  {properties[active].price}
                </p>

                <Link
                  href={properties[active].link}
                  className="inline-flex items-center gap-3 mt-3 text-sm font-body text-[var(--primary-color)]"
                >
                  View Property
                  <span className="block w-8 h-px bg-[var(--primary-color)]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="max-w-2xl mb-14">
            <p
              className="text-xl tracking-[0.2em] uppercase
                text-[var(--primary-color)]
                font-body font-semibold"
            >
              Property Categories
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
              Explore Spaces That Define Your Lifestyle
            </h2>
          </div>

          {/* HOVER GRID */}
          <div
            className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory
    scrollbar-hide gap-4 lg:gap-px pb-4
  "
          >
            {categories.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="group relative min-w-[85%] sm:min-w-[70%] md:min-w-[55%] lg:min-w-0 h-[300px] md:h-[280px] lg:h-[260px]
   overflow-hidden snap-start
"
              >
                {/* IMAGE (hidden by default) */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover lg:opacity-0 opacity-100 lg:group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div>
                    <h3 className="font-heading text-2xl  group-hover:text-white transition-colors duration-500">
                      {item.title}
                    </h3>

                    <div
                      className="
                      mt-4 h-px w-12
                      bg-[var(--primary-color)]
                      transition-all duration-500
                      group-hover:w-20
                    "
                    />

                    <p
                      className="
                      mt-4 text-sm text-white/80
                       translate-y-4
                      lg:opacity-0 opacity-100 lg:group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-500
                      max-w-xs
                    "
                    >
                      {item.desc}
                    </p>
                  </div>

                  <span
                    className="
                    text-sm font-body tracking-wide
                    text-[var(--primary-color)]
                   lg:opacity-0 opacity-100 lg:group-hover:opacity-100
                    transition-opacity duration-500
                  "
                  >
                    View Properties →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
