import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  Upload,
  ArrowLeft,
  Bookmark,
  UserPlus,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <SiteHeader 
        title="Dashboard Admin" 
        subtitle="Ringkasan aktivitas sistem perpustakaan hari ini" 
      />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                  +2.5%
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Total Buku</p>
              <h3 className="text-2xl font-bold mt-1">1,240</h3>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                  -1.2%
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Anggota Aktif</p>
              <h3 className="text-2xl font-bold mt-1">458</h3>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                  +5.0%
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Permintaan Pending</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                  -0.8%
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Buku Keluar</p>
              <h3 className="text-2xl font-bold mt-1">85</h3>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Chart Section */}
          <Card className="lg:col-span-2 shadow-sm border-slate-100 h-[400px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold">Tren Peminjaman Bulanan</CardTitle>
                <CardDescription>Aktivitas peminjaman 6 bulan terakhir</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 inline-block mr-2">1,420</div>
                <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full inline-block align-top mt-1">
                  +12%
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              {/* Placeholder for chart */}
              <div className="w-full flex justify-between text-xs text-muted-foreground font-medium px-2 mt-auto">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>Mei</span>
                <span>Jun</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Section */}
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Aktivitas Terbaru</CardTitle>
              <Link href="#" className="text-xs text-green-600 font-medium hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="bg-green-100 p-2 rounded-full h-fit mt-1 shrink-0">
                  <ArrowLeft className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Buku Dikembalikan</p>
                  <p className="text-xs text-muted-foreground mt-0.5">&quot;Filosofi Teras&quot; oleh Budi Santoso</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">2 menit yang lalu</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-fit mt-1 shrink-0">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Peminjaman Baru</p>
                  <p className="text-xs text-muted-foreground mt-0.5">&quot;Seni Berbicara&quot; oleh Anita Wijaya</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">15 menit yang lalu</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-amber-100 p-2 rounded-full h-fit mt-1 shrink-0">
                  <UserPlus className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Anggota Baru</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Dimas Pratama telah bergabung</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">1 jam yang lalu</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-rose-100 p-2 rounded-full h-fit mt-1 shrink-0">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Denda Terdeteksi</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Keterlambatan 3 hari: &quot;Bumi&quot; (ID: 021)</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">2 jam yang lalu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground font-medium gap-4">
        <div>
          © 2026 Rumah Kreatif Wadas Kelir. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-foreground transition-colors">Panduan Sistem</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Bantuan Teknis</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</Link>
        </div>
      </footer>
    </div>
  );
}
