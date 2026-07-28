import { useState } from "react";
import { Biohazard, Activity, ShieldCheck, GitBranch, Landmark, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { PageHero, SectionHeading } from "../ui-kit/Shared";
import { infoTopics } from "../../data/content";

const iconMap: Record<string, any> = { Virus: Biohazard, Activity, ShieldCheck, GitBranch, Landmark };

const mythFacts = [
  { myth: "HIV menular lewat jabat tangan / pelukan", fact: "HIV tidak menular melalui kontak sosial biasa." },
  { myth: "Gigitan nyamuk bisa menularkan HIV", fact: "Nyamuk tidak dapat menularkan HIV." },
  { myth: "ODHIV tidak bisa hidup normal", fact: "Dengan ARV rutin, ODHIV hidup sehat & produktif." },
  { myth: "Berbagi alat makan menularkan HIV", fact: "Aman berbagi alat makan dengan ODHIV." },
];

export function InformasiUmum() {
  const [active, setActive] = useState(infoTopics[0].id);
  const current = infoTopics.find((t) => t.id === active)!;
  const Icon = iconMap[current.icon] ?? Biohazard;

  return (
    <>
      <PageHero
        eyebrow="Pusat Informasi"
        title="Informasi Umum HIV & AIDS"
        subtitle="Pahami fakta dasar seputar HIV/AIDS, cara pencegahan, penularan, serta layanan yang disediakan pemerintah — semua dalam bahasa yang mudah dipahami."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* nav */}
          <aside className="flex flex-row flex-wrap gap-2 lg:flex-col">
            {infoTopics.map((t) => {
              const TIcon = iconMap[t.icon] ?? Biohazard;
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive ? "bg-brand-blue text-white shadow-sm" : "bg-white text-brand-blue-deep/70 ring-1 ring-border hover:bg-accent"
                  }`}
                >
                  <TIcon className="h-5 w-5 shrink-0" /> {t.title}
                </button>
              );
            })}
          </aside>

          {/* content */}
          <div className="rounded-2xl border border-border bg-white p-7 sm:p-9">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
              <Icon className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-brand-blue-deep">{current.title}</h2>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">{current.summary}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {current.points.map((p) => (
                <div key={p} className="flex items-start gap-3 rounded-xl bg-brand-cream p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="text-sm text-brand-blue-deep/85">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* myth vs fact */}
      <section className="bg-brand-cream py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Luruskan Stigma" title="Mitos vs Fakta" subtitle="Stigma sering lahir dari informasi yang keliru. Mari luruskan bersama." />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {mythFacts.map((m) => (
              <div key={m.myth} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="flex items-start gap-3 bg-brand-red/5 p-4">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-red">Mitos</p>
                    <p className="text-sm text-brand-blue-deep/80">{m.myth}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#17787d]">Fakta</p>
                    <p className="text-sm text-brand-blue-deep/80">{m.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 flex max-w-4xl items-center gap-3 rounded-2xl bg-brand-maize/40 p-5">
            <AlertTriangle className="h-6 w-6 shrink-0 text-[#b9880a]" />
            <p className="text-sm text-brand-blue-deep/90">
              Ingat prinsip <strong>U = U</strong> (Undetectable = Untransmittable): ODHIV dengan viral load tak terdeteksi
              <strong> tidak menularkan</strong> HIV melalui hubungan seksual.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
