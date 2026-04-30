"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
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
      className="w-[72px] h-[96px] rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-md"
      style={{
        background: `linear-gradient(145deg, ${book.coverColor}, ${book.coverAccent})`,
      }}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyNSAxMEwzNSAxMEwyNyAxN0wzMCAyN0wyMCAyMkwxMCAyN0wxMyAxN0w1IDEwTDE1IDEwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />
      <span className="text-white text-[9px] font-bold text-center px-2 leading-tight drop-shadow-sm">
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

      <div className="flex flex-col gap-4">
        {borrowedBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 items-start hover:shadow-md hover:border-slate-200 transition-all duration-300 group cursor-pointer"
          >
            <BookCover book={book} />

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[15px] text-[#1e293b] group-hover:text-[#99BD4A] transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">{book.author}</p>

              <div className="flex items-center gap-1.5 mt-2">
                <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-semibold text-orange-600">
                  Sisa {book.daysLeft} Hari
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">
                    Progres Waktu
                  </span>
                  <span className="font-bold text-[#1e293b]">
                    {book.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${book.progress}%`,
                      background: "linear-gradient(90deg, #5b9bd5, #3a7bc8)",
                    }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                Pinjam: {book.borrowDate} - Kembali: {book.returnDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
