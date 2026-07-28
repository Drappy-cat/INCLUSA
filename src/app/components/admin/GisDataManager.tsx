import { useState } from "react";
import { MapPin, Pencil, Check, X, Map as MapIcon } from "lucide-react";
import { useContent } from "../../data/ContentStore";
import type { Kecamatan } from "../../data/content";

const inputCls =
  "w-24 rounded-lg border border-border bg-white px-2 py-1 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const fields: { key: keyof Kecamatan; label: string }[] = [
  { key: "cases", label: "Kasus" },
  { key: "odhiv", label: "ODHIV" },
  { key: "arv", label: "ARV" },
  { key: "faskes", label: "Faskes" },
];

export function GisDataManager() {
  const { kecamatan, updateKecamatan } = useContent();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, number>>({});

  const startEdit = (k: Kecamatan) => {
    setEditing(k.name);
    setDraft({ cases: k.cases, odhiv: k.odhiv, arv: k.arv, faskes: k.faskes });
  };

  const save = (name: string) => {
    updateKecamatan(name, draft);
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <MapIcon className="h-4 w-4 text-brand-blue" /> Perbarui data kasus per kecamatan. Perubahan langsung terlihat di Peta GIS, Statistik, dan Beranda.
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-brand-cream text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Kecamatan</th>
              {fields.map((f) => (
                <th key={f.key} className="px-4 py-3 font-semibold">{f.label}</th>
              ))}
              <th className="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kecamatan.map((k) => {
              const isEdit = editing === k.name;
              return (
                <tr key={k.name} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-brand-blue-deep">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-coral" /> {k.name}</span>
                  </td>
                  {fields.map((f) => (
                    <td key={f.key} className="px-4 py-3">
                      {isEdit ? (
                        <input
                          type="number"
                          value={draft[f.key as string] ?? 0}
                          onChange={(e) => setDraft((d) => ({ ...d, [f.key]: Number(e.target.value) }))}
                          className={inputCls}
                        />
                      ) : (
                        <span className="text-brand-blue-deep/80">{k[f.key] as number}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    {isEdit ? (
                      <div className="flex justify-end gap-1">
                        <button onClick={() => save(k.name)} className="rounded-lg bg-brand-blue p-1.5 text-white" title="Simpan">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setEditing(null)} className="rounded-lg border border-border p-1.5 text-brand-blue-deep" title="Batal">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(k)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-brand-blue-deep hover:bg-accent">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
