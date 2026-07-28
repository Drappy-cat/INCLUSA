// Mock content for the INCLUSA integrated information platform.
// In production this data is served by the NestJS/Prisma API described in TECH_STACK.md.

export const BRAND = {
  name: "INCLUSA",
  tagline: "Sistem Informasi Terpadu HIV/AIDS Sidoarjo",
  short: "INCLUSA",
  meaning: "Inclusive Space — ruang inklusif untuk belajar, tumbuh, dan saling mendukung tanpa stigma.",
};

// Filosofi logo INCLUSA — makna tiap elemen (mengacu pada brand guideline).
export type LogoPhilosophy = { id: string; part: string; title: string; desc: string; color: string };

export const logoPhilosophy: LogoPhilosophy[] = [
  {
    id: "arc-top",
    part: "Arc Atas",
    title: "Perlindungan",
    desc: "Melambangkan perlindungan, keamanan, dan lingkungan yang inklusif bagi setiap individu tanpa terkecuali.",
    color: "teal",
  },
  {
    id: "family",
    part: "Keluarga",
    title: "Kebersamaan",
    desc: "Menggambarkan hubungan erat antara orang tua dan anak — pentingnya perhatian, pendampingan, dan kasih sayang.",
    color: "coral",
  },
  {
    id: "arc-bottom",
    part: "Arc Bawah",
    title: "Pelukan & Dukungan",
    desc: "Melambangkan perhatian, pendampingan, dan dukungan berkelanjutan sebagai ruang aman untuk belajar.",
    color: "maize",
  },
  {
    id: "dot",
    part: "Titik",
    title: "Individu",
    desc: "Melambangkan setiap individu yang memiliki hak menyampaikan diri dan kesempatan belajar yang aman tanpa batas.",
    color: "red",
  },
];

export const coreValues = [
  { title: "Inklusif", desc: "Setiap orang berhak atas informasi dan layanan kesehatan tanpa diskriminasi." },
  { title: "Empati", desc: "Pendekatan yang hangat, tanpa menghakimi, dan berpusat pada manusia." },
  { title: "Kolaboratif", desc: "Bergerak bersama masyarakat, pemerintah, dan fasilitas kesehatan." },
  { title: "Tepercaya", desc: "Informasi terverifikasi dan data yang akurat dari sumber resmi." },
];

export type StatItem = { label: string; value: string; sub: string; tone: "blue" | "coral" | "maize" | "teal" };

export const heroStats: StatItem[] = [
  { label: "Total Kasus Terlaporkan", value: "3.482", sub: "Kumulatif 2015–2026", tone: "blue" },
  { label: "ODHIV dalam Pengobatan", value: "2.117", sub: "Aktif menerima ARV", tone: "teal" },
  { label: "Layanan VCT Aktif", value: "48", sub: "Faskes se-Sidoarjo", tone: "coral" },
  { label: "Edukasi Terselenggara", value: "126", sub: "Sesi tahun ini", tone: "maize" },
];

export const quickStats: StatItem[] = [
  { label: "Kasus Baru (2026)", value: "214", sub: "+8% dari tahun lalu", tone: "coral" },
  { label: "ODHIV", value: "2.940", sub: "Orang dengan HIV", tone: "blue" },
  { label: "Cakupan ARV", value: "72%", sub: "dari total ODHIV", tone: "teal" },
  { label: "Tes VCT (2026)", value: "18.320", sub: "Pemeriksaan dilakukan", tone: "maize" },
];

export type Kecamatan = { name: string; cases: number; odhiv: number; arv: number; faskes: number; lat: number; lng: number };

