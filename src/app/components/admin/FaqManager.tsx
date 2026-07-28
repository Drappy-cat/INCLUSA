import { useState } from "react";
import { Plus, Pencil, Trash2, Check, HelpCircle } from "lucide-react";
import { useContent } from "../../data/ContentStore";
import type { FaqItem } from "../../data/ContentStore";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const empty = { q: "", a: "", category: "Umum" };

export function FaqManager() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useContent();
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.q.trim() || !form.a.trim()) return;
    if (editing) updateFaq(editing, form);
    else addFaq(form);
    setForm({ ...empty });
    setEditing(null);
  };

  const startEdit = (f: FaqItem) => {
    setEditing(f.id);
    setForm({ q: f.q, a: f.a, category: f.category });
  };

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <HelpCircle className="h-4 w-4 text-brand-blue" /> Kelola daftar pertanyaan umum yang tampil di halaman FAQ publik.
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* form */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep">
            {editing ? <Pencil className="h-4 w-4 text-brand-blue" /> : <Plus className="h-4 w-4 text-brand-blue" />}
            {editing ? "Edit FAQ" : "Tambah FAQ Baru"}
          </h3>
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Kategori</span>
              <input value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Umum" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Pertanyaan</span>
              <input value={form.q} onChange={(e) => set("q", e.target.value)} className={inputCls} placeholder="Tulis pertanyaan…" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Jawaban</span>
              <textarea value={form.a} onChange={(e) => set("a", e.target.value)} rows={5} className={inputCls} placeholder="Tulis jawaban…" />
            </label>
            <div className="flex gap-2 pt-1">
              <button onClick={submit} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">
                <Check className="h-4 w-4" /> {editing ? "Simpan Perubahan" : "Tambah"}
              </button>
              {editing && (
                <button onClick={() => { setEditing(null); setForm({ ...empty }); }} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brand-blue-deep">
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* list */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-brand-blue-deep">Daftar FAQ</h3>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue">{faqs.length} entri</span>
          </div>
          <div className="mt-4 max-h-[560px] space-y-3 overflow-auto pr-1">
            {faqs.map((f) => (
              <div key={f.id} className="rounded-xl border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-brand-blue">{f.category}</span>
                    <p className="font-semibold text-brand-blue-deep">{f.q}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{f.a}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button onClick={() => startEdit(f)} className="rounded-lg border border-border p-1.5 text-brand-blue-deep hover:bg-accent" title="Edit">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => deleteFaq(f.id)} className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10" title="Hapus">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {faqs.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">Belum ada FAQ.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
