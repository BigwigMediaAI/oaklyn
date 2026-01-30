"use client";

import Link from "next/link";
import React from "react";

interface ButtonFillProps {
  text: React.ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  className?: string;
  aos?: string;
  aosDelay?: string;
}

const ButtonFill: React.FC<ButtonFillProps> = ({
  text,
  type = "button",
  href,
  onClick,
  className = "",
  aos,
  aosDelay,
}) => {
  const btnClass = `click-btn btn-style5 ${className}`;
  if (href) {
    return (
      <Link
        href={href}
        data-aos={aos}
        data-aos-delay={aosDelay}
        className={btnClass}
      >
        {text}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      data-aos={aos}
      data-aos-delay={aosDelay}
      className={btnClass}
    >
      {text}
    </button>
  );
};

export default ButtonFill;
