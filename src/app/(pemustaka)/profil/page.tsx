"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  BookOpen,
  FileText,
  Users,
  User,
  Mail,
  MapPin,
  CalendarDays,
  Camera,
  Save,
  Clock,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StatusModal } from "@/components/ui/status-modal";
import { CameraModal } from "@/components/ui/camera-modal";
import profilData from "@/json/profil.json";

export default function ProfilPage() {
  const [profile, setProfile] = useState(profilData);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editWhatsapp, setEditWhatsapp] = useState(profile.whatsapp);
  const [editAddress, setEditAddress] = useState(profile.address);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showModalAvatarMenu, setShowModalAvatarMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (imageDataUrl: string) => {
    setAvatarPreview(imageDataUrl);
  };

  const handleOpenEdit = () => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setEditWhatsapp(profile.whatsapp);
    setEditAddress(profile.address);
    setIsEditOpen(true);
  };

  const handleSaveProfile = () => {
    setProfile((prev) => ({
      ...prev,
      name: editName,
      email: editEmail,
      whatsapp: editWhatsapp,
      address: editAddress,
    }));
    setIsEditOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[1100px] mx-auto w-full px-6 py-10">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
            {/* Avatar */}
            <div className="relative w-[120px] h-[120px] shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#B4D568] to-[#99BD4A] overflow-hidden ring-4 ring-white shadow-lg">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-extrabold">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover relative z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </>
                )}
              </div>
              {/* Camera button with dropdown */}
              <div className="absolute -bottom-1 -right-1 z-20">
                <button
                  onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                  className="w-8 h-8 bg-[#99BD4A] rounded-full flex items-center justify-center ring-3 ring-white shadow-sm hover:bg-[#87A840] transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                {showAvatarMenu && (
                  <div className="absolute bottom-10 -left-16 bg-white rounded-xl shadow-lg border border-slate-100 py-2 w-[160px] z-30">
                    <button
                      onClick={() => {
                        setShowAvatarMenu(false);
                        setIsCameraOpen(true);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#334155] hover:bg-[#f4f7ee] transition-colors flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-[#99BD4A]" />
                      Ambil Foto
                    </button>
                    <button
                      onClick={() => {
                        setShowAvatarMenu(false);
                        fileInputRef.current?.click();
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#334155] hover:bg-[#f4f7ee] transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#99BD4A]" />
                      Pilih File
                    </button>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelected(file);
                }}
              />
            </div>

            {/* Name & Meta */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-[28px] md:text-[32px] font-extrabold text-[#0F172A] tracking-tight mb-1">
                {profile.name}
              </h1>
              <p className="text-[#64748b] text-[14px] font-medium flex items-center justify-center md:justify-start gap-2 mb-3">
                <CalendarDays className="w-4 h-4" />
                ID Anggota: {profile.memberId}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-[#99BD4A] text-[13px] font-bold">
                  {profile.status}
                </span>
                <span className="bg-[#f1f5f9] text-[#334155] text-[12px] font-bold px-3 py-1 rounded-lg border border-slate-200">
                  {profile.level}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleOpenEdit}
              className="flex items-center justify-center gap-2 bg-[#99BD4A] hover:bg-[#87A840] text-white px-6 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm w-full md:w-auto"
            >
              <Pencil className="w-4 h-4" />
              Edit Profil
            </button>
          </div>
        </div>

        {/* Main Grid: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column — sticky */}
          <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24 h-fit z-10">
            {/* Informasi Pribadi */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#99BD4A]" />
                <h3 className="text-[17px] font-extrabold text-[#0F172A]">
                  Informasi Pribadi
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[#99BD4A] text-[11px] font-bold tracking-[0.12em] uppercase mb-1">
                    Email
                  </p>
                  <p className="text-[#1e293b] text-[14px] font-semibold">
                    {profile.email}
                  </p>
                </div>
                <div>
                  <p className="text-[#99BD4A] text-[11px] font-bold tracking-[0.12em] uppercase mb-1">
                    WhatsApp
                  </p>
                  <p className="text-[#1e293b] text-[14px] font-semibold">
                    {profile.whatsapp}
                  </p>
                </div>
                <div>
                  <p className="text-[#99BD4A] text-[11px] font-bold tracking-[0.12em] uppercase mb-1">
                    Alamat
                  </p>
                  <p className="text-[#1e293b] text-[14px] font-semibold leading-relaxed">
                    {profile.address}
                  </p>
                </div>
                <div>
                  <p className="text-[#99BD4A] text-[11px] font-bold tracking-[0.12em] uppercase mb-1">
                    Anggota Sejak
                  </p>
                  <p className="text-[#1e293b] text-[14px] font-semibold">
                    {profile.memberSince}
                  </p>
                </div>
              </div>
            </div>

            {/* Kategori Favorit */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-[#99BD4A]" />
                <h3 className="text-[17px] font-extrabold text-[#0F172A]">
                  Kategori Favorit
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {profile.kategoriFavorit.map((cat) => (
                  <div key={cat.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-semibold text-[#334155]">
                        {cat.label}
                      </span>
                      <span
                        className="text-[13px] font-bold"
                        style={{ color: cat.color }}
                      >
                        {cat.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.percentage}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 border border-slate-200 text-[12px] font-bold text-[#334155] rounded-lg bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — col-span-2 */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Stats Row — full width above the grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4f7ee] flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-[#99BD4A]" />
                </div>
                <div>
                  <p className="text-[28px] font-extrabold text-[#0F172A] leading-none">
                    {profile.stats.bukuDibaca}
                  </p>
                  <p className="text-[#64748b] text-[13px] font-medium mt-1">
                    Buku Dibaca
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4f7ee] flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-[#99BD4A]" />
                </div>
                <div>
                  <p className="text-[28px] font-extrabold text-[#0F172A] leading-none">
                    {profile.stats.sedangDipinjam}
                  </p>
                  <p className="text-[#64748b] text-[13px] font-medium mt-1">
                    Sedang Dipinjam
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4f7ee] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#99BD4A]" />
                </div>
                <div>
                  <p className="text-[28px] font-extrabold text-[#0F172A] leading-none">
                    {profile.stats.poinKomunitas.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[#64748b] text-[13px] font-medium mt-1">
                    Poin Komunitas
                  </p>
                </div>
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#99BD4A]" />
                  <h3 className="text-[17px] font-extrabold text-[#0F172A]">
                    Aktivitas Terbaru
                  </h3>
                </div>
                <Link
                  href="/pinjaman"
                  className="text-[#99BD4A] text-[13px] font-bold hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {profile.aktivitasTerbaru.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#F8F9FA] border border-slate-50"
                  >
                    {/* Book Thumbnail */}
                    <div className="relative w-[50px] h-[70px] sm:w-14 sm:h-[70px] rounded-lg bg-gradient-to-br from-[#d4c5a9] to-[#b8a88a] shrink-0 overflow-hidden shadow-sm">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white/60" />
                      </div>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover relative z-10"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0 pt-0.5 sm:pt-0">
                      <p className="text-[14px] sm:text-[15px] font-bold text-[#1e293b] leading-snug line-clamp-2 sm:line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[#64748b] text-[12px] sm:text-[13px] font-medium truncate">
                        {item.author}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-1.5">
                        <span
                          className="text-[10px] sm:text-[11px] font-bold text-white px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md whitespace-nowrap"
                          style={{ backgroundColor: item.statusColor }}
                        >
                          {item.status}
                        </span>
                        <span className="text-[#94a3b8] text-[11px] font-medium shrink-0">
                          • {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[620px] max-h-[90vh] overflow-y-auto p-0 bg-white rounded-[20px] border-0 shadow-2xl">
          {/* Header */}
          <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 sticky top-0 bg-white z-40 border-b border-slate-100">
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#0F172A]">
              Edit Profil Peminjam
            </h2>
            <p className="text-[#64748b] text-[13px] sm:text-[14px] font-medium mt-1">
              Perbarui informasi akun Anda untuk layanan perpustakaan
            </p>
          </div>

           {/* Avatar Upload */}
          <div className="flex flex-col items-center py-6">
            <div className="relative w-[100px] h-[100px] mb-3">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#B4D568] to-[#99BD4A] overflow-hidden ring-4 ring-white shadow-md">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-extrabold">
                      {editName.charAt(0).toUpperCase()}
                    </div>
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover relative z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 z-20">
                <button
                  onClick={() => setShowModalAvatarMenu(!showModalAvatarMenu)}
                  className="w-8 h-8 bg-[#99BD4A] rounded-full flex items-center justify-center ring-2 ring-white shadow-sm hover:bg-[#87A840] transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                {showModalAvatarMenu && (
                  <div className="absolute bottom-10 -left-16 bg-white rounded-xl shadow-lg border border-slate-100 py-2 w-[160px] z-30">
                    <button
                      onClick={() => {
                        setShowModalAvatarMenu(false);
                        setIsEditOpen(false);
                        setTimeout(() => setIsCameraOpen(true), 200);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#334155] hover:bg-[#f4f7ee] transition-colors flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-[#99BD4A]" />
                      Ambil Foto
                    </button>
                    <button
                      onClick={() => {
                        setShowModalAvatarMenu(false);
                        modalFileInputRef.current?.click();
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#334155] hover:bg-[#f4f7ee] transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#99BD4A]" />
                      Pilih File
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[14px] font-bold text-[#0F172A]">
              Unggah Foto Profil
            </p>
            <p className="text-[12px] text-[#94a3b8] font-medium">
              Format JPG, PNG maksimal 2MB
            </p>
            <button
              onClick={() => modalFileInputRef.current?.click()}
              className="mt-3 px-5 py-2 border border-[#99BD4A] text-[#99BD4A] rounded-lg text-[13px] font-bold hover:bg-[#f4f7ee] transition-colors"
            >
              Pilih File Baru
            </button>
            <input
              ref={modalFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelected(file);
              }}
            />
          </div>

          {/* Form */}
          <div className="px-5 sm:px-8 pb-4 flex flex-col gap-4 sm:gap-5">
            {/* Row 1: Nama & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-semibold text-[#334155] block mb-2">
                  Nama Lengkap
                </label>
                <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#99BD4A]/30 focus-within:border-[#99BD4A] transition-all">
                  <User className="w-4 h-4 text-[#94a3b8] shrink-0" />
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 text-[14px] text-[#1e293b] font-medium outline-none bg-transparent placeholder:text-[#c1c7cd]"
                    placeholder="Masukkan nama"
                  />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#334155] block mb-2">
                  Alamat Email
                </label>
                <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#99BD4A]/30 focus-within:border-[#99BD4A] transition-all">
                  <Mail className="w-4 h-4 text-[#94a3b8] shrink-0" />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="flex-1 text-[14px] text-[#1e293b] font-medium outline-none bg-transparent placeholder:text-[#c1c7cd]"
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: WhatsApp & ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-semibold text-[#334155] block mb-2">
                  Nomor WhatsApp
                </label>
                <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#99BD4A]/30 focus-within:border-[#99BD4A] transition-all">
                  <span className="text-[#94a3b8] text-[13px] font-medium shrink-0">
                    +62
                  </span>
                  <input
                    type="text"
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    className="flex-1 text-[14px] text-[#1e293b] font-medium outline-none bg-transparent placeholder:text-[#c1c7cd]"
                    placeholder="81234567890"
                  />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#334155] block mb-2">
                  ID Anggota
                </label>
                <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50">
                  <CalendarDays className="w-4 h-4 text-[#94a3b8] shrink-0" />
                  <span className="text-[14px] text-[#94a3b8] font-medium">
                    {profile.memberId}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: Alamat */}
            <div>
              <label className="text-[13px] font-semibold text-[#334155] block mb-2">
                Alamat Lengkap
              </label>
              <div className="flex items-start gap-2.5 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#99BD4A]/30 focus-within:border-[#99BD4A] transition-all">
                <MapPin className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
                <textarea
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  rows={2}
                  className="flex-1 text-[14px] text-[#1e293b] font-medium outline-none bg-transparent placeholder:text-[#c1c7cd] resize-none"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 sticky bottom-0 bg-white z-40 border-t border-slate-100">
            <button
              onClick={() => setIsEditOpen(false)}
              className="w-full sm:w-auto px-8 py-3 sm:py-3 border border-slate-200 text-[#334155] rounded-xl font-bold text-[14px] hover:bg-slate-50 transition-colors order-2 sm:order-1"
            >
              Batal
            </button>
            <button
              onClick={handleSaveProfile}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 sm:py-3 bg-[#99BD4A] hover:bg-[#87A840] text-white rounded-xl font-bold text-[14px] transition-colors shadow-sm order-1 sm:order-2"
            >
              <Save className="w-4 h-4 shrink-0" />
              Simpan Perubahan
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <StatusModal
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        status="success"
        title={
          <>
            Berhasil Mengubah
            <br />
            Profile!
          </>
        }
        description="Profil Anda berhasil diperbarui. Pastikan data yang Anda masukkan sudah benar. Perubahan dapat dilihat pada halaman profil Anda."
        actionLabel="Tutup"
        onAction={() => setIsSuccessOpen(false)}
      />

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onOpenChange={setIsCameraOpen}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
