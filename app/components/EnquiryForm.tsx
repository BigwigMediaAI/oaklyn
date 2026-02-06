"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonFill from "./Button";

interface EnquiryFormProps {
  variant?: "default" | "glass";
  onSuccess?: () => void;
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
    requirements: "",
    budget: "",
    message: "",
  });

  const [otp, setOtp] = useState("");
  const [budgetOptions, setBudgetOptions] = useState<string[]>([]);

  /* =========================
     BUDGET LOGIC
  ========================== */
  useEffect(() => {
    const { purpose, requirements } = formData;
    let options: string[] = [];

    if (purpose === "Rent") {
      options = ["₹50k – ₹1 Lakh", "₹1 Lakh – ₹2 Lakh", "₹2 Lakh & Above"];
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

    if (purpose === "Sell") {
      setFormData((prev) => ({ ...prev, budget: "" }));
    } else if (
      options.length &&
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
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
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
      else {
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
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     STYLES (THEME-AWARE)
  ========================== */
  const isGlass = variant === "glass";

  const baseInput =
    "w-full px-4 py-3 rounded-xl font-body text-sm transition focus:outline-none";

  const inputClass = isGlass
    ? `${baseInput} bg-white/80 border border-white/30 text-black placeholder-gray-600 focus:border-[var(--primary-color)]`
    : `${baseInput} bg-[var(--secondary-bg)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]`;

  const selectClass = inputClass;

  const phoneInputClass = isGlass
    ? "!w-full !h-[48px] !pl-12 !rounded-xl !bg-white/80 !border !border-white/30 !text-black focus:!border-[var(--primary-color)]"
    : "!w-full !h-[48px] !pl-12 !rounded-xl !bg-[var(--secondary-bg)] !border !border-[var(--border-color)] !text-[var(--text-primary)] focus:!border-[var(--primary-color)]";

  const phoneButtonClass = isGlass
    ? "!border !border-white/30 !rounded-l-xl !bg-transparent"
    : "!border !border-[var(--border-color)] !rounded-l-xl";

  return (
    <div className="w-full bg-[var(--seondary-color)]">
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-4 text-center">
          {error}
        </p>
      )}

      {/* ================= FORM ================= */}
      {step === "FORM" && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
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

          <input
            type="email"
            placeholder="Email Address"
            className={inputClass}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <div className="flex flex-col md:flex-row gap-4">
            <select
              className={selectClass}
              value={formData.purpose}
              required
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
            >
              <option value="">Select Purpose</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>

            <select
              className={selectClass}
              value={formData.requirements}
              required
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
            >
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Builder Floor">Builder Floor</option>
            </select>
          </div>

          {formData.purpose !== "Sell" && (
            <select
              className={selectClass}
              value={formData.budget}
              disabled={!budgetOptions.length}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            >
              <option value="">
                {budgetOptions.length
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
            className={`${inputClass} h-24 resize-none`}
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

      {/* ================= OTP ================= */}
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
