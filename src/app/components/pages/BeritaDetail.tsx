import { Link, useParams } from "react-router";
import { ArrowLeft, Building2, Calendar } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useContent } from "../../data/ContentStore";

const tagColor: Record<string, string> = {
  Program: "bg-brand-blue/10 text-brand-blue",
  Kolaborasi: "bg-brand-teal/20 text-[#17787d]",
  Acara: "bg-brand-coral/15 text-brand-coral",
  Capaian: "bg-brand-maize/40 text-[#b9880a]",
};

export function BeritaDetail() {
  const { id } = useParams();
  const { news } = useContent();
  const item = news.find((n) => n.id === id);

  if (!item) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-brand-blue-deep">Berita tidak ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Konten yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link to="/berita" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
        </Link>
      </section>
    );
  }

  const paragraphs = (item.body?.trim() || item.excerpt)
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/berita" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
        <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
      </Link>

      <span className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold ${tagColor[item.tag] ?? "bg-accent text-brand-blue"}`}>
        {item.tag}
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-blue-deep">{item.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {item.source}</span>
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {item.date}</span>
      </div>

      {item.image && (
        <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
          <ImageWithFallback src={item.image} alt={item.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-brand-blue-deep/85">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
