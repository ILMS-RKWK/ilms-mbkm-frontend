"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import berandaData from "@/json/beranda.json";

interface BorrowedBook {
  id: number;
  title: string;
  author: string;
  daysLeft: number;
  progress: number;
  borrowDate: string;
  returnDate: string;
  coverColor: string;
  coverAccent: string;
}

function BookCover({ book }: { book: BorrowedBook }) {
  return (
    <div
      className="w-[88px] h-[116px] rounded-[14px] flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm"
      style={{
        background: `linear-gradient(145deg, ${book.coverColor}, ${book.coverAccent})`,
      }}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyNSAxMEwzNSAxMEwyNyAxN0wzMCAyN0wyMCAyMkwxMCAyN0wxMyAxN0w1IDEwTDE1IDEwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />
      <span className="text-white text-[11px] font-bold text-center px-2 leading-snug drop-shadow-sm uppercase tracking-wide">
        {book.title}
      </span>
    </div>
  );
}

export default function SedangDipinjam() {
  const borrowedBooks: BorrowedBook[] = berandaData.borrowedBooks;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#1e293b]">Sedang Dipinjam</h2>
        <Link
          href="/pinjaman"
          className="text-sm font-semibold text-[#99BD4A] hover:text-[#7A9A35] transition-colors"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {borrowedBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-[20px] border border-slate-100 p-5 flex flex-col gap-6 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 group cursor-pointer"
          >
            {/* Top Section */}
            <div className="flex gap-4">
              <BookCover book={book} />
              
              <div className="flex-1 flex flex-col justify-center py-1">
                <h3 className="font-extrabold text-[18px] text-[#1e293b] leading-tight mb-1.5 group-hover:text-[#99BD4A] transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-[15px] font-medium text-slate-500 mb-3">
                  {book.author}
                </p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <Clock className={`w-4 h-4 ${book.daysLeft <= 5 ? "text-orange-500" : "text-[#99BD4A]"}`} />
                  <span className={`text-[13px] font-bold ${book.daysLeft <= 5 ? "text-orange-500" : "text-[#99BD4A]"}`}>
                    Sisa {book.daysLeft} Hari
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-bold text-slate-500">Progres Waktu</span>
                <span className="text-[14px] font-bold text-slate-600">{book.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out bg-[#99BD4A]"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
              <div className="mt-2 text-right">
                <span className="text-[12px] font-medium text-slate-400">
                  Pinjam: {book.borrowDate} - Kembali: {book.returnDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
