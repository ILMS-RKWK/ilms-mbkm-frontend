"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/pinjaman", label: "Pinjaman" },
  { href: "/kegiatan", label: "Kegiatan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-10 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/icons/icon-ilms-no-fill.png"
            alt="Logo Wadas Kelir"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-extrabold text-[#1e293b] text-lg tracking-tight">
            Wadas Kelir
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center mx-6 lg:mx-10 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari buku, penulis, atau genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#99BD4A]/30 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
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

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-4">
          <button
            className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors duration-200 group"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-500 group-hover:text-[#99BD4A] transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#B4D568] to-[#99BD4A] flex items-center justify-center ring-2 ring-[#99BD4A]/20 hover:ring-[#99BD4A]/40 transition-all duration-200 overflow-hidden">
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
          </button>
        </div>
      </div>
    </header>
  );
}
