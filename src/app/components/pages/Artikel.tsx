import { useMemo, useState } from "react";
import { Search, Clock, User, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router";
import { PageHero, Chip, SectionHeading } from "../ui-kit/Shared";
import { useContent, isPublished } from "../../data/ContentStore";

export function Artikel() {
  const { articles: allArticles } = useContent();
  const articles = useMemo(() => allArticles.filter(isPublished), [allArticles]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Semua");

  // Artikel populer (mock — 3 artikel teratas sebagai yang paling banyak dibaca).
  const popular = useMemo(() => articles.slice(0, 3), [articles]);

  const categories = useMemo(() => ["Semua", ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);

  const filtered = articles.filter((a) => {
    const matchCat = cat === "Semua" || a.category === cat;
    const matchQ = (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  const [featured, ...rest] = filtered.length ? filtered : [articles[0]];

  return (
    <>
      <PageHero
        eyebrow="Wawasan & Edukasi"
        title="Artikel"
        subtitle="Kumpulan tulisan tepercaya seputar HIV/AIDS, kesehatan reproduksi, pengobatan, dan cerita menghapus stigma."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">Tidak ada artikel yang cocok.</p>
        ) : (
          <>
            {/* featured */}
            <article className="mt-8 grid overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                <ImageWithFallback src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <span className="w-fit rounded-full bg-brand-coral/15 px-3 py-1 text-xs font-semibold uppercase text-brand-coral">
                  {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-brand-blue-deep">{featured.title}</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
                <Link to={`/artikel/${featured.id}`} className="mt-6 w-fit rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark">
                  Baca Selengkapnya
                </Link>
              </div>
            </article>

            {/* popular */}
            {cat === "Semua" && !q && (
              <div className="mt-12">
                <SectionHeading eyebrow="Paling Banyak Dibaca" title={<span className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-brand-coral" /> Artikel Populer</span>} />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {popular.map((a, i) => (
                    <Link to={`/artikel/${a.id}`} key={a.id} className="flex gap-4 rounded-2xl border border-border bg-white p-4 transition-shadow hover:shadow-md">
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

            {/* grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <Link to={`/artikel/${a.id}`} key={a.id} className="group block overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-brand-blue-deep">{a.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readTime}</span>
                      <span>{a.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
