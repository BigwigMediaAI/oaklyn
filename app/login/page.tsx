"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

import Footer from "../components/Footer";
import MiniNavbar from "../components/Mininavbar";
import Navbar from "../components/Navbar";
import ButtonFill from "../components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER;
  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === ADMIN_USER && password === ADMIN_PASS) {
        Cookies.set("adminAuth", "true", {
          expires: 1,
          sameSite: "strict",
        });
        router.push("/admin");
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 700);
  };

  return (
    <div className="bg-[var(--primary-bg)] text-[var(--text-primary)]">
      <MiniNavbar />
      <Navbar />

      <section className="mt-24 bg-[var(--primary-bg)] relative">
        {/* Decorative background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[var(--primary-color)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--secondary-color)]/10 rounded-full blur-3xl" />

        <div className="relative z-10 py-10 flex items-center justify-center px-4">
          <div
            className="
              w-full max-w-5xl
              grid grid-cols-1 md:grid-cols-2
              bg-[var(--secondary-bg)]/80 backdrop-blur-xl
              border border-[var(--border-color)]
              rounded-3xl
              shadow-2xl
              overflow-hidden
            "
          >
            {/* LEFT PANEL */}
            <div className="hidden md:flex flex-col justify-center p-12 bg-[var(--secondary-color)] text-black">
              <h2 className="text-3xl font-bold mb-4">Admin Control Panel</h2>

              <p className=" leading-relaxed max-w-sm">
                Secure access to manage content, users, and system settings.
                Only authorized administrators are allowed beyond this point.
              </p>

              <div className="mt-10 space-y-3 text-sm">
                <p>✔ Secure admin-only access</p>
                <p>✔ Centralized management</p>
                <p>✔ Protected dashboard</p>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[var(--primary-color)]">
                  Admin Login
                </h1>
                <p className="text-[var(--text-muted)] text-sm mt-2">
                  Sign in to continue
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-[var(--text-muted)] mb-1 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="abc@yourdomain.com"
                      className="
                        w-full pl-11 pr-4 py-3 rounded-xl
                        bg-[var(--secondary-bg)]
                        border border-[var(--border-color)]
                        text-[var(--text-primary)]
                        placeholder-[var(--text-muted)]
                        focus:ring-2 focus:ring-[var(--primary-color)]
                        focus:outline-none
                      "
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-[var(--text-muted)] mb-1 block">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="
                        w-full pl-11 pr-12 py-3 rounded-xl
                        bg-[var(--secondary-bg)]
                        border border-[var(--border-color)]
                        text-[var(--text-primary)]
                        placeholder-[var(--text-muted)]
                        focus:ring-2 focus:ring-[var(--primary-color)]
                        focus:outline-none
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}

                <ButtonFill
                  type="submit"
                  className="w-full"
                  text={loading ? "Authenticating..." : "Login to Dashboard"}
                />
              </form>

              <p className="text-xs text-[var(--text-muted)] text-center mt-8">
                © {new Date().getFullYear()} Admin Panel • Secure Access
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
