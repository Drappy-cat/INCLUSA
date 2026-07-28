import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useContent, isPublished } from "../../data/ContentStore";

export function ArtikelDetail() {
  const { id } = useParams();
  const { articles } = useContent();
  const article = articles.find((a) => a.id === id);

  const related = useMemo(
    () =>
      articles
        .filter((a) => isPublished(a) && a.id !== id && a.category === article?.category)
        .slice(0, 3),
    [articles, id, article?.category]
  );

  if (!article) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-brand-blue-deep">Artikel tidak ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Konten yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link to="/artikel" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Artikel
        </Link>
      </section>
    );
  }

  // Body lengkap; jika belum ada, gunakan ringkasan sebagai paragraf pembuka.
  const paragraphs = (article.body?.trim() || article.excerpt)
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
        <ArrowLeft className="h-4 w-4" /> Kembali ke Artikel
      </Link>

      <span className="mt-6 inline-block rounded-full bg-brand-coral/15 px-3 py-1 text-xs font-semibold uppercase text-brand-coral">
        {article.category}
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-blue-deep">{article.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {article.author || "Tim INCLUSA"}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readTime}</span>
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {article.date}</span>
      </div>

      {article.image && (
        <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
          <ImageWithFallback src={article.image} alt={article.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-brand-blue-deep/85">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-14 border-t border-border pt-8">
          <h2 className="font-display text-lg font-bold text-brand-blue-deep">Artikel Terkait</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((a) => (
              <Link key={a.id} to={`/artikel/${a.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md">
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold leading-snug text-brand-blue-deep">{a.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue">
                    Baca <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