// Koordinat perkiraan pusat tiap kecamatan di Kabupaten Sidoarjo (untuk peta Leaflet).
export const kecamatanData: Kecamatan[] = [
  { name: "Sidoarjo", cases: 512, odhiv: 430, arv: 320, faskes: 8, lat: -7.4478, lng: 112.7183 },
  { name: "Waru", cases: 421, odhiv: 360, arv: 250, faskes: 6, lat: -7.3517, lng: 112.7267 },
  { name: "Taman", cases: 388, odhiv: 310, arv: 240, faskes: 5, lat: -7.3389, lng: 112.6350 },
  { name: "Candi", cases: 254, odhiv: 200, arv: 150, faskes: 4, lat: -7.4820, lng: 112.7000 },
  { name: "Krian", cases: 233, odhiv: 190, arv: 130, faskes: 4, lat: -7.4103, lng: 112.5758 },
  { name: "Sedati", cases: 198, odhiv: 160, arv: 120, faskes: 3, lat: -7.3839, lng: 112.7856 },
  { name: "Gedangan", cases: 176, odhiv: 140, arv: 110, faskes: 3, lat: -7.3822, lng: 112.7108 },
  { name: "Buduran", cases: 154, odhiv: 120, arv: 90, faskes: 2, lat: -7.4139, lng: 112.7256 },
  { name: "Porong", cases: 143, odhiv: 110, arv: 85, faskes: 3, lat: -7.5406, lng: 112.6900 },
  { name: "Tanggulangin", cases: 121, odhiv: 95, arv: 70, faskes: 2, lat: -7.5228, lng: 112.7011 },
  { name: "Sukodono", cases: 118, odhiv: 90, arv: 66, faskes: 2, lat: -7.4114, lng: 112.6633 },
  { name: "Wonoayu", cases: 97, odhiv: 74, arv: 55, faskes: 2, lat: -7.4494, lng: 112.6236 },
];

export const trendData = [
  { year: "2020", kasus: 240, arv: 150 },
  { year: "2021", kasus: 268, arv: 178 },
  { year: "2022", kasus: 289, arv: 205 },
  { year: "2023", kasus: 312, arv: 236 },
  { year: "2024", kasus: 341, arv: 268 },
  { year: "2025", kasus: 367, arv: 296 },
  { year: "2026", kasus: 214, arv: 172 },
];

export const populationData = [
  { name: "Laki-laki", value: 1720 },
  { name: "Perempuan", value: 1010 },
  { name: "Waria", value: 210 },
];

export type ContentStatus = "published" | "draft";

export type Article = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  body?: string;
  status?: ContentStatus;
};

