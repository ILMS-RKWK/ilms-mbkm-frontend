import { NextRequest, NextResponse } from "next/server";

const SLIMS_BASE = "https://slims.web.id/web/api/v1/biblio";

// Sample data sebagai fallback ketika SLiMS API tidak bisa diakses
const sampleBooks = [
  {
    biblio_id: 1,
    title: "Kreativitas di Wadas Kelir",
    author: "Heri Sugiyanto",
    publish_year: "2023",
    image: "/images/book-cover-1.png",
    availability: "Tersedia",
    publisher: "Pustaka Wadas",
    call_number: "370.1 HER k",
    classification: "000",
    collection_type: "Teks",
    isbn_issn: "978-602-1234-56-7",
    notes: "Buku ini membahas tentang kreativitas dalam pendidikan dan pengembangan literasi di Rumah Kreatif Wadas Kelir.",
  },
  {
    biblio_id: 2,
    title: "Logika & Algoritma Dasar",
    author: "Siti Nurhaliza",
    publish_year: "2022",
    image: "/images/book-cover-2.png",
    availability: "Dipinjam",
    publisher: "Informatika Bandung",
    call_number: "005.1 SIT l",
    classification: "600",
    collection_type: "Teks",
    isbn_issn: "978-602-5678-90-1",
    notes: "Panduan lengkap belajar logika dan algoritma untuk pemrograman komputer bagi pemula.",
  },
  {
    biblio_id: 3,
    title: "Sejarah Nusantara Modern",
    author: "Budi Setiawan",
    publish_year: "2024",
    image: "/images/book-cover-3.png",
    availability: "Tersedia",
    publisher: "Gramedia Pustaka Utama",
    call_number: "959.8 BUD s",
    classification: "900",
    collection_type: "Teks",
    isbn_issn: "978-602-9012-34-5",
    notes: "Menelusuri perjalanan sejarah nusantara dari era kerajaan hingga Indonesia modern.",
  },
  {
    biblio_id: 4,
    title: "Psikologi Pendidikan Anak",
    author: "Dr. Rina Marlina",
    publish_year: "2023",
    image: "/images/book-cover-4.png",
    availability: "Tersedia",
    publisher: "Rosda Karya",
    call_number: "150.7 RIN p",
    classification: "100",
    collection_type: "Referensi",
    isbn_issn: "978-602-3456-78-9",
    notes: "Memahami psikologi anak dalam konteks pendidikan dan tumbuh kembang optimal.",
  },
  {
    biblio_id: 5,
    title: "Bahasa Indonesia untuk Akademik",
    author: "Prof. Ahmad Fauzi",
    publish_year: "2021",
    image: "/images/book-cover-5.png",
    availability: "Dipinjam",
    publisher: "Erlangga",
    call_number: "499.221 AHM b",
    classification: "400",
    collection_type: "Teks",
    isbn_issn: "978-602-7890-12-3",
    notes: "Panduan penulisan ilmiah menggunakan Bahasa Indonesia yang baik dan benar.",
  },
  {
    biblio_id: 6,
    title: "Matematika Diskrit",
    author: "Rinaldi Munir",
    publish_year: "2020",
    image: "/images/book-cover-6.png",
    availability: "Tersedia",
    publisher: "Informatika Bandung",
    call_number: "511 RIN m",
    classification: "500",
    collection_type: "Teks",
    isbn_issn: "978-602-4567-89-0",
    notes: "Buku teks matematika diskrit untuk mahasiswa ilmu komputer dan teknik informatika.",
  },
  {
    biblio_id: 7,
    title: "Pendidikan Agama Islam",
    author: "Dr. Muhammad Yusuf",
    publish_year: "2022",
    image: "/images/book-cover-1.png",
    availability: "Tersedia",
    publisher: "Kencana Prenada",
    call_number: "297.07 MUH p",
    classification: "200",
    collection_type: "Teks",
    isbn_issn: "978-602-6789-01-2",
    notes: "Buku ajar pendidikan agama Islam untuk perguruan tinggi umum.",
  },
  {
    biblio_id: 8,
    title: "Sosiologi Masyarakat Pedesaan",
    author: "Koentjaraningrat",
    publish_year: "2019",
    image: "/images/book-cover-3.png",
    availability: "Dipinjam",
    publisher: "Rajawali Pers",
    call_number: "307.72 KOE s",
    classification: "300",
    collection_type: "Referensi",
    isbn_issn: "978-602-8901-23-4",
    notes: "Kajian sosiologis tentang struktur dan dinamika masyarakat pedesaan di Indonesia.",
  },
  {
    biblio_id: 9,
    title: "Seni Rupa Kontemporer Indonesia",
    author: "Mikke Susanto",
    publish_year: "2023",
    image: "/images/book-cover-2.png",
    availability: "Tersedia",
    publisher: "DictiArt Lab",
    call_number: "709.598 MIK s",
    classification: "700",
    collection_type: "Teks",
    isbn_issn: "978-602-0123-45-6",
    notes: "Perkembangan seni rupa kontemporer Indonesia dari perspektif sejarah dan estetika.",
  },
  {
    biblio_id: 10,
    title: "Puisi-Puisi Perlawanan",
    author: "Wiji Thukul",
    publish_year: "2018",
    image: "/images/book-cover-5.png",
    availability: "Tersedia",
    publisher: "Marjin Kiri",
    call_number: "899.221 WIJ p",
    classification: "800",
    collection_type: "Teks",
    isbn_issn: "978-602-2345-67-8",
    notes: "Kumpulan puisi perlawanan karya Wiji Thukul yang membahas tentang keadilan sosial.",
  },
  {
    biblio_id: 11,
    title: "Teknik Kompilasi",
    author: "Alfred V. Aho",
    publish_year: "2021",
    image: "/images/book-cover-4.png",
    availability: "Tersedia",
    publisher: "Pearson",
    call_number: "005.45 ALF t",
    classification: "600",
    collection_type: "Referensi",
    isbn_issn: "978-013-4567-89-0",
    notes: "Buku referensi tentang prinsip, teknik, dan perangkat untuk perancangan kompilator.",
  },
  {
    biblio_id: 12,
    title: "Ensiklopedia Umum Indonesia",
    author: "Tim Penulis LIPI",
    publish_year: "2020",
    image: "/images/book-cover-6.png",
    availability: "Tersedia",
    publisher: "LIPI Press",
    call_number: "030 TIM e",
    classification: "000",
    collection_type: "Referensi",
    isbn_issn: "978-602-5678-01-2",
    notes: "Ensiklopedia umum yang mencakup berbagai topik pengetahuan tentang Indonesia.",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const title = searchParams.get("title")?.toLowerCase() || "";
  const classification = searchParams.get("classification") || "";

  // 1) Coba hit SLiMS API langsung (server-side, no CORS)
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (title) params.set("title", title);
    if (classification) params.set("classification", classification);

    const response = await fetch(`${SLIMS_BASE}?${params.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(5000), // Timeout 5 detik
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.error(err)
    console.warn("SLiMS API tidak bisa diakses, menggunakan data sampel.");
  }

  // 2) Fallback: gunakan sample data
  let filtered = [...sampleBooks];

  // Filter by search title
  if (title) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(title) ||
        b.author.toLowerCase().includes(title)
    );
  }

  // Filter by classification
  if (classification) {
    filtered = filtered.filter((b) => b.classification === classification);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedData = filtered.slice(start, start + limit);

  return NextResponse.json({
    data: paginatedData,
    total,
    total_pages: totalPages,
    page,
    limit,
  });
}
