"use client";

import { useState } from "react";

export default function SellerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do you determine the right selling price for my property?",
      a: "We base pricing on recent transaction data, current buyer demand, location-specific trends, and property condition. Our goal is to arrive at a realistic price that attracts serious buyers without undervaluing your asset.",
    },
    {
      q: "Do you overprice properties to attract sellers?",
      a: "No. We strongly believe that overpricing leads to longer selling timelines and value erosion. Our approach is transparent and data-driven, focused on achieving the best achievable market value.",
    },
    {
      q: "How long does it usually take to sell a property?",
      a: "Timelines vary depending on property type, pricing, and market conditions. However, correctly priced properties with strong demand often see serious interest within the first few weeks.",
    },
    {
      q: "What kind of buyers do you work with?",
      a: "We work with verified end-users, investors, corporate clients, and strategic buyers. Every inquiry is screened to ensure seriousness and credibility.",
    },
    {
      q: "Do you handle negotiations and documentation?",
      a: "Yes. We manage negotiations, coordinate site visits, and oversee documentation while keeping you informed at every stage of the transaction.",
    },
    {
      q: "Are my property details kept confidential?",
      a: "Absolutely. Confidentiality is a priority. Property information is shared only with verified and relevant buyers after your approval.",
    },
    {
      q: "What are your brokerage charges?",
      a: "Our brokerage is discussed transparently upfront, with no hidden charges. Fees vary depending on the transaction type and scope of services.",
    },
  ];

  return (
    <section className="bg-[var(--secondary-bg)] py-16">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl mb-10">
          <p className="text-xl mb-4 tracking-[0.2em] uppercase text-[var(--primary-color)] font-body font-semibold">
            Frequently Asked Questions
          </p>

          <h2 className="font-heading text-4xl md:text-5xl text-[var(--text-light)] mb-6">
            Everything You Need to Know Before Selling
          </h2>

          <p className="text-[var(--text-muted)] leading-relaxed text-lg">
            We believe clarity builds confidence. Here are answers to some of
            the most common questions property owners ask before selling.
          </p>
        </div>

        {/* FAQ LIST */}
        <div>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="
                  border-b border-[var(--border-color)]
                  py-6
                "
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="
                    w-full
                    flex justify-between items-center
                    text-left
                    font-heading
                    text-lg
                    text-[var(--text-light)]
                    transition-colors
                  "
                >
                  <span>{item.q}</span>

                  <span
                    className={`
                      ml-6
                      w-6 h-6
                      flex items-center justify-center
                      rounded-full
                      border border-[var(--primary-color)]
                      text-[var(--primary-color)]
                      transition-transform
                      ${isOpen ? "rotate-45" : ""}
                    `}
                  >
                    +
                  </span>
                </button>

                {/* ANSWER */}
                {isOpen && (
                  <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
