import { Link } from "react-router";
import { Clock, ArrowLeft, Mail } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  desc?: string;
}

export function ComingSoon({ title = "Segera Hadir", desc = "Halaman ini sedang dalam persiapan." }: ComingSoonProps) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mx-auto max-w-xl">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-teal/10">
          <Clock className="h-10 w-10 text-brand-teal" />
        </span>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-maize/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-maize">
          Coming Soon
        </div>

        <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-blue-deep sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desc}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>
          <a
            href="mailto:halo@inclusa.id"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-brand-blue-deep transition-colors hover:bg-accent"
          >
            <Mail className="h-4 w-4" /> halo@inclusa.id
          </a>
        </div>
      </div>
    </section>
  );
}
