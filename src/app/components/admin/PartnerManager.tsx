import { useRef, useState } from "react";
import { ImagePlus, Trash2, Pencil, Plus, Check, Handshake, ExternalLink, ShieldCheck } from "lucide-react";
import { useContent, fileToDataUrl } from "../../data/ContentStore";
import type { PartnerItem } from "../../data/content";
import { ImageWithFallback } from "../figma/ImageWithFallback";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-brand-blue-deep dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700";

const emptyPartner = {
  name: "",
  category: "Mitra Strategis",
  logo: "",
  badgeText: "Mitra Aktif",
  badgeType: "active" as "active" | "slot",
  url: "",
};

export function PartnerManager() {
  const { partners, addPartner, updatePartner, deletePartner } = useContent();
  const [form, setForm] = useState({ ...emptyPartner });
  const [editing, setEditing] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await fileToDataUrl(file);
        set("logo", dataUrl);
      } catch (err) {
        console.error("Gagal membaca file gambar", err);
      }
    }
  };

  const submit = () => {
    if (!form.name.trim()) return;
    if (editing) updatePartner(editing, form);
    else addPartner(form);
    setForm({ ...emptyPartner });
    setEditing(null);
  };

  const startEdit = (p: PartnerItem) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      category: p.category ?? "",
      logo: p.logo ?? "",
      badgeText: p.badgeText ?? "Mitra Aktif",
      badgeType: p.badgeType ?? "active",
      url: p.url ?? "",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Form Tambah/Edit Mitra */}
      <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
        <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep dark:text-white">
          <Handshake className="h-5 w-5 text-brand-blue dark:text-brand-teal" />
          {editing ? "Edit Data Mitra" : "Tambah Mitra Kolaborasi Baru"}
        </h3>
        <div className="mt-4 space-y-4">
          <Field label="Nama Mitra / Instansi / Organisasi">
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
              placeholder="cth: Kementerian Kesehatan RI / UNICEF / Universitas Airlangga"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Kategori / Peran (Opsional)">
              <input
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
                placeholder="cth: Lembaga Pemerintah / Perguruan Tinggi"
              />
            </Field>
            <Field label="Teks Label Badge">
              <input
                value={form.badgeText}
                onChange={(e) => set("badgeText", e.target.value)}
                className={inputCls}
                placeholder="cth: Mitra Aktif / Available Slot / Mitra Riset"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipe Status Badge">
              <select
                value={form.badgeType}
                onChange={(e) => set("badgeType", e.target.value as any)}
                className={inputCls}
              >
                <option value="active">Mitra Aktif (Hijau Solid)</option>
                <option value="slot">Available Slot (Pulse Emerald)</option>
              </select>
            </Field>
            <Field label="Link Website Mitra (Opsional)">
              <input
                value={form.url}
                onChange={(e) => set("url", e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
            </Field>
          </div>

          {/* Logo Upload */}
          <div>
            <span className="mb-1 block text-xs font-semibold text-brand-blue-deep dark:text-slate-200">
              Logo / Icon Mitra (Unggah Gambar atau Tempel URL)
            </span>
            <div className="flex items-center gap-3">
              <div className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-slate-50 p-2 dark:bg-slate-800 dark:border-slate-700">
                {form.logo ? (
                  <ImageWithFallback src={form.logo} alt="Preview Logo" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-[0.65rem] font-semibold text-muted-foreground text-center">Tanpa Logo</span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  ref={fileRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-brand-blue-deep hover:bg-accent dark:bg-slate-800 dark:text-white dark:border-slate-700"
                >
                  <ImagePlus className="h-3.5 w-3.5 text-brand-blue dark:text-brand-teal" /> Upload Logo File
                </button>
                <input
                  type="text"
                  value={form.logo}
                  onChange={(e) => set("logo", e.target.value)}
                  placeholder="atau masukkan URL Gambar Logo (https://...)"
                  className={`${inputCls} text-xs py-1.5`}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={submit}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
            >
              <Check className="h-4 w-4" /> {editing ? "Simpan Perubahan" : "Tambah Mitra"}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setEditing(null);
                  setForm({ ...emptyPartner });
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brand-blue-deep dark:text-white dark:border-slate-700"
              >
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List Daftar Mitra */}
      <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-brand-blue-deep dark:text-white">Daftar Mitra Kolaborasi</h3>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">
            {partners.length} entri
          </span>
        </div>

        <div className="mt-4 max-h-[560px] space-y-3 overflow-auto pr-1">
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-xl border border-border p-3 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1.5 dark:bg-slate-800 dark:border-slate-700">
                {p.logo ? (
                  <ImageWithFallback src={p.logo} alt={p.name} className="h-full w-full object-contain" />
                ) : (
                  <div className="h-5 w-12 rounded bg-slate-200 dark:bg-slate-700" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-semibold uppercase text-brand-coral">{p.category || "Mitra"}</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${
                      p.badgeType === "slot"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-brand-teal/20 text-brand-blue dark:text-brand-teal"
                    }`}
                  >
                    {p.badgeType === "slot" && <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />}
                    {p.badgeText || "Mitra"}
                  </span>
                </div>
                <p className="line-clamp-1 font-semibold text-brand-blue-deep dark:text-white">{p.name}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-blue dark:text-brand-teal hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> {p.url}
                  </a>
                )}
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => startEdit(p)}
                  className="rounded-lg border border-border p-1.5 text-brand-blue-deep hover:bg-accent dark:text-white dark:border-slate-700 dark:hover:bg-slate-800"
                  title="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => deletePartner(p.id)}
                  className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10 dark:border-slate-700 dark:hover:bg-red-950/40"
                  title="Hapus"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {partners.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground dark:text-slate-400">
              Belum ada data mitra kolaborasi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
