import Image from "next/image";
import coming from "./assets/oaklyn-coming-soon.png";
import logo from "./assets/4.png";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={coming}
        alt="Oaklyn Real Estate Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <Image
          src={logo}
          alt="Oaklyn Real Estate Logo"
          width={180}
          height={180}
          className="mb-8"
          priority
        />

        {/* Brand name */}
        <p className="mb-3 text-sm tracking-[0.35em] text-zinc-300">
          OAKLYN REAL ESTATE
        </p>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
          Luxury Living
          <br />
          <span className="font-normal text-[#c9a24d]">Coming Soon</span>
        </h1>

        {/* Tagline */}
        <p className="max-w-xl text-base md:text-lg text-zinc-300 leading-relaxed">
          A refined real estate experience designed for modern living.
        </p>
      </div>
    </div>
  );
}
