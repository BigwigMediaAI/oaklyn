"use client";
import { EarthIcon, Handshake, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { FaBook, FaBuilding, FaUser, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const router = useRouter();
  const [counts, setCounts] = useState({
    leads: 0,
    properties: 0,
    subscribers: 0,
  });

  useEffect(() => {
    // ✅ Fetch data only if logged in
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/lead/all`).then((r) =>
        r.json(),
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`).then((r) =>
        r.json(),
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subscribers`).then((r) =>
        r.json(),
      ),
    ])
      .then(([leads, properties, subscribers]) => {
        setCounts({
          leads: Array.isArray(leads) ? leads.length : 0,
          properties: typeof properties === "object" ? properties.total : 0,
          subscribers: typeof subscribers === "object" ? subscribers.count : 0,
        });
      })

      .catch((error) => {
        console.error("Error loading dashboard data:", error);
      });
  }, [router]);

  const cards = [
    { title: "Leads", icon: <FaUsers />, count: counts.leads },
    { title: "Properties", icon: <FaBuilding />, count: counts.properties },
    { title: "Subscribers", icon: <User2 />, count: counts.subscribers },
  ];

  return (
    <section className="px-4 py-8 space-y-10">
      <h2 className="text-2xl font-bold text-center text-gray-200">
        Admin Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({
  title,
  icon,
  count,
}: {
  title: string;
  icon: JSX.Element;
  count: number;
}) => (
  <div className="w-full max-w-sm rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white border border-[#0a2342] bg-neutral-900 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
