import { GraduationCap, Users, Award, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { ScrollReveal } from "../ui-kit/ScrollReveal";
import { useLanguage } from "../../data/LanguageContext";

const programs = [
  {
    icon: GraduationCap,
    iconBg: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal",
    title: "Pelatihan Nakes & Konselor",
    desc: "Peningkatan kompetensi layanan kesehatan konseling yang empati, ramah disabilitas, dan bebas stigma.",
  },
  {
    icon: BookOpen,
    iconBg: "bg-brand-coral/10 text-brand-coral",
    title: "Kurikulum Sekolah Inklusi",
    desc: "Pendampingan tenaga pendidik dalam mengintegrasikan pembelajaran adaptif bagi anak berkebutuhan khusus.",
  },
  {
    icon: Users,
    iconBg: "bg-brand-teal/10 text-[#17787d]",
    title: "Fasilitator Komunitas",
    desc: "Kaderisasi pendamping lapangan untuk advokasi pemenuhan hak perempuan dan penyandang disabilitas di desa.",
  },
];

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
          <ScrollReveal>
            <SectionHeading
              center
              eyebrow="Pelatihan & Sertifikasi"
              title="Program Pelatihan Profesional Pembangunan Inklusif"
              subtitle="INCLUSA Academy merancang kurikulum pelatihan bersertifikat untuk meningkatkan kapasitas tenaga kesehatan, pendidik inklusif, dan fasilitator masyarakat."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {programs.map((p, idx) => (
              <ScrollReveal key={p.title} staggerIndex={idx} distance={24}>
                <div className="group rounded-3xl border border-border bg-white p-8 shadow-sm card-hover-lift hover-glow-border dark:bg-[#0f1c30] dark:border-slate-800">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.iconBg}`}>
                    <p.icon className="h-6 w-6 icon-hover-spin" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                    {p.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue-deep p-8 text-white text-center sm:p-12 animate-mesh-shimmer" style={{ backgroundImage: 'linear-gradient(135deg, #123a40, #17787d, #123a40, #0b1329, #123a40)' }}>
              <h3 className="font-display text-2xl font-bold text-brand-maize sm:text-3xl">
                Daftarkan Lembaga Anda di INCLUSA Academy
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                Modul pelatihan dapat disesuaikan dengan kebutuhan instansi pemerintah, organisasi non-profit, atau perusahaan.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/kontak"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-blue-dark hover:-translate-y-0.5 animate-cta-pulse"
                >
                  Hubungi Tim Academy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
