import { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Send,
  CheckCircle2,
  FolderOpen,
  Library,
  Store,
} from "lucide-react";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { curriculum, eduModules } from "../../data/content";

const moduleIcons: Record<string, any> = {
  GraduationCap,
  BookOpen,
  FolderOpen,
  Library,
  Store,
};

const targets = ["Guru", "Sekolah", "Mahasiswa", "Orang Tua", "Komunitas"];

const themes = [
  "Relationship",
  "Values, Rights & Culture",
  "Violence and Staying Safe",
  "Sexual & Reproductive Health",
  "Human Body & Development",
  "Understanding Gender",
  "Skills for Well-being",
];

export function EducationCenter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Education Center · Coming Soon"
        title="Marketplace Edukasi Digital"
        subtitle="Pusat pembelajaran kesehatan reproduksi & pencegahan HIV untuk guru, sekolah, orang tua, dan komunitas — dikaji komprehensif dan sesuai jenjang usia."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* target audience */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display font-semibold text-brand-blue-deep">Ditujukan untuk:</span>
          {targets.map((t) => (
            <span key={t} className="rounded-full bg-brand-cream px-4 py-1.5 text-sm font-medium text-brand-blue-deep">{t}</span>
          ))}
        </div>

        {/* curriculum cards */}
        <div className="mt-10">
          <SectionHeading eyebrow="Kurikulum" title="Modul Berdasarkan Jenjang Usia" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((c) => (
              <div key={c.id} className="relative overflow-hidden rounded-2xl border border-border bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-coral/15 text-brand-coral">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="absolute right-5 top-6 rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-semibold text-brand-blue">{c.level}</span>
                <h3 className="mt-4 font-display text-base font-bold text-brand-blue-deep">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* platform modules */}
        <div className="mt-14">
          <SectionHeading
            eyebrow="Fitur Platform"
            title="Modul Education Center"
            subtitle="Ekosistem pembelajaran lengkap untuk guru, pelajar, peneliti, dan komunitas."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eduModules.map((m) => {
              const Icon = moduleIcons[m.icon] ?? BookOpen;
              return (
                <div key={m.id} className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-brand-maize/40 px-2.5 py-1 text-xs font-semibold text-[#b9880a]">{m.status}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-blue-deep">{m.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{m.audience}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* themes */}
        <div className="mt-14 rounded-3xl bg-brand-cream p-8 sm:p-10">
          <SectionHeading center eyebrow="Fokus Kami" title="Tema Besar Cakupan Kurikulum" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {themes.map((t) => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-brand-blue/25 bg-white px-4 py-2 text-sm font-medium text-brand-blue-deep">
                <Sparkles className="h-4 w-4 text-brand-coral" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* waitlist */}
        <div className="mt-14 grid gap-8 rounded-3xl bg-brand-blue-deep p-8 text-white sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-brand-maize">
              <GraduationCap className="h-4 w-4" /> Segera Hadir
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight">Jadilah yang pertama tahu saat Education Center diluncurkan</h2>
            <p className="mt-3 text-white/75">Daftarkan email Anda untuk mendapatkan akses awal dan materi edukasi gratis.</p>
            <div className="mt-6 flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-maize" /> 291+ relawan</span>
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-brand-maize" /> 26 sekolah mitra</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-brand-maize" />
                <p className="font-display font-semibold">Terima kasih! Kami akan mengabari Anda.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
                className="space-y-3"
              >
                <label className="text-sm text-white/80">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-brand-maize"
                />
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-maize py-3 font-semibold text-brand-blue-deep">
                  Daftar Waitlist <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
