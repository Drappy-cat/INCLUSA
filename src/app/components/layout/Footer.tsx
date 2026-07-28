import { Link } from "react-router";
import { Instagram, Youtube } from "lucide-react";
import { markUrl, Wordmark } from "./Logo";

/* TikTok icon - Lucide doesn't have one, so we make a small inline SVG */
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.2 8.2 0 005.58 2.17v-3.48a4.85 4.85 0 01-3.77-1.23V6.69h3.77z" />
    </svg>
  );
}

const strategicLinks = [
  { to: "/data-center", label: "Data Center" },
  { to: "/policy-lab", label: "Policy Lab" },
  { to: "/academy", label: "Academy" },
  { to: "/research", label: "Research Center" },
  { to: "/consulting", label: "Consulting" },
];

const aboutLinks = [
  { to: "/tentang", label: "About Us" },
  { to: "/tentang#what-we-do", label: "What We Do" },
  { to: "/tentang#our-team", label: "Our Team" },
  { to: "/faq", label: "FAQ" },
];

const socialLinks = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: TikTokIcon, href: "#", label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-brand-blue-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">
              <img src={markUrl} alt="Logo INCLUSA" className="h-full w-full object-contain" />
            </span>
            <Wordmark className="text-xl" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Indonesia Institute for Children, Women, Disability and Inclusion. Lembaga independen berbasis riset
            untuk pembangunan inklusif yang berkelanjutan.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-maize hover:text-brand-blue-deep"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — 5 Strategic Areas */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-maize">
            5 Strategic Areas
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {strategicLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  INCLUSA {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — About */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-maize">
            Tentang INCLUSA
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {aboutLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact (placeholder data) */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-maize">Kontak</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60 italic">
            <li>📍 Lokasi: <span className="text-white/40">Akan diperbarui</span></li>
            <li>📞 Telepon: <span className="text-white/40">Akan diperbarui</span></li>
            <li>✉️ Email: <span className="text-white/40">Akan diperbarui</span></li>
          </ul>
          <p className="mt-4 text-xs text-white/40">
            Informasi kontak resmi akan tersedia setelah proses registrasi lembaga selesai.
          </p>
        </div>
      </div>

      {/* Bottom bar — Admin hidden */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 INCLUSA Institute · Indonesia</p>
          <p>
            <Link to="/faq" className="hover:text-white/80">FAQ</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
