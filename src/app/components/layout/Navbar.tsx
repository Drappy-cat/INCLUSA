import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, Sun, Moon, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "../../data/ThemeContext";
import { useLanguage } from "../../data/LanguageContext";

const strategicAreas = [
  { to: "/data-center", label: "Data Center", desc: "Observatori data inklusif nasional" },
  { to: "/policy-lab", label: "Policy Lab", desc: "Riset & advokasi kebijakan berbasis bukti" },
  { to: "/academy", label: "Academy", desc: "Pelatihan & capacity building profesional" },
  { to: "/research", label: "Research Center", desc: "Riset, publikasi & knowledge hub" },
  { to: "/consulting", label: "Consulting", desc: "Layanan advisory pembangunan inklusif" },
];

const aboutLinks = [
  { to: "/tentang", label: "About Us", hash: "#about-us" },
  { to: "/tentang#what-we-do", label: "What We Do", hash: "#what-we-do" },
  { to: "/tentang#our-team", label: "Our Team", hash: "#our-team" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { pathname } = useLocation();
  const areasRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Scroll spy for About page
      if (pathname === "/tentang") {
        const sections = ["about-us", "what-we-do", "our-team"];
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveHash(`#${sectionId}`);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

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

  // Make hash links functional (smooth scroll to element)
  const handleScrollTo = (targetHash: string) => {
    if (pathname === "/tentang") {
      const sectionId = targetHash.replace("#", "");
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -80; 
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/95 backdrop-blur shadow-sm dark:bg-slate-900/95"
          : "bg-white/80 backdrop-blur dark:bg-slate-900/80"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {/* Home */}
          <Link
            to="/"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-accent text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal font-semibold"
                : "text-brand-blue-deep/80 hover:bg-accent hover:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            {t("navHome")}
          </Link>

          {/* About Dropdown */}
          <div className="relative" ref={aboutRef}>
            <button
              onClick={() => { setAboutOpen((v) => !v); setAreasOpen(false); }}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith("/tentang")
                  ? "bg-accent text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal font-semibold"
                  : "text-brand-blue-deep/80 hover:bg-accent hover:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {t("navAbout")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-border bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150 dark:bg-slate-900 dark:border-slate-800">
                {aboutLinks.map((l) => {
                  const isLinkActive = pathname === "/tentang" && activeHash === l.hash;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => {
                        setAboutOpen(false);
                        handleScrollTo(l.hash);
                      }}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                        isLinkActive
                          ? "bg-accent text-brand-blue dark:bg-slate-800 dark:text-brand-teal"
                          : "text-brand-blue-deep/80 hover:bg-accent hover:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Strategic Areas Dropdown */}
          <div className="relative" ref={areasRef}>
            <button
              onClick={() => { setAreasOpen((v) => !v); setAboutOpen(false); }}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                ["/data-center","/policy-lab","/academy","/research","/consulting"].some(p => pathname.startsWith(p))
                  ? "bg-accent text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal font-semibold"
                  : "text-brand-blue-deep/80 hover:bg-accent hover:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {t("navStrategicAreas")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`} />
            </button>
            {areasOpen && (
              <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-white p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150 dark:bg-slate-900 dark:border-slate-800">
                {strategicAreas.map((area) => (
                  <Link
                    key={area.to}
                    to={area.to}
                    className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-accent dark:hover:bg-slate-800"
                  >
                    <span className="text-sm font-semibold text-brand-blue-deep dark:text-slate-100">
                      INCLUSA {area.label}
                    </span>
                    <span className="mt-0.5 text-xs text-muted-foreground dark:text-slate-400">{area.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Us — standalone */}
          <Link
            to="/kontak"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/kontak")
                ? "bg-accent text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal font-semibold"
                : "text-brand-blue-deep/80 hover:bg-accent hover:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            {t("navContactUs")}
          </Link>
        </nav>

        {/* Desktop Controls (Theme & Language) & CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-brand-blue-deep shadow-sm transition-all hover:bg-accent dark:bg-slate-800 dark:text-white"
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-brand-maize" />
            ) : (
              <Moon className="h-4 w-4 text-brand-blue-deep" />
            )}
          </button>

          {/* Language Switcher Pill */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-bold text-brand-blue-deep shadow-sm transition-all hover:bg-accent dark:bg-slate-800 dark:text-white"
            title="Ganti Bahasa / Switch Language"
          >
            <Globe className="h-3.5 w-3.5 text-brand-blue" />
            <span className={lang === "id" ? "text-brand-blue font-extrabold" : "text-muted-foreground"}>ID</span>
            <span className="text-muted-foreground/30">|</span>
            <span className={lang === "en" ? "text-brand-blue font-extrabold" : "text-muted-foreground"}>EN</span>
          </button>

          <Link
            to="/kontak"
            className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-md"
          >
            {t("navHubungiKami")}
          </Link>
        </div>

        {/* Mobile menu trigger + controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-brand-blue-deep shadow-sm dark:bg-slate-800 dark:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-brand-maize" /> : <Moon className="h-4 w-4 text-brand-blue-deep" />}
          </button>

          {/* Language Switcher Mobile */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[0.7rem] font-bold text-brand-blue-deep dark:bg-slate-800 dark:text-white"
          >
            <span className={lang === "id" ? "text-brand-blue" : "text-muted-foreground"}>ID</span>
            <span>|</span>
            <span className={lang === "en" ? "text-brand-blue" : "text-muted-foreground"}>EN</span>
          </button>

          <button
            className="rounded-lg p-2 text-brand-blue-deep lg:hidden dark:text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 py-3 lg:hidden dark:bg-slate-900 dark:border-slate-800">
          <div className="flex flex-col gap-1">
            <Link to="/" className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-blue-deep/80 hover:bg-accent dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white">
              {t("navHome")}
            </Link>

            <div>
              <p className="px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground dark:text-slate-400">
                {t("navAbout")}
              </p>
              {aboutLinks.map((l) => {
                const isLinkActive = pathname === "/tentang" && activeHash === l.hash;
                return (
                  <Link 
                    key={l.to} 
                    to={l.to} 
                    onClick={() => {
                      setMobileOpen(false);
                      handleScrollTo(l.hash);
                    }}
                    className={`block rounded-lg px-5 py-2 text-sm ${
                      isLinkActive
                        ? "bg-accent font-medium text-brand-blue dark:bg-slate-800 dark:text-brand-teal"
                        : "text-brand-blue-deep/80 hover:bg-accent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>

            <div>
              <p className="px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground dark:text-slate-400">
                {t("navStrategicAreas")}
              </p>
              {strategicAreas.map((area) => (
                <Link
                  key={area.to}
                  to={area.to}
                  className="block rounded-lg px-5 py-2 text-sm text-brand-blue-deep/80 hover:bg-accent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  INCLUSA {area.label}
                </Link>
              ))}
            </div>

            <Link to="/kontak" className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-blue-deep/80 hover:bg-accent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
              {t("navContactUs")}
            </Link>

            <Link
              to="/kontak"
              className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-blue/90"
            >
              {t("navHubungiKami")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
