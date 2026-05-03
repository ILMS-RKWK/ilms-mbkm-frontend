"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  MessageSquare,
} from "lucide-react";
import { StatusModal } from "@/components/ui/status-modal";
import { useParams } from "next/navigation";
import kegiatanData from "@/json/kegiatan.json";

export default function DetailKegiatanPage() {
  const params = useParams();
  const [commentInput, setCommentInput] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Fetch from mock JSON data based on params.id
  const kegiatanId = params.id as string;
  const kegiatan =
    kegiatanData.find((item) => item.id === kegiatanId) || kegiatanData[0];

  const [comments, setComments] = useState([
    {
      id: "1",
      name: "Budi Santoso",
      time: "2 jam yang lalu",
      text: "Sangat menginspirasi! Apakah workshop ini terbuka untuk umum atau hanya untuk guru saja?",
      avatar: "/images/avatar-1.jpg",
    },
    {
      id: "2",
      name: "Siti Aminah",
      time: "5 jam yang lalu",
      text: "Ditunggu kehadirannya di Wadas Kelir! Saya sudah mendaftar via WhatsApp tadi pagi.",
      avatar: "/images/avatar-2.jpg",
    },
  ]);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      name: "Pengguna Anonim",
      time: "Baru saja",
      text: commentInput,
      avatar: "", // Fallback will show initial
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
    setIsSuccessModalOpen(true);
  };

  const recentPosts = [
    {
      id: "101",
      title: "Penerimaan Donasi Buku Juli 2024",
      date: "18 Mei 2024",
      image: "/images/post-1.jpg",
    },
    {
      id: "102",
      title: "Membangun Karakter Anak...",
      date: "15 Mei 2024",
      image: "/images/post-2.jpg",
    },
    {
      id: "103",
      title: "Profil Relawan Bulan Ini: Kak Maya",
      date: "10 Mei 2024",
      image: "/images/post-3.jpg",
    },
  ];

  const relatedKegiatan = kegiatanData
    .filter((item) => item.id !== kegiatan.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-[1100px] mx-auto w-full px-6 pt-8">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] md:aspect-[24/10] bg-slate-900 rounded-2xl overflow-hidden mb-8 shadow-sm">
          {/* Fallback pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-[#1e293b] flex items-center justify-center">
            <div className="w-40 h-40 border-[16px] border-slate-700/50 rounded-full"></div>
            <div className="absolute w-24 h-24 border-[12px] border-slate-600/30 rounded-sm rotate-45"></div>
          </div>
          <Image
            src={kegiatan.image}
            alt={kegiatan.title}
            fill
            className="object-cover relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Back Button Overlay */}
          <div className="absolute top-6 left-6 z-20">
            <Link
              href="/kegiatan"
              className="inline-flex items-center gap-2 bg-[#b4d262] hover:bg-[#9fc53a] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
        </div>

        {/* Title & Metadata Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-[#b4d262] text-white text-[11px] font-extrabold px-3 py-1.5 rounded uppercase tracking-wider">
              {kegiatan.category}
            </span>
            <span className="text-slate-500 text-[13px] font-medium">
              Dipublikasikan {kegiatan.publishDate}
            </span>
          </div>
          <h1 className="text-[32px] md:text-[44px] font-extrabold text-[#111827] leading-[1.15] mb-8 tracking-tight max-w-[800px]">
            {kegiatan.title}
          </h1>

          {/* Info Boxes */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row gap-8 shadow-sm">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-[#f6f8f1] text-[#99BD4A] p-3 rounded-xl shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[#64748b] text-[12px] font-bold tracking-wider uppercase block mb-1">
                  Waktu & Tanggal
                </span>
                <span className="text-[#1e293b] text-[15px] font-bold">
                  {kegiatan.timeInfo}
                </span>
              </div>
            </div>

            <div className="hidden md:block w-px bg-slate-100"></div>

            <div className="flex items-start gap-4 flex-1">
              <div className="bg-[#f6f8f1] text-[#99BD4A] p-3 rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[#64748b] text-[12px] font-bold tracking-wider uppercase block mb-1">
                  Tempat Kegiatan
                </span>
                <span className="text-[#1e293b] text-[15px] font-bold">
                  {kegiatan.locationInfo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Main Content & Comments */}
          <div className="lg:col-span-2">
            {/* Rich Text Content */}
            <div className="prose prose-slate max-w-none mb-16">
              {kegiatan.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[#4b5563] text-[16px] md:text-[17px] leading-[1.8] mb-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <hr className="border-slate-100 mb-12" />

            {/* Komentar Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-1 bg-[#99BD4A] rounded-full"></div>
                <h3 className="text-[22px] font-extrabold text-[#111827]">
                  Komentar
                </h3>
              </div>

              {/* Comment Input */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-10">
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Berikan pendapat atau pertanyaan Anda..."
                  className="w-full bg-[#F8F9FA] text-slate-900 border-none rounded-xl p-4 text-[15px] outline-none min-h-[120px] resize-y mb-4 placeholder:text-slate-400 focus:ring-1 focus:ring-[#99BD4A]/50"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-[#b4d262] hover:bg-[#9fc53a] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm"
                  >
                    Kirim Komentar
                  </button>
                </div>
              </div>

              {/* Comment List */}
              <div className="flex flex-col gap-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-xl bg-slate-200 shrink-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#2c4c3b] to-[#426152] flex items-center justify-center text-white font-bold text-lg">
                        {comment.name.charAt(0)}
                      </div>
                      <Image
                        src={comment.avatar}
                        alt={comment.name}
                        fill
                        className="object-cover relative z-10"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    {/* Comment Body */}
                    <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-extrabold text-[#111827] text-[15px]">
                          {comment.name}
                        </span>
                        <span className="text-[#94a3b8] text-[12px] font-medium">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[14px] leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kegiatan Lainnya Section */}
            <div className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-1 bg-[#99BD4A] rounded-full"></div>
                <h3 className="text-[22px] font-extrabold text-[#111827]">
                  Kegiatan Lainnya
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedKegiatan.map((item) => (
                  <Link
                    href={`/kegiatan/${item.id}`}
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col group"
                  >
                    <div className="relative w-full aspect-[16/10] bg-slate-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2c4c3b] to-[#426152] flex items-center justify-center">
                        {/* Pattern fallback */}
                        <div className="w-20 h-20 rounded-full border-[8px] border-white/10"></div>
                      </div>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[#b4d262] text-[12px] font-bold tracking-wider uppercase mb-2 block">
                        {item.category}
                      </span>
                      <h4 className="font-extrabold text-[#1e293b] text-[18px] leading-snug group-hover:text-[#99BD4A] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Widgets */}
          <div className="lg:col-span-1 flex flex-col gap-6 sticky top-24 h-fit">
            {/* Postingan Terbaru */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-1 bg-[#99BD4A] rounded-full"></div>
                <h4 className="text-[17px] font-extrabold text-[#111827]">
                  Postingan Terbaru
                </h4>
              </div>

              <div className="flex flex-col gap-5">
                {recentPosts.map((post) => (
                  <Link
                    href="#"
                    key={post.id}
                    className="flex items-center gap-4 group"
                  >
                    <div className="relative w-16 h-16 rounded-xl bg-slate-800 shrink-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center text-slate-400 font-bold text-xl">
                        {post.id.slice(-1)}
                      </div>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover relative z-10 group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1e293b] text-[14px] leading-snug mb-1 group-hover:text-[#99BD4A] transition-colors line-clamp-2">
                        {post.title}
                      </span>
                      <span className="text-[#94a3b8] text-[12px] font-medium">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bagikan Kegiatan */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
              <span className="font-extrabold text-[#111827] text-[15px]">
                Bagikan Kegiatan:
              </span>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-[#F8F9FA] hover:bg-slate-100 text-[#64748b] flex items-center justify-center transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-[#F8F9FA] hover:bg-slate-100 text-[#64748b] flex items-center justify-center transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatusModal
        isOpen={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        status="success"
        title={
          <>
            Komentar Berhasil
            <br />
            Terkirim!
          </>
        }
        description="Terima kasih atas tanggapan Anda! Komentar Anda telah berhasil ditambahkan."
        actionLabel="Tutup"
        onAction={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
