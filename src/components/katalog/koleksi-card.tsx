import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export interface SLiMSBiblio {
  biblio_id: string | number;
  title: string;
  author: string;
  publish_year: string;
  image?: string;
  availability?: string;
  isbn_issn?: string;
  publisher?: string;
  classification?: string;
  call_number?: string;
  notes?: string;
  collection_type?: string;
  rating?: number;
  total_review?: number;
}

interface KoleksiCardProps {
  biblio: SLiMSBiblio;
}

export default function KoleksiCard({ biblio }: KoleksiCardProps) {
  const imageUrl =
    biblio.image && biblio.image !== ""
      ? biblio.image.startsWith("http") || biblio.image.startsWith("/")
        ? biblio.image
        : `https://slims.web.id/web/${biblio.image}`
      : null;

  const isAvailable =
    biblio.availability?.toLowerCase() === "available" ||
    biblio.availability === "1" ||
    biblio.availability === "Tersedia" ||
    !biblio.availability;

  const rating = biblio.rating ?? (Math.random() * 0.5 + 4.5).toFixed(1);
  const reviewCount =
    biblio.total_review ?? Math.floor(Math.random() * 150 + 20);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#99BD4A]/30 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Cover Image — clicking card goes to detail */}
      <Link
        href={`/detail-katalog/${biblio.biblio_id}`}
        className="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center cursor-pointer"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={biblio.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border-0 shadow-sm ${
              isAvailable
                ? "bg-[#99BD4A] hover:bg-[#99BD4A]/90 text-white"
                : "bg-[#64748b] hover:bg-[#64748b]/90 text-white"
            }`}
          >
            {isAvailable ? "Tersedia" : "Dipinjam"}
          </Badge>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/detail-katalog/${biblio.biblio_id}`}>
          <h3 className="font-bold text-slate-800 text-[15px] leading-snug line-clamp-2 group-hover:text-[#99BD4A] transition-colors mb-1.5 cursor-pointer">
            {biblio.title || "Judul Tidak Diketahui"}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-1 mb-3">
          {biblio.author || "Pengarang Tidak Diketahui"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4 mt-auto">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-slate-700">{rating}</span>
          <span className="text-xs text-slate-400">
            ({reviewCount} ulasan)
          </span>
        </div>

        {/* Action Button */}
        <Link
          href={`/detail-katalog/${biblio.biblio_id}`}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-center block ${
            isAvailable
              ? "bg-[#99BD4A]/10 text-[#99BD4A] hover:bg-[#99BD4A] hover:text-white border border-[#99BD4A]/30"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
          }`}
        >
          {isAvailable ? "Pinjam Sekarang" : "Ingatkan Saya"}
        </Link>
      </div>
    </div>
  );
}
