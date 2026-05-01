"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Star, Calendar, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApiBook {
  biblio_id: string | number;
  title: string;
  author: string;
  classification?: string;
  rating?: number;
  isbn_issn?: string;
  publisher?: string;
  publish_year?: string;
  pages?: string;
  call_number?: string;
  availability?: string;
  notes?: string;
  image?: string;
}

interface MappedBook {
  id: string | number;
  title: string;
  author: string;
  ddc?: string;
  rating: string | number;
  isbn: string;
  publisher: string;
  year: string;
  language: string;
  pages: string;
  rack: string;
  loanDays: number;
  status: string;
  synopsis: string[];
  image: string | null;
}

interface SimilarBook {
  id: string | number;
  title: string;
  author: string;
  image: string | null;
}

const ddcCategories = [
  { code: "000", label: "Karya Umum" },
  { code: "100", label: "Filsafat & Psikologi" },
  { code: "200", label: "Agama" },
  { code: "300", label: "Ilmu Sosial" },
  { code: "400", label: "Bahasa" },
  { code: "500", label: "Sains & Matematika" },
  { code: "600", label: "Teknologi" },
  { code: "700", label: "Kesenian & Olahraga" },
  { code: "800", label: "Sastra" },
  { code: "900", label: "Sejarah & Geografi" },
];

