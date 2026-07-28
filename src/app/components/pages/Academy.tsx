import { GraduationCap, Users, Award, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { useLanguage } from "../../data/LanguageContext";

export function Academy() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="5 Strategic Areas · Pilar 3"
        title={t("academyTitle")}
        subtitle={t("academySub")}
      />

      <section className="bg-brand-cream py-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Pelatihan & Sertifikasi"
            title="Program Pelatihan Profesional Pembangunan Inklusif"
            subtitle="INCLUSA Academy merancang kurikulum pelatihan bersertifikat untuk meningkatkan kapasitas tenaga kesehatan, pendidik inklusif, dan fasilitator masyarakat."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Pelatihan Nakes & Konselor
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Peningkatan kompetensi layanan kesehatan konseling yang empati, ramah disabilitas, dan bebas stigma.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Kurikulum Sekolah Inklusi
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Pendampingan tenaga pendidik dalam mengintegrasikan pembelajaran adaptif bagi anak berkebutuhan khusus.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-[#17787d]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                Fasilitator Komunitas
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                Kaderisasi pendamping lapangan untuk advokasi pemenuhan hak perempuan dan penyandang disabilitas di desa.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue-deep p-8 text-white text-center sm:p-12">
            <h3 className="font-display text-2xl font-bold text-brand-maize sm:text-3xl">
              Daftarkan Lembaga Anda di INCLUSA Academy
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Modul pelatihan dapat disesuaikan dengan kebutuhan instansi pemerintah, organisasi non-profit, atau perusahaan.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-blue-dark"
              >
                Hubungi Tim Academy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
