"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonFill from "./Button";

interface EnquiryFormProps {
  variant?: "default" | "glass"; // default for white bg, glass for hero/overlay
  onSuccess?: () => void; // Callback after successful verification
  btnText?: string;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({
  variant = "default",
  onSuccess,
  btnText = "Get Call Back",
}) => {
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    requirements: "", // This maps to Property Type
    budget: "",
    message: "",
  });

  const [otp, setOtp] = useState("");
  const [budgetOptions, setBudgetOptions] = useState<string[]>([]);

  // Update budget options when Purpose or Property Type changes
  useEffect(() => {
    const { purpose, requirements } = formData;
    let options: string[] = [];

    if (purpose === "Sell") {
      options = [];
    } else if (purpose === "Rent") {
      options = ["50k - 1 Lakh", "1Lakh - 2 Lakh", "2Lakh & above"];
    } else if (purpose === "Lease") {
      options = ["Below ₹2 Cr", "₹2 Cr – ₹5 Cr", "Above ₹5 Cr"];
    } else if (purpose === "Buy") {
      if (requirements === "Apartment" || requirements === "Builder Floor") {
        options = ["Below ₹4 Cr", "₹4 Cr – ₹6 Cr", "Above ₹6 Cr"];
      } else if (requirements === "Villa") {
        options = [
          "Below ₹10 Cr",
          "₹10 Cr – ₹12 Cr",
          "₹12 Cr – ₹14 Cr",
          "Above ₹14 Cr",
        ];
      } else if (requirements === "Plot") {
        options = ["Below ₹8 Cr", "₹8 Cr – ₹10 Cr", "Above ₹10 Cr"];
      }
    }

    setBudgetOptions(options);

    // Clear budget if it's no longer in the options (unless it's Sell where we hide it anyway)
    if (purpose === "Sell") {
      setFormData((prev) => ({ ...prev, budget: "" }));
    } else if (
      options.length > 0 &&
      formData.budget &&
      !options.includes(formData.budget)
    ) {
      setFormData((prev) => ({ ...prev, budget: "" }));
    }
  }, [formData.purpose, formData.requirements]);

  /* =========================
     SEND OTP
  ========================== */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep("OTP");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to send OTP");
      } else {
        setError("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     VERIFY OTP
  ========================== */
  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formData.phone,
            otp,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (onSuccess) onSuccess();
      // Optional: Reset form or show success message if onSuccess doesn't unmount component
      if (!onSuccess) {
        setStep("FORM");
        setOtp("");
        setFormData({
          name: "",
          phone: "",
          email: "",
          purpose: "",
          requirements: "",
          budget: "",
          message: "",
        });
        alert("Thank you! Our team will contact you shortly.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "OTP verification failed");
      } else {
        setError("OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Styles based on variant
  const isGlass = variant === "glass";

  const inputClass = isGlass
    ? "w-full px-4 py-2.5 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-600 text-black focus:outline-none focus:border-[var(--primary-color)]"
    : "w-full px-4 py-2.5 rounded-lg border border-gray-400 placeholder-gray-500 text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white";

  const selectClass = isGlass
    ? "w-full px-4 py-2.5 rounded-lg bg-white/80 border border-gray-300 text-black focus:outline-none focus:border-[var(--primary-color)]"
    : "w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-white text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]";

  const phoneInputClass = isGlass
    ? "!w-full !h-[44px] !pl-12 !rounded-lg !bg-white/80 !border !border-gray-300 !text-black placeholder:!text-gray-600 focus:!border-[var(--primary-color)]"
    : "!w-full !h-[44px] !pl-12 !rounded-lg !border !border-gray-400 !text-black placeholder:!text-gray-500 focus:!border-[var(--primary-color)] focus:!ring-1 focus:!ring-[var(--primary-color)]";

  const phoneButtonClass = isGlass
    ? "!border !border-gray-300 !bg-transparent !rounded-l-lg"
    : "!border !border-gray-400 !rounded-l-lg";

  return (
    <div className="w-full">
      {error && (
        <p className="text-red-600 text-sm text-center mb-3 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      {step === "FORM" && (
        <form onSubmit={handleSendOtp} className="space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Full Name"
                required
                className={inputClass}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <PhoneInput
                country="in"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass={phoneInputClass}
                buttonClass={phoneButtonClass}
                containerClass="!w-full"
                dropdownClass="!text-gray-800"
              />
            </div>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className={inputClass}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <div className="flex flex-col md:flex-row gap-3">
            {/* Purpose Dropdown */}
            <div className="flex-1">
              <select
                className={selectClass}
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
                required
              >
                <option value="">Select Purpose</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
              </select>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex-1">
              <select
                className={selectClass}
                value={formData.requirements}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
                required
              >
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Builder Floor">Builder Floor</option>
              </select>
            </div>
          </div>

          {/* Budget Dropdown (Hidden if Purpose is Sell) */}
          {formData.purpose !== "Sell" && (
            <select
              className={selectClass}
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              disabled={budgetOptions.length === 0}
            >
              <option value="">
                {budgetOptions.length > 0
                  ? "Select Budget"
                  : "Select Purpose & Type First"}
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          <textarea
            placeholder="Any specific requirement (BHK, facing, possession timeline, etc.)"
            className={`${inputClass} h-20 resize-none`}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <ButtonFill
            type="submit"
            className="w-full"
            text={loading ? "Sending OTP..." : btnText}
          />
        </form>
      )}

      {step === "OTP" && (
        <div className="space-y-4">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className={`${inputClass} text-center tracking-[0.4em]`}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <ButtonFill
            onClick={handleVerifyOtp}
            className="w-full"
            text={loading ? "Verifying..." : "Verify & Submit"}
          />
        </div>
      )}
    </div>
  );
};

export default EnquiryForm;
