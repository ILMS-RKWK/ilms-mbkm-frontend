import HeroSection from "@/components/beranda/hero-section";
import SedangDipinjam from "@/components/beranda/sedang-dipinjam";
import AktivitasLiterasi from "@/components/beranda/aktivitas-literasi";
import RekomendasiBuku from "@/components/beranda/rekomendasi-buku";

export default function BerandaPage() {
  return (
    <div className="pb-12">
      {/* Hero */}
      <HeroSection />

      {/* Sedang Dipinjam + Aktivitas Literasi */}
      <section className="px-6 lg:px-10 py-6 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8">
          <SedangDipinjam />
          <AktivitasLiterasi />
        </div>
      </section>

      {/* Rekomendasi Cerdas */}
      <section className="px-6 lg:px-10 py-6 max-w-[1440px] mx-auto">
        <RekomendasiBuku />
      </section>
    </div>
  );
}
