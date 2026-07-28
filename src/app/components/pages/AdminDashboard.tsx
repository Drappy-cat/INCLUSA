import { useState } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard, CheckSquare, Users, FileText, Newspaper, HelpCircle,
  Map as MapIcon, BarChart3, Bell, Settings, ShieldCheck, Clock, Check, X,
  LayoutTemplate, KeyRound, ScrollText, LogOut, Home, ChevronRight, Handshake,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";
import { trendData } from "../../data/content";
import { useContent } from "../../data/ContentStore";
import { useAuth } from "../../data/AuthStore";
import { ContentManager } from "../admin/ContentManager";
import { FaqManager } from "../admin/FaqManager";
import { GisDataManager } from "../admin/GisDataManager";
import { UsersManager } from "../admin/UsersManager";
import { PartnerManager } from "../admin/PartnerManager";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Handshake, label: "Mitra Kolaborasi" },
  { icon: CheckSquare, label: "Approval" },
  { icon: Newspaper, label: "Berita" },
  { icon: FileText, label: "Artikel" },
  { icon: HelpCircle, label: "FAQ" },
  { icon: MapIcon, label: "GIS Data" },
  { icon: BarChart3, label: "Statistik" },
  { icon: Users, label: "Users" },
  { icon: KeyRound, label: "Roles" },
  { icon: LayoutTemplate, label: "Content" },
  { icon: Bell, label: "Notifikasi" },
  { icon: ScrollText, label: "Audit Log" },
  { icon: Settings, label: "Settings" },
];

