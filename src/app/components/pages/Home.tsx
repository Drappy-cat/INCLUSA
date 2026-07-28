import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import {
  Database,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Briefcase,
  ArrowRight,
  Activity,
  Users,
  Building2,
  HeartHandshake,
  Quote,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SectionHeading, StatCard, Eyebrow } from "../ui-kit/Shared";
import {
  collabStats,
} from "../../data/content";
import { useContent, isPublished } from "../../data/ContentStore";

/* ─────────────── HERO SLIDESHOW DATA ─────────────── */
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80",
    badge: "INCLUSA Institute · Indonesia",
    heading: "Membangun Pembangunan\nInklusif melalui Data,\nRiset & Kolaborasi",
    highlight: "Riset & Kolaborasi",
    sub: "Lembaga independen yang berfokus pada pemberdayaan anak, perempuan, dan penyandang disabilitas melalui pendekatan berbasis bukti di Indonesia.",
  },
  {
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
    badge: "INCLUSA Academy",
    heading: "Meningkatkan Kapasitas\nProfesional untuk\nInklusi Sosial",
    highlight: "Inklusi Sosial",
    sub: "Program pelatihan intensif untuk tenaga kesehatan, pendidik, fasilitator komunitas, dan pemimpin organisasi di seluruh Indonesia.",
  },
  {
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    badge: "INCLUSA Data Center",
    heading: "Observatori Data\nNasional untuk\nKehidupan yang Lebih Baik",
    highlight: "Kehidupan yang Lebih Baik",
    sub: "Mengumpulkan, menganalisis, dan menyebarluaskan data inklusif nasional untuk mendukung pengambilan kebijakan yang berbasis bukti.",
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
    badge: "INCLUSA Research Center",
    heading: "Riset Ilmiah untuk\nPerubahan Sosial\nyang Nyata",
    highlight: "Perubahan Sosial",
    sub: "Menghasilkan publikasi, policy brief, dan laporan riset yang relevan dengan isu inklusi sosial, anak, perempuan, dan disabilitas di Indonesia.",
  },
];

/* ─────────────── 5 STRATEGIC AREAS ─────────────── */
const strategicAreas = [
  {
    icon: Database,
    title: "Data Center",
    desc: "Observatori data inklusif nasional — statistik, peta GIS, dan analitik untuk pengambilan keputusan berbasis bukti.",
    to: "/data-center",
    color: "bg-brand-blue",
    status: "Aktif",
  },
  {
    icon: BookOpen,
    title: "Policy Lab",
    desc: "Riset kebijakan, advokasi, dan jejaring kemitraan dengan pemerintah, universitas, dan organisasi internasional.",
    to: "/policy-lab",
    color: "bg-brand-teal",
    status: "Aktif",
  },
  {
    icon: GraduationCap,
    title: "Academy",
    desc: "Pelatihan & capacity building profesional untuk tenaga kesehatan, pendidik, dan fasilitator komunitas.",
    to: "/academy",
    color: "bg-[#17787d]",
    status: "Aktif",
  },
  {
    icon: FlaskConical,
    title: "Research Center",
    desc: "Publikasi ilmiah, artikel edukasi, dan knowledge hub untuk isu inklusi sosial di Indonesia.",
    to: "/research",
    color: "bg-brand-maize",
    status: "Aktif",
  },
  {
    icon: Briefcase,
    title: "Consulting",
    desc: "Layanan advisory & pendampingan organisasi dalam mengimplementasikan program pembangunan inklusif.",
    to: "/consulting",
    color: "bg-brand-coral",
    status: "Coming Soon",
  },
];

const collabIcons = [Activity, Users, Building2, HeartHandshake];

