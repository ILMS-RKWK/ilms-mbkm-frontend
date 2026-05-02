"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Calendar, CheckCircle, RotateCcw, ChevronLeft, ChevronRight, Star } from "lucide-react";

type LoanStatus = "SEDANG_DIPINJAM" | "MENUNGGU_PERSETUJUAN" | "SELESAI";

interface LoanItem {
  id: string;
  title: string;
  author: string;
  status: LoanStatus;
  image: string;
  daysLeft?: number;
  borrowDate?: string;
  returnDate?: string;
  requestDate?: string;
  returnedDate?: string;
}

const mockLoans: LoanItem[] = [
  {
    id: "1",
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    status: "SEDANG_DIPINJAM",
    image: "/images/book-cover-1.png",
    daysLeft: 3,
    borrowDate: "12 Okt 2023",
    returnDate: "26 Okt 2023",
  },
  {
    id: "2",
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    status: "MENUNGGU_PERSETUJUAN",
    image: "/images/book-cover-2.png",
    requestDate: "20 Okt 2023",
  },
  {
    id: "3",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    status: "SELESAI",
    image: "/images/book-cover-3.png",
    returnedDate: "05 Okt 2023",
  },
  {
    id: "4",
    title: "Pendidikan Karakter",
    author: "Tim Rumah Kreatif",
    status: "SELESAI",
    image: "/images/book-cover-4.png",
    returnedDate: "15 Sep 2023",
  },
];

const tabs = ["Semua", "Menunggu Persetujuan", "Sedang Dipinjam", "Selesai/Dikembalikan"];

export default function PinjamanPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  
  const filteredLoans = mockLoans.filter((loan) => {
    if (activeTab === "Semua") return true;
    if (activeTab === "Menunggu Persetujuan" && loan.status === "MENUNGGU_PERSETUJUAN") return true;
    if (activeTab === "Sedang Dipinjam" && loan.status === "SEDANG_DIPINJAM") return true;
    if (activeTab === "Selesai/Dikembalikan" && loan.status === "SELESAI") return true;
    return false;
  });

  return (
    <div className="flex-1 w-full bg-[#FCFDFC] min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-10">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-[32px] font-extrabold text-[#1e293b] mb-2">Riwayat Peminjaman Saya</h1>
          <p className="text-[#64748b] text-[16px]">Pantau status peminjaman, batas waktu, dan pengembalian buku Anda di sini.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[15px] font-bold whitespace-nowrap transition-colors relative ${
                activeTab === tab 
                  ? "text-[#99BD4A]" 
                  : "text-[#64748b] hover:text-slate-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#99BD4A] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* List of Loans */}
        <div className="flex flex-col gap-6">
          {filteredLoans.map((loan) => (
            <div key={loan.id} className="bg-white rounded-[24px] border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Book Cover */}
              <div className="w-[130px] h-[175px] shrink-0 rounded-xl overflow-hidden bg-slate-100 relative shadow-sm border border-slate-100">
                 {/* Fallback */}
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <span className="text-slate-500 font-bold text-center px-2 text-xs">{loan.title}</span>
                 </div>
                 {/* Image */}
                 {loan.image && (
                   <Image 
                     src={loan.image} 
                     alt={loan.title} 
                     fill 
                     className="object-cover relative z-10"
                     onError={(e) => {
                       e.currentTarget.style.display = 'none';
                     }}
                   />
                 )}
              </div>

              {/* Details Content */}
              <div className="flex-1 flex flex-col pt-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Title & Author & Badge */}
                  <div>
                    {/* Badge */}
                    <div className="mb-3">
                      {loan.status === "SEDANG_DIPINJAM" && (
                        <span className="bg-[#f0f5e8] text-[#8ca846] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          SEDANG DIPINJAM
                        </span>
                      )}
                      {loan.status === "MENUNGGU_PERSETUJUAN" && (
                        <span className="bg-[#fef3c7] text-[#d97706] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          MENUNGGU PERSETUJUAN
                        </span>
                      )}
                      {loan.status === "SELESAI" && (
                        <span className="bg-[#e2e8f0]/60 text-[#64748b] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          SELESAI
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-extrabold text-[#1e293b] text-[22px] leading-tight mb-1">
                      {loan.title}
                    </h3>
                    <p className="text-[#64748b] text-[15px] font-medium">
                      {loan.author}
                    </p>
                  </div>

                  {/* Right side info (Time left for SEDANG_DIPINJAM) */}
                  {loan.status === "SEDANG_DIPINJAM" && loan.daysLeft && (
                    <div className="flex items-center gap-1.5 text-[#f97316] bg-[#fff7ed] px-3 py-1.5 rounded-lg shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-[13px] font-bold">Sisa {loan.daysLeft} Hari</span>
                    </div>
                  )}
                </div>

                {/* Dates Information */}
                <div className="mb-6 flex flex-wrap items-center gap-4 text-[#94a3b8] text-[13px] font-medium">
                  {loan.status === "SEDANG_DIPINJAM" && (
                    <>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Pinjam: {loan.borrowDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#99BD4A]">
                        <Calendar className="w-4 h-4" />
                        <span>Kembali: {loan.returnDate}</span>
                      </div>
                    </>
                  )}
                  {loan.status === "MENUNGGU_PERSETUJUAN" && (
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Diajukan pada: {loan.requestDate}</span>
                    </div>
                  )}
                  {loan.status === "SELESAI" && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Dikembalikan: {loan.returnedDate}</span>
                    </div>
                  )}
                </div>

                {/* Actions Button */}
                <div className="mt-auto flex items-center">
                  {loan.status === "SEDANG_DIPINJAM" && (
                    <button className="bg-[#99BD4A] hover:bg-[#8aac3d] text-white px-5 py-2.5 rounded-[10px] font-bold text-[14px] transition-colors flex items-center gap-2 shadow-sm">
                      <RotateCcw className="w-4 h-4" />
                      Ajukan Perpanjangan
                    </button>
                  )}
                  {loan.status === "MENUNGGU_PERSETUJUAN" && (
                    <button className="bg-white border border-slate-200 hover:bg-slate-50 text-[#64748b] px-5 py-2.5 rounded-[10px] font-bold text-[14px] transition-colors shadow-sm">
                      Batalkan Pesanan
                    </button>
                  )}
                  {loan.status === "SELESAI" && (
                    <button className="bg-[#f4f7f4] hover:bg-[#eaf1ea] text-[#8ca846] px-5 py-2.5 rounded-[10px] font-bold text-[14px] transition-colors flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Beri Ulasan
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredLoans.length === 0 && (
            <div className="text-center py-16 bg-white rounded-[24px] border border-slate-100">
              <p className="text-[#64748b] font-medium">Tidak ada riwayat peminjaman di kategori ini.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5">
          <span className="text-[#94a3b8] text-[14px] font-medium">
            Menampilkan {filteredLoans.length} dari {filteredLoans.length} riwayat peminjaman
          </span>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 shadow-sm transition-colors cursor-not-allowed opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#99BD4A] text-white font-bold shadow-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 shadow-sm transition-colors cursor-not-allowed opacity-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
