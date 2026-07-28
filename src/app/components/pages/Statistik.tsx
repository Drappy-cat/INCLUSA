import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Activity, Syringe } from "lucide-react";
import { PageHero, SectionHeading, StatCard } from "../ui-kit/Shared";
import {
  quickStats,
  trendData,
  populationData,
  genderData,
  ageData,
  riskGroupData,
} from "../../data/content";
import { useContent } from "../../data/ContentStore";

const PIE_COLORS = ["#1f9aa0", "#f0654e", "#f7c948"];
const GENDER_COLORS = ["#1f9aa0", "#f0654e", "#f7c948"];
const quickIcons = [TrendingUp, Users, Activity, Syringe];

const realtimeStats = [
  { label: "Kasus Kumulatif", value: 3482, suffix: "" },
  { label: "ODHIV Aktif ARV", value: 2117, suffix: "" },
  { label: "Tes VCT (2026)", value: 18320, suffix: "" },
  { label: "Cakupan ARV", value: 72, suffix: "%" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <h3 className="font-display text-lg font-bold text-brand-blue-deep">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-6 h-72">{children}</div>
    </div>
  );
}

export function Statistik() {
  const { kecamatan: kecamatanData } = useContent();
  return (
    <>
      <PageHero
        eyebrow="Dashboard Monitoring"
        title="Statistik HIV/AIDS Sidoarjo"
        subtitle="Data sebaran kasus, cakupan pengobatan, dan tren tahunan yang diperbarui secara berkala oleh Dinas Kesehatan Kabupaten Sidoarjo."
      />

      {/* realtime counters */}
      <section className="bg-brand-blue-deep py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-maize" />
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-maize">Data Realtime</span>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {realtimeStats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[2.4rem] font-extrabold leading-none text-brand-maize">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {quickStats.map((s, i) => {
            const Icon = quickIcons[i];
            return <StatCard key={s.label} item={s} icon={<Icon className="h-5 w-5" />} />;
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Tren Kasus & Cakupan ARV" subtitle="Perkembangan 2020–2026">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="gKasus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f9aa0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#1f9aa0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gArv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f0654e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f0654e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f4" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#5a7480" }} />
                <YAxis tick={{ fontSize: 12, fill: "#5a7480" }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="kasus" name="Kasus Baru" stroke="#1f9aa0" strokeWidth={2} fill="url(#gKasus)" />
                <Area type="monotone" dataKey="arv" name="Mulai ARV" stroke="#f0654e" strokeWidth={2} fill="url(#gArv)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Distribusi Populasi Kunci" subtitle="Berdasarkan kelompok">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={populationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
                  {populationData.map((entry, i) => (
                    <Cell key={`pop-${entry.name}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="mt-6">
          <ChartCard title="Sebaran Kasus per Kecamatan" subtitle="12 kecamatan dengan kasus tertinggi">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kecamatanData} margin={{ top: 10, right: 10, left: -15, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f4" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#5a7480" }} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 12, fill: "#5a7480" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" name="Total Kasus" fill="#1f9aa0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="arv" name="Dalam ARV" fill="#34bec4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="mt-6">
          <SectionHeading
            eyebrow="Profil Kasus"
            title="Berdasarkan Jenis Kelamin, Usia & Kelompok Risiko"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <ChartCard title="Jenis Kelamin" subtitle="Proporsi ODHIV">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} paddingAngle={3}>
                  {genderData.map((entry, i) => (
                    <Cell key={`gender-${entry.name}`} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Kelompok Usia" subtitle="Sebaran per rentang umur">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f4" vertical={false} />
                <XAxis dataKey="group" tick={{ fontSize: 11, fill: "#5a7480" }} />
                <YAxis tick={{ fontSize: 12, fill: "#5a7480" }} />
                <Tooltip />
                <Bar dataKey="value" name="Kasus" fill="#f7c948" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Kelompok Risiko" subtitle="Faktor risiko utama">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskGroupData} layout="vertical" margin={{ top: 5, right: 15, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f4" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#5a7480" }} />
                <YAxis type="category" dataKey="group" tick={{ fontSize: 10, fill: "#5a7480" }} width={90} />
                <Tooltip />
                <Bar dataKey="value" name="Kasus" fill="#f0654e" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          * Data merupakan simulasi prototipe untuk keperluan demonstrasi. Sumber resmi: Dinas Kesehatan Kabupaten Sidoarjo.
        </p>
      </section>
    </>
  );
}
