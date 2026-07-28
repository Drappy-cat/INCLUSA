import { Building2, Compass, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { useLanguage } from "../../data/LanguageContext";

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
          <SectionHeading
            center
            eyebrow="Advisory & Pendampingan Program"
            title="Layanan Konsultasi Pembangunan & Audit Aksesibilitas"
            subtitle="INCLUSA Consulting mendampingi instansi dan perusahaan dalam merancang program pemberdayaan masyarakat yang berdampak dan inklusif."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Audit Aksesibilitas Fasilitas
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Evaluasi dan rekomendasi aksesibilitas fisik dan digital untuk gedung kantor, puskesmas, sekolah, dan infrastruktur publik.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Desain Program CSR & ESG
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Pendampingan sektor privat dalam menyusun strategi Tanggung Jawab Sosial dan Keberlanjutan berbasis prinsip DEI (Diversity, Equity, Inclusion).
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-[#17787d]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Monitoring & Evaluasi Independen
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Layanan M&E eksternal untuk mengukur dampak sosial (*Social Return on Investment / SROI*) program inklusi.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue-deep p-8 text-white text-center sm:p-12">
            <h3 className="font-display text-2xl font-bold text-brand-maize sm:text-3xl">
              Butuh Konsultasi Strategis Pembangunan Inklusif?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Hubungi tim pakar konsultasi INCLUSA untuk mendapatkan proposal kerja sama.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-blue-dark"
              >
                Hubungi INCLUSA Consulting <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