export default function DetailKatalogPage() {
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<MappedBook | null>(null);
  const [similarBooks, setSimilarBooks] = useState<SimilarBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string>("14");
  const [customDuration, setCustomDuration] = useState<number>(7);

  // Date formatting
  const today = new Date();
  const todayStr = today.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
  const actualDuration = selectedDuration === "custom" ? customDuration : parseInt(selectedDuration) || 14;
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + actualDuration);
  const endDateStr = endDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/slims?limit=100");
        const json = await res.json();
        const data = json.data || [];

        const foundBook = data.find((b: ApiBook) => b.biblio_id.toString() === id);

        if (foundBook) {
          const mappedBook = {
            id: foundBook.biblio_id,
            title: foundBook.title,
            author: foundBook.author,
            ddc: foundBook.classification,
            rating: foundBook.rating || (Math.random() * 0.5 + 4.5).toFixed(1),
            isbn: foundBook.isbn_issn || "-",
            publisher: foundBook.publisher || "-",
            year: foundBook.publish_year || "-",
            language: "Indonesia",
            pages: foundBook.pages || "-",
            rack: foundBook.call_number || "-",
            loanDays: 14,
            status: foundBook.availability?.toLowerCase() === "available" || foundBook.availability === "1" || foundBook.availability === "Tersedia" || !foundBook.availability ? "TERSEDIA" : "DIPINJAM",
            synopsis: foundBook.notes ? [foundBook.notes] : ["Deskripsi tidak tersedia."],
            image: foundBook.image && foundBook.image !== "" 
                ? (foundBook.image.startsWith("http") || foundBook.image.startsWith("/") 
                    ? foundBook.image 
                    : `https://slims.web.id/web/${foundBook.image}`) 
                : null,
          };
          setBook(mappedBook);

          const similar = data
            .filter((b: ApiBook) => b.classification === foundBook.classification && b.biblio_id.toString() !== id)
            .slice(0, 6)
            .map((b: ApiBook) => ({
              id: b.biblio_id,
              title: b.title,
              author: b.author,
              image: b.image && b.image !== "" 
                ? (b.image.startsWith("http") || b.image.startsWith("/") 
                    ? b.image 
                    : `https://slims.web.id/web/${b.image}`) 
                : null,
            }));
          setSimilarBooks(similar);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#99BD4A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#6B7280] font-medium text-sm">Memuat informasi buku...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex-1 w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Buku Tidak Ditemukan</h2>
          <p className="text-[#6B7280] mb-6">Buku yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <Link href="/katalog" className="bg-[#99BD4A] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#87A840] transition-colors shadow-sm">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = ddcCategories.find(c => c.code === book.ddc)?.label || "Katalog";

  return (
    <div className="flex-1 w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[14px] text-[#6B7280] mt-8 mb-4">
          <Link href="/katalog" className="hover:text-[#99BD4A] transition-colors">
            Katalog
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="hover:text-[#99BD4A] transition-colors cursor-pointer">{categoryName}</span>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="font-bold text-[#111827]">Detail Buku</span>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 py-4">
          {/* Kolom Kiri */}
          <div className="w-full lg:w-[32%] flex flex-col gap-6">
            <div className="bg-[#99BD4A] rounded-[24px] p-6 relative flex flex-col items-center justify-center min-h-[400px]">
              {/* Badge Tersedia */}
              <div className="absolute top-5 left-5 bg-[#87A840] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 tracking-widest uppercase shadow-sm z-10">
                <span className={`w-1.5 h-1.5 rounded-full ${book.status === "TERSEDIA" ? "bg-white" : "bg-red-500"}`}></span>
                {book.status}
              </div>

              {/* Cover */}
              <div className="w-[80%] aspect-[3/4] rounded-md shadow-2xl relative overflow-hidden flex items-center justify-center mt-4">
                {book.image ? (
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    <span className="text-slate-400 font-medium text-sm">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Informasi Buku Card */}
            <div className="bg-white rounded-[20px] p-7 shadow-sm border border-slate-100">
              <h3 className="font-bold text-[#111827] text-[16px] mb-6 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#99BD4A] text-[#99BD4A] flex items-center justify-center text-[12px] font-bold">i</div>
                Informasi Buku
              </h3>
              <div className="flex flex-col gap-4 text-[14px]">
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] font-medium text-[13px]">ISBN</span>
                  <span className="font-bold text-[#111827] text-[13px]">{book.isbn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] font-medium text-[13px]">Penerbit</span>
                  <span className="font-bold text-[#111827] text-[13px] text-right">{book.publisher}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] font-medium text-[13px]">Tahun Terbit</span>
                  <span className="font-bold text-[#111827] text-[13px]">{book.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] font-medium text-[13px]">Bahasa</span>
                  <span className="font-bold text-[#111827] text-[13px]">{book.language}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] font-medium text-[13px]">Halaman</span>
                  <span className="font-bold text-[#111827] text-[13px]">{book.pages}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="w-full lg:flex-1 flex flex-col">
            {/* Title & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
              <h1 className="text-[40px] md:text-[44px] font-extrabold text-[#0F172A] leading-[1.15] lg:max-w-[85%]">
                {book.title}
              </h1>
              <div className="flex items-center gap-1.5 bg-[#FEFCE8] border border-yellow-100 rounded-xl px-4 py-2.5 shrink-0 shadow-sm mt-2 sm:mt-0">
                <Star className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                <span className="font-bold text-[#111827] text-[15px] ml-1">{book.rating}</span>
                <span className="text-[#6B7280] text-[13px]">/ 5 Rating</span>
              </div>
            </div>

            {/* Author & Category */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#99BD4A] text-[15px] font-bold">{book.author}</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#6B7280] text-[15px]">Kategori DDC: {book.ddc} - {categoryName}</span>
            </div>

            {/* Sinopsis Card */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 mb-6">
              <h3 className="font-extrabold text-[#111827] text-[18px] mb-4">Sinopsis</h3>
              <div className="text-[#4B5563] text-[15px] leading-[1.8] space-y-4">
                {book.synopsis.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Borrow Button */}
            <button 
              onClick={() => setIsBorrowModalOpen(true)}
              disabled={book.status !== "TERSEDIA"}
              className={`w-full font-bold text-[16px] py-4 rounded-[14px] shadow-sm transition-all mb-4 flex items-center justify-center gap-2 ${
                book.status === "TERSEDIA" 
                  ? "bg-[#99BD4A] hover:bg-[#87A840] text-white" 
                  : "bg-slate-200 text-[#9CA3AF] cursor-not-allowed"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8v6M9 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {book.status === "TERSEDIA" ? "Pinjam Buku Sekarang" : "Buku Tidak Tersedia"}
            </button>

            {/* Availability Notice */}
            <div className="bg-[#99BD4A]/10 border border-[#99BD4A]/20 rounded-[14px] p-5 flex items-start gap-3">
              <div className="mt-0.5 shrink-0 text-[#99BD4A]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[#4B5563] text-[14px] leading-relaxed">
                {book.status === "TERSEDIA" 
                  ? `Buku ini tersedia dalam format fisik di Rak ${book.rack}. Durasi peminjaman maksimal ${book.loanDays} hari.` 
                  : "Buku ini sedang dipinjam oleh pemustaka lain. Silakan cek kembali nanti atau hubungi pustakawan."}
              </p>
            </div>
          </div>
        </div>

        {/* Buku Serupa Section */}
        {similarBooks.length > 0 && (
          <div className="mt-12 pt-10 border-t border-slate-100">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[24px] font-extrabold text-[#0F172A] mb-1">Buku Serupa</h2>
                <p className="text-[15px] text-[#6B7280]">Rekomendasi buku dari kategori {categoryName}</p>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white bg-transparent transition-colors">
                  <ChevronLeft className="w-5 h-5 text-slate-400" />
                </button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white bg-transparent transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {similarBooks.map((simBook) => (
                <Link 
                  href={`/detail-katalog/${simBook.id}`} 
                  key={simBook.id} 
                  className="flex flex-col gap-3 min-w-[160px] md:min-w-[200px] snap-start group cursor-pointer"
                >
                  <div className="w-full aspect-[3/4] bg-slate-100 rounded-[20px] overflow-hidden relative shadow-sm transition-all group-hover:shadow-md">
                    {simBook.image ? (
                      <Image
                        src={simBook.image}
                        alt={simBook.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200">
                        <span className="text-slate-400 text-xs font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="px-1 mt-1">
                    <h4 className="font-bold text-[#0F172A] text-[16px] leading-snug group-hover:text-[#99BD4A] transition-colors mb-1 line-clamp-2">
                      {simBook.title}
                    </h4>
                    <p className="text-[13px] text-[#6B7280] line-clamp-1">{simBook.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Peminjaman */}
        {book && (
          <Dialog open={isBorrowModalOpen} onOpenChange={setIsBorrowModalOpen}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-[24px] border-none shadow-xl">
              <DialogHeader className="p-6 pb-4 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                <DialogTitle className="text-[20px] font-extrabold text-[#0F172A]">Konfirmasi Peminjaman Buku</DialogTitle>
              </DialogHeader>
              
              <div className="p-6 flex flex-col gap-6">
                {/* Card Buku di Dalam Modal */}
                <div className="bg-[#FCFDFC] border border-[#E5E7EB] rounded-[16px] p-4 flex gap-5">
                  <div className="w-[80px] h-[110px] shrink-0 rounded-lg overflow-hidden relative shadow-sm border border-slate-100">
                    {book.image ? (
                      <Image src={book.image} alt={book.title} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full bg-slate-200"></div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[11px] font-bold text-[#9CA3AF] tracking-widest uppercase mb-1">Detail Buku</span>
                    <h4 className="font-extrabold text-[#0F172A] text-[18px] leading-snug mb-1 line-clamp-1">{book.title}</h4>
                    <p className="text-[#6B7280] text-[14px] mb-3">{book.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#F0F5E8] text-[#99BD4A] text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {categoryName.split(' ')[0] || "FIKSI"}
                      </span>
                      <span className="text-[13px] text-[#6B7280] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#99BD4A]"></span>
                        Tersedia
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Input */}
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#0F172A]">Tanggal Mulai Pinjam</label>
                    <div className="border border-[#E5E7EB] rounded-xl px-4 py-3.5 bg-[#F9FAFB] flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#9CA3AF]" />
                      <span className="text-[14px] text-[#4B5563]">{todayStr}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#0F172A]">Durasi Peminjaman</label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger className="py-6 w-full border-[#E5E7EB] rounded-xl px-4 bg-white hover:border-[#99BD4A] transition-colors focus:ring-0 focus:ring-offset-0 focus:border-[#99BD4A] outline-none">
                        <div className="flex items-center gap-3 text-left">
                          <Clock className="w-5 h-5 text-[#9CA3AF] shrink-0" />
                          <span className="text-[14px] text-[#0F172A] font-bold mt-0.5">
                            <SelectValue placeholder="Pilih durasi" />
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[#E5E7EB] shadow-lg bg-white">
                        <SelectItem value="7" className="font-medium cursor-pointer py-2.5">7 Hari</SelectItem>
                        <SelectItem value="14" className="font-medium cursor-pointer py-2.5">14 Hari</SelectItem>
                        <SelectItem value="30" className="font-medium cursor-pointer py-2.5">30 Hari</SelectItem>
                        <SelectItem value="custom" className="font-medium cursor-pointer py-2.5 text-[#99BD4A]">Kustom...</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedDuration === "custom" && (
                      <div className="flex items-center gap-3 animate-in slide-in-from-top-1 fade-in mt-1">
                        <input 
                          type="number" 
                          min="1"
                          value={customDuration}
                          onChange={(e) => setCustomDuration(Number(e.target.value) || 1)}
                          className="border border-[#E5E7EB] rounded-xl px-4 py-2.5 w-full text-[14px] font-bold text-[#0F172A] outline-none focus:border-[#99BD4A] transition-colors" 
                          placeholder="Masukkan hari"
                        />
                        <span className="text-[13px] font-bold text-[#4B5563]">Hari</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Estimasi Tanggal Kembali */}
                <div className="bg-[#F4F7F4] border border-[#99BD4A]/30 border-dashed rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-[#6B7280] mb-1">Estimasi Tanggal Kembali</p>
                    <p className="font-extrabold text-[#0F172A] text-[16px]">{endDateStr}</p>
                  </div>
                  <Calendar className="w-6 h-6 text-[#99BD4A]" />
                </div>

                {/* Checkbox Syarat & Ketentuan */}
                <div className="flex items-start gap-3 mt-2">
                  <Checkbox 
                    id="terms" 
                    checked={isAgreed}
                    onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                    className="mt-1 border-slate-300 data-[state=checked]:bg-[#99BD4A] data-[state=checked]:border-[#99BD4A]"
                  />
                  <label htmlFor="terms" className="text-[14px] text-[#4B5563] leading-relaxed cursor-pointer select-none">
                    Saya setuju mematuhi <span className="text-[#99BD4A] font-bold">aturan perpustakaan</span> Rumah Kreatif Wadas Kelir dan bertanggung jawab atas kondisi buku.
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => setIsBorrowModalOpen(false)}
                    className="flex-1 py-4 rounded-xl border border-slate-200 text-[#4B5563] font-bold text-[15px] hover:bg-slate-50 transition-colors"
                  >
                    Batalkan
                  </button>
                  <button 
                    disabled={!isAgreed}
                    onClick={() => {
                      // Implement borrow logic here later
                      setIsBorrowModalOpen(false);
                      setIsAgreed(false);
                      setTimeout(() => {
                        setIsSuccessModalOpen(true);
                      }, 200);
                    }}
                    className={`flex-1 py-4 rounded-xl text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
                      isAgreed ? "bg-[#99BD4A] hover:bg-[#87A840] shadow-sm hover:-translate-y-0.5" : "bg-[#A3C757]/50 cursor-not-allowed"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Konfirmasi Pinjam
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Modal Sukses Peminjaman */}
        <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
          <DialogContent className="sm:max-w-[450px] p-8 overflow-hidden bg-white rounded-[24px] border-0 border-b-[12px] border-[#D5E4A6] shadow-2xl flex flex-col items-center text-center">
            {/* Custom close button inside is hidden by default if we use DialogContent, but let's hide default cross and manage it if needed. Actually default cross is fine. */}
            <div className="w-24 h-24 bg-[#F4F7F4] rounded-full flex items-center justify-center mb-4 mt-2">
              <div className="w-14 h-14 bg-[#99BD4A] rounded-full flex items-center justify-center shadow-md">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <h3 className="text-[22px] font-extrabold text-[#0F172A] mb-3 leading-tight">
              Permintaan Peminjaman<br/>Terkirim!
            </h3>
            
            <p className="text-[#6B7280] text-[15px] leading-relaxed mb-8 px-2">
              Buku Anda sedang dalam proses verifikasi oleh admin. Silakan cek status peminjaman Anda secara berkala di halaman Riwayat.
            </p>
            
            <Link 
              href="/"
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-4 bg-[#99BD4A] hover:bg-[#87A840] text-white rounded-xl font-bold text-[16px] transition-colors shadow-sm flex items-center justify-center"
            >
              Kembali ke Beranda
            </Link>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
