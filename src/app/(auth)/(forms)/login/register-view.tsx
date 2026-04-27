"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  BookOpenCheck,
  Calendar,
  Upload,
  Shield,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  FileText,
} from "lucide-react";

interface RegisterViewProps {
  onBackToLogin: () => void;
  onRegisterSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  successMsg: string;
  setError: (msg: string) => void;
  setSuccessMsg: (msg: string) => void;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  tanggal_lahir: string;
  nik: string;
  nama_orang_tua: string;
  kk_file: File | null;
}

/* ─── Stepper ────────────────────────────────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  const steps = ["Informasi Dasar", "Verifikasi Identitas", "Status Pendaftaran"];
  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = current > stepNum;
        const active = current === stepNum;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  done
                    ? "bg-[#9ABE4B] border-[#9ABE4B] text-white"
                    : active
                    ? "bg-[#9ABE4B] border-[#9ABE4B] text-white"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {done ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
              </div>
              <span
                className={`text-[12px] mt-2 font-semibold whitespace-nowrap ${
                  active ? "text-[#1a202c]" : done ? "text-[#9ABE4B]" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`w-20 lg:w-32 h-[2px] mx-2 mb-5 ${
                  current > stepNum ? "bg-[#9ABE4B]" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export function RegisterView({
  onBackToLogin,
  onRegisterSubmit,
  isLoading,
  error,
  successMsg,
  setError,
  setSuccessMsg,
}: RegisterViewProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phone: "",
    tanggal_lahir: "",
    nik: "",
    nama_orang_tua: "",
    kk_file: null,
  });
  const [kkPreview, setKkPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [regId] = useState(() => `REG-${Date.now().toString().slice(-8)}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      setError("Format file harus JPG, PNG, atau PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }
    setFormData((prev) => ({ ...prev, kk_file: file }));
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setKkPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setKkPreview(null);
    }
    setError("");
  }, [setError]);

  const goStep2 = () => {
    setError("");
    setSuccessMsg("");
    if (!formData.name || !formData.email || !formData.tanggal_lahir || !formData.phone) {
      setError("Harap lengkapi semua field.");
      return;
    }
    setStep(2);
  };

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!formData.kk_file) {
      setError("Harap unggah Kartu Keluarga (KK).");
      return;
    }
    if (!formData.nik || !formData.nama_orang_tua) {
      setError("Harap lengkapi semua field.");
      return;
    }
    try {
      await onRegisterSubmit(formData);
      setStep(3);
    } catch {
      // error handled by parent
    }
  };

  /* ─── STEP 1 ─────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div className="h-screen w-full flex bg-white font-sans text-slate-900 overflow-x-hidden">
        {/* Left Illustration */}
        <div className="hidden lg:flex w-1/2 bg-[#f6f9f4] flex-col items-center justify-center p-12 relative min-h-screen">
          <div className="flex-1 flex flex-col items-center justify-center max-w-md text-center w-full">
            <div className="w-16 h-16 rounded-2xl bg-[#e8f5e0] flex items-center justify-center mb-6">
              <BookOpenCheck className="w-8 h-8 text-[#6b8f4a]" />
            </div>
            <h2 className="text-[28px] font-extrabold text-[#1a202c] mb-4 leading-snug tracking-tight">
              Jendela Dunia di{"\n"}Genggaman Anda.
            </h2>
            <p className="text-slate-500 font-medium text-[14px] leading-relaxed max-w-[340px] mb-8">
              Bergabunglah dengan ribuan pembaca lainnya dan akses
              koleksi buku digital terlengkap kapan saja, di mana saja.
            </p>
            <div className="w-[300px] h-[340px] rounded-3xl overflow-hidden shadow-xl relative border-4 border-white/60">
              <Image
                src="/images/image-register-child.png"
                alt="Child reading"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:px-20 py-12 relative min-h-screen">
          <div className="w-full max-w-[460px]">
            {/* Step label */}
            <div className="mb-1">
              <span className="text-[#6b8f4a] text-[12px] font-bold tracking-[0.15em] uppercase">
                Langkah 1 dari 3
              </span>
              <div className="w-full bg-slate-200 h-[3px] rounded-full mt-2 mb-5">
                <div className="bg-[#9ABE4B] h-[3px] rounded-full" style={{ width: "33%" }} />
              </div>
            </div>

            <h1 className="text-[28px] font-extrabold text-[#1a202c] mb-2 tracking-tight">
              Informasi Dasar
            </h1>
            <p className="text-slate-500 text-[14px] font-medium leading-relaxed mb-7">
              Mari mulai dengan data diri Anda untuk membuat akun.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); goStep2(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#9ABE4B]" /> Nama Lengkap
                </Label>
                <Input
                  id="name" type="text" placeholder="Masukkan nama sesuai KTP"
                  value={formData.name} onChange={handleChange}
                  className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#9ABE4B]" /> Email
                </Label>
                <Input
                  id="email" type="email" placeholder="contoh@email.com"
                  value={formData.email} onChange={handleChange}
                  className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal_lahir" className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#9ABE4B]" /> Tanggal Lahir
                  </Label>
                  <Input
                    id="tanggal_lahir" type="date"
                    value={formData.tanggal_lahir} onChange={handleChange}
                    className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#9ABE4B]" /> Nomor WhatsApp
                  </Label>
                  <Input
                    id="phone" type="text" placeholder="+62 8123456789"
                    value={formData.phone} onChange={handleChange}
                    className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

              <Button
                type="submit"
                className="w-full mt-3 py-[24px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[15px] transition-colors duration-200 shadow-md shadow-[#9ABE4B]/20 flex items-center justify-center gap-2"
              >
                Lanjutkan Ke Tahap Berikutnya <ArrowRight className="w-5 h-5" />
              </Button>

              <div className="text-center text-[14px] text-slate-500 mt-4">
                Sudah punya akun?{" "}
                <button type="button" onClick={onBackToLogin} className="font-bold text-[#9ABE4B] hover:text-[#89A843]">
                  Masuk Sekarang
                </button>
              </div>

              <p className="text-[11px] text-slate-400 font-medium text-center mt-4 leading-relaxed">
                Dengan mendaftar, Anda menyetujui{" "}
                <a href="#" className="text-[#9ABE4B] hover:underline font-semibold">Syarat & Ketentuan</a>{" "}
                serta{" "}
                <a href="#" className="text-[#9ABE4B] hover:underline font-semibold">Kebijakan Privasi</a>{" "}
                Perpustakaan Digital. Data Anda akan kami jaga dengan standar keamanan enkripsi terkini.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ─── STEP 2 ─────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div className="min-h-screen w-full bg-white font-sans text-slate-900 overflow-y-auto">
        <StepIndicator current={2} />

        <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
          {/* Left info card */}
          <div className="bg-[#f6f9f4] rounded-2xl p-8 h-fit">
            <h2 className="text-[22px] font-extrabold text-[#1a202c] mb-2 leading-snug">
              Verifikasi Identitas<br />Anak
            </h2>
            <p className="text-slate-500 text-[13px] font-medium leading-relaxed mb-5">
              Pendaftar di <span className="text-[#9ABE4B] font-bold">bawah usia 18 tahun</span> diwajibkan
              melampirkan salinan Kartu Keluarga (KK) yang valid untuk proses verifikasi keanggotaan.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9ABE4B] mt-0.5 shrink-0" />
                <span className="text-[12px] text-slate-600 font-medium">
                  Pastikan seluruh data pada KK terbaca dengan jelas.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#9ABE4B] mt-0.5 shrink-0" />
                <span className="text-[12px] text-slate-600 font-medium">
                  Data Anda dijamin kerahasiaannya oleh sistem kami.
                </span>
              </div>
            </div>
            <div className="w-full h-[200px] rounded-xl overflow-hidden relative bg-slate-200">
              <Image src="/images/image-register-child.png" alt="Illustration" fill className="object-cover opacity-80" />
            </div>
          </div>

          {/* Right form */}
          <form onSubmit={submitRegistration} className="space-y-6">
            {/* Upload area */}
            <div className="space-y-2">
              <Label className="text-[13px] font-bold text-slate-700">
                Unggah Kartu Keluarga (KK)
              </Label>
              <div
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
                  isDragging ? "border-[#9ABE4B] bg-[#f6f9f4]" : "border-slate-200 hover:border-[#9ABE4B]"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileChange(e.dataTransfer.files[0] || null);
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
                {kkPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={kkPreview} alt="Preview KK" className="max-h-32 rounded-lg" />
                    <span className="text-[12px] text-slate-500">{formData.kk_file?.name}</span>
                  </div>
                ) : formData.kk_file ? (
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="w-12 h-12 text-[#9ABE4B]" />
                    <span className="text-[13px] font-semibold text-slate-700">{formData.kk_file.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#e8f5e0] flex items-center justify-center">
                      <Upload className="w-6 h-6 text-[#9ABE4B]" />
                    </div>
                    <p className="font-bold text-[14px] text-slate-700">Klik atau seret file ke sini</p>
                    <p className="text-[12px] text-slate-400">Format: JPG, PNG, atau PDF (Maks. 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* NIK */}
            <div className="space-y-2">
              <Label htmlFor="nik" className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
                Nomor Identitas (NIK/NISN)
              </Label>
              <Input
                id="nik" type="text" placeholder="Contoh: 3201xxxxxxxxxxxx"
                value={formData.nik} onChange={handleChange}
                className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                required
              />
            </div>

            {/* Nama Orang Tua */}
            <div className="space-y-2">
              <Label htmlFor="nama_orang_tua" className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
                Nama Orang Tua Anggota
              </Label>
              <Input
                id="nama_orang_tua" type="text" placeholder="Masukkan nama lengkap Anda"
                value={formData.nama_orang_tua} onChange={handleChange}
                className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            {successMsg && <p className="text-sm text-green-500 font-medium">{successMsg}</p>}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setStep(1); setError(""); }}
                className="px-8 py-[22px] rounded-xl border-slate-200 text-slate-700 font-bold text-[14px] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </Button>
              <Button
                type="submit"
                className="px-10 py-[22px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[14px] transition-colors shadow-md shadow-[#9ABE4B]/20 flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Mengirim..." : "Kirim Pengajuan"} <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* ─── STEP 3: Status ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900 overflow-y-auto">
      <StepIndicator current={3} />

      <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
        {/* Left - Status Card */}
        <div className="space-y-6">
          <div>
            <h2 className="text-[24px] font-extrabold text-[#1a202c] leading-snug">
              Status Pengajuan:
            </h2>
            <h2 className="text-[24px] font-extrabold text-[#9ABE4B] leading-snug">
              Dalam Proses Verifikasi Admin
            </h2>
            <p className="text-slate-500 text-[13px] font-medium leading-relaxed mt-3 max-w-md">
              Terima kasih telah mendaftar di Perpustakaan Digital.
              Berkas pendaftaran Anda telah kami terima dan saat ini
              sedang dalam tahap pemeriksaan oleh tim verifikator kami.
            </p>
          </div>

          <div className="bg-[#f6f9f4] border border-slate-100 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#e8f5e0] flex items-center justify-center">
              <Clock className="w-10 h-10 text-[#9ABE4B]" />
            </div>
            <p className="text-[#9ABE4B] text-[12px] font-bold tracking-wider mb-1">
              ID: #{regId}
            </p>
            <p className="text-[18px] font-extrabold text-[#1a202c]">
              Sedang Ditinjau
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Notification cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f6f9f4] border border-slate-100 rounded-2xl p-5">
              <Mail className="w-6 h-6 text-[#6b8f4a] mb-3" />
              <p className="font-bold text-[14px] text-[#1a202c] mb-1">Email Notifikasi</p>
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Update status akan dikirimkan ke alamat email terdaftar Anda.
              </p>
            </div>
            <div className="bg-[#f6f9f4] border border-slate-100 rounded-2xl p-5">
              <MessageSquare className="w-6 h-6 text-[#6b8f4a] mb-3" />
              <p className="font-bold text-[14px] text-[#1a202c] mb-1">WhatsApp Alert</p>
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Kami juga akan mengirim pesan instan setelah akun Anda aktif.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-4">
              Tahapan Pendaftaran
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#9ABE4B] shrink-0" />
                <span className="text-[13px] font-semibold text-[#1a202c]">Pengiriman Berkas Berhasil</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-[3px] border-[#1a202c] shrink-0" />
                <span className="text-[13px] font-bold text-[#1a202c]">Verifikasi Admin (Sedang Berjalan)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                <span className="text-[13px] font-medium text-slate-400">Aktivasi Akun & Akses Koleksi</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              className="flex-1 py-[22px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[14px]"
              onClick={() => {/* could navigate to detail */}}
            >
              Cek Detail Berkas
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-[22px] rounded-xl border-slate-200 text-slate-700 font-bold text-[14px]"
              onClick={onBackToLogin}
            >
              Hubungi Bantuan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
