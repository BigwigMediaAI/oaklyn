import BuyDetailsClient from "./BuyDetails";

async function getProperty(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/property/${slug}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch property");
  return res.json();
}

// ✅ FIX 2: await params here as well
export default async function BuyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ must await params
  const property = await getProperty(slug);

  return <BuyDetailsClient property={property} />;
}