/* ─────────────── HERO SLIDESHOW COMPONENT ─────────────── */
function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    if (animating || next === current) return;
    setPrev(current);
    setCurrent(next);
    setAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 700);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % heroSlides.length;
        setPrev(c);
        setAnimating(true);
        setTimeout(() => {
          setPrev(null);
          setAnimating(false);
        }, 700);
        return next;
      });
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const slide = heroSlides[current];
  const prevSlide = prev !== null ? heroSlides[prev] : null;

  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden bg-brand-blue-deep">
      {/* Slides stack */}
      <div className="absolute inset-0">
        {/* Previous slide — slides up & fades out */}
        {prevSlide && animating && (
          <div
            key={`prev-${prev}`}
            className="absolute inset-0"
            style={{
              animation: "slideOutUp 700ms ease-in-out forwards",
            }}
          >
            <ImageWithFallback
              src={prevSlide.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/80 to-brand-blue-deep/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Current slide — slides in from bottom */}
        <div
          key={`curr-${current}`}
          className="absolute inset-0"
          style={{
            animation: animating ? "slideInFromBottom 700ms ease-in-out forwards" : "none",
          }}
        >
          <ImageWithFallback
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/80 to-brand-blue-deep/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <span
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-maize backdrop-blur-sm"
              style={{ animation: "fadeSlideUp 500ms 100ms both" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-maize" />
              {slide.badge}
            </span>

            <h1
              key={`h1-${current}`}
              className="mt-5 font-display text-[2.4rem] font-extrabold leading-[1.1] sm:text-[3.2rem] lg:text-[3.8rem]"
              style={{ animation: "fadeSlideUp 500ms 200ms both", whiteSpace: "pre-line" }}
            >
              {slide.heading.split(slide.highlight).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="text-brand-maize">{slide.highlight}</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            <p
              key={`sub-${current}`}
              className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-white/75 sm:text-[1.1rem]"
              style={{ animation: "fadeSlideUp 500ms 300ms both" }}
            >
              {slide.sub}
            </p>

            <div
              key={`cta-${current}`}
              className="mt-8 flex flex-wrap gap-3"
              style={{ animation: "fadeSlideUp 500ms 400ms both" }}
            >
              <Link
                to="/data-center"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-xl"
              >
                Jelajahi Program <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Hubungi Kami <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div
              key={`trust-${current}`}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60"
              style={{ animation: "fadeSlideUp 500ms 500ms both" }}
            >
              {["Lembaga Independen", "Berbasis Bukti", "Skala Nasional"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-maize" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-brand-maize"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInFromBottom {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes slideOutUp {
          from { transform: translateY(0);    opacity: 1; }
          to   { transform: translateY(-60px); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────── MAIN HOME COMPONENT ─────────────── */
export function Home() {
  const { articles: allArticles, news: allNews, kecamatan: kecamatanData } = useContent();
  const articles = allArticles.filter(isPublished);
  const news = allNews.filter(isPublished);

  return (
    <>
      {/* ===== HERO (Slideshow) ===== */}
      <HeroSlideshow />

      {/* ===== 5 STRATEGIC AREAS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="5 Strategic Areas"
          title="Lima Pilar Utama INCLUSA Institute"
          subtitle="Satu institusi yang mengintegrasikan data, kebijakan, edukasi, riset, dan konsultasi untuk pembangunan inklusif Indonesia."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {strategicAreas.map((m) => (
            <Link
              key={m.title}
              to={m.to}
              className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.color} text-white`}>
                  <m.icon className="h-6 w-6" />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${
                    m.status === "Coming Soon"
                      ? "bg-brand-maize/20 text-brand-maize"
                      : "bg-accent text-brand-blue"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-brand-blue-deep">
                INCLUSA {m.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                Selengkapnya <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== COLLAB STATS ===== */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Dampak Kolaborasi" title="Bergerak Bersama untuk Indonesia yang Inklusif" />
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {collabStats.map((s, i) => {
              const Icon = collabIcons[i];
              return <StatCard key={s.label} item={s} icon={<Icon className="h-5 w-5" />} />;
            })}
          </div>
        </div>
      </section>

      {/* ===== GIS PREVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>INCLUSA Data Center · Peta GIS</Eyebrow>
            <h2 className="mt-3 font-display text-[1.8rem] font-bold leading-tight text-brand-blue-deep">
              Pantau data inklusif per wilayah di Indonesia
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              Visualisasi data spasial membantu memetakan prioritas intervensi. Data Sidoarjo tersedia sebagai
              dataset awal; wilayah lain dalam proses pengumpulan data.
            </p>
            <Link
              to="/data-center"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Buka Data Center <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sebaran Kasus · Sidoarjo (Contoh Dataset)
              </p>
              <span className="rounded-full bg-brand-maize/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-maize">
                Data Aktif
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {kecamatanData.slice(0, 9).map((k) => {
                const max = Math.max(...kecamatanData.map((d) => d.cases));
                const intensity = 0.2 + (k.cases / max) * 0.8;
                return (
                  <Link
                    key={k.name}
                    to="/data-center"
                    className="group rounded-lg p-3 text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: `rgba(31, 154, 160, ${intensity})` }}
                  >
                    <p className="text-xs font-semibold leading-tight">{k.name}</p>
                    <p className="mt-1 font-display text-lg font-bold">{k.cases}</p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Rendah</span>
              <div className="mx-3 h-2 flex-1 rounded-full bg-gradient-to-r from-brand-teal/30 to-brand-blue" />
              <span>Tinggi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES (Research Center Preview) ===== */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Research Center" title="Artikel & Publikasi Terbaru" />
            <Link to="/research" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-blue hover:underline sm:inline-flex">
              Semua artikel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <article key={a.id} className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug text-brand-blue-deep">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{a.date} · {a.readTime}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-brand-blue-deep py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Suara Mitra & Peserta" title={<span className="text-white">Apa Kata Mereka</span>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { id: 1, text: "INCLUSA membantu kami menyusun program inklusi yang benar-benar tepat sasaran. Pendekatan berbasis data membuat setiap kebijakan terasa lebih percaya diri.", name: "Dr. Siti Rahmawati", role: "Kepala Dinas Sosial", program: "Policy Lab" },
              { id: 2, text: "Pelatihan Academy INCLUSA mengubah cara kami mendampingi komunitas. Ilmunya langsung bisa diterapkan di lapangan.", name: "Agung Prasetyo", role: "Fasilitator Komunitas", program: "INCLUSA Academy" },
              { id: 3, text: "Data Center INCLUSA menjadi referensi utama kami dalam menyusun proposal penelitian tentang disabilitas di Indonesia.", name: "Prof. Anis Kurniawan", role: "Peneliti Sosial", program: "Research Center" },
            ].map((t) => (
              <div key={t.id} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <Quote className="h-8 w-8 text-brand-maize" />
                <p className="mt-3 text-sm leading-relaxed text-white/85">{t.text}</p>
                <div className="mt-5">
                  <p className="font-display font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role} · {t.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST NEWS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Kabar Terkini" title="Berita & Kegiatan INCLUSA" />
          <Link to="/research" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-blue hover:underline sm:inline-flex">
            Semua berita <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {news.slice(0, 4).map((n) => (
            <Link key={n.id} to="/research" className="group flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
              <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-blue">{n.tag}</span>
              <h3 className="mt-3 font-display text-base font-bold leading-snug text-brand-blue-deep">{n.title}</h3>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
              <p className="mt-3 text-xs text-muted-foreground">{n.date} · {n.source}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== COLLABORATION PARTNERS (Marquee Placeholder) ===== */}
      <section className="bg-brand-cream py-14 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Mitra Kolaborasi"
            title="Siap Menjalin Kemitraan Strategis"
            subtitle="Kami terbuka untuk kolaborasi dengan pemerintah, universitas, organisasi internasional, sektor privat, dan komunitas. Bersama membangun Indonesia yang lebih inklusif."
          />

          {/* Marquee container */}
          <div className="relative mt-10">
            {/* Gradient fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-brand-cream to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-brand-cream to-transparent" />

            {/* Scrolling track */}
            <div className="flex items-center gap-8 animate-marquee">
              {/* Placeholder partner logos — will be replaced with real logos */}
              {[
                "Pemerintah Daerah",
                "Universitas Mitra",
                "NGO Internasional",
                "Kementerian Sosial",
                "UNICEF",
                "Dinas Pendidikan",
                "Rumah Sakit Mitra",
                "CSR Corporate",
                "Lembaga Riset",
                "Komunitas Lokal",
                // Duplicate for seamless loop
                "Pemerintah Daerah",
                "Universitas Mitra",
                "NGO Internasional",
                "Kementerian Sosial",
                "UNICEF",
                "Dinas Pendidikan",
                "Rumah Sakit Mitra",
                "CSR Corporate",
                "Lembaga Riset",
                "Komunitas Lokal",
              ].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex h-16 w-36 shrink-0 flex-col items-center justify-center rounded-xl border border-border/50 bg-white/80 px-3 shadow-sm"
                >
                  {/* TODO: Replace with actual partner logo images */}
                  <div className="h-6 w-16 rounded bg-gray-200" />
                  <span className="mt-1.5 text-[0.6rem] font-medium text-muted-foreground text-center leading-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground italic">
            Logo mitra akan segera ditampilkan. Tertarik menjadi mitra INCLUSA?{" "}
            <Link to="/kontak" className="font-semibold text-brand-blue not-italic hover:underline">
              Hubungi kami →
            </Link>
          </p>
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-deep px-8 py-14 text-center text-white sm:px-14">
          <h2 className="mx-auto max-w-2xl font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
            Siap berkolaborasi untuk Indonesia yang lebih inklusif?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Bergabunglah dengan INCLUSA Institute — bersama kita wujudkan pembangunan inklusif yang berkelanjutan untuk anak, perempuan, dan penyandang disabilitas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/kontak"
              className="rounded-full bg-brand-maize px-6 py-3 font-semibold text-brand-blue-deep transition-transform hover:-translate-y-0.5"
            >
              Hubungi Kami
            </Link>
            <Link
              to="/data-center"
              className="rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
            >
              Jelajahi Data Center
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