export const articles: Article[] = [
  {
    id: "a1",
    title: "Mengenal HIV: Fakta, Mitos, dan Cara Menyikapinya",
    category: "Edukasi",
    excerpt:
      "HIV bukan akhir dari segalanya. Pahami bagaimana virus ini bekerja, cara penularannya, dan mengapa stigma justru menjadi hambatan terbesar.",
    author: "dr. Anindya Prameswari",
    date: "12 Juli 2026",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    id: "a2",
    title: "ARV: Obat yang Membuat ODHIV Hidup Normal & Produktif",
    category: "Kesehatan",
    excerpt:
      "Terapi Antiretroviral (ARV) menekan jumlah virus hingga tak terdeteksi. Ketahui pentingnya kepatuhan minum obat setiap hari.",
    author: "dr. Bagas Nurhadi",
    date: "8 Juli 2026",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
  },
  {
    id: "a3",
    title: "Peran Sekolah dalam Pendidikan Kesehatan Reproduksi",
    category: "Pendidikan",
    excerpt:
      "Guru dan orang tua adalah garda terdepan. Bagaimana menyampaikan edukasi kesehatan reproduksi yang tepat sesuai usia?",
    author: "Rania Salsabila, M.Psi",
    date: "3 Juli 2026",
    readTime: "7 menit",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  },
  {
    id: "a4",
    title: "Menghapus Stigma: Dukungan Keluarga untuk ODHIV",
    category: "Sosial",
    excerpt:
      "Dukungan psikososial mempercepat pemulihan. Simak kisah dan langkah nyata mendampingi orang terdekat yang hidup dengan HIV.",
    author: "Tim Konselor INCLUSA",
    date: "28 Juni 2026",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
  },
  {
    id: "a5",
    title: "VCT: Kenapa Tes HIV Sukarela itu Penting?",
    category: "Layanan",
    excerpt:
      "Voluntary Counselling and Testing (VCT) adalah langkah awal menuju hidup sehat. Prosesnya rahasia, gratis, dan ramah.",
    author: "dr. Anindya Prameswari",
    date: "20 Juni 2026",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
  },
  {
    id: "a6",
    title: "Pencegahan Penularan HIV dari Ibu ke Anak (PPIA)",
    category: "Kesehatan",
    excerpt:
      "Dengan penanganan tepat, ibu dengan HIV bisa melahirkan anak yang sehat dan bebas HIV. Ini yang perlu Anda ketahui.",
    author: "dr. Bagas Nurhadi",
    date: "15 Juni 2026",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
];

export type NewsItem = { id: string; title: string; date: string; source: string; excerpt: string; tag: string; image?: string; body?: string; status?: ContentStatus };

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Dinkes Sidoarjo Luncurkan Program Skrining HIV Keliling",
    date: "18 Juli 2026",
    source: "Dinas Kesehatan Sidoarjo",
    tag: "Program",
    excerpt: "Mobil layanan VCT keliling menjangkau 18 kecamatan untuk mempermudah akses tes HIV bagi masyarakat.",
  },
  {
    id: "n2",
    title: "Kolaborasi Yayasan & 26 Sekolah untuk Edukasi Remaja",
    date: "14 Juli 2026",
    source: "Dinas Pendidikan",
    tag: "Kolaborasi",
    excerpt: "Program pendidikan kesehatan reproduksi kini masuk ke kurikulum ekstrakurikuler di sekolah menengah.",
  },
  {
    id: "n3",
    title: "Peringatan Hari AIDS Sedunia 2026 di Alun-Alun Sidoarjo",
    date: "1 Juli 2026",
    source: "Yayasan INCLUSA",
    tag: "Acara",
    excerpt: "Ribuan warga mengikuti kampanye 'Bersama Akhiri AIDS' dengan tes gratis dan seminar publik.",
  },
  {
    id: "n4",
    title: "Cakupan ARV Sidoarjo Naik Menjadi 72% di Semester I",
    date: "25 Juni 2026",
    source: "Dinas Kesehatan Sidoarjo",
    tag: "Capaian",
    excerpt: "Peningkatan kepatuhan pengobatan berkat pendampingan konselor sebaya dan sistem pengingat digital.",
  },
];

export type Faq = { id?: string; q: string; a: string; category: string };

export const faqs: Faq[] = [
  { category: "Umum", q: "Apa perbedaan HIV dan AIDS?", a: "HIV (Human Immunodeficiency Virus) adalah virus yang menyerang sistem kekebalan tubuh. AIDS (Acquired Immunodeficiency Syndrome) adalah tahap lanjut dari infeksi HIV ketika sistem imun sangat melemah. Tidak semua orang dengan HIV berkembang menjadi AIDS, terutama jika rutin minum ARV." },
  { category: "Penularan", q: "Bagaimana HIV menular?", a: "HIV menular melalui cairan tubuh tertentu: darah, cairan kelamin, dan ASI. Penularan umum terjadi lewat hubungan seksual tanpa pengaman, berbagi jarum suntik, dan dari ibu ke anak. HIV TIDAK menular lewat pelukan, jabat tangan, berbagi alat makan, atau gigitan nyamuk." },
  { category: "Pencegahan", q: "Bagaimana cara mencegah HIV?", a: "Gunakan kondom saat berhubungan seksual, hindari berbagi jarum suntik, lakukan tes HIV rutin, dan pertimbangkan PrEP (Pre-Exposure Prophylaxis) bagi kelompok berisiko. Ibu hamil dianjurkan mengikuti program PPIA." },
  { category: "Layanan", q: "Di mana saya bisa melakukan tes HIV?", a: "Tes HIV (VCT) tersedia gratis dan rahasia di seluruh Puskesmas, sejumlah klinik, dan rumah sakit di Sidoarjo. Gunakan fitur 'Cari Fasilitas' di platform ini untuk menemukan lokasi terdekat." },
  { category: "Pengobatan", q: "Apakah ARV harus diminum seumur hidup?", a: "Ya, ARV diminum setiap hari secara teratur seumur hidup. Dengan kepatuhan yang baik, jumlah virus bisa ditekan hingga tidak terdeteksi, sehingga ODHIV dapat hidup sehat dan tidak menularkan virus (U=U, Undetectable = Untransmittable)." },
  { category: "Sosial", q: "Bagaimana menyikapi teman/keluarga dengan HIV?", a: "Berikan dukungan tanpa stigma. Orang dengan HIV membutuhkan penerimaan, bukan pengucilan. Aman untuk hidup, bekerja, dan bersosialisasi bersama mereka dalam aktivitas sehari-hari." },
];

