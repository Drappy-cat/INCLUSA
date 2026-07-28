import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";
import { MapPin, Building2, Activity, Syringe, Hospital, Phone, Map as MapIcon, LayoutGrid } from "lucide-react";
import { PageHero } from "../ui-kit/Shared";
import { facilities, type Kecamatan } from "../../data/content";
import { useContent } from "../../data/ContentStore";
import { SidoarjoMap } from "./SidoarjoMap";

function heat(cases: number, max: number) {
  const r = cases / max;
  if (r > 0.8) return "bg-brand-red text-white";
  if (r > 0.6) return "bg-brand-coral text-white";
  if (r > 0.4) return "bg-brand-blue text-white";
  if (r > 0.2) return "bg-brand-teal text-brand-blue-deep";
  return "bg-brand-maize/60 text-brand-blue-deep";
}

export function PetaGIS() {
  const { kecamatan: kecamatanData } = useContent();
  const max = Math.max(...kecamatanData.map((k) => k.cases));
  const [selectedName, setSelectedName] = useState<string>(kecamatanData[0].name);
  const [view, setView] = useState<"map" | "grid">("map");

  // Selalu ambil data terbaru dari store agar ikut ter-update saat admin mengedit.
  const selected: Kecamatan =
    kecamatanData.find((k) => k.name === selectedName) ?? kecamatanData[0];
  const setSelected = (k: Kecamatan) => setSelectedName(k.name);

  const detailChart = [
    { name: "Kasus", value: selected.cases },
    { name: "ODHIV", value: selected.odhiv },
    { name: "ARV", value: selected.arv },
  ];

  const districtFacilities = facilities.filter((f) => f.district === selected.name);

  return (
    <>
      <PageHero
        eyebrow="Peta Sebaran (GIS)"
        title="Peta Interaktif Kasus HIV/AIDS"
        subtitle="Klik pada tiap kecamatan untuk melihat jumlah kasus, ODHIV, cakupan ARV, dan jumlah fasilitas kesehatan yang tersedia."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* map grid */}
          <div className="rounded-3xl border border-border bg-brand-cream p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-brand-blue-deep">Kabupaten Sidoarjo</h3>
              <div className="flex items-center gap-1 rounded-full bg-white p-1 ring-1 ring-border">
                <button
                  onClick={() => setView("map")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    view === "map" ? "bg-brand-blue text-white" : "text-brand-blue-deep/70"
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" /> Peta
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    view === "grid" ? "bg-brand-blue text-white" : "text-brand-blue-deep/70"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" /> Grid
                </button>
              </div>
            </div>

            {view === "map" ? (
              <div className="mt-5 h-[420px] overflow-hidden rounded-2xl ring-1 ring-border">
                <SidoarjoMap selected={selected} onSelect={setSelected} />
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {kecamatanData.map((k) => {
                  const isSel = k.name === selected.name;
                  return (
                    <button
                      key={k.name}
                      onClick={() => setSelected(k)}
                      className={`flex flex-col items-start rounded-xl p-3 text-left transition-all hover:scale-[1.03] ${heat(k.cases, max)} ${
                        isSel ? "ring-4 ring-brand-blue-deep/60" : ""
                      }`}
                    >
                      <MapPin className="h-4 w-4 opacity-90" />
                      <span className="mt-1.5 text-sm font-semibold leading-tight">{k.name}</span>
                      <span className="text-xs opacity-90">{k.cases} kasus</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* legend */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="font-semibold text-brand-blue-deep">Intensitas kasus:</span>
              {[
                { c: "bg-brand-maize/60", l: "Rendah" },
                { c: "bg-brand-teal", l: "Sedang" },
                { c: "bg-brand-blue", l: "Cukup Tinggi" },
                { c: "bg-brand-coral", l: "Tinggi" },
                { c: "bg-brand-red", l: "Sangat Tinggi" },
              ].map((x) => (
                <span key={x.l} className="flex items-center gap-1.5">
                  <span className={`h-3 w-3 rounded ${x.c}`} /> {x.l}
                </span>
              ))}
            </div>
          </div>

          {/* detail panel */}
          <div className="rounded-3xl border border-border bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Kecamatan</p>
                <h3 className="font-display text-xl font-bold text-brand-blue-deep">{selected.name}</h3>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Activity, label: "Total Kasus", value: selected.cases, tone: "text-brand-red" },
                { icon: Building2, label: "ODHIV", value: selected.odhiv, tone: "text-brand-blue" },
                { icon: Syringe, label: "Dalam ARV", value: selected.arv, tone: "text-[#17787d]" },
                { icon: Hospital, label: "Faskes", value: selected.faskes, tone: "text-brand-coral" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-brand-cream p-4">
                  <s.icon className={`h-5 w-5 ${s.tone}`} />
                  <p className={`mt-2 font-display text-2xl font-extrabold ${s.tone}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detailChart} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#5a7480" }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {detailChart.map((entry, i) => (
                      <Cell key={`detail-${entry.name}`} fill={["#e4412f", "#1f9aa0", "#34bec4"][i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 rounded-xl bg-accent p-3 text-xs text-brand-blue-deep/80">
              Cakupan ARV di {selected.name}: <strong>{Math.round((selected.arv / selected.odhiv) * 100)}%</strong> dari total ODHIV.
            </p>

            {/* healthcare facilities in this district */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep">
                <Hospital className="h-4 w-4 text-brand-blue" /> Fasilitas Kesehatan
              </h4>
              {districtFacilities.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Data fasilitas terperinci untuk {selected.name} belum tersedia.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {districtFacilities.map((f) => (
                    <li key={f.id} className="rounded-xl border border-border p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-brand-blue-deep">{f.name}</p>
                        <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-semibold text-brand-blue">{f.type}</span>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {f.phone}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
