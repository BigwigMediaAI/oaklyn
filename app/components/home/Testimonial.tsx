"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/* ================= DATA ================= */

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    name: "Lorem Ipsum",
    initial: "L",
  },
  {
    id: 2,
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Dolor Sit",
    initial: "D",
  },
  {
    id: 3,
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    name: "Amet Elit",
    initial: "A",
  },
  {
    id: 4,
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Sed Tempor",
    initial: "S",
  },
  {
    id: 5,
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    name: "Perspiciatis",
    initial: "P",
  },
];

/* ================= COMPONENT ================= */

export default function TestimonialSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const toggleReadMore = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 bg-[var(--secondary-bg)] overflow-hidden">
      {/* HEADER */}
      <div className="w-11/12 md:w-5/6 mx-auto mb-14" data-aos="fade-up">
        <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-semibold">
          Testimonials
        </p>
        <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
          Trusted by Clients & Investors
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative w-11/12 md:w-5/6 mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              {/* CARD */}
              <div className="h-full min-h-[240px] bg-white p-8 shadow-lg border border-[var(--primary-color)] transition-all duration-300 flex flex-col">
                {/* TEXT */}
                <p
                  className={`text-gray-700 leading-relaxed mb-4 transition-all duration-300 ${
                    expandedId === item.id ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {item.text}
                </p>

                {/* READ MORE / LESS */}
                {item.text.length > 120 && (
                  <button
                    onClick={() => toggleReadMore(item.id)}
                    className="text-sm font-semibold text-[var(--primary-color)] hover:underline self-start mb-3"
                  >
                    {expandedId === item.id ? "Read less" : "Read more"}
                  </button>
                )}

                {/* FOOTER */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-bg)] to-[var(--primary-color)] flex items-center justify-center shadow">
                    <span className="text-white font-semibold">
                      {item.initial}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--primary-bg)]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400">Verified Client</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* LEFT ARROW */}
        <button className="testimonial-prev z-10 hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--primary-color)] shadow border border-white cursor-pointer transition">
          <ChevronLeft className="m-auto" />
        </button>

        {/* RIGHT ARROW */}
        <button className="testimonial-next z-10 hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--primary-color)] shadow border border-white cursor-pointer transition">
          <ChevronRight className="m-auto" />
        </button>
      </div>
    </section>
  );
}