export type FacilityType = "Rumah Sakit" | "Puskesmas" | "Klinik" | "Psikolog";

export type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  district: string;
  address: string;
  phone: string;
  services: string[];
};

export const facilities: Facility[] = [
  { id: "f1", name: "RSUD Sidoarjo", type: "Rumah Sakit", district: "Sidoarjo", address: "Jl. Mojopahit No.667, Sidoarjo", phone: "(031) 8961649", services: ["VCT", "ARV", "PDP", "Lab"] },
  { id: "f2", name: "Puskesmas Sidoarjo", type: "Puskesmas", district: "Sidoarjo", address: "Jl. Dr. Soetomo No.58", phone: "(031) 8921111", services: ["VCT", "Konseling"] },
  { id: "f3", name: "RS Siti Khodijah", type: "Rumah Sakit", district: "Sepanjang", address: "Jl. Pahlawan No.260, Sepanjang", phone: "(031) 7876064", services: ["VCT", "ARV", "PDP"] },
  { id: "f4", name: "Puskesmas Waru", type: "Puskesmas", district: "Waru", address: "Jl. Kolonel Sugiono No.101", phone: "(031) 8531234", services: ["VCT", "Skrining"] },
  { id: "f5", name: "Klinik Pratama Sehat Krian", type: "Klinik", district: "Krian", address: "Jl. Raya Krian No.45", phone: "(031) 8971020", services: ["VCT", "Konseling"] },
  { id: "f6", name: "Puskesmas Taman", type: "Puskesmas", district: "Taman", address: "Jl. Sawunggaling No.12, Taman", phone: "(031) 7882345", services: ["VCT", "ARV"] },
  { id: "f7", name: "Puskesmas Candi", type: "Puskesmas", district: "Candi", address: "Jl. Raya Candi No.7", phone: "(031) 8965432", services: ["VCT", "Skrining"] },
  { id: "f8", name: "RS Delta Surya", type: "Rumah Sakit", district: "Sidoarjo", address: "Jl. Pahlawan No.9, Sidoarjo", phone: "(031) 8963543", services: ["VCT", "ARV", "PDP", "Lab"] },
  { id: "f9", name: "Biro Psikologi Sahabat Jiwa", type: "Psikolog", district: "Sidoarjo", address: "Jl. Gajah Mada No.21, Sidoarjo", phone: "(031) 8955120", services: ["Konseling", "Pendampingan Psikososial"] },
  { id: "f10", name: "Klinik Psikologi Mentari", type: "Psikolog", district: "Waru", address: "Jl. Brigjen Katamso No.88, Waru", phone: "(031) 8544321", services: ["Konseling", "Dukungan ODHIV"] },
];

export type InfoTopic = { id: string; title: string; icon: string; summary: string; points: string[] };

