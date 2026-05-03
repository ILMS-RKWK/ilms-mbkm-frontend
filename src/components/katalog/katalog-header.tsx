"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sparkles, Menu, X, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/pinjaman", label: "Pinjaman" },
  { href: "/kegiatan", label: "Kegiatan" },
];

interface KatalogHeaderProps {
  toggleSidebar?: () => void;
}

export default function KatalogHeader({ toggleSidebar }: KatalogHeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm shrink-0">
      <div className="flex items-center justify-between px-4 lg:px-8 h-14 gap-2">
        {/* Left Section: Mobile Menu + Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              title="Filter Katalog"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          )}
          <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
            <Sparkles className="w-5 h-5 text-[#99BD4A] shrink-0" />
            <span className="font-extrabold text-[#1e293b] text-[14px] sm:text-[15px] tracking-tight truncate hidden sm:block">
              Rumah Kreatif Wadas Kelir
            </span>
            <span className="font-extrabold text-[#1e293b] text-[14px] sm:text-[15px] tracking-tight truncate sm:hidden">
              Wadas Kelir
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/katalog"
                ? pathname.startsWith("/katalog")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-[#99BD4A]"
                    : "text-[#475569] hover:text-[#99BD4A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notification Bell */}
          <Link
            href="/notifikasi"
            className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors duration-200 group"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-500 group-hover:text-[#99BD4A] transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </Link>

          {/* User Avatar */}
          <Link
            href="/profil"
            className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#B4D568] to-[#99BD4A] flex items-center justify-center ring-2 ring-[#99BD4A]/20 hover:ring-[#99BD4A]/40 transition-all duration-200 overflow-hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/katalog"
                  ? pathname.startsWith("/katalog")
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#99BD4A] bg-[#99BD4A]/8"
                      : "text-[#475569] hover:text-[#99BD4A] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
