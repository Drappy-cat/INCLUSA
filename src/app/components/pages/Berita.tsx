import { useState, useMemo } from "react";
import { Calendar, Building2, ArrowUpRight, Search } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PageHero } from "../ui-kit/Shared";
import { Link } from "react-router";
import { useContent, isPublished } from "../../data/ContentStore";

const tagColor: Record<string, string> = {
  Program: "bg-brand-blue/10 text-brand-blue",
  Kolaborasi: "bg-brand-teal/20 text-[#17787d]",
  Acara: "bg-brand-coral/15 text-brand-coral",
  Capaian: "bg-brand-maize/40 text-[#b9880a]",
};

export function Berita() {
  const { news: allNews } = useContent();
  const news = useMemo(() => allNews.filter(isPublished), [allNews]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = useMemo(() => ["Semua", ...Array.from(new Set(news.map((n) => n.tag)))], [news]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return news.filter((n) => {
      const matchCat = category === "Semua" || n.tag === category;
      const matchQuery =
        !q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.source.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, category, news]);

  const [lead, ...rest] = filtered;

  return (
    <>
      <PageHero
        eyebrow="Kabar Terkini"
        title="Berita"
        subtitle="Perkembangan program, kegiatan, dan capaian penanggulangan HIV/AIDS di Kabupaten Sidoarjo."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* search + filter */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berita, program, atau sumber…"
              className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  category === c ? "bg-brand-blue text-white" : "bg-white text-brand-blue-deep ring-1 ring-border hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white py-20 text-center text-muted-foreground">
            Tidak ada berita yang cocok dengan pencarian Anda.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <article className="overflow-hidden rounded-3xl bg-brand-blue-deep text-white">
              {lead.image && (
                <div className="aspect-[16/8] w-full overflow-hidden">
                  <ImageWithFallback src={lead.image} alt={lead.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-8 sm:p-10">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tagColor[lead.tag] ?? "bg-white/10"}`}>
                {lead.tag}
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">{lead.title}</h2>
              <p className="mt-4 text-white/80">{lead.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {lead.date}</span>
                <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {lead.source}</span>
              </div>
              <Link to={`/berita/${lead.id}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-maize px-6 py-2.5 text-sm font-semibold text-brand-blue-deep">
                Baca Berita <ArrowUpRight className="h-4 w-4" />
              </Link>
              </div>
            </article>

            <div className="space-y-4">
              {rest.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada berita lain pada kategori ini.</p>
              ) : (
                rest.map((n) => (
                  <Link to={`/berita/${n.id}`} key={n.id} className="group block rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tagColor[n.tag] ?? "bg-accent text-brand-blue"}`}>
                        {n.tag}
                      </span>
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold leading-snug text-brand-blue-deep group-hover:text-brand-blue">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" /> {n.source}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
