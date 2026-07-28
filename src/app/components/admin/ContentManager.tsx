import { useRef, useState } from "react";
import { ImagePlus, Trash2, Pencil, Plus, X, Check, Newspaper, FileText } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useContent, fileToDataUrl } from "../../data/ContentStore";
import type { Article, ContentStatus, NewsItem } from "../../data/content";

const todayLabel = () =>
  new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

// ---------- Field kecil yang dipakai ulang ----------
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

// Kontrol status terbit / draft.
function StatusToggle({ value, onChange }: { value: ContentStatus; onChange: (v: ContentStatus) => void }) {
  return (
    <div>
      <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Status</span>
      <div className="flex gap-2">
        {(["published", "draft"] as ContentStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              value === s ? "border-brand-blue bg-brand-blue text-white" : "border-border text-brand-blue-deep/70"
            }`}
          >
            {s === "published" ? "Terbitkan langsung" : "Simpan sbg. Draft"}
          </button>
        ))}
      </div>
    </div>
  );
}

// Badge status di daftar.
function StatusBadge({ status }: { status?: ContentStatus }) {
  const draft = status === "draft";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase ${draft ? "bg-brand-maize/40 text-[#b9880a]" : "bg-brand-teal/20 text-[#17787d]"}`}>
      {draft ? "Draft" : "Terbit"}
    </span>
  );
}

