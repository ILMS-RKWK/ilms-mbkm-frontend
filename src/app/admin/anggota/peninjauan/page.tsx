import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle2, XCircle, Users } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PeninjauanAnggotaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <SiteHeader 
        title="Manajemen Anggota" 
        subtitle="Peninjauan calon anggota baru" 
      />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Peninjauan Anggota Baru</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Kelola data lengkap keanggotaan dan pantau aktivitas pendaftaran anggota secara real-time.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="shadow-sm border-slate-100 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 border border-slate-200 rounded-full text-green-600">
                  <MoreHorizontal className="w-5 h-5" />
                </div>
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  42 BARU
                </div>
              </div>
              <h3 className="text-4xl font-bold mt-4 mb-1">128</h3>
              <p className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">Pengajuan Menunggu</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6">
              <div className="p-2 border border-slate-200 rounded-full text-green-600 w-fit mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-4xl font-bold mt-4 mb-1">12</h3>
              <p className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">Disetujui Hari Ini</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6">
              <div className="p-2 border border-slate-200 rounded-full text-red-600 w-fit mb-4">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-4xl font-bold mt-4 mb-1">03</h3>
              <p className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">Ditolak Hari Ini</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-transparent bg-[#99BD4A] text-white">
            <CardContent className="p-6">
              <div className="p-2 bg-white/20 rounded-full w-fit mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-4xl font-light mt-4 mb-1 tracking-tight">1.240</h3>
              <p className="text-[10px] text-white/80 font-bold tracking-wider uppercase">Total Anggota Aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Table Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Pengajuan Terbaru</h2>
              <p className="text-sm text-muted-foreground">Meninjau entri pendaftaran terbaru</p>
            </div>
            <Link href="#" className="text-xs font-bold text-green-600 tracking-wider hover:underline uppercase">
              Lihat Semua Entri
            </Link>
          </div>

          <Card className="shadow-sm border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#f8f9fa]">
                <TableRow>
                  <TableHead className="font-bold text-slate-500 text-xs tracking-wider py-4">NAMA ANGGOTA</TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs tracking-wider">NIK/NISN</TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs tracking-wider">TANGGAL</TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs tracking-wider">STATUS DOKUMEN</TableHead>
                  <TableHead className="font-bold text-slate-500 text-xs tracking-wider text-right pr-6">AKSI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: 1,
                    name: "Aditya Saputra",
                    email: "aditya.s@email.com",
                    nik: "3210042900120003",
                    date: "24 Okt 2023",
                    status: "TERVERIFIKASI",
                    statusColor: "bg-green-100 text-green-700",
                    initials: "AS"
                  },
                  {
                    id: 2,
                    name: "Rina Maharani",
                    email: "rina.m@email.com",
                    nik: "3174092108940001",
                    date: "24 Okt 2023",
                    status: "MENUNGGU VERIFIKASI",
                    statusColor: "bg-red-100 text-red-700",
                    initials: "RM"
                  },
                  {
                    id: 3,
                    name: "Bambang Kusuma",
                    email: "b.kusuma@email.com",
                    nik: "3518021103880005",
                    date: "23 Okt 2023",
                    status: "MENUNGGU VERIFIKASI",
                    statusColor: "bg-red-100 text-red-700",
                    initials: "BK"
                  }
                ].map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50/50">
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {row.initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{row.name}</div>
                          <div className="text-xs text-muted-foreground">{row.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-600">{row.nik}</TableCell>
                    <TableCell className="font-medium text-slate-600">{row.date}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 ${row.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'TERVERIFIKASI' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button asChild className="bg-[#99BD4A] hover:bg-[#88ab3d] text-white font-bold tracking-wider text-[10px] uppercase px-6 h-8 rounded-md">
                        <Link href={`/admin/anggota/peninjauan/${row.id}`}>
                          Tinjau
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}
