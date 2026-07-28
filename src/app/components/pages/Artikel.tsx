import { useMemo, useState } from "react";
import {
  Search,
  Clock,
  User,
  TrendingUp,
  Newspaper,
  BookOpen,
  Calendar,
  Building2,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link, useSearchParams } from "react-router";
import { PageHero, Chip, SectionHeading } from "../ui-kit/Shared";
import { useContent, isPublished } from "../../data/ContentStore";

const tagColor: Record<string, string> = {
  Program: "bg-brand-blue/10 text-brand-blue",
  Kolaborasi: "bg-brand-teal/20 text-[#17787d]",
  Acara: "bg-brand-coral/15 text-brand-coral",
  Capaian: "bg-brand-maize/40 text-[#b9880a]",
};

export function Artikel() {
  const { articles: allArticles, news: allNews } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab Pilar: 'berita' atau 'artikel'
  const activePillar = (searchParams.get("tab") as "berita" | "artikel") || "artikel";
  const setPillar = (pillar: "berita" | "artikel") => {
    setSearchParams({ tab: pillar });
    setQ("");
    setCat("Semua");
  };

  const articles = useMemo(() => allArticles.filter(isPublished), [allArticles]);
  const news = useMemo(() => allNews.filter(isPublished), [allNews]);

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Semua");

  // Kategori sesuai pilar aktif
  const categories = useMemo(() => {
    if (activePillar === "berita") {
      return ["Semua", ...Array.from(new Set(news.map((n) => n.tag)))];
    }
    return ["Semua", ...Array.from(new Set(articles.map((a) => a.category)))];
  }, [activePillar, news, articles]);

  // Filter artikel
  const filteredArticles = useMemo(() => {
    const query = q.trim().toLowerCase();
    return articles.filter((a) => {
      const matchCat = cat === "Semua" || a.category === cat;
      const matchQ = !query || (a.title + a.excerpt + (a.author || "")).toLowerCase().includes(query);
      return matchCat && matchQ;
    });
  }, [articles, cat, q]);

  // Filter berita
  const filteredNews = useMemo(() => {
    const query = q.trim().toLowerCase();
    return news.filter((n) => {
      const matchCat = cat === "Semua" || n.tag === cat;
      const matchQ = !query || (n.title + n.excerpt + (n.source || "")).toLowerCase().includes(query);
      return matchCat && matchQ;
    });
  }, [news, cat, q]);

  const [featuredArticle, ...restArticles] = filteredArticles.length ? filteredArticles : [articles[0]];
  const [featuredNews, ...restNews] = filteredNews.length ? filteredNews : [news[0]];
  const popularArticles = useMemo(() => articles.slice(0, 3), [articles]);

  return (
    <>
      <PageHero
        eyebrow="INCLUSA Research Center"
        title="Pusat Riset, Publikasi & Berita"
        subtitle="Knowledge hub independen yang menghimpun berita kegiatan lembaga serta publikasi, policy brief, dan artikel riset pembangunan inklusif di Indonesia."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ─────────────── 2 PILAR UTAMA (TAB SWITCHER) ─────────────── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Pilar 1: Artikel & Publikasi Riset */}
          <button
            onClick={() => setPillar("artikel")}
            className={`group relative flex items-center gap-4 rounded-2xl border p-6 text-left transition-all ${
              activePillar === "artikel"
                ? "border-brand-blue bg-white shadow-md ring-2 ring-brand-blue/20"
                : "border-border bg-white/70 hover:bg-white hover:shadow-sm"
            }`}
          >
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors ${
                activePillar === "artikel" ? "bg-brand-blue text-white" : "bg-brand-cream text-brand-blue"
              }`}
            >
              <BookOpen className="h-7 w-7" />
            </span>
            <div>
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-brand-coral">
                Pilar 1
              </span>
              <h3 className="font-display text-lg font-bold text-brand-blue-deep">
                Artikel & Publikasi Riset
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Paper ilmiah, policy brief, dan artikel edukasi internal INCLUSA.
              </p>
            </div>
            {activePillar === "artikel" && (
              <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-brand-blue animate-pulse" />
            )}
          </button>

          {/* Pilar 2: Berita & Kegiatan */}
          <button
            onClick={() => setPillar("berita")}
            className={`group relative flex items-center gap-4 rounded-2xl border p-6 text-left transition-all ${
              activePillar === "berita"
                ? "border-brand-blue bg-white shadow-md ring-2 ring-brand-blue/20"
                : "border-border bg-white/70 hover:bg-white hover:shadow-sm"
            }`}
          >
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors ${
                activePillar === "berita" ? "bg-brand-blue text-white" : "bg-brand-cream text-brand-blue"
              }`}
            >
              <Newspaper className="h-7 w-7" />
            </span>
            <div>
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-brand-teal">
                Pilar 2
              </span>
              <h3 className="font-display text-lg font-bold text-brand-blue-deep">
                Berita & Kegiatan
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Rilis pers, kabar kegiatan, program kemitraan & rujukan sumber resmi.
              </p>
            </div>
            {activePillar === "berita" && (
              <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-brand-blue animate-pulse" />
            )}
          </button>
        </div>

        {/* ─────────────── FILTER & PENCARIAN ─────────────── */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={activePillar === "artikel" ? "Cari artikel atau paper riset..." : "Cari berita atau program..."}
              className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>

        {/* ─────────────── KONTEN PILAR 1: ARTIKEL & PUBLIKASI ─────────────── */}
        {activePillar === "artikel" && (
          <div className="mt-8">
            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">
                Tidak ada artikel atau paper riset yang cocok dengan pencarian Anda.
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && (
                  <article className="grid overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
                    <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                      <ImageWithFallback src={featuredArticle.image} alt={featuredArticle.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-10">
                      <div className="flex items-center gap-2">
                        <span className="w-fit rounded-full bg-brand-coral/15 px-3 py-1 text-xs font-semibold uppercase text-brand-coral">
                          {featuredArticle.category}
                        </span>
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                          Publikasi Unggulan
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-brand-blue-deep">
                        {featuredArticle.title}
                      </h2>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featuredArticle.author || "INCLUSA Research"}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featuredArticle.readTime}</span>
                        <span>{featuredArticle.date}</span>
                      </div>
                      <Link
                        to={`/artikel/${featuredArticle.id}`}
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                      >
                        Baca Publikasi <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                )}

                {/* Popular articles */}
                {cat === "Semua" && !q && (
                  <div className="mt-12">
                    <SectionHeading
                      eyebrow="Paling Banyak Dibaca"
                      title={
                        <span className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-brand-coral" /> Publikasi Populer
                        </span>
                      }
                    />
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {popularArticles.map((a, i) => (
                        <Link
                          to={`/artikel/${a.id}`}
                          key={a.id}
                          className="flex gap-4 rounded-2xl border border-border bg-white p-4 transition-shadow hover:shadow-md"
                        >
                          <span className="font-display text-3xl font-extrabold text-brand-maize">{i + 1}</span>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                            <h3 className="mt-1 font-display text-sm font-bold leading-snug text-brand-blue-deep">{a.title}</h3>
                            <p className="mt-2 text-xs text-muted-foreground">{a.readTime} · {a.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rest articles grid */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {restArticles.map((a) => (
                    <Link
                      to={`/artikel/${a.id}`}
                      key={a.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                        <h3 className="mt-2 font-display text-base font-bold leading-snug text-brand-blue-deep group-hover:text-brand-blue">{a.title}</h3>
                        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {a.author || "INCLUSA"}</span>
                          <span>{a.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ─────────────── KONTEN PILAR 2: BERITA & KEGIATAN ─────────────── */}
        {activePillar === "berita" && (
          <div className="mt-8">
            {filteredNews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">
                Tidak ada berita atau kegiatan yang cocok dengan pencarian Anda.
              </div>
            ) : (
              <>
                {/* Featured News Lead */}
                {featuredNews && (
                  <article className="overflow-hidden rounded-3xl bg-brand-blue-deep text-white">
                    {featuredNews.image && (
                      <div className="aspect-[16/8] w-full overflow-hidden">
                        <ImageWithFallback src={featuredNews.image} alt={featuredNews.title} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="p-8 sm:p-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tagColor[featuredNews.tag] ?? "bg-white/10 text-white"}`}>
                          {featuredNews.tag}
                        </span>
                        {featuredNews.url && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-maize/20 px-2.5 py-0.5 text-xs font-semibold text-brand-maize">
                            <ExternalLink className="h-3 w-3" /> Ada Link Sumber Asli
                          </span>
                        )}
                      </div>

                      <h2 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">
                        {featuredNews.title}
                      </h2>
                      <p className="mt-4 text-white/80 leading-relaxed">{featuredNews.excerpt}</p>

                      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-brand-maize" /> {featuredNews.date}</span>
                        <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-brand-maize" /> {featuredNews.source}</span>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Link
                          to={`/berita/${featuredNews.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-brand-maize px-6 py-2.5 text-sm font-semibold text-brand-blue-deep shadow transition-transform hover:-translate-y-0.5"
                        >
                          Baca Berita Lengkap <ArrowRight className="h-4 w-4" />
                        </Link>
                        {featuredNews.url && (
                          <a
                            href={featuredNews.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
                          >
                            Buka Sumber Asli <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                )}

                {/* News Grid */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {restNews.map((n) => (
                    <article
                      key={n.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
                    >
                      {n.image && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <ImageWithFallback src={n.image} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tagColor[n.tag] ?? "bg-accent text-brand-blue"}`}>
                            {n.tag}
                          </span>
                          <span className="text-xs text-muted-foreground">{n.date}</span>
                        </div>

                        <h3 className="mt-3 font-display text-base font-bold leading-snug text-brand-blue-deep group-hover:text-brand-blue">
                          {n.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>

                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                          <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {n.source}</span>
                          {n.url ? (
                            <span className="flex items-center gap-1 text-brand-blue font-semibold">
                              <ExternalLink className="h-3 w-3" /> Rujukan
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                          <Link
                            to={`/berita/${n.id}`}
                            className="flex-1 rounded-xl bg-brand-cream py-2 text-center text-xs font-semibold text-brand-blue-deep transition-colors hover:bg-brand-blue hover:text-white"
                          >
                            Baca Berita
                          </Link>
                          {n.url && (
                            <a
                              href={n.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-xl border border-border p-2 text-brand-blue-deep hover:bg-accent"
                              title="Buka sumber asli"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

      </section>
    </>
  );
}
