import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const strategicAreas = [
  { to: "/data-center", label: "Data Center", desc: "Observatori data inklusif nasional" },
  { to: "/policy-lab", label: "Policy Lab", desc: "Riset & advokasi kebijakan berbasis bukti" },
  { to: "/academy", label: "Academy", desc: "Pelatihan & capacity building profesional" },
  { to: "/research", label: "Research Center", desc: "Riset, publikasi & knowledge hub" },
  { to: "/consulting", label: "Consulting", desc: "Layanan advisory pembangunan inklusif" },
];

const aboutLinks = [
  { to: "/tentang", label: "About Us" },
  { to: "/tentang#what-we-do", label: "What We Do" },
  { to: "/tentang#our-team", label: "Our Team" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const areasRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (areasRef.current && !areasRef.current.contains(e.target as Node)) setAreasOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAreasOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-border/60 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo size={38} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">

          {/* Home */}
          <Link
            to="/"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/") ? "bg-accent text-brand-blue" : "text-brand-blue-deep/70 hover:bg-accent hover:text-brand-blue"
            }`}
          >
            Beranda
          </Link>

          {/* About Dropdown */}
          <div className="relative" ref={aboutRef}>
            <button
              onClick={() => { setAboutOpen((v) => !v); setAreasOpen(false); }}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith("/tentang")
                  ? "bg-accent text-brand-blue"
                  : "text-brand-blue-deep/70 hover:bg-accent hover:text-brand-blue"
              }`}
            >
              About
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-border bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
                {aboutLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-blue-deep/80 hover:bg-accent hover:text-brand-blue"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Strategic Areas Dropdown */}
          <div className="relative" ref={areasRef}>
            <button
              onClick={() => { setAreasOpen((v) => !v); setAboutOpen(false); }}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                ["/data-center","/policy-lab","/academy","/research","/consulting"].some(p => pathname.startsWith(p))
                  ? "bg-accent text-brand-blue"
                  : "text-brand-blue-deep/70 hover:bg-accent hover:text-brand-blue"
              }`}
            >
              Strategic Areas
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`} />
            </button>
            {areasOpen && (
              <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
                {strategicAreas.map((area) => (
                  <Link
                    key={area.to}
                    to={area.to}
                    className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-accent"
                  >
                    <span className="text-sm font-semibold text-brand-blue-deep">
                      INCLUSA {area.label}
                    </span>
                    <span className="mt-0.5 text-xs text-muted-foreground">{area.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Us — standalone */}
          <Link
            to="/kontak"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/kontak") ? "bg-accent text-brand-blue" : "text-brand-blue-deep/70 hover:bg-accent hover:text-brand-blue"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            to="/kontak"
            className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-md"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg p-2 text-brand-blue-deep lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-blue-deep/80 hover:bg-accent">
              Beranda
            </Link>

            <div>
              <p className="px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                About
              </p>
              {aboutLinks.map((l) => (
                <Link key={l.to} to={l.to} className="block rounded-lg px-5 py-2 text-sm text-brand-blue-deep/80 hover:bg-accent">
                  {l.label}
                </Link>
              ))}
            </div>

            <div>
              <p className="px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                Strategic Areas
              </p>
              {strategicAreas.map((area) => (
                <Link key={area.to} to={area.to} className="block rounded-lg px-5 py-2 text-sm text-brand-blue-deep/80 hover:bg-accent">
                  INCLUSA {area.label}
                </Link>
              ))}
            </div>

            <Link to="/kontak" className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-blue-deep/80 hover:bg-accent">
              Contact Us
            </Link>

            <Link
              to="/kontak"
              className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
