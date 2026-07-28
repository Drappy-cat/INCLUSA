import { FileSearch, ShieldCheck, Scale, Award, ArrowRight, Building2, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { ScrollReveal } from "../ui-kit/ScrollReveal";
import { useLanguage } from "../../data/LanguageContext";

const features = [
  {
    icon: FileSearch,
    iconBg: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal",
    title: "Analisis & Naskah Akademik",
    desc: "Penyusunan naskah akademik dan rekomendasi kebijakan publik berbasis analisis data kuantitatif dan kualitatif.",
  },
  {
    icon: Scale,
    iconBg: "bg-brand-coral/10 text-brand-coral",
    title: "Advokasi Perda Inklusif",
    desc: "Pendampingan dinas teknis dan DPRD dalam penyusunan Peraturan Daerah (Perda) Pemenuhan Hak Disabilitas dan Kesetaraan Gender.",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-brand-teal/10 text-[#17787d]",
    title: "Evaluasi Dampak Kebijakan",
    desc: "Monitoring independen terhadap efektivitas alokasi anggaran daerah untuk program pengentasan kemiskinan dan inklusi.",
  },
];

export function PolicyLab() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="5 Strategic Areas · Pilar 2"
        title={t("policyTitle")}
        subtitle={t("policySub")}
      />

      <section className="bg-brand-cream py-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              center
              eyebrow="Riset Kebijakan Inklusif"
              title="Mendorong Kebijakan Berbasis Bukti Data Spasial"
              subtitle="INCLUSA Policy Lab bekerja sama dengan pembuat kebijakan daerah dan nasional untuk menyusun regulasi yang ramah perempuan, anak, dan penyandang disabilitas."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((f, idx) => (
              <ScrollReveal key={f.title} staggerIndex={idx} distance={24}>
                <div className="group rounded-3xl border border-border bg-white p-8 shadow-sm card-hover-lift hover-glow-border dark:bg-[#0f1c30] dark:border-slate-800">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${f.iconBg}`}>
                    <f.icon className="h-6 w-6 icon-hover-spin" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Link to Contact */}
          <ScrollReveal delay={400}>
            <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue-deep p-8 text-white text-center sm:p-12 animate-mesh-shimmer" style={{ backgroundImage: 'linear-gradient(135deg, #123a40, #17787d, #123a40, #0b1329, #123a40)' }}>
              <h3 className="font-display text-2xl font-bold text-brand-maize sm:text-3xl">
                Tertarik Mengadakan Riset Kebijakan Bersama Policy Lab?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                Tim peneliti dan pakar kebijakan publik INCLUSA Institute siap berkolaborasi dengan instansi Anda.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/kontak"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-blue-dark hover:-translate-y-0.5 animate-cta-pulse"
                >
                  Konsultasi Kebijakan <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
