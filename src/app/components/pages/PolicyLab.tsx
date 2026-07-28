import { FileSearch, ShieldCheck, Scale, Award, ArrowRight, Building2, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { useLanguage } from "../../data/LanguageContext";

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
          <SectionHeading
            center
            eyebrow="Riset Kebijakan Inklusif"
            title="Mendorong Kebijakan Berbasis Bukti Data Spasial"
            subtitle="INCLUSA Policy Lab bekerja sama dengan pembuat kebijakan daerah dan nasional untuk menyusun regulasi yang ramah perempuan, anak, dan penyandang disabilitas."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">
                <FileSearch className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Analisis & Naskah Akademik
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Penyusunan naskah akademik dan rekomendasi kebijakan publik berbasis analisis data kuantitatif dan kualitatif.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Advokasi Perda Inklusif
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Pendampingan dinas teknis dan DPRD dalam penyusunan Peraturan Daerah (Perda) Pemenuhan Hak Disabilitas dan Kesetaraan Gender.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-[#17787d]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Evaluasi Dampak Kebijakan
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Monitoring independen terhadap efektivitas alokasi anggaran daerah untuk program pengentasan kemiskinan dan inklusi.
              </p>
            </div>
          </div>

          {/* CTA Link to Contact */}
          <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue-deep p-8 text-white text-center sm:p-12">
            <h3 className="font-display text-2xl font-bold text-brand-maize sm:text-3xl">
              Tertarik Mengadakan Riset Kebijakan Bersama Policy Lab?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Tim peneliti dan pakar kebijakan publik INCLUSA Institute siap berkolaborasi dengan instansi Anda.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-blue-dark"
              >
                Konsultasi Kebijakan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