export const infoTopics: InfoTopic[] = [
  {
    id: "what-hiv",
    title: "Apa itu HIV?",
    icon: "Virus",
    summary: "Virus yang menyerang sel CD4 pada sistem kekebalan tubuh sehingga tubuh lebih rentan terhadap infeksi.",
    points: [
      "HIV = Human Immunodeficiency Virus.",
      "Menyerang dan melemahkan sistem imun tubuh.",
      "Belum ada obat penyembuh, tetapi bisa dikendalikan dengan ARV.",
      "ODHIV dapat hidup panjang, sehat, dan produktif.",
    ],
  },
  {
    id: "what-aids",
    title: "Apa itu AIDS?",
    icon: "Activity",
    summary: "Tahap paling lanjut dari infeksi HIV ketika sistem kekebalan tubuh sudah sangat rusak.",
    points: [
      "AIDS = Acquired Immunodeficiency Syndrome.",
      "Muncul ketika HIV tidak diobati bertahun-tahun.",
      "Ditandai infeksi oportunistik yang berat.",
      "Dapat dicegah dengan pengobatan HIV sejak dini.",
    ],
  },
  {
    id: "prevention",
    title: "Pencegahan",
    icon: "ShieldCheck",
    summary: "Langkah-langkah efektif untuk mencegah penularan HIV bagi semua kalangan.",
    points: [
      "Setia pada satu pasangan & hindari seks berisiko.",
      "Gunakan kondom secara benar dan konsisten.",
      "Jangan berbagi jarum suntik.",
      "Tes HIV rutin dan pertimbangkan PrEP.",
    ],
  },
  {
    id: "transmission",
    title: "Penularan",
    icon: "GitBranch",
    summary: "HIV hanya menular melalui cairan tubuh tertentu — bukan kontak sosial sehari-hari.",
    points: [
      "Hubungan seksual tanpa pengaman.",
      "Berbagi jarum suntik / alat tato tidak steril.",
      "Transfusi darah yang tidak diskrining.",
      "Dari ibu ke anak saat hamil, melahirkan, atau menyusui.",
    ],
  },
  {
    id: "gov-service",
    title: "Layanan Pemerintah",
    icon: "Landmark",
    summary: "Beragam layanan gratis yang disediakan pemerintah untuk pencegahan dan pengobatan HIV.",
    points: [
      "Tes VCT gratis di Puskesmas & RS.",
      "Pengobatan ARV gratis bagi ODHIV.",
      "Program PPIA untuk ibu hamil.",
      "Konseling dan pendampingan psikososial.",
    ],
  },
];

export type Curriculum = { id: string; title: string; level: string; desc: string; active?: boolean };

export const curriculum: Curriculum[] = [
  { id: "c1", title: "Kenali Tubuh & Ruang Pribadi", level: "SD 1–3", desc: "Belajar anatomi dasar, menjaga kebersihan diri, serta memahami ruang pribadi di rumah dan sekolah.", active: true },
  { id: "c2", title: "Tubuh & Hak-Hakku", level: "SD 4–6", desc: "Mengenal perubahan tubuh, hak atas tubuh sendiri, dan cara berkata 'tidak' pada perlakuan tidak pantas." },
  { id: "c3", title: "Lindungi Dirimu", level: "SMP – SMA", desc: "Pemahaman kesehatan reproduksi, pergaulan sehat, serta pencegahan HIV/AIDS bagi remaja." },
  { id: "c4", title: "Masa Puberku", level: "Usia 9+", desc: "Mendampingi anak memahami masa pubertas dengan tenang, sehat, dan penuh percaya diri." },
  { id: "c5", title: "Bicara dengan Anak", level: "Orang Tua", desc: "Panduan bagi orang tua untuk berkomunikasi tentang kesehatan reproduksi secara nyaman." },
];

export type Testimonial = { id: string; name: string; role: string; program: string; text: string };

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Chelly F. N.", role: "Peserta", program: "Kelas Kesehatan Reproduksi", text: "Materinya jelas dan tidak menghakimi. Anak-anak jadi lebih paham menjaga diri. Terima kasih tim INCLUSA!" },
  { id: "t2", name: "Shelvia & Aisyah", role: "Orang Tua Peserta", program: "Kelas Kenali Tubuh", text: "Sangat bermanfaat. Sekarang saya lebih percaya diri berbicara soal kesehatan reproduksi dengan anak." },
  { id: "t3", name: "Rachmi Ilma", role: "Relawan Guru", program: "Program Edukasi Sekolah", text: "Sesi yang luar biasa! Ilustrasinya menarik dan mudah dipahami oleh siswa. Insightful yet easy to understand!" },
];

