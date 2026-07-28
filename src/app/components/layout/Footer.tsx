import { Link } from "react-router";
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { markUrl, Wordmark } from "./Logo";
import { BRAND, partners } from "../../data/content";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-brand-blue-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">
              <img src={markUrl} alt="Logo INCLUSA" className="h-full w-full object-contain" />
            </span>
            <Wordmark className="text-xl" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {BRAND.tagline}. Platform kolaborasi masyarakat, pemerintah, dan fasilitas kesehatan untuk Sidoarjo yang inklusif dan bebas stigma.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-maize hover:text-brand-blue-deep">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-maize">Jelajahi</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/informasi", label: "Informasi Umum" },
              { to: "/artikel", label: "Artikel" },
              { to: "/berita", label: "Berita" },
              { to: "/statistik", label: "Statistik" },
              { to: "/faq", label: "FAQ" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-maize">Mitra Kolaborasi</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {partners.map((p) => (
              <li key={p} className="text-white/70">{p}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-maize">Kontak</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-maize" /> Jl. Sunandar Priyo Sudarmo, Sidoarjo, Jawa Timur</li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-brand-maize" /> (031) 8000-1234</li>
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-brand-maize" /> halo@inclusa.id</li>
          </ul>
          <div className="mt-5 rounded-xl bg-brand-red/90 px-4 py-3">
            <p className="text-xs font-semibold uppercase text-white/80">Hotline Konseling 24 Jam</p>
            <p className="font-display text-lg font-bold text-white">0800-1-HIV-AIDS</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 {BRAND.name} · Prototype v1.0</p>
          <p>Powered by Yayasan INCLUSA Sidoarjo</p>
        </div>
      </div>
    </footer>
  );
}
