"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import kegiatanData from "@/json/kegiatan.json";

const mockKegiatan = kegiatanData;

const tabs = ["Semua", "Literasi Anak", "Paket B & C", "Komunitas Sastra", "Seni & Budaya"];

export default function KegiatanPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  
  const filteredKegiatan = mockKegiatan.filter((item) => {
    if (activeTab === "Semua") return true;
    return item.category === activeTab;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFDFC]">
      
      {/* Hero Banner Section */}
      <section className="relative w-full h-[320px] md:h-[380px] overflow-hidden flex items-center justify-center bg-[#874b32]">
        {/* CSS Gradient fallback simulating the design's banner */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#385444] via-[#874b32] to-[#426152] opacity-90">
           {/* Abstract shapes for texture */}
           <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#99BD4A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
           <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-[44px] md:text-[56px] font-extrabold text-white mb-5 drop-shadow-lg tracking-tight">Kegiatan Kami</h1>
          <p className="text-white/90 text-[16px] md:text-[18px] font-medium leading-relaxed drop-shadow-md">
            Merawat literasi, seni, dan kreativitas bersama masyarakat Banyumas. <br className="hidden md:block"/>
            Menumbuhkan generasi cerdas melalui pemberdayaan komunitas.
          </p>
        </div>
      </section>

      {/* Navigation Filter Tabs */}
      <section className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-2 md:gap-8 overflow-x-auto no-scrollbar py-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? "bg-[#99BD4A] text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredKegiatan.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100 flex flex-col group">
              
              {/* Card Image */}
              <div className="relative w-full aspect-[16/10] bg-slate-800 overflow-hidden">
                 {/* Fallback pattern */}
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                    <span className="text-slate-500 text-xs font-bold px-4 text-center">{item.title}</span>
                 </div>
                 
                 {/* Next Image */}
                 <Image 
                   src={item.image}
                   alt={item.title}
                   fill
                   className="object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                   onError={(e) => {
                      e.currentTarget.style.display = 'none';
                   }}
                 />
                 
                 {/* Category Badge overlay */}
                 <div className="absolute top-4 left-4 z-20">
                   <span className="bg-[#99BD4A] text-white text-[10px] font-extrabold px-3 py-1.5 rounded uppercase tracking-wider shadow-sm">
                     {item.category}
                   </span>
                 </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[#94a3b8] text-[13px] font-medium mb-3 block">
                  {item.date}
                </span>
                <h3 className="font-extrabold text-[#1e293b] text-[18px] leading-snug mb-3 group-hover:text-[#99BD4A] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[14px] leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>
                
                {/* Action Link */}
                <div className="mt-auto">
                  <Link href={`/kegiatan/${item.id}`} className="inline-flex items-center text-[#99BD4A] font-bold text-[14px] hover:text-[#82a33c] transition-colors group/link">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredKegiatan.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-500 font-medium">Belum ada kegiatan di kategori ini.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredKegiatan.length > 0 && (
          <div className="mt-14 flex justify-center">
            <button className="border-2 border-[#99BD4A] text-[#8ca846] hover:bg-[#99BD4A] hover:text-white px-8 py-2.5 rounded-[10px] font-bold text-[15px] transition-colors shadow-sm">
              Muat Lebih Banyak
            </button>
          </div>
        )}

      </section>

    </div>
  );
}
