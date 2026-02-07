"use client";
import React from "react";
import Image from "next/image";
import popup from "../assets/h8_pic5.jpg";
import EnquiryForm from "./EnquiryForm";

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-md animate-fadeIn">
      <div className="relative w-11/12 max-w-4xl bg-[var(--primary-bg)]/40  backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-white/30 animate-popupSlide overflow-hidden flex flex-col md:flex-row">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white cursor-pointer  text-xl z-10"
        >
          ✕
        </button>

        {/* IMAGE */}
        <div className="hidden md:block relative w-1/2">
          <Image src={popup} alt="Popup" fill className="object-fill" />
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[var(--primary-color)]">
            Enquire Now
          </h2>

          <EnquiryForm onSuccess={onClose} variant="default" />
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
