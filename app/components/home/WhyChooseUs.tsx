"use client";

const points = [
  {
    title: "Verified & Genuine Listings",
    desc: "Every property is thoroughly verified for ownership, approvals, and market authenticity before being presented to you.",
  },
  {
    title: "Deep Local Market Expertise",
    desc: "Years of on-ground experience across prime and emerging locations help us guide you with clarity and confidence.",
  },
  {
    title: "Transparent & Ethical Dealings",
    desc: "No hidden charges, no misleading promises — just honest advice aligned with your best interests.",
  },
  {
    title: "End-to-End Assistance",
    desc: "From shortlisting and site visits to negotiations, documentation, and possession — we manage it all.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[var(--secondary-bg)] py-16">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — AUTHORITY PANEL */}
          <div className="relative">
            <div className=" max-w-lg">
              <p className="text-xl tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
                Why Choose Us
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-light)]">
                Real Estate Decisions <br /> Built on Trust
              </h2>

              <p className="mt-6 font-body text-[var(--text-muted)] leading-relaxed">
                We operate as real estate advisors, not brokers. Our approach is
                rooted in market intelligence, transparency, and long-term value
                creation for every client.
              </p>

              {/* AUTHORITY STAT */}
              <div className="mt-10 border-t border-[var(--border-color)] pt-6 md:flex lg:flex-col gap-5">
                <div className="border border-[var(--border-color)] w-full p-2">
                  <p className="font-heading text-3xl text-[var(--primary-color)]">
                    10+ Years
                  </p>
                  <p className="text-sm text-[var(--text-muted)] font-body">
                    Experience in premium residential & commercial markets
                  </p>
                </div>
                <div className="border border-[var(--border-color)] w-full p-2">
                  <p className="font-heading text-3xl text-[var(--primary-color)]">
                    500+
                  </p>
                  <p className="text-sm text-[var(--text-muted)] font-body">
                    Verified Listings
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — TRUST LEDGER */}
          <div className="relative">
            {/* GOLD SPINE */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--primary-color)]/50" />

            <div className="space-y-12 pl-14">
              {points.map((item, i) => (
                <div key={i} className="relative">
                  {/* NUMBER */}
                  <span className="absolute -left-14 top-0 font-heading text-3xl text-[var(--primary-color)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* TEXT */}
                  <h3 className="font-heading text-xl text-[var(--text-light)] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
