import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const currentFrom = pathname === "/" ? "beranda" : pathname.split("/")[1] || "katalog";

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
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#99BD4A]/30 transition-all duration-300 flex flex-col h-full p-4">
      {/* Cover Image */}
      <Link
        href={`/detail-katalog/${biblio.biblio_id}?from=${currentFrom}`}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#f6f5ef] flex items-center justify-center cursor-pointer mb-4 shrink-0"
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
            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 border-0 shadow-none rounded-full ${
              isAvailable
                ? "bg-[#99BD4A] text-white hover:bg-[#8aac3d]"
                : "bg-[#94a3b8] text-white hover:bg-[#8292a8]"
            }`}
          >
            {isAvailable ? "Tersedia" : "Dipinjam"}
          </Badge>
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1">
        <Link href={`/detail-katalog/${biblio.biblio_id}?from=${currentFrom}`}>
          <h3 className="font-extrabold text-[#1e293b] text-[18px] leading-tight line-clamp-2 group-hover:text-[#99BD4A] transition-colors mb-1.5 cursor-pointer">
            {biblio.title || "Judul Tidak Diketahui"}
          </h3>
        </Link>
        <p className="text-[15px] font-medium text-slate-500 line-clamp-1 mb-3">
          {biblio.author || "Pengarang Tidak Diketahui"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-5 mt-auto">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-[14px] font-bold text-[#1e293b]">{rating}</span>
          <span className="text-[13px] font-medium text-slate-400">
            ({reviewCount} ulasan)
          </span>
        </div>

        {/* Action Button */}
        <Link
          href={`/detail-katalog/${biblio.biblio_id}?from=${currentFrom}`}
          className={`w-full py-3 rounded-xl text-[15px] font-bold transition-all duration-200 text-center block ${
            isAvailable
              ? "bg-[#f4f7f4] text-[#99BD4A] hover:bg-[#99BD4A] hover:text-white"
              : "bg-[#f1f5f9] text-[#94a3b8] hover:bg-slate-200"
          }`}
        >
          {isAvailable ? "Pinjam Sekarang" : "Ingatkan Saya"}
        </Link>
      </div>
    </div>
  );
}
