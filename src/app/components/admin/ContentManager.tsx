import { useRef, useState } from "react";
import { ImagePlus, Trash2, Pencil, Plus, X, Check, Newspaper, FileText } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useContent, fileToDataUrl } from "../../data/ContentStore";
import type { Article, ContentStatus, ExternalLink, NewsItem } from "../../data/content";

const todayLabel = () =>
  new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

// ---------- Field kecil yang dipakai ulang ----------
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

// ---------- Multi-Image Upload (Koleksi / Galeri Gambar Slide) ----------
function MultiImageUpload({
  images = [],
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFiles = async (fileList?: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setBusy(true);
    try {
      const added: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const url = await fileToDataUrl(fileList[i]);
        added.push(url);
      }
      onChange([...images, ...added]);
    } finally {
      setBusy(false);
    }
  };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    onChange([...images, urlInput.trim()]);
    setUrlInput("");
  };

  const removeImg = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2 rounded-xl border border-border bg-slate-50/70 p-3">
      <span className="block text-xs font-semibold text-brand-blue-deep">
        Galeri / Koleksi Gambar (Slide Carousel)
      </span>

      {/* Grid of uploaded thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative group h-20 overflow-hidden rounded-lg border border-border bg-slate-100">
              <ImageWithFallback src={img} alt={`Gambar ${idx + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImg(idx)}
                className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-600 text-white opacity-90 transition-all hover:scale-110"
                title="Hapus gambar ini"
              >
                <X className="h-3 w-3" />
              </button>
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[0.6rem] font-bold text-white">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Controls: Upload & Add URL */}
      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue-dark"
        >
          <Plus className="h-3.5 w-3.5" /> {busy ? "Mengunggah..." : "+ Unggah Gambar (Bisa Pilih >1)"}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="atau tempel URL gambar di sini..."
          className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-xs outline-none focus:border-brand-blue"
        />
        <button
          type="button"
          onClick={addUrl}
          className="rounded-lg border border-brand-blue bg-accent px-3 py-1.5 text-xs font-semibold text-brand-blue hover:bg-brand-blue/10"
        >
          + Tambah URL
        </button>
      </div>
    </div>
  );
}

