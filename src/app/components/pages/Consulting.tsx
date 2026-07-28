import { Building2, Compass, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { ScrollReveal } from "../ui-kit/ScrollReveal";
import { useLanguage } from "../../data/LanguageContext";

const services = [
  {
    icon: Building2,
    iconBg: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal",
    title: "Audit Aksesibilitas Fasilitas",
    desc: "Evaluasi dan rekomendasi aksesibilitas fisik dan digital untuk gedung kantor, puskesmas, sekolah, dan infrastruktur publik.",
  },
  {
    icon: Compass,
    iconBg: "bg-brand-coral/10 text-brand-coral",
    title: "Desain Program CSR & ESG",
    desc: "Pendampingan sektor privat dalam menyusun strategi Tanggung Jawab Sosial dan Keberlanjutan berbasis prinsip DEI (Diversity, Equity, Inclusion).",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-brand-teal/10 text-[#17787d]",
    title: "Monitoring & Evaluasi Independen",
    desc: "Layanan M&E eksternal untuk mengukur dampak sosial (*Social Return on Investment / SROI*) program inklusi.",
  },
];

export function Consulting() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="5 Strategic Areas · Pilar 5"
        title={t("consultingTitle")}
        subtitle={t("consultingSub")}
      />

      <section className="bg-brand-cream py-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              center
              eyebrow="Advisory & Pendampingan Program"
              title="Layanan Konsultasi Pembangunan & Audit Aksesibilitas"
              subtitle="INCLUSA Consulting mendampingi instansi dan perusahaan dalam merancang program pemberdayaan masyarakat yang berdampak dan inklusif."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((s, idx) => (
              <ScrollReveal key={s.title} staggerIndex={idx} distance={24}>
                <div className="group rounded-3xl border border-border bg-white p-8 shadow-sm card-hover-lift hover-glow-border dark:bg-[#0f1c30] dark:border-slate-800">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconBg}`}>
                    <s.icon className="h-6 w-6 icon-hover-spin" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                    {s.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue-deep p-8 text-white text-center sm:p-12 animate-mesh-shimmer" style={{ backgroundImage: 'linear-gradient(135deg, #123a40, #17787d, #123a40, #0b1329, #123a40)' }}>
              <h3 className="font-display text-2xl font-bold text-brand-maize sm:text-3xl">
                Butuh Konsultasi Strategis Pembangunan Inklusif?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                Hubungi tim pakar konsultasi INCLUSA untuk mendapatkan proposal kerja sama.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/kontak"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-blue-dark hover:-translate-y-0.5 animate-cta-pulse"
                >
                  Hubungi INCLUSA Consulting <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
