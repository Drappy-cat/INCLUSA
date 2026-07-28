import { useMemo, useState } from "react";
import { Search, MapPin, Phone, Hospital, Cross, Stethoscope, Brain, Navigation } from "lucide-react";
import { PageHero, Chip } from "../ui-kit/Shared";
import { facilities, type Facility } from "../../data/content";

const typeIcon: Record<Facility["type"], any> = {
  "Rumah Sakit": Hospital,
  Puskesmas: Cross,
  Klinik: Stethoscope,
  Psikolog: Brain,
};

const typeColor: Record<Facility["type"], string> = {
  "Rumah Sakit": "bg-brand-blue/10 text-brand-blue",
  Puskesmas: "bg-brand-teal/20 text-[#17787d]",
  Klinik: "bg-brand-coral/15 text-brand-coral",
  Psikolog: "bg-brand-maize/40 text-[#b9880a]",
};

export function CariFasilitas() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("Semua");
  const types = useMemo(() => ["Semua", ...Array.from(new Set(facilities.map((f) => f.type)))], []);

  const filtered = facilities.filter((f) => {
    const matchType = type === "Semua" || f.type === type;
    const matchQ = (f.name + f.district + f.address).toLowerCase().includes(q.toLowerCase());
    return matchType && matchQ;
  });

  return (
    <>
      <PageHero
        eyebrow="Layanan Kesehatan"
        title="Cari Fasilitas Kesehatan"
        subtitle="Temukan Rumah Sakit, Puskesmas, dan Klinik penyedia layanan VCT, ARV, dan konseling HIV terdekat di Sidoarjo."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama faskes atau kecamatan..."
              className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} fasilitas ditemukan</p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => {
            const Icon = typeIcon[f.type];
            return (
              <div key={f.id} className="flex flex-col rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${typeColor[f.type]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${typeColor[f.type]}`}>{f.type}</span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-brand-blue-deep">{f.name}</h3>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {f.address}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" /> {f.phone}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {f.services.map((s) => (
                    <span key={s} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-brand-blue">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-full border border-brand-blue py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white">
                    Lihat Detail
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.name + " " + f.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Navigation className="h-4 w-4" /> Rute
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">Tidak ada fasilitas yang cocok dengan pencarian.</p>
        )}
      </section>
    </>
  );
}