// ---------- Multi-Link Input ----------
function MultiLinkInput({
  links = [],
  onChange,
}: {
  links: ExternalLink[];
  onChange: (links: ExternalLink[]) => void;
}) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const addLink = () => {
    if (!url.trim()) return;
    onChange([...links, { label: label.trim() || "Link Referensi", url: url.trim() }]);
    setLabel("");
    setUrl("");
  };

  const removeLink = (idx: number) => {
    onChange(links.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2 rounded-xl border border-border bg-slate-50/70 p-3">
      <span className="block text-xs font-semibold text-brand-blue-deep">
        Opsi Multi-Link Referensi / Sumber Asli
      </span>

      {links.length > 0 && (
        <div className="space-y-1.5 mb-2">
          {links.map((lnk, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs shadow-sm">
              <span className="font-semibold text-brand-blue-deep truncate max-w-[150px]">{lnk.label}</span>
              <span className="text-muted-foreground truncate flex-1">{lnk.url}</span>
              <button
                type="button"
                onClick={() => removeLink(idx)}
                className="text-brand-red hover:underline p-1"
                title="Hapus Link"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Judul Link (mis. 'Dokumen PDF Rujukan')"
          className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs outline-none focus:border-brand-blue"
        />
        <div className="flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-xs outline-none focus:border-brand-blue"
          />
          <button
            type="button"
            onClick={addLink}
            className="shrink-0 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue-dark"
          >
            + Tambah Link
          </button>
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
  images: [] as string[],
  links: [] as ExternalLink[],
  body: "",
  status: "published" as ContentStatus,
};

function ArticleManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useContent();
  const [form, setForm] = useState({ ...emptyArticle });
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim()) return;
    const payload = {
      ...form,
      image: form.images.length > 0 ? form.images[0] : form.image,
      date: form.date.trim() || todayLabel(),
    };
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
      image: a.image ?? "",
      images: a.images ?? (a.image ? [a.image] : []),
      links: a.links ?? [],
      body: a.body ?? "",
      status: a.status ?? "published",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* form */}
      <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
        <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep dark:text-white">
          {editing ? <Pencil className="h-4 w-4 text-brand-blue dark:text-brand-teal" /> : <Plus className="h-4 w-4 text-brand-blue dark:text-brand-teal" />}
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
          <MultiImageUpload images={form.images} onChange={(imgs) => set("images", imgs)} />
          <MultiLinkInput links={form.links} onChange={(lnks) => set("links", lnks)} />
          <StatusToggle value={form.status} onChange={(v) => set("status", v)} />
          <div className="flex gap-2 pt-1">
            <button onClick={submit} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark">
              <Check className="h-4 w-4" /> {editing ? "Simpan Perubahan" : "Simpan Artikel"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ ...emptyArticle }); }} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brand-blue-deep dark:text-white dark:border-slate-700">
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-brand-blue-deep dark:text-white">Daftar Artikel</h3>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">{articles.length} entri</span>
        </div>
        <div className="mt-4 max-h-[560px] space-y-3 overflow-auto pr-1">
          {articles.map((a) => (
            <div key={a.id} className="flex gap-3 rounded-xl border border-border p-3 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-cream dark:bg-slate-800">
                {(a.images?.[0] || a.image) && <ImageWithFallback src={a.images?.[0] || a.image!} alt={a.title} className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                  <StatusBadge status={a.status} />
                  {a.images && a.images.length > 1 && (
                    <span className="rounded bg-brand-blue/10 px-1.5 py-0.5 text-[0.6rem] font-bold text-brand-blue dark:bg-brand-blue/30 dark:text-brand-teal">
                      {a.images.length} gambar
                    </span>
                  )}
                </div>
                <p className="line-clamp-1 font-semibold text-brand-blue-deep dark:text-white">{a.title}</p>
                <p className="text-xs text-muted-foreground dark:text-slate-300">{a.author || "—"} · {a.date}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => startEdit(a)} className="rounded-lg border border-border p-1.5 text-brand-blue-deep hover:bg-accent dark:text-white dark:border-slate-700 dark:hover:bg-slate-800" title="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => deleteArticle(a.id)} className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10 dark:border-slate-700 dark:hover:bg-red-950/40" title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {articles.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground dark:text-slate-400">Belum ada artikel.</p>}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Manajer Berita
// ===========================================================================
const emptyNews = {
  title: "",
  tag: "Program",
  source: "",
  url: "",
  excerpt: "",
  date: "",
  image: "",
  images: [] as string[],
  links: [] as ExternalLink[],
  body: "",
  status: "published" as ContentStatus,
};

function NewsManager() {
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [form, setForm] = useState({ ...emptyNews });
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim()) return;
    const payload = {
      ...form,
      image: form.images.length > 0 ? form.images[0] : form.image,
      date: form.date.trim() || todayLabel(),
    };
    if (editing) updateNews(editing, payload);
    else addNews(payload);
    setForm({ ...emptyNews });
    setEditing(null);
  };

  const startEdit = (n: NewsItem) => {
    setEditing(n.id);
    setForm({
      title: n.title,
      tag: n.tag,
      source: n.source,
      url: n.url ?? "",
      excerpt: n.excerpt,
      date: n.date,
      image: n.image ?? "",
      images: n.images ?? (n.image ? [n.image] : []),
      links: n.links ?? [],
      body: n.body ?? "",
      status: n.status ?? "published",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* form */}
      <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
        <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep dark:text-white">
          {editing ? <Pencil className="h-4 w-4 text-brand-blue dark:text-brand-teal" /> : <Plus className="h-4 w-4 text-brand-blue dark:text-brand-teal" />}
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
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nama Sumber Utama">
              <input value={form.source} onChange={(e) => set("source", e.target.value)} className={inputCls} placeholder="Dinas Kesehatan Sidoarjo" />
            </Field>
            <Field label="Link Sumber Utama (URL)">
              <input value={form.url} onChange={(e) => set("url", e.target.value)} className={inputCls} placeholder="https://..." />
            </Field>
          </div>
          <Field label="Ringkasan">
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={inputCls} placeholder="Ringkasan singkat berita…" />
          </Field>
          <Field label="Isi Berita">
            <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={6} className={inputCls} placeholder="Tulis isi lengkap berita di sini. Pisahkan paragraf dengan baris kosong…" />
          </Field>

          {/* Multi-Image Carousel Uploader */}
          <MultiImageUpload images={form.images} onChange={(imgs) => set("images", imgs)} />

          {/* Multi-Link External Resource Input */}
          <MultiLinkInput links={form.links} onChange={(lnks) => set("links", lnks)} />

          <StatusToggle value={form.status} onChange={(v) => set("status", v)} />
          <div className="flex gap-2 pt-1">
            <button onClick={submit} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark">
              <Check className="h-4 w-4" /> {editing ? "Simpan Perubahan" : "Simpan Berita"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ ...emptyNews }); }} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brand-blue-deep dark:text-white dark:border-slate-700">
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-brand-blue-deep dark:text-white">Daftar Berita</h3>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">{news.length} entri</span>
        </div>
        <div className="mt-4 max-h-[560px] space-y-3 overflow-auto pr-1">
          {news.map((n) => (
            <div key={n.id} className="flex gap-3 rounded-xl border border-border p-3 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-cream dark:bg-slate-800">
                {(n.images?.[0] || n.image) && <ImageWithFallback src={n.images?.[0] || n.image!} alt={n.title} className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand-blue dark:text-brand-teal">{n.tag}</span>
                  <StatusBadge status={n.status} />
                  {n.images && n.images.length > 1 && (
                    <span className="rounded bg-brand-blue/10 px-1.5 py-0.5 text-[0.6rem] font-bold text-brand-blue dark:bg-brand-blue/30 dark:text-brand-teal">
                      {n.images.length} gambar
                    </span>
                  )}
                </div>
                <p className="line-clamp-1 font-semibold text-brand-blue-deep dark:text-white">{n.title}</p>
                <p className="text-xs text-muted-foreground dark:text-slate-300">{n.source} · {n.date}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => startEdit(n)} className="rounded-lg border border-border p-1.5 text-brand-blue-deep hover:bg-accent dark:text-white dark:border-slate-700 dark:hover:bg-slate-800" title="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => deleteNews(n.id)} className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10 dark:border-slate-700 dark:hover:bg-red-950/40" title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {news.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground dark:text-slate-400">Belum ada berita.</p>}
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
        Kelola konten {kind === "article" ? "artikel" : "berita"} — tambah multi-gambar (slideshow), multi-link rujukan, edit, atau hapus. Perubahan langsung tampil di halaman publik.
      </div>
      {kind === "article" ? <ArticleManager /> : <NewsManager />}
    </div>
  );
}

