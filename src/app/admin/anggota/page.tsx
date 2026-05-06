import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, FileText, Info, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ManajemenAnggotaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <SiteHeader 
        title="Manajemen Anggota" 
        subtitle="Mengelola data anggota perpustakaan" 
      />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manajemen Anggota</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Kelola data lengkap keanggotaan dan pantau aktivitas peminjaman buku secara real-time.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="gap-2 bg-white flex-1 md:flex-none">
              <FileText className="w-4 h-4" />
              Log Aktifitas
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700 flex-1 md:flex-none" asChild>
              <Link href="/admin/anggota/peninjauan">
                <UserPlus className="w-4 h-4" />
                Cek Pengajuan Anggota
              </Link>
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border-slate-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Cari nama, email, atau ID anggota..." 
                  className="pl-9 bg-slate-50/50"
                />
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="semua">
                  <SelectTrigger className="w-[180px] bg-slate-50/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Status: Semua</SelectItem>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="nonaktif">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="terbaru">
                  <SelectTrigger className="w-[180px] bg-slate-50/50">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terbaru">Urutkan: Terbaru</SelectItem>
                    <SelectItem value="terlama">Urutkan: Terlama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 text-xs tracking-wider">NAMA ANGGOTA</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs tracking-wider">EMAIL</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs tracking-wider">NO. WHATSAPP</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs tracking-wider">STATUS</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs tracking-wider">TOTAL PINJAMAN</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs tracking-wider text-right">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "#MEMBER-042",
                      name: "Andi Pratama",
                      email: "andi@email.com",
                      phone: "08123456789",
                      status: "AKTIF",
                      loans: 12,
                      initials: "AP",
                      color: "bg-green-100 text-green-700"
                    },
                    {
                      id: "#MEMBER-039",
                      name: "Siti Aminah",
                      email: "siti@email.com",
                      phone: "08567890123",
                      status: "AKTIF",
                      loans: 5,
                      initials: "SA",
                      color: "bg-yellow-100 text-yellow-700"
                    },
                    {
                      id: "#MEMBER-012",
                      name: "Budi Santoso",
                      email: "budi@email.com",
                      phone: "08198765432",
                      status: "NONAKTIF",
                      loans: 0,
                      initials: "BS",
                      color: "bg-slate-100 text-slate-700"
                    }
                  ].map((member) => (
                    <TableRow key={member.id} className="hover:bg-slate-50/50">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${member.color}`}>
                            {member.initials}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{member.name}</div>
                            <div className="text-xs text-muted-foreground">ID: {member.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">{member.email}</TableCell>
                      <TableCell className="text-slate-600 font-medium">{member.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${member.status === 'AKTIF' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                          <span className={`text-xs font-bold ${member.status === 'AKTIF' ? 'text-green-600' : 'text-slate-500'}`}>
                            {member.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">{member.loans} Buku</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Peminjaman</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2 text-slate-400">
                          <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-slate-900"><Info className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-slate-900"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm font-medium text-slate-500 tracking-wider uppercase text-xs">
                MENAMPILKAN 1-10 DARI 42 ANGGOTA
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="w-8 h-8" disabled>&lt;</Button>
                <Button variant="default" size="sm" className="w-8 h-8 bg-green-600 hover:bg-green-700">1</Button>
                <Button variant="outline" size="sm" className="w-8 h-8">2</Button>
                <Button variant="outline" size="sm" className="w-8 h-8">3</Button>
                <Button variant="outline" size="icon" className="w-8 h-8">&gt;</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
