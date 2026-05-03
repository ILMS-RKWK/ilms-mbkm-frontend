"use client";

import {
  BookOpen,
  Brain,
  Church,
  Users,
  Languages,
  FlaskConical,
  Cpu,
  Palette,
  BookText,
  Globe,
  X,
} from "lucide-react";

const ddcCategories = [
  { code: "000", label: "Karya Umum", icon: BookOpen },
  { code: "100", label: "Filsafat & Psikologi", icon: Brain },
  { code: "200", label: "Agama", icon: Church },
  { code: "300", label: "Ilmu Sosial", icon: Users },
  { code: "400", label: "Bahasa", icon: Languages },
  { code: "500", label: "Sains & Matematika", icon: FlaskConical },
  { code: "600", label: "Teknologi", icon: Cpu },
  { code: "700", label: "Kesenian & Olahraga", icon: Palette },
  { code: "800", label: "Sastra", icon: BookText },
  { code: "900", label: "Sejarah & Geografi", icon: Globe },
];

interface KatalogSidebarProps {
  selectedCategory: string;
  onCategoryChange: (code: string) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function KatalogSidebar({
  selectedCategory,
  onCategoryChange,
  isOpen = false,
  setIsOpen,
}: KatalogSidebarProps) {
  return (
    <aside 
      className={`fixed lg:sticky top-0 left-0 z-[60] lg:z-40 w-[280px] h-screen bg-white border-r border-slate-100 flex flex-col shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#99BD4A]/15 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#99BD4A]" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-[16px] leading-tight">
              Katalog Pintar
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sistem Perpustakaan DDC
            </p>
          </div>
        </div>
        {setIsOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* DDC Categories */}
      <div className="flex-1 px-4 pb-6">
        <p className="text-[11px] font-bold text-[#99BD4A]/70 tracking-widest uppercase px-3 mb-3">
          Klasifikasi DDC
        </p>
        <nav className="space-y-0.5">
          {ddcCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.code;
            return (
              <button
                key={cat.code}
                onClick={() => onCategoryChange(cat.code)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-[#99BD4A]/10 text-[#99BD4A] font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive
                      ? "text-[#99BD4A]"
                      : "text-slate-400 group-hover:text-slate-500"
                  }`}
                />
                <span className="truncate">
                  {cat.code} {cat.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info at Bottom */}
      <div className="p-5 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B4D568] to-[#99BD4A] flex items-center justify-center overflow-hidden ring-2 ring-[#99BD4A]/20">
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
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">
              Anggota Wadas
            </p>
            <p className="text-xs text-[#99BD4A] font-medium">ID: WK-2026</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
