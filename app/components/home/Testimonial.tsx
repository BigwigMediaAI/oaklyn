"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  image?: string;
  rating?: number;
  designation?: string;
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // FETCH TESTIMONIALS
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/testimonial/public/list`,
          { cache: "no-store" },
        );
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const toggleReadMore = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const TestimonialSkeleton = () => (
    <div className="h-full min-h-[240px] bg-[var(--secondary-bg)] p-8 border border-[var(--primary-color)] flex flex-col animate-pulse">
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-700 rounded w-4/6" />
      </div>

      <div className="mt-auto flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-700" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded w-24" />
          <div className="h-3 bg-gray-700 rounded w-16" />
        </div>
      </div>
    </div>
  );

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
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <TestimonialSkeleton />
                </SwiperSlide>
              ))
            : testimonials.map((item) => (
                <SwiperSlide key={item._id} className="h-auto">
                  <div className="h-full min-h-[240px] bg-[var(--secondary-bg)] p-8 shadow-lg border border-[var(--primary-color)] flex flex-col">
                    <p
                      className={`leading-relaxed mb-4 ${
                        expandedId === item._id
                          ? "line-clamp-none"
                          : "line-clamp-3"
                      }`}
                    >
                      {item.message}
                    </p>

                    {item.message.length > 120 && (
                      <button
                        onClick={() => toggleReadMore(item._id)}
                        className="text-sm hover:underline self-start mb-3"
                      >
                        {expandedId === item._id ? "Read less" : "Read more"}
                      </button>
                    )}

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-bg)] to-[var(--primary-color)] flex items-center justify-center shadow overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-semibold">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg tracking-wider text-[var(--primary-color)]">
                          {item.name}
                        </h4>

                        <div className="flex gap-1 text-yellow-400 text-xs">
                          {Array.from({ length: item.rating || 5 }).map(
                            (_, i) => (
                              <span key={i}>★</span>
                            ),
                          )}
                        </div>

                        <p className="text-xs text-gray-400">
                          {item.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* LEFT ARROW */}
        <button
          ref={prevRef}
          className="z-10 hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--primary-color)] shadow border border-white cursor-pointer"
        >
          <ChevronLeft className="m-auto" />
        </button>

        {/* RIGHT ARROW */}
        <button
          ref={nextRef}
          className="z-10 hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--primary-color)] shadow border border-white cursor-pointer"
        >
          <ChevronRight className="m-auto" />
        </button>
      </div>
    </section>
  );
}
