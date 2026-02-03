"use client";

import { useEffect, useState } from "react";

import { ReactNode } from "react";
import { Plus, Pencil, Trash2, Eye, X } from "lucide-react";

import PropertyForm from "../../components/PropertyForm";
import { useRouter } from "next/navigation";
import axios from "axios";
// updated
interface Property {
  builder: string;
  _id: string;
  title: string;
  slug: string;
  type: string;
  description: string;
  purpose: string;
  location: string;
  price: number | string;
  bedrooms: number | string;
  bathrooms: number | string;
  areaSqft: number | string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  googleMapUrl: string;
  brochure?: string;
  videoLink: string;
  images: string[];
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export default function AllProperties() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10; // Number of properties per page
  const fetchProperties = async (page: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/property`,
        {
          params: { page, limit: pageSize },
        },
      );
      const data = res.data;

      if (data?.success) {
        setProperties(data.properties || []);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        setProperties([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch properties", error);
      setProperties([]);
      setTotalPages(1);
    }
  };

  // ✅ Check login and fetch properties
  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, router]);

  // Keep the view-details modal in sync after edits/refetches
  const selectedId = selectedProperty?._id;
  useEffect(() => {
    if (!selectedId) return;
    const updated = properties.find((p) => p._id === selectedId);
    if (updated) setSelectedProperty(updated);
  }, [properties, selectedId]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/property/${slug}`,
      );
      fetchProperties(currentPage); // refetch after delete
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const openViewModal = (property: Property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const openFormModal = (property?: Property) => {
    setEditProperty(property || null);
    setIsFormModalOpen(true);
  };

  console.log(properties);

  return (
    <div className="h-screen bg-black text-white flex flex-col font-raleway">
      {/* ================= HEADER (SAME AS LEADS) ================= */}
      <div className="sticky top-0 z-20 bg-black p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Properties</h1>

        <button
          onClick={() => openFormModal()}
          className="flex items-center gap-2 bg-[var(--primary-color)] text-black px-4 py-2 rounded-lg shadow hover:opacity-90"
        >
          <Plus size={18} /> Add Property
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead className="bg-[#1e1e1e] text-left">
              <tr>
                <th className="px-4 py-3 border-b border-gray-700">Title</th>
                <th className="px-4 py-3 border-b border-gray-700">Purpose</th>
                <th className="px-4 py-3 border-b border-gray-700">Type</th>
                <th className="px-4 py-3 border-b border-gray-700">Location</th>
                <th className="px-4 py-3 border-b border-gray-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <tr
                    key={property._id}
                    className="even:bg-[#111] hover:bg-[#222] transition"
                  >
                    <td className="px-4 py-3">{property.title}</td>
                    <td className="px-4 py-3">{property.purpose}</td>
                    <td className="px-4 py-3">{property.type}</td>
                    <td className="px-4 py-3">{property.location}</td>
                    <td className="px-4 py-3 flex gap-3 justify-center">
                      {/* VIEW */}
                      <button
                        onClick={() => openViewModal(property)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
                      >
                        <Eye size={16} />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => openFormModal(property)}
                        className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(property.slug)}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-6">
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-3 py-1 bg-[var(--primary-color)] text-black rounded">
                {currentPage}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {isViewModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={22} />
            </button>

            {/* ================= HEADER ================= */}
            <div className="border-b border-gray-700 pb-4 mb-6">
              <h2 className="text-2xl font-bold">{selectedProperty.title}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {selectedProperty.location}
              </p>
            </div>

            {/* ================= BASIC INFO ================= */}
            <Section title="Basic Information">
              <Grid>
                <Item label="Purpose" value={selectedProperty.purpose} />
                <Item label="Type" value={selectedProperty.type} />
                <Item label="Builder" value={selectedProperty.builder} />
                <Item label="Price" value={`₹ ${selectedProperty.price}`} />
              </Grid>
            </Section>

            {/* ================= PROPERTY SPECS ================= */}
            <Section title="Property Specifications">
              <Grid>
                <Item label="Bedrooms" value={selectedProperty.bedrooms} />
                <Item label="Bathrooms" value={selectedProperty.bathrooms} />
                <Item label="Area (sqft)" value={selectedProperty.areaSqft} />
              </Grid>
            </Section>

            {/* ================= DESCRIPTION ================= */}
            {selectedProperty.description && (
              <Section title="Description">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedProperty.description}
                </p>
              </Section>
            )}

            {/* ================= HIGHLIGHTS ================= */}
            {selectedProperty.highlights?.length > 0 && (
              <Section title="Highlights">
                <List items={selectedProperty.highlights} />
              </Section>
            )}

            {/* ================= AMENITIES ================= */}
            {selectedProperty.featuresAmenities?.length > 0 && (
              <Section title="Amenities & Features">
                <List items={selectedProperty.featuresAmenities} />
              </Section>
            )}

            {/* ================= NEARBY ================= */}
            {selectedProperty.nearby?.length > 0 && (
              <Section title="Nearby Locations">
                <List items={selectedProperty.nearby} />
              </Section>
            )}

            {/* ================= SEO ================= */}
            <Section title="SEO Metadata">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Meta Title</p>
                  <div className="bg-[#1a1a1a] p-3 rounded text-sm text-gray-200">
                    {selectedProperty.metaTitle || "—"}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Meta Description</p>
                  <div className="bg-[#1a1a1a] p-3 rounded text-sm text-gray-200">
                    {selectedProperty.metaDescription || "—"}
                  </div>
                </div>
              </div>
            </Section>

            {/* ================= IMAGES ================= */}
            {selectedProperty.images?.length > 0 && (
              <Section title="Property Images">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedProperty.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Property"
                      className="h-32 w-full object-cover rounded-lg border border-gray-700"
                    />
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      )}

      {/* ================= FORM MODAL (UNCHANGED) ================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto no-scrollbar rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editProperty ? "Update Property" : "Add Property"}
            </h2>

            <PropertyForm
              property={
                editProperty
                  ? {
                      ...editProperty,
                      price: editProperty.price ?? "",
                      bedrooms: editProperty.bedrooms ?? "",
                      bathrooms: editProperty.bathrooms ?? "",
                      areaSqft: editProperty.areaSqft ?? "",
                      builder: editProperty.builder ?? "",
                    }
                  : undefined
              }
              onClose={() => setIsFormModalOpen(false)}
              onSuccess={() => fetchProperties(currentPage)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= SECTION ================= */
interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

/* ================= GRID ================= */
interface GridProps {
  children: ReactNode;
}

const Grid = ({ children }: GridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
    {children}
  </div>
);

/* ================= ITEM ================= */
interface ItemProps {
  label: string;
  value?: string | number | null;
}

const Item = ({ label, value }: ItemProps) => (
  <div className="bg-[#1a1a1a] p-3 rounded-lg">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-gray-200">{value ?? "—"}</p>
  </div>
);

/* ================= LIST ================= */
interface ListProps {
  items: string[];
}

const List = ({ items }: ListProps) => (
  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);
