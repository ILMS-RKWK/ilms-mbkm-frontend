"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, ArrowLeft, BookOpenCheck } from "lucide-react";

interface ForgotPasswordProps {
  email: string;
  onEmailChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToLogin: () => void;
  isLoading: boolean;
  error: string;
  successMsg: string;
}

export function ForgotPasswordView({
  email,
  onEmailChange,
  onSubmit,
  onBackToLogin,
  isLoading,
  error,
  successMsg,
}: ForgotPasswordProps) {
  return (
    <div className="h-screen w-full flex bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative min-h-screen"
        style={{ background: "linear-gradient(180deg, #e8f5e0 0%, #f0f6ec 50%, #f5f7f2 100%)" }}>
        <div className="flex-1 flex flex-col items-center justify-center max-w-md text-center w-full">
          <div className="w-[340px] h-[340px] rounded-3xl overflow-hidden shadow-xl mb-10 relative border-4 border-white/60">
            <Image
              src="/images/image-forget.png"
              alt="Stacked Books"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-[26px] font-extrabold text-[#2d5a3d] mb-3 tracking-tight">
            Kembangkan Duniamu
          </h2>
          <p className="text-[#5a7d6a] font-medium text-[14px] leading-relaxed max-w-[320px]">
            Akses ribuan buku dan sumber daya pengetahuan
            dalam satu genggaman bersama LibraryGo.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative min-h-screen">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          {/* Logo */}
          <div className="w-14 h-14 rounded-2xl bg-[#e8f5e0] flex items-center justify-center mb-5">
            <BookOpenCheck className="w-7 h-7 text-[#6b8f4a]" />
          </div>

          <p className="text-[#6b8f4a] text-[12px] font-bold tracking-[0.2em] uppercase mb-3">
            Rumah Kreatif Wadas Kelir
          </p>

          <h1 className="text-[30px] font-extrabold text-[#1a202c] mb-3 tracking-tight text-center">
            Lupa Kata Sandi?
          </h1>
          <p className="text-slate-500 text-[14px] font-medium leading-relaxed text-center mb-8 max-w-[340px]">
            Jangan khawatir, masukkan alamat email Anda untuk
            menerima tautan pemulihan akun.
          </p>

          <form onSubmit={onSubmit} className="space-y-5 w-full">
            <div className="space-y-2">
              <Label htmlFor="forgot-email" className="font-bold text-[13px] text-slate-700">
                Alamat Email Terdaftar
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-[18px] w-[18px]" />
                </div>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="contoh: nama@email.com"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  className="pl-[44px] py-[22px] bg-[#f8fafc] border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            {successMsg && <p className="text-sm text-green-500 font-medium">{successMsg}</p>}

            <Button
              type="submit"
              className="w-full py-[24px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[15px] transition-colors duration-200 shadow-md shadow-[#9ABE4B]/20 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim Instruksi"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={onBackToLogin}
                className="font-bold text-slate-600 hover:text-slate-800 text-[14px] flex items-center justify-center w-full gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Halaman Login
              </button>
            </div>
          </form>

          {/* Copyright */}
          <p className="text-[11px] text-slate-400 font-medium mt-12 text-center">
            © 2024 Intelligent Library Management System. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}
