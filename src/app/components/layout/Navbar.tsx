import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const publicLinks = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/informasi", label: "Informasi" },
  { to: "/artikel", label: "Artikel" },
  { to: "/berita", label: "Berita" },
  { to: "/statistik", label: "Statistik" },
  { to: "/peta", label: "Peta GIS" },
  { to: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo size={38} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {publicLinks.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-accent text-brand-blue" : "text-brand-blue-deep/70 hover:bg-accent hover:text-brand-blue"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-brand-blue-deep/70 transition-colors hover:bg-accent hover:text-brand-blue">
              Layanan <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute right-0 top-full w-56 translate-y-1 rounded-xl border border-border bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link to="/faskes" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">Cari Fasilitas Kesehatan</Link>
              <Link to="/e-pelayanan" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">e-Pelayanan (Skrining)</Link>
              <Link to="/edukasi" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">Education Center</Link>
              <Link to="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">Dashboard Admin</Link>
            </div>
          </div>
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/e-pelayanan"
            className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-brand-red/90"
          >
            Tes HIV Sekarang
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-brand-blue-deep lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {[...publicLinks, { to: "/faskes", label: "Cari Fasilitas" }, { to: "/e-pelayanan", label: "e-Pelayanan" }, { to: "/edukasi", label: "Education Center" }, { to: "/admin", label: "Dashboard Admin" }].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-blue-deep/80 hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/e-pelayanan"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand-red px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Tes HIV Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
