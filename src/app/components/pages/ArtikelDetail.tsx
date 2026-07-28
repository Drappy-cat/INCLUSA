import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Share2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Check,
  Building2,
  BookOpen,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ImageSlider } from "../ui-kit/ImageSlider";
import { ExternalLink } from "lucide-react";
import { useContent } from "../../data/ContentStore";

export function ArtikelDetail() {
  const { id } = useParams();
  const { articles } = useContent();
  const [copied, setCopied] = useState(false);

  const itemIndex = articles.findIndex((a) => a.id === id);
  const article = itemIndex !== -1 ? articles[itemIndex] : null;

  const prevItem = itemIndex > 0 ? articles[itemIndex - 1] : null;
  const nextItem = itemIndex !== -1 && itemIndex < articles.length - 1 ? articles[itemIndex + 1] : null;

  const relatedArticles = articles.filter((a) => a.id !== id).slice(0, 5);

  if (!article) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-brand-blue-deep dark:text-white">Artikel tidak ditemukan</h1>
        <p className="mt-2 text-muted-foreground dark:text-slate-300">Konten yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link to="/research" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Riset & Artikel
        </Link>
      </section>
    );
  }

  const paragraphs = (article.body?.trim() || article.excerpt)
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-brand-cream py-10 dark:bg-[#0b1329]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ────────────── BREADCRUMB & BACK LINK ────────────── */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue dark:text-brand-teal hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Pusat Riset & Publikasi
          </Link>

          {/* Trending Banner Tag */}
          <div className="hidden items-center gap-2 rounded-lg bg-white px-3 py-1 text-xs shadow-sm dark:bg-slate-900 sm:flex">
            <span className="flex items-center gap-1 rounded bg-brand-coral px-2 py-0.5 font-bold uppercase text-white">
              <TrendingUp className="h-3 w-3" /> Riset
            </span>
            <span className="truncate max-w-[280px] text-muted-foreground dark:text-slate-300">{article.title}</span>
          </div>
        </div>

        {/* ────────────── MAIN 2-COLUMN LAYOUT ────────────── */}
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* LEFT 8 COLUMNS: ARTICLE CONTENT */}
          <article className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:bg-[#152238] dark:border-slate-800 sm:p-10 lg:col-span-8">
            
            {/* Title Header */}
            <h1 className="font-display text-2xl font-extrabold leading-tight text-brand-blue-deep dark:text-white sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            {/* Meta Information Bar */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border/60 py-3.5 text-xs text-muted-foreground dark:text-slate-300 sm:text-sm">
              <span className="flex items-center gap-1.5 font-medium text-brand-blue-deep dark:text-slate-100">
                <User className="h-4 w-4 text-brand-blue" /> {article.author || "INCLUSA Research Team"}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-brand-coral" /> {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-maize" /> {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-teal" /> {article.date}
              </span>
            </div>

            {/* Multi-Image Slider Carousel or Single Featured Image */}
            <ImageSlider
              images={article.images}
              fallbackImage={article.image}
              alt={article.title}
              className="mt-6 aspect-[16/9]"
            />

            {/* Article Text Paragraphs */}
            <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-800 dark:text-slate-200 sm:text-lg">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* External Reference Links Box */}
            {article.links && article.links.length > 0 && (
              <div className="mt-10 rounded-2xl border border-brand-blue/30 bg-brand-cream p-6 shadow-sm dark:bg-slate-900 dark:border-brand-teal/30">
                <span className="rounded-full bg-brand-blue/15 px-2.5 py-0.5 text-xs font-bold text-brand-blue dark:bg-brand-blue/30 dark:text-brand-teal">
                  Link Referensi & Publikasi Rujukan
                </span>
                <h4 className="mt-1.5 font-display text-lg font-bold text-brand-blue-deep dark:text-white">
                  Tautan & Dokumen Pendukung
                </h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  {article.links.map((lnk, i) => (
                    <a
                      key={i}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-blue/30 px-5 py-2.5 text-xs font-semibold text-brand-blue-deep shadow-sm transition-all hover:bg-accent dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    >
                      {lnk.label || `Dokumen ${i + 1}`} <ExternalLink className="h-3.5 w-3.5 text-brand-blue dark:text-brand-teal" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share Buttons */}
            <div className="mt-10 border-t border-border/80 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="flex items-center gap-2 font-display text-sm font-bold text-brand-blue-deep dark:text-white">
                  <Share2 className="h-4 w-4 text-brand-blue" /> Bagikan Riset Ini:
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${currentUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#20BD5A]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1877F2] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#166FE5]"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1DA1F2] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1A91DA]"
                  >
                    Twitter / X
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-brand-blue hover:bg-brand-blue/20 dark:bg-slate-800 dark:text-brand-teal"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : "Salin Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Next / Previous Article Navigation */}
            <div className="mt-10 grid gap-4 border-t border-border/80 pt-6 sm:grid-cols-2">
              {prevItem ? (
                <Link
                  to={`/artikel/${prevItem.id}`}
                  className="group flex flex-col rounded-2xl border border-border p-4 transition-all hover:border-brand-blue dark:border-slate-800 dark:hover:border-brand-teal"
                >
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-brand-blue">
                    <ChevronLeft className="h-3.5 w-3.5" /> Artikel Sebelumnya
                  </span>
                  <span className="mt-1 line-clamp-1 font-semibold text-brand-blue-deep dark:text-white text-sm">
                    {prevItem.title}
                  </span>
                </Link>
              ) : <div />}

              {nextItem ? (
                <Link
                  to={`/artikel/${nextItem.id}`}
                  className="group flex flex-col items-end text-right rounded-2xl border border-border p-4 transition-all hover:border-brand-blue dark:border-slate-800 dark:hover:border-brand-teal"
                >
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-brand-blue">
                    Artikel Selanjutnya <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 line-clamp-1 font-semibold text-brand-blue-deep dark:text-white text-sm">
                    {nextItem.title}
                  </span>
                </Link>
              ) : <div />}
            </div>

          </article>

          {/* RIGHT 4 COLUMNS: SIDEBAR (RELATED ARTICLES & TOPICS) */}
          <aside className="space-y-6 lg:col-span-4">
            
            {/* Publikasi & Riset Terkait */}
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:bg-[#152238] dark:border-slate-800">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-brand-blue-deep dark:text-white">
                <BookOpen className="h-5 w-5 text-brand-blue" /> Publikasi Riset Lainnya
              </h3>
              <div className="mt-4 space-y-4">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.id}
                    to={`/artikel/${a.id}`}
                    className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-accent dark:hover:bg-slate-800"
                  >
                    {a.image && (
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                        <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-coral">{a.category}</span>
                      <h4 className="mt-0.5 line-clamp-2 text-xs font-bold text-brand-blue-deep dark:text-white group-hover:text-brand-blue">
                        {a.title}
                      </h4>
                      <p className="mt-1 text-[0.68rem] text-muted-foreground dark:text-slate-400">{a.date} · {a.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Topik Riset */}
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:bg-[#152238] dark:border-slate-800">
              <h3 className="font-display text-base font-bold text-brand-blue-deep dark:text-white">
                Kategori Riset & Policy Brief
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Disabilitas & Inklusi", "Hak Anak", "Pemberdayaan Perempuan", "Policy Brief", "Jurnal Ilmiah", "Hasil Survey"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-brand-blue dark:bg-slate-800 dark:text-brand-teal"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Institutional Consultation CTA */}
            <div className="rounded-3xl bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-blue-deep p-6 text-white shadow-md">
              <Building2 className="h-8 w-8 text-brand-maize" />
              <h4 className="mt-3 font-display text-lg font-bold text-white">
                Konsultasi Riset & Kebijakan
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-white/85">
                INCLUSA Institute melayani konsultasi penyusunan policy brief, studi kelayakan, dan riset aksi daerah.
              </p>
              <Link
                to="/kontak"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-maize px-4 py-2.5 text-xs font-bold text-brand-blue-deep shadow hover:bg-white"
              >
                Konsultasi Sekarang →
              </Link>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
