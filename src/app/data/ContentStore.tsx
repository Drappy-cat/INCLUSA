import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  articles as seedArticles,
  news as seedNews,
  faqs as seedFaqs,
  kecamatanData as seedKecamatan,
  defaultPartners as seedPartners,
  type Article,
  type NewsItem,
  type Faq,
  type Kecamatan,
  type PartnerItem,
} from "./content";

// ---------------------------------------------------------------------------
// Content Store — pondasi manajemen konten & data (berita, artikel, FAQ, GIS, Mitra).
// Data diseed dari content.ts, lalu dipersist ke localStorage sehingga konten
// yang dikelola lewat Admin Dashboard tetap tersimpan di sesi berikutnya.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "inclusa:content:v6";

export type FaqItem = Faq & { id: string };

export type NewArticle = Omit<Article, "id">;
export type NewNews = Omit<NewsItem, "id">;
export type NewFaq = Omit<FaqItem, "id">;
export type NewPartner = Omit<PartnerItem, "id">;

type StoreData = {
  articles: Article[];
  news: NewsItem[];
  faqs: FaqItem[];
  kecamatan: Kecamatan[];
  partners: PartnerItem[];
};

type ContentState = StoreData & {
  addArticle: (a: NewArticle) => void;
  updateArticle: (id: string, a: NewArticle) => void;
  deleteArticle: (id: string) => void;
  addNews: (n: NewNews) => void;
  updateNews: (id: string, n: NewNews) => void;
  deleteNews: (id: string) => void;
  publishArticle: (id: string) => void;
  publishNews: (id: string) => void;
  addFaq: (f: NewFaq) => void;
  updateFaq: (id: string, f: NewFaq) => void;
  deleteFaq: (id: string) => void;
  updateKecamatan: (name: string, patch: Partial<Kecamatan>) => void;
  addPartner: (p: NewPartner) => void;
  updatePartner: (id: string, p: NewPartner) => void;
  deletePartner: (id: string) => void;
  reset: () => void;
};

const ContentContext = createContext<ContentState | null>(null);

// Membuat id unik sederhana untuk entri baru.
export const genId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

// Konten yang bisa ditampilkan ke publik (draft disembunyikan).
export const isPublished = (item: { status?: string }) => item.status !== "draft";

// Mengubah File gambar menjadi data URL (base64) agar bisa disimpan & ditampilkan.
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function seed(): StoreData {
  return {
    articles: [],
    news: [],
    faqs: seedFaqs.map((f, i) => ({ ...f, id: f.id ?? `faq-seed-${i}` })),
    kecamatan: seedKecamatan.map((k) => ({ ...k })),
    partners: seedPartners.map((p) => ({ ...p })),
  };
}

function loadInitial(): StoreData {
  if (typeof window !== "undefined") {
    try {
      // Clear legacy storage keys to update schema
      localStorage.removeItem("inclusa:content:v1");
      localStorage.removeItem("inclusa:content:v2");
      localStorage.removeItem("inclusa:content:v3");
      localStorage.removeItem("inclusa:content:v4");
      localStorage.removeItem("inclusa:content:v5");

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.articles && p.news && p.faqs && p.kecamatan && p.partners) return p as StoreData;
      }
    } catch {
      // abaikan localStorage korup → jatuh ke seed default
    }
  }
  return seed();
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // penyimpanan mungkin penuh (data URL gambar besar) — abaikan dengan aman
    }
  }, [data]);

  const value: ContentState = {
    ...data,
    addArticle: (a) =>
      setData((s) => ({ ...s, articles: [{ ...a, id: genId("a") }, ...s.articles] })),
    updateArticle: (id, a) =>
      setData((s) => ({ ...s, articles: s.articles.map((x) => (x.id === id ? { ...a, id } : x)) })),
    deleteArticle: (id) =>
      setData((s) => ({ ...s, articles: s.articles.filter((x) => x.id !== id) })),
    addNews: (n) =>
      setData((s) => ({ ...s, news: [{ ...n, id: genId("n") }, ...s.news] })),
    updateNews: (id, n) =>
      setData((s) => ({ ...s, news: s.news.map((x) => (x.id === id ? { ...n, id } : x)) })),
    deleteNews: (id) =>
      setData((s) => ({ ...s, news: s.news.filter((x) => x.id !== id) })),
    publishArticle: (id) =>
      setData((s) => ({ ...s, articles: s.articles.map((x) => (x.id === id ? { ...x, status: "published" } : x)) })),
    publishNews: (id) =>
      setData((s) => ({ ...s, news: s.news.map((x) => (x.id === id ? { ...x, status: "published" } : x)) })),
    addFaq: (f) =>
      setData((s) => ({ ...s, faqs: [...s.faqs, { ...f, id: genId("faq") }] })),
    updateFaq: (id, f) =>
      setData((s) => ({ ...s, faqs: s.faqs.map((x) => (x.id === id ? { ...f, id } : x)) })),
    deleteFaq: (id) =>
      setData((s) => ({ ...s, faqs: s.faqs.filter((x) => x.id !== id) })),
    updateKecamatan: (name, patch) =>
      setData((s) => ({ ...s, kecamatan: s.kecamatan.map((k) => (k.name === name ? { ...k, ...patch } : k)) })),
    addPartner: (p) =>
      setData((s) => ({ ...s, partners: [{ ...p, id: genId("partner") }, ...s.partners] })),
    updatePartner: (id, p) =>
      setData((s) => ({ ...s, partners: s.partners.map((x) => (x.id === id ? { ...p, id } : x)) })),
    deletePartner: (id) =>
      setData((s) => ({ ...s, partners: s.partners.filter((x) => x.id !== id) })),
    reset: () => setData(seed()),
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent harus dipakai di dalam <ContentProvider>");
  return ctx;
}
