"use client";

import ButtonFill from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
  leadData: {
    name: string;
    phone: string;
    countryCode: string;
  };
  setLeadData: (data: any) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function BrochureLeadModal({
  open,
  onClose,
  leadData,
  setLeadData,
  onSubmit,
  loading,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-11/12 max-w-md shadow-xl relative">
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900 dark:text-gray-300"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Get Your Brochure
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name*"
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3"
            value={leadData.name}
            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
          />

          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <select
              className="bg-gray-100 dark:bg-gray-700 p-3 border-r"
              value={leadData.countryCode}
              onChange={(e) =>
                setLeadData({ ...leadData, countryCode: e.target.value })
              }
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
            </select>

            <input
              type="tel"
              placeholder="Phone Number*"
              className="flex-1 p-3 outline-none"
              value={leadData.phone}
              onChange={(e) =>
                setLeadData({ ...leadData, phone: e.target.value })
              }
            />
          </div>

          <ButtonFill
            onClick={onSubmit}
            text={loading ? "Submitting..." : "Submit & View Brochure"}
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          We respect your privacy. Your information will not be shared.
        </p>
      </div>
    </div>
  );
}