// -------- Approval Center: membaca draft dari store --------
function ApprovalCenter({ compact }: { compact?: boolean }) {
  const { articles, news, publishArticle, publishNews, deleteArticle, deleteNews } = useContent();
  const drafts = [
    ...articles.filter((a) => a.status === "draft").map((a) => ({ id: a.id, title: a.title, type: "Artikel" as const })),
    ...news.filter((n) => n.status === "draft").map((n) => ({ id: n.id, title: n.title, type: "Berita" as const })),
  ];

  const approve = (id: string, type: string) => (type === "Artikel" ? publishArticle(id) : publishNews(id));
  const reject = (id: string, type: string) => (type === "Artikel" ? deleteArticle(id) : deleteNews(id));

  const list = compact ? drafts.slice(0, 4) : drafts;

  return (
    <div className={compact ? "" : "rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800"}>
      {!compact && (
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-coral" />
          <h3 className="font-display font-bold text-brand-blue-deep dark:text-white">Konten Menunggu Persetujuan</h3>
        </div>
      )}
      {list.length === 0 ? (
        <p className="rounded-xl bg-brand-cream p-4 text-sm text-muted-foreground dark:bg-slate-900 dark:text-slate-300">
          Tidak ada konten yang menunggu persetujuan. 🎉
        </p>
      ) : (
        <div className="space-y-3">
          {list.map((p) => (
            <div key={p.id} className="rounded-xl bg-brand-cream p-3 dark:bg-slate-800">
              <p className="line-clamp-1 text-sm font-semibold text-brand-blue-deep dark:text-white">{p.title}</p>
              <p className="text-xs text-muted-foreground dark:text-slate-400">{p.type} · draft</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => approve(p.id, p.type)} className="flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
                  <Check className="h-3 w-3" /> Terbitkan
                </button>
                <button onClick={() => reject(p.id, p.type)} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1 text-xs font-semibold text-brand-blue-deep dark:text-white dark:border-slate-700">
                  <X className="h-3 w-3" /> Tolak
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const { articles, news } = useContent();
  const [activeNav, setActiveNav] = useState("Dashboard");

  const draftCount =
    articles.filter((a) => a.status === "draft").length + news.filter((n) => n.status === "draft").length;

  const kpis = [
    { label: "Total Pengguna", value: "1.284", delta: "+12%", tone: "text-brand-blue dark:text-brand-teal" },
    { label: "Menunggu Approval", value: String(draftCount), delta: draftCount ? "perlu tindakan" : "bersih", tone: "text-brand-coral" },
    { label: "Artikel Terbit", value: String(articles.filter((a) => a.status !== "draft").length), delta: `${news.length} berita`, tone: "text-[#17787d] dark:text-brand-teal" },
    { label: "Kunjungan Bulan Ini", value: "42.9K", delta: "+8%", tone: "text-brand-red" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-[#070d18] transition-colors duration-200">
      {/* Top Header Bar for Admin */}
      <div className="border-b border-border bg-white py-3 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-cream px-4 py-2 text-xs font-semibold text-brand-blue-deep shadow-sm transition-all hover:bg-brand-blue hover:text-white dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-brand-teal dark:hover:text-slate-950"
            >
              <Home className="h-4 w-4 text-brand-blue dark:text-brand-teal group-hover:text-white" />
              <span>Kembali ke Website Utama</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground dark:text-slate-300 sm:inline-block">
              {user?.name} (<span className="font-semibold text-brand-blue dark:text-brand-teal">{user?.role}</span>)
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-red transition-all hover:bg-brand-red/10 dark:bg-slate-800 dark:border-slate-700"
            >
              <LogOut className="h-3.5 w-3.5" /> Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile Nav Tabs (Horizontal Scroll) */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {nav.map((n) => (
              <button
                key={n.label}
                onClick={() => setActiveNav(n.label)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  n.label === activeNav
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-white text-brand-blue-deep/70 border border-border dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                }`}
              >
                <n.icon className="h-3.5 w-3.5" /> {n.label}
                {n.label === "Approval" && draftCount > 0 && (
                  <span className="rounded-full bg-brand-coral px-1.5 text-[0.6rem] font-bold text-white">{draftCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-6 rounded-2xl border border-border bg-white p-3 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
            {/* user card */}
            <div className="flex items-center gap-2 rounded-lg bg-brand-cream px-3 py-2 dark:bg-slate-800/80 border border-transparent dark:border-slate-700/50">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-bold text-white shadow-sm">
                {user?.name.charAt(0) ?? "A"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-sm font-bold text-brand-blue-deep dark:text-white">{user?.name}</span>
                <span className="block truncate text-[0.65rem] text-muted-foreground dark:text-slate-300">{user?.role}</span>
              </span>
            </div>
            <nav className="mt-3 space-y-1">
              {nav.map((n) => (
                <button
                  key={n.label}
                  onClick={() => setActiveNav(n.label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    n.label === activeNav
                      ? "bg-brand-blue text-white shadow-sm font-semibold"
                      : "text-brand-blue-deep/70 hover:bg-accent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <n.icon className="h-4 w-4 shrink-0" /> {n.label}
                  {n.label === "Approval" && draftCount > 0 && (
                    <span className="ml-auto rounded-full bg-brand-coral px-1.5 text-[0.65rem] font-bold text-white">{draftCount}</span>
                  )}
                </button>
              ))}
            </nav>
            <button
              onClick={logout}
              className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-brand-red transition-colors hover:bg-brand-red/10 dark:hover:bg-red-950/40"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-blue-deep dark:text-white">{activeNav}</h1>
              <p className="text-sm text-muted-foreground dark:text-slate-300">
                Masuk sebagai <span className="font-semibold text-brand-blue dark:text-brand-teal">{user?.role}</span> · Yayasan INCLUSA.
              </p>
            </div>
          </div>

          {/* module views */}
          {activeNav === "Mitra Kolaborasi" && <div className="mt-6"><PartnerManager /></div>}
          {activeNav === "Berita" && <div className="mt-6"><ContentManager kind="news" /></div>}
          {activeNav === "Artikel" && <div className="mt-6"><ContentManager kind="article" /></div>}
          {activeNav === "FAQ" && <div className="mt-6"><FaqManager /></div>}
          {activeNav === "GIS Data" && <div className="mt-6"><GisDataManager /></div>}
          {activeNav === "Users" && <div className="mt-6"><UsersManager mode="users" /></div>}
          {activeNav === "Roles" && <div className="mt-6"><UsersManager mode="roles" /></div>}
          {activeNav === "Approval" && <div className="mt-6"><ApprovalCenter /></div>}

          {["Statistik", "Content", "Notifikasi", "Audit Log", "Settings"].includes(activeNav) && (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-white p-12 text-center dark:bg-slate-900 dark:border-slate-800">
              <p className="font-display text-lg font-bold text-brand-blue-deep dark:text-white">Modul {activeNav}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Pondasi modul ini sudah tersedia. Fungsionalitas detail dapat dikembangkan lebih lanjut.
              </p>
            </div>
          )}

          {/* dashboard overview */}
          {activeNav === "Dashboard" && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {kpis.map((k) => (
                  <div key={k.label} className="rounded-2xl border border-border bg-white p-5 dark:bg-slate-900 dark:border-slate-800">
                    <p className="text-xs text-muted-foreground dark:text-slate-400">{k.label}</p>
                    <p className={`mt-2 font-display text-2xl font-extrabold ${k.tone}`}>{k.value}</p>
                    <p className="mt-1 text-xs font-medium text-[#17787d] dark:text-brand-teal">{k.delta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                {/* chart */}
                <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
                  <h3 className="font-display font-bold text-brand-blue-deep dark:text-white">Tren Kunjungan & Layanan</h3>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="adm" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1f9aa0" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#1f9aa0" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f4" />
                        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#5a7480" }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="kasus" name="Kunjungan" stroke="#1f9aa0" strokeWidth={2} fill="url(#adm)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* approval preview */}
                <div className="rounded-2xl border border-border bg-white p-6 dark:bg-[#0f1c30] dark:border-slate-800">
                  <div className="mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-coral" />
                    <h3 className="font-display font-bold text-brand-blue-deep dark:text-white">Approval Center</h3>
                  </div>
                  <ApprovalCenter compact />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
