import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DetailPeninjauanPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <SiteHeader 
        title="Manajemen Anggota" 
        subtitle="Peninjauan calon anggota baru" 
      />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Link href="/admin/dashboard" className="hover:text-slate-900 transition-colors">DASHBOARD</Link>
            <span>›</span>
            <Link href="/admin/anggota/peninjauan" className="hover:text-slate-900 transition-colors">PENINJAUAN</Link>
            <span>›</span>
            <span className="text-slate-900">ADITYA PRATAMA</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Detail Peninjauan</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-2xl bg-slate-200 overflow-hidden relative shrink-0">
                {/* Fallback image if no real image */}
                <Image src="/icon-marketing.png" alt="Profile" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Aditya Pratama</h2>
                <div className="text-xs font-bold text-[#64748b] bg-[#f1f5f9] px-2 py-1 rounded-md w-fit mt-1">
                  ID: REG-99201
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Nomor Induk Kependudukan</h3>
                <p className="text-lg text-slate-900 font-medium">3273010101920004</p>
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Tanggal Lahir</h3>
                <p className="text-lg text-slate-900 font-medium">12 Januari 1992</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Alamat Lengkap</h3>
                <p className="text-lg text-slate-900 font-medium leading-relaxed max-w-sm">
                  Jl. Kebon Jeruk No. 45, RT 003 RW 002, Kel. Palmerah, Kec. Palmerah, Jakarta Barat, 11480
                </p>
              </div>
            </div>

            <Card className="border-l-4 border-l-[#99BD4A] shadow-sm bg-slate-50">
              <CardContent className="p-6">
                <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-4">Catatan Sistem</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#99BD4A] shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Pendaftaran Diterima</p>
                      <p className="text-xs text-slate-500 mt-0.5">24 Okt 2023 • 09:12 WIB</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#99BD4A] shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Sistem OCR Berhasil</p>
                      <p className="text-xs text-slate-500 mt-0.5">24 Okt 2023 • 09:13 WIB</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* KTP Preview */}
            <Card className="shadow-sm border-slate-100 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-slate-50 py-4">
                <CardTitle className="text-sm font-bold tracking-wider uppercase text-slate-700">Pratinjau KTP</CardTitle>
                <Button variant="ghost" className="text-xs font-bold text-[#99BD4A] hover:text-[#88ab3d] hover:bg-[#99BD4A]/10 h-8 px-2">
                  <Search className="w-3.5 h-3.5 mr-1.5" />
                  Lihat Layar Penuh
                </Button>
              </CardHeader>
              <CardContent className="p-6 bg-slate-50/50 flex justify-center items-center min-h-[300px]">
                {/* Mock KTP display */}
                <div className="w-full max-w-md h-56 bg-slate-200 rounded-lg flex items-center justify-center relative shadow-inner overflow-hidden border border-slate-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-2 border-dashed border-[#99BD4A]/50 bg-[#99BD4A]/5 rounded flex items-center justify-center">
                       <span className="text-[#99BD4A] font-bold text-sm tracking-widest uppercase">Verification Lens</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Checklist */}
            <Card className="shadow-sm border-slate-100">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-slate-700 tracking-wider uppercase mb-6">Daftar Periksa Validasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="foto" className="w-5 h-5 rounded-[4px] border-slate-300 data-[state=checked]:bg-[#99BD4A] data-[state=checked]:border-[#99BD4A]" />
                    <label htmlFor="foto" className="text-sm font-bold text-slate-700 cursor-pointer">Foto sesuai</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="nik" className="w-5 h-5 rounded-[4px] border-slate-300 data-[state=checked]:bg-[#99BD4A] data-[state=checked]:border-[#99BD4A]" />
                    <label htmlFor="nik" className="text-sm font-bold text-slate-700 cursor-pointer">NIK valid</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="dokumen" className="w-5 h-5 rounded-[4px] border-slate-300 data-[state=checked]:bg-[#99BD4A] data-[state=checked]:border-[#99BD4A]" />
                    <label htmlFor="dokumen" className="text-sm font-bold text-slate-700 cursor-pointer">Dokumen terbaca</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="masa" className="w-5 h-5 rounded-[4px] border-slate-300 data-[state=checked]:bg-[#99BD4A] data-[state=checked]:border-[#99BD4A]" />
                    <label htmlFor="masa" className="text-sm font-bold text-slate-700 cursor-pointer">Masa berlaku aktif</label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rejection Reason & Actions */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-red-600 tracking-wider uppercase">Alasan Penolakan</h3>
              <Textarea 
                placeholder="Tuliskan detail alasan mengapa pendaftaran ini ditolak..." 
                className="min-h-[120px] bg-white border-slate-200 resize-none"
              />
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button className="flex-1 bg-[#99BD4A] hover:bg-[#88ab3d] text-white font-bold tracking-wider uppercase h-14 text-sm rounded-lg">
                  <Check className="w-5 h-5 mr-2" />
                  Setujui Pendaftaran
                </Button>
                <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold tracking-wider uppercase h-14 text-sm rounded-lg">
                  <X className="w-5 h-5 mr-2" />
                  Tolak dengan Alasan
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
