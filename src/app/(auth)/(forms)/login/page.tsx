"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  HelpCircle,
  Globe,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

import {
  useRegisterMutation,
  useForgotPasswordMutation,
} from "@/services/auth.service";
import { ApiError } from "@/lib/error-utils";

type ViewState = "login" | "register" | "forgot_password";

export default function AuthPage() {
  const router = useRouter();

  const [view, setView] = useState<ViewState>("login");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerApi] = useRegisterMutation();
  const [forgotPasswordApi] = useForgotPasswordMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Email atau password salah.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      await registerApi({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      }).unwrap();

      setSuccessMsg("Registrasi berhasil! Silakan login.");
      setTimeout(() => {
        setView("login");
        setSuccessMsg("");
        setFormData({ ...formData, password: "", password_confirmation: "" });
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
      const error = err as ApiError;
      setError(error?.data?.message || "Gagal melakukan registrasi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      await forgotPasswordApi({ email: formData.email }).unwrap();
      setSuccessMsg("Link reset password telah dikirim ke email Anda.");
    } catch (err: unknown) {
      console.error(err);
      const error = err as ApiError;
      setError(error?.data?.message || "Gagal meminta reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  // Illustrations
  const LoginIllustration = () => (
    <div className="hidden lg:flex w-1/2 bg-[#9ABE4B]/20 flex-col items-center justify-center p-12 relative min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-y-6 justify-center max-w-md text-center mt-2 w-full">
        <div className="w-full max-w-lg flex flex-col gap-4">
          {/* Div Taman Baca */}
          <div className="flex items-center justify-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm text-slate-800 w-full">
            <BookOpenCheck className="w-7 h-7 text-[#9ABE4B]" />
            <span className="font-extrabold text-[#1f2937] text-xl">
              Taman Baca Masyarakat (TBM)
            </span>
          </div>

          {/* Div Gambar */}
          <div className="w-full shadow-md aspect-[6/7] bg-[#faecd5] rounded-3xl flex items-center justify-center overflow-hidden relative border-[6px] border-[#faecd5]">
            <Image
              src="/images/image-login.png"
              alt="Illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="text-[#374151] font-bold text-lg max-w-sm leading-relaxed antialiased">
          {`"Literasi adalah jembatan menuju mimpi yang tak terbatas."`}
        </p>
      </div>
    </div>
  );

  const RegisterIllustration = () => (
    <div className="hidden lg:flex w-1/2 bg-[#F6F9F4] flex-col items-center justify-center p-12 relative overflow-hidden min-h-screen">
      <div className="absolute top-[-5%] right-[-5%] w-64 h-64 opacity-[0.35] pointer-events-none text-[#DEE8D5]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M50,10 C70,10 90,30 90,50 C90,70 70,50 50,50 C30,50 10,70 10,50 C10,30 30,10 50,10 Z" />
        </svg>
      </div>
      <div className="absolute bottom-[-5%] left-[30%] w-64 h-64 opacity-40 pointer-events-none text-[#DEE8D5]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M10,90 L10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 L90,90 Z" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <div className="relative mb-14 w-full flex justify-center mt-6">
          <div className="w-[320px] h-[320px] bg-[#8AB5A3] rounded-[2rem] flex items-center justify-center relative shadow-xl shadow-black/10 transform rotate-[4deg] mx-auto z-10">
            <div className="text-white text-center flex flex-col items-center w-full px-8 pb-4">
              <div className="relative w-full h-10 flex justify-center mb-[2px]">
                <div className="w-[38px] h-[38px] border-[1.5px] border-white/90 rounded-full absolute top-0 -ml-14"></div>
                <div className="w-[38px] h-[38px] border-[1.5px] border-white/90 rounded-full absolute top-0 ml-14"></div>
                <div className="w-5 h-5 border-[1.5px] border-b-0 border-white/90 rounded-t-full absolute bottom-[-1px]"></div>
              </div>

              <div className="w-full h-[170px] border-[1.5px] border-white/90 rounded-[22px] rounded-b-[18px] relative flex flex-col pt-[18px]">
                <div className="w-full border-t-[1.5px] border-white/90 absolute top-5"></div>

                <div className="flex-1 flex flex-col justify-center items-center px-4 mt-5">
                  <span className="font-normal tracking-[0.11em] text-[17px] text-white/95 uppercase">
                    DIGITAL LIBRANY
                  </span>
                  <p className="text-[11px] mt-2 text-white/90 font-medium tracking-wider lowercase font-sans">
                    natural easy safe busy work
                  </p>
                </div>

                <div className="flex justify-center gap-[22px] mt-auto mb-[14px]">
                  <div className="w-3.5 h-3.5 rounded-full bg-white/30"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/30"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/30"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/30"></div>
                </div>
              </div>

              <div className="w-8 h-[26px] border-x-[1.5px] border-white/90 mx-auto relative flex flex-col justify-center">
                <div className="w-full border-t-[1.5px] border-white/90"></div>
              </div>
              <div className="w-36 h-8 border-[1.5px] border-white/90 rounded-t-[18px] mx-auto border-b-0"></div>
            </div>
          </div>

          <div className="absolute -bottom-5 right-[5%] lg:right-[20%] bg-white px-5 py-[14px] rounded-[14px] shadow-xl shadow-black/5 flex items-center gap-3 z-20 border border-slate-100">
            <div className="bg-white">
              <BookOpenCheck
                className="w-[28px] h-[28px] text-[#9ABE4B]"
                strokeWidth={2.5}
              />
            </div>
            <div className="text-left">
              <p className="text-[#101828] font-black text-[14px] mb-[2px] tracking-tight">
                5000+ Koleksi
              </p>
              <p className="text-[11px] font-semibold text-slate-500 lowercase first-letter:capitalize">
                Buku & Literatur
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-[380px] mx-auto text-center mt-2">
          <h2 className="text-[24px] leading-[1.35] font-extrabold text-[#111827] mb-[10px] tracking-tight">
            Menumbuhkan Minat Baca,
            <br />
            Membangun Generasi Kreatif
          </h2>
          <p className="text-slate-500 font-medium text-[14px] leading-relaxed mx-auto px-4">
            Akses ribuan literatur berkualitas langsung
            <br />
            dari genggaman Anda. Mari berkarya
            <br />
            bersama Wadas Kelir.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* ---------------- LOGIN & FORGOT PASSWORD VIEW ---------------- */}
      {(view === "login" || view === "forgot_password") && (
        <>
          <LoginIllustration />
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative min-h-screen">
            <div className="w-full max-w-[420px]">
              {view === "login" ? (
                <>
                  <div className="mb-8 text-left">
                    <h1 className="text-[34px] font-extrabold text-[#1e293b] mb-3 tracking-tight">
                      Selamat Datang Kembali
                    </h1>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed pr-6">
                      Masuk untuk melanjutkan petualangan literasimu di
                      perpustakaan kami.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="font-bold text-[13px] text-slate-700"
                      >
                        Email atau Username
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="h-[18px] w-[18px]" />
                        </div>
                        <Input
                          id="email"
                          type="text"
                          placeholder="Masukkan email atau username anda"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-[44px] py-[22px] bg-[#f8fafc] border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="font-bold text-[13px] text-slate-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Lock className="h-[18px] w-[18px]" />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password anda"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-[44px] pr-12 py-[22px] bg-[#f8fafc] border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="h-[18px] w-[18px]" />
                          ) : (
                            <Eye className="h-[18px] w-[18px]" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          className="border-slate-300 rounded data-[state=checked]:bg-[#9ABE4B] data-[state=checked]:border-[#9ABE4B] focus:ring-[#9ABE4B] focus-visible:ring-[#9ABE4B] w-[18px] h-[18px]"
                        />
                        <label
                          htmlFor="remember"
                          className="text-[13px] font-bold text-slate-600 cursor-pointer"
                        >
                          Ingat Saya
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setView("forgot_password")}
                        className="text-[13px] font-bold text-[#9ABE4B] hover:text-[#89A843]"
                      >
                        Lupa Password?
                      </button>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 font-medium">
                        {error}
                      </p>
                    )}
                    {successMsg && (
                      <p className="text-sm text-green-500 font-medium">
                        {successMsg}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-2 py-[24px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[15px] transition-colors duration-200 shadow-md shadow-[#9ABE4B]/20"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Masuk ke Akun"}
                    </Button>

                    <div className="text-center text-[14px] text-slate-500 mt-8 mb-4">
                      Belum punya akun?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setView("register");
                          setError("");
                          setSuccessMsg("");
                        }}
                        className="font-bold text-[#9ABE4B] hover:text-[#89A843]"
                      >
                        Daftar sekarang
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                // FORGOT PASSWORD
                <>
                  <div className="mb-10 text-left">
                    <h1 className="text-[34px] font-extrabold text-[#1a202c] mb-3 tracking-tight">
                      Reset Password
                    </h1>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                      Masukkan email yang terdaftar untuk menerima link reset
                      password dari kami.
                    </p>
                  </div>

                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="font-bold text-[13px] text-slate-700"
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Mail className="h-[18px] w-[18px]" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Masukkan email anda"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-[44px] py-[22px] bg-[#f8fafc] border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 font-medium">
                        {error}
                      </p>
                    )}
                    {successMsg && (
                      <p className="text-sm text-green-500 font-medium">
                        {successMsg}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-2 py-[24px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[15px] transition-colors duration-200 shadow-md shadow-[#9ABE4B]/20"
                      disabled={isLoading}
                    >
                      {isLoading ? "Mengirim..." : "Kirim Link Reset"}
                    </Button>

                    <div className="text-center text-[14px] text-slate-500 mt-8">
                      <button
                        type="button"
                        onClick={() => {
                          setView("login");
                          setError("");
                          setSuccessMsg("");
                        }}
                        className="font-bold text-[#9ABE4B] hover:text-[#89A843] flex items-center justify-center w-full"
                      >
                        Kembali ke Login
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Footer Links */}
              <div className="mt-10 flex justify-center items-center gap-8 text-[13px] text-slate-500 font-bold">
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[#9ABE4B] transition-colors"
                >
                  <HelpCircle className="w-[18px] h-[18px]" /> Bantuan
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[#9ABE4B] transition-colors"
                >
                  <Globe className="w-[18px] h-[18px]" /> Bahasa Indonesia
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ---------------- REGISTER VIEW ---------------- */}
      {view === "register" && (
        <>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:px-24 py-12 relative min-h-screen border-r border-[#f1f5f9]">
            <div className="w-full max-w-[440px]">
              <div className="mb-8 text-left">
                <h1 className="text-[28px] font-extrabold text-[#1a202c] mb-3 tracking-tight leading-snug">
                  Bergabung dengan Komunitas Literasi
                </h1>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed pr-4">
                  Lengkapi data diri untuk mulai meminjam buku secara digital
                  dan fisik.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-[13px] font-bold text-slate-700 flex items-center gap-2"
                  >
                    <User className="w-[16px] h-[16px] text-[#9ABE4B]" /> Nama
                    Lengkap
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama sesuai KTP/Kartu Pelajar"
                    value={formData.name}
                    onChange={handleChange}
                    className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[13px] font-bold text-slate-700 flex items-center gap-2"
                  >
                    <Mail className="w-[16px] h-[16px] text-[#9ABE4B]" /> Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-[13px] font-bold text-slate-700 flex items-center gap-2"
                  >
                    <Phone className="w-[16px] h-[16px] text-[#9ABE4B]" /> Nomor
                    WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="0812xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-[22px] px-4 bg-white border border-slate-200 rounded-xl focus-visible:ring-[#9ABE4B] text-[14px] font-medium shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-[13px] font-bold text-slate-700 flex items-center gap-2"
                    >
                      <Lock className="w-[16px] h-[16px] text-[#9ABE4B]" /> Kata
                      Sandi
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="py-[22px] px-4 bg-[#f8fafc] border border-slate-200 rounded-xl pr-10 focus-visible:ring-[#9ABE4B] text-[14px] tracking-widest placeholder:tracking-normal font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-[18px] w-[18px]" />
                        ) : (
                          <Eye className="h-[18px] w-[18px]" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password_confirmation"
                      className="text-[13px] font-bold text-slate-700 flex items-center gap-2"
                    >
                      <Lock className="w-[16px] h-[16px] text-[#9ABE4B]" />{" "}
                      Konfirmasi
                    </Label>
                    <div className="relative">
                      <Input
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="py-[22px] px-4 bg-[#f8fafc] border border-slate-200 rounded-xl pr-10 focus-visible:ring-[#9ABE4B] text-[14px] tracking-widest placeholder:tracking-normal font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-[18px] w-[18px]" />
                        ) : (
                          <Eye className="h-[18px] w-[18px]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3 pb-2">
                  <Checkbox
                    id="terms"
                    required
                    className="mt-[2px] border-slate-300 rounded data-[state=checked]:bg-[#9ABE4B] data-[state=checked]:border-[#9ABE4B] focus:ring-[#9ABE4B] focus-visible:ring-[#9ABE4B] w-[16px] h-[16px]"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[12px] leading-relaxed text-slate-500 font-medium cursor-pointer"
                  >
                    Saya setuju dengan{" "}
                    <a
                      href="#"
                      className="font-bold text-[#9ABE4B] hover:underline"
                    >
                      Syarat & Ketentuan
                    </a>{" "}
                    serta{" "}
                    <a
                      href="#"
                      className="font-bold text-[#9ABE4B] hover:underline"
                    >
                      Kebijakan Privasi
                    </a>{" "}
                    Rumah Kreatif Wadas Kelir.
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-medium">{error}</p>
                )}
                {successMsg && (
                  <p className="text-sm text-green-500 font-medium">
                    {successMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full mt-2 py-[24px] rounded-xl bg-[#9ABE4B] hover:bg-[#89A843] text-white font-bold text-[15px] transition-colors duration-200 shadow-md shadow-[#9ABE4B]/20 flex items-center justify-center gap-2 group"
                  disabled={isLoading}
                >
                  {isLoading ? "Mendaftar..." : "Daftar Sekarang"}{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-center text-[14px] text-slate-500 mt-6 pb-6">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setView("login");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className="font-bold text-[#9ABE4B] hover:text-[#89A843]"
                  >
                    Masuk di sini
                  </button>
                </div>
              </form>
            </div>

            {/* Copyright Footer */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] font-medium text-slate-400 px-4">
              © 2026 Rumah Kreatif Wadas Kelir. Dikelola dengan ❤️ untuk
              Literasi Indonesia.
            </div>
          </div>
          <RegisterIllustration />
        </>
      )}
    </div>
  );
}