export const collabStats: StatItem[] = [
  { label: "Sesi Edukasi", value: "126", sub: "terselenggara", tone: "blue" },
  { label: "Relawan", value: "291", sub: "terdaftar", tone: "coral" },
  { label: "Sekolah Mitra", value: "26", sub: "institusi", tone: "teal" },
  { label: "Faskes Jaringan", value: "48", sub: "se-Sidoarjo", tone: "maize" },
];

export const partners = [
  "Dinas Kesehatan",
  "Dinas Pendidikan",
  "Rumah Sakit",
  "Puskesmas",
  "Klinik",
  "Psikolog",
];

// ===== Statistik lanjutan: gender, usia, kelompok risiko =====
export const genderData = [
  { name: "Laki-laki", value: 1720 },
  { name: "Perempuan", value: 1010 },
  { name: "Waria", value: 210 },
];

export const ageData = [
  { group: "< 15", value: 86 },
  { group: "15–24", value: 642 },
  { group: "25–34", value: 1184 },
  { group: "35–44", value: 838 },
  { group: "45–54", value: 452 },
  { group: "55+", value: 280 },
];

export const riskGroupData = [
  { group: "LSL", value: 934 },
  { group: "Pasangan Berisiko", value: 712 },
  { group: "WPS", value: 486 },
  { group: "Pengguna Napza Suntik", value: 214 },
  { group: "Waria", value: 210 },
  { group: "Lainnya", value: 386 },
];

// ===== Struktur organisasi / tim yayasan =====
export type TeamMember = { id: string; name: string; role: string; focus: string; initials: string; tone: StatItem["tone"] };

export const organization: TeamMember[] = [
  { id: "o1", name: "Drg. Wulan Kartika", role: "Ketua Yayasan", focus: "Arah strategis & kemitraan lintas sektor", initials: "WK", tone: "blue" },
  { id: "o2", name: "dr. Anindya Prameswari", role: "Koordinator Kesehatan", focus: "Program VCT, ARV & rujukan faskes", initials: "AP", tone: "teal" },
  { id: "o3", name: "Rania Salsabila, M.Psi", role: "Koordinator Edukasi", focus: "Kurikulum & pendampingan sekolah", initials: "RS", tone: "coral" },
  { id: "o4", name: "Bagas Nurhadi, S.Kom", role: "Koordinator Data & GIS", focus: "Dashboard monitoring & peta sebaran", initials: "BN", tone: "maize" },
  { id: "o5", name: "Tim Konselor Sebaya", role: "Layanan Dukungan", focus: "Konseling & dukungan psikososial ODHIV", initials: "KS", tone: "blue" },
  { id: "o6", name: "Relawan Komunitas", role: "Jaringan Lapangan", focus: "Penjangkauan & kampanye anti-stigma", initials: "RK", tone: "teal" },
];

// ===== Modul Education Center (Coming Soon) =====
export type EduModule = { id: string; title: string; audience: string; desc: string; icon: string; status: string };

export const eduModules: EduModule[] = [
  { id: "m1", title: "Teacher Module", audience: "Guru", desc: "Rencana pembelajaran, materi ajar siap pakai, dan panduan fasilitasi kelas kesehatan reproduksi.", icon: "GraduationCap", status: "Segera" },
  { id: "m2", title: "Student Module", audience: "Pelajar", desc: "Materi interaktif per jenjang usia, kuis, dan sertifikat penyelesaian belajar mandiri.", icon: "BookOpen", status: "Segera" },
  { id: "m3", title: "Learning Resource", audience: "Umum", desc: "Kumpulan video, infografis, dan modul unduh yang dikurasi tenaga kesehatan.", icon: "FolderOpen", status: "Segera" },
  { id: "m4", title: "Digital Library", audience: "Peneliti", desc: "Perpustakaan digital jurnal, laporan, dan data terbuka HIV/AIDS Sidoarjo.", icon: "Library", status: "Segera" },
  { id: "m5", title: "Marketplace", audience: "Komunitas", desc: "Marketplace edukasi untuk berbagi & mengakses konten kelas kolaboratif.", icon: "Store", status: "Roadmap" },
];
