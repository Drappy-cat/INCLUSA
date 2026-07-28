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
  Newspaper,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SectionHeading, StatCard, Eyebrow } from "../ui-kit/Shared";
import { ScrollReveal } from "../ui-kit/ScrollReveal";
import {
  collabStats,
} from "../../data/content";
import { useContent, isPublished } from "../../data/ContentStore";
import { useLanguage } from "../../data/LanguageContext";
import heroSlide1 from "../../../assets/hero-slide-1.png";
import heroSlide2 from "../../../assets/hero-slide-2.png";
import heroSlide3 from "../../../assets/hero-slide-3.png";
import heroSlide4 from "../../../assets/hero-slide-4.png";

/* ─────────────── HERO SLIDESHOW DATA ─────────────── */
const heroSlides = [
  {
    image: heroSlide1,
    badge: "INCLUSA Institute · Indonesia",
    heading: "Membangun Pembangunan\nInklusif melalui Data,\nRiset & Kolaborasi",
    highlight: "Riset & Kolaborasi",
    sub: "Lembaga independen yang berfokus pada pemberdayaan anak, perempuan, dan penyandang disabilitas melalui pendekatan berbasis bukti di Indonesia.",
  },
  {
    image: heroSlide2,
    badge: "INCLUSA Academy",
    heading: "Meningkatkan Kapasitas\nProfesional untuk\nInklusi Sosial",
    highlight: "Inklusi Sosial",
    sub: "Program pelatihan intensif untuk tenaga kesehatan, pendidik, fasilitator komunitas, dan pemimpin organisasi di seluruh Indonesia.",
  },
  {
    image: heroSlide3,
    badge: "INCLUSA Data Center",
    heading: "Observatori Data\nNasional untuk\nKehidupan yang Lebih Baik",
    highlight: "Kehidupan yang Lebih Baik",
    sub: "Mengumpulkan, menganalisis, dan menyebarluaskan data inklusif nasional untuk mendukung pengambilan kebijakan yang berbasis bukti.",
  },
  {
    image: heroSlide4,
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
    status: "Coming Soon",
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
export function HeroSlideshow() {
  const { t } = useLanguage();
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

  const handlePrev = () => {
    const next = (current - 1 + heroSlides.length) % heroSlides.length;
    goTo(next);
  };

  const handleNext = () => {
    const next = (current + 1) % heroSlides.length;
    goTo(next);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, animating]);

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

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
        aria-label="Slide Sebelumnya"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
        aria-label="Slide Selanjutnya"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

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
                {t("heroBtnExplore")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {t("heroBtnContact")} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div
              key={`trust-${current}`}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60"
              style={{ animation: "fadeSlideUp 500ms 500ms both" }}
            >
              {[t("trust1"), t("trust2"), t("trust3")].map((trustItem) => (
                <span key={trustItem} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-maize" /> {trustItem}
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
  const { t } = useLanguage();
  const { articles: allArticles, news: allNews, kecamatan: kecamatanData } = useContent();
  const articles = allArticles.filter(isPublished);
  const news = allNews.filter(isPublished);

  const getAreaDesc = (key: string) => {
    switch (key) {
      case "Data Center": return t("areaDataCenterDesc");
      case "Policy Lab": return t("areaPolicyLabDesc");
      case "Academy": return t("areaAcademyDesc");
      case "Research Center": return t("areaResearchDesc");
      case "Consulting": return t("areaConsultingDesc");
      default: return "";
    }
  };

  return (
    <>
      {/* ===== HERO (Slideshow) ===== */}
      <HeroSlideshow />

      {/* ===== 5 STRATEGIC AREAS ===== */}
      <section className="bg-white py-16 dark:bg-[#0f1c30]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              center
              eyebrow={t("areasEyebrow")}
              title={t("areasTitle")}
              subtitle={t("areasSubtitle")}
            />
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {strategicAreas.map((m, idx) => (
              <ScrollReveal key={m.title} staggerIndex={idx} distance={24}>
                <Link
                  to={m.to}
                  className="group flex flex-col rounded-2xl border border-border bg-white p-6 card-hover-lift hover-glow-border dark:bg-slate-900 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.color} text-white`}>
                      <m.icon className="h-6 w-6 icon-hover-spin" />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${
                        m.status === "Coming Soon"
                          ? "bg-brand-maize/20 text-brand-maize"
                          : "bg-accent text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal"
                      }`}
                    >
                      {m.status === "Coming Soon" ? t("comingSoon") : t("active")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-blue-deep dark:text-white">
                    INCLUSA {m.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                    {getAreaDesc(m.title) || m.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue dark:text-brand-teal">
                    {t("btnMore")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GIS PREVIEW ===== */}
      <section className="bg-brand-cream py-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <ScrollReveal direction="left">
              <Eyebrow>{t("gisEyebrow")}</Eyebrow>
              <h2 className="mt-3 font-display text-[1.8rem] font-bold leading-tight text-brand-blue-deep dark:text-white">
                {t("gisTitle")}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground dark:text-slate-300">
                {t("gisSubtitle")}
              </p>
              <Link
                to="/data-center"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 animate-cta-pulse"
              >
                {t("gisButton")} <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground dark:text-slate-400">
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
                      className="group rounded-lg p-3 text-white transition-all hover:scale-105 animate-pin-pulse"
                      style={{ backgroundColor: `rgba(31, 154, 160, ${intensity})`, animationDelay: `${Math.random() * 2}s` }}
                    >
                      <p className="text-xs font-semibold leading-tight">{k.name}</p>
                      <p className="mt-1 font-display text-lg font-bold">{k.cases}</p>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground dark:text-slate-400">
                <span>{t("gisLow")}</span>
                <div className="mx-3 h-2 flex-1 rounded-full bg-gradient-to-r from-brand-teal/30 to-brand-blue" />
                <span>{t("gisHigh")}</span>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES (Research Center Preview) ===== */}
      <section className="bg-white py-16 dark:bg-[#0f1c30]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow={t("researchEyebrow")} title={t("researchTitle")} />
              <Link to="/research" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-blue dark:text-brand-teal hover:underline sm:inline-flex">
                {t("researchAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          {articles.length === 0 ? (
            <ScrollReveal delay={100}>
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-brand-cream/50 p-8 text-center dark:bg-slate-900/60 dark:border-slate-800">
                <BookOpen className="mx-auto h-8 w-8 text-brand-blue dark:text-brand-teal" />
                <p className="mt-2 font-display text-base font-bold text-brand-blue-deep dark:text-white">{t("emptyArticlesTitle")}</p>
                <p className="mt-1 text-xs text-muted-foreground dark:text-slate-300">{t("emptyArticlesSub")}</p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((a, idx) => (
                <ScrollReveal key={a.id} staggerIndex={idx}>
                  <article className="group overflow-hidden rounded-2xl border border-border bg-white card-hover-lift dark:bg-slate-900 dark:border-slate-800">
                    {a.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover img-hover-zoom" />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-brand-blue-deep dark:text-white">{a.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground dark:text-slate-300">{a.excerpt}</p>
                      <p className="mt-3 text-xs text-muted-foreground dark:text-slate-400">{a.date} · {a.readTime}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS (Hidden until added by admin) ===== */}
      {/* 
      <section className="bg-brand-blue-deep py-16 text-white dark:bg-[#070e1e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow={t("testiEyebrow")} title={<span className="text-white">{t("testiTitle")}</span>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { id: 1, text: "INCLUSA membantu kami menyusun program inklusi yang benar-benar tepat sasaran.", name: "Dr. Siti Rahmawati", role: "Kepala Dinas Sosial" }
            ].map((t) => (
              <div key={t.id} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <Quote className="h-8 w-8 text-brand-maize" />
                <p className="mt-3 text-sm leading-relaxed text-white/85">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ===== LATEST NEWS ===== */}
      <section className="bg-brand-cream py-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow={t("newsEyebrow")} title={t("newsTitle")} />
              <Link to="/research?tab=berita" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-blue dark:text-brand-teal hover:underline sm:inline-flex">
                {t("newsAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          {news.length === 0 ? (
            <ScrollReveal delay={100}>
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-white/60 p-8 text-center dark:bg-slate-900/60 dark:border-slate-800">
                <Newspaper className="mx-auto h-8 w-8 text-brand-blue dark:text-brand-teal" />
                <p className="mt-2 font-display text-base font-bold text-brand-blue-deep dark:text-white">{t("emptyNewsTitle")}</p>
                <p className="mt-1 text-xs text-muted-foreground dark:text-slate-300">{t("emptyNewsSub")}</p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {news.slice(0, 4).map((n, idx) => (
                <ScrollReveal key={n.id} staggerIndex={idx}>
                  <Link to={`/berita/${n.id}`} className="group flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm card-hover-lift dark:bg-slate-900 dark:border-slate-800">
                    <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">{n.tag}</span>
                    <h3 className="mt-3 font-display text-base font-bold leading-snug text-brand-blue-deep group-hover:text-brand-blue dark:text-white dark:group-hover:text-brand-teal">{n.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground dark:text-slate-300">{n.excerpt}</p>
                    <p className="mt-3 text-xs text-muted-foreground dark:text-slate-400">{n.date} · {n.source}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== COLLABORATION PARTNERS (Marquee Placeholder) ===== */}
      <section className="bg-white py-16 overflow-hidden dark:bg-[#0f1c30]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              center
              eyebrow={t("partnerEyebrow")}
              title={t("partnerTitle")}
              subtitle={t("partnerSubtitle")}
            />
          </ScrollReveal>

          {/* Marquee container */}
          <div className="relative mt-10">
            {/* Gradient fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 marquee-fade-left" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 marquee-fade-right" />

            {/* Scrolling track */}
            <div className="flex items-center gap-6 animate-marquee">
              {/* Partner slots — showing available collaboration slots */}
              {[
                "Kementerian Sosial",
                "UNICEF",
                "Dinas Pendidikan",
                "Rumah Sakit Mitra",
                "CSR Corporate",
                "Pemerintah Daerah",
                "Universitas Mitra",
                "NGO Internasional",
                "Lembaga Riset",
                "Komunitas Lokal",
                "Kementerian Sosial",
                "UNICEF",
                "Dinas Pendidikan",
                "Rumah Sakit Mitra",
                "CSR Corporate",
                "Pemerintah Daerah",
                "Universitas Mitra",
                "NGO Internasional",
                "Lembaga Riset",
                "Komunitas Lokal",
              ].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex h-20 w-44 shrink-0 flex-col items-center justify-center rounded-2xl border border-border/70 bg-white/90 px-3 shadow-sm transition-all hover:border-brand-teal/50 hover:shadow-md dark:bg-slate-800 dark:border-slate-700"
                >
                  <div className="h-5 w-16 rounded bg-gray-200/80 dark:bg-slate-700 mb-1" />
                  <span className="text-[0.68rem] font-bold text-brand-blue-deep dark:text-slate-100 text-center leading-tight">
                    {name}
                  </span>
                  <span className="mt-1 flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[0.58rem] font-semibold text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-600/20">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                    Available Slot
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground dark:text-slate-400 italic">
            {t("partnerInterested")}{" "}
            <Link to="/kontak" className="font-semibold text-brand-blue dark:text-brand-teal not-italic hover:underline">
              {t("partnerContactLink")}
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
      <section className="bg-brand-cream py-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-blue via-brand-blue-dark to-brand-blue-deep p-8 text-white shadow-xl sm:p-12 animate-mesh-shimmer" style={{ backgroundImage: 'linear-gradient(135deg, #1f9aa0, #17787d, #123a40, #17787d, #1f9aa0)' }}>
              <div className="relative z-10 max-w-2xl">
                <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl text-white">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                  {t("ctaSub")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/kontak"
                    className="rounded-full bg-brand-maize px-7 py-3 text-sm font-bold text-brand-blue-deep shadow-md transition-all hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("ctaBtnContact")}
                  </Link>
                  <Link
                    to="/data-center"
                    className="rounded-full bg-white/15 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm transition-all hover:bg-white/25 hover:-translate-y-0.5"
                  >
                    {t("ctaBtnData")}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