// ---------- Upload gambar (base64) ----------
function ImageUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await fileToDataUrl(file);
      onChange(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Gambar</span>
      <div className="flex items-start gap-3">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-brand-cream">
          {value ? (
            <ImageWithFallback src={value} alt="Pratinjau" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white"
          >
            <ImagePlus className="h-3.5 w-3.5" /> {busy ? "Mengunggah…" : "Unggah Gambar"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-brand-blue-deep"
            >
              <X className="h-3.5 w-3.5" /> Hapus
            </button>
          )}
          <input
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="atau tempel URL gambar…"
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Manajer Artikel
// ===========================================================================
const emptyArticle = {
  title: "",
  category: "Edukasi",
  excerpt: "",
  author: "",
  date: "",
  readTime: "5 menit",
  image: "",
  body: "",
  status: "published" as ContentStatus,
};

function ArticleManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useContent();
  const [form, setForm] = useState({ ...emptyArticle });
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim()) return;
    const payload = { ...form, date: form.date.trim() || todayLabel() };
    if (editing) updateArticle(editing, payload);
    else addArticle(payload);
    setForm({ ...emptyArticle });
    setEditing(null);
  };

  const startEdit = (a: Article) => {
    setEditing(a.id);
    setForm({
      title: a.title,
      category: a.category,
      excerpt: a.excerpt,
      author: a.author,
      date: a.date,
      readTime: a.readTime,
      image: a.image,
      body: a.body ?? "",
      status: a.status ?? "published",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* form */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep">
          {editing ? <Pencil className="h-4 w-4 text-brand-blue" /> : <Plus className="h-4 w-4 text-brand-blue" />}
          {editing ? "Edit Artikel" : "Tambah Artikel Baru"}
        </h3>
        <div className="mt-4 space-y-3">
          <Field label="Judul">
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Judul artikel" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kategori">
              <input value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Edukasi" />
            </Field>
            <Field label="Waktu Baca">
              <input value={form.readTime} onChange={(e) => set("readTime", e.target.value)} className={inputCls} placeholder="5 menit" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Penulis">
              <input value={form.author} onChange={(e) => set("author", e.target.value)} className={inputCls} placeholder="Nama penulis" />
            </Field>
            <Field label="Tanggal">
              <input value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} placeholder={todayLabel()} />
            </Field>
          </div>
          <Field label="Ringkasan">
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={inputCls} placeholder="Ringkasan singkat artikel…" />
          </Field>
          <Field label="Isi Artikel">
            <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={6} className={inputCls} placeholder="Tulis isi lengkap artikel di sini. Pisahkan paragraf dengan baris kosong…" />
          </Field>
          <ImageUpload value={form.image} onChange={(v) => set("image", v)} />
          <StatusToggle value={form.status} onChange={(v) => set("status", v)} />
          <div className="flex gap-2 pt-1">
            <button onClick={submit} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">
              <Check className="h-4 w-4" /> {editing ? "Simpan Perubahan" : "Simpan Artikel"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ ...emptyArticle }); }} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brand-blue-deep">
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-brand-blue-deep">Daftar Artikel</h3>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue">{articles.length} entri</span>
        </div>
        <div className="mt-4 max-h-[560px] space-y-3 overflow-auto pr-1">
          {articles.map((a) => (
            <div key={a.id} className="flex gap-3 rounded-xl border border-border p-3">
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
                {a.image && <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                  <StatusBadge status={a.status} />
                </div>
                <p className="line-clamp-1 font-semibold text-brand-blue-deep">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.author || "—"} · {a.date}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => startEdit(a)} className="rounded-lg border border-border p-1.5 text-brand-blue-deep hover:bg-accent" title="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => deleteArticle(a.id)} className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10" title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {articles.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">Belum ada artikel.</p>}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Manajer Berita
// ===========================================================================
const emptyNews = { title: "", tag: "Program", source: "", excerpt: "", date: "", image: "", body: "", status: "published" as ContentStatus };

function NewsManager() {
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [form, setForm] = useState({ ...emptyNews });
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim()) return;
    const payload = { ...form, date: form.date.trim() || todayLabel() };
    if (editing) updateNews(editing, payload);
    else addNews(payload);
    setForm({ ...emptyNews });
    setEditing(null);
  };

  const startEdit = (n: NewsItem) => {
    setEditing(n.id);
    setForm({ title: n.title, tag: n.tag, source: n.source, excerpt: n.excerpt, date: n.date, image: n.image ?? "", body: n.body ?? "", status: n.status ?? "published" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* form */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep">
          {editing ? <Pencil className="h-4 w-4 text-brand-blue" /> : <Plus className="h-4 w-4 text-brand-blue" />}
          {editing ? "Edit Berita" : "Tambah Berita Baru"}
        </h3>
        <div className="mt-4 space-y-3">
          <Field label="Judul">
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Judul berita" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tag">
              <input value={form.tag} onChange={(e) => set("tag", e.target.value)} className={inputCls} placeholder="Program" />
            </Field>
            <Field label="Tanggal">
              <input value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} placeholder={todayLabel()} />
            </Field>
          </div>
          <Field label="Sumber">
            <input value={form.source} onChange={(e) => set("source", e.target.value)} className={inputCls} placeholder="Dinas Kesehatan Sidoarjo" />
          </Field>
          <Field label="Ringkasan">
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={inputCls} placeholder="Ringkasan singkat berita…" />
          </Field>
          <Field label="Isi Berita">
            <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={6} className={inputCls} placeholder="Tulis isi lengkap berita di sini. Pisahkan paragraf dengan baris kosong…" />
          </Field>
          <ImageUpload value={form.image} onChange={(v) => set("image", v)} />
          <StatusToggle value={form.status} onChange={(v) => set("status", v)} />
          <div className="flex gap-2 pt-1">
            <button onClick={submit} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">
              <Check className="h-4 w-4" /> {editing ? "Simpan Perubahan" : "Simpan Berita"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ ...emptyNews }); }} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brand-blue-deep">
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-brand-blue-deep">Daftar Berita</h3>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue">{news.length} entri</span>
        </div>
        <div className="mt-4 max-h-[560px] space-y-3 overflow-auto pr-1">
          {news.map((n) => (
            <div key={n.id} className="flex gap-3 rounded-xl border border-border p-3">
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
                {n.image && <ImageWithFallback src={n.image} alt={n.title} className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand-blue">{n.tag}</span>
                  <StatusBadge status={n.status} />
                </div>
                <p className="line-clamp-1 font-semibold text-brand-blue-deep">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.source} · {n.date}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => startEdit(n)} className="rounded-lg border border-border p-1.5 text-brand-blue-deep hover:bg-accent" title="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => deleteNews(n.id)} className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10" title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {news.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">Belum ada berita.</p>}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Entrypoint: pilih manajer sesuai jenis
// ===========================================================================
export function ContentManager({ kind }: { kind: "article" | "news" }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        {kind === "article" ? <FileText className="h-4 w-4 text-brand-blue" /> : <Newspaper className="h-4 w-4 text-brand-blue" />}
        Kelola konten {kind === "article" ? "artikel" : "berita"} — tambah, unggah gambar, edit, atau hapus. Perubahan langsung tampil di halaman publik.
      </div>
      {kind === "article" ? <ArticleManager /> : <NewsManager />}
    </div>
  );
}
