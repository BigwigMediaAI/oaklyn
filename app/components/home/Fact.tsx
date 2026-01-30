"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import ButtonFill from "../Button";
import abc from "../../assets/projects/project_5.jpg";

const stats = [
  { value: 49, suffix: "+", label: "Completed projects" },
  { value: 19, suffix: "+", label: "Projects underway" },
  { value: 21, suffix: "", label: "Green buildings under construction" },
  { value: 115, suffix: "", label: "Joint ventures completed" },
];

export default function FactsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  // ✅ AOS Init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  // ✅ Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // ✅ Count Up Animation
  useEffect(() => {
    if (!startCount) return;

    stats.forEach((stat, index) => {
      const duration = 1500;
      const startTime = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * stat.value);

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, [startCount]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-[var(--secondary-bg)] overflow-hidden"
    >
      {/* LEFT CONTENT */}
      <div className="w-11/12 md:w-5/6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* TEXT */}
          <div data-aos="fade-up">
            <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
              The fact
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
              One of the leading real estate companies
            </h2>

            <p className="text-[var(--text-muted)] mt-6 max-w-lg mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam,
              accusamus? Atque omnis assumenda sapiente numquam incidunt facere
              obcaecati quidem, qui accusamus ad nisi ut tempora nam voluptatem.
              Harum quaerat sed magnam consequuntur ipsam asperiores earum.
            </p>

            {/* STATS */}
            <div
              className="grid grid-cols-2 gap-y-12 gap-x-16 max-w-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {stats.map((stat, i) => (
                <div key={stat.label}>
                  <h3 className="font-heading text-4xl text-[var(--primary-color)] mb-2">
                    {counts[i]}
                    {stat.suffix}
                  </h3>
                  <p className="text-base text-[var(--text-light)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10" data-aos="fade-up" data-aos-delay="300">
              <ButtonFill text="View all properties" href="/buy-property" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE - Desktop */}
      <div
        className="hidden lg:block absolute top-0 right-0 h-full w-[45vw]"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <Image
          src={abc}
          alt="Luxury residential entrance"
          fill
          sizes="45vw"
          className="object-cover object-center"
          quality={90}
          priority
        />
      </div>
    </section>
  );
}
