import { Link } from "react-router";
import {
  ShieldCheck,
  Stethoscope,
  GraduationCap,
  MapPin,
  ArrowRight,
  Activity,
  Users,
  Building2,
  HeartHandshake,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SectionHeading, StatCard, Eyebrow, Chip } from "../ui-kit/Shared";
import {
  heroStats,
  curriculum,
  testimonials,
  collabStats,
  infoTopics,
  partners,
} from "../../data/content";
import { useContent, isPublished } from "../../data/ContentStore";

const modules = [
  {
    icon: ShieldCheck,
    title: "Pusat Informasi",
    desc: "Informasi tepercaya seputar HIV/AIDS, pencegahan, dan penularan untuk masyarakat.",
    to: "/informasi",
    color: "bg-brand-blue",
    status: "Aktif",
  },
  {
    icon: Stethoscope,
    title: "e-Pelayanan",
    desc: "Skrining risiko mandiri, konseling, dan rujukan ke fasilitas kesehatan terdekat.",
    to: "/e-pelayanan",
    color: "bg-brand-coral",
    status: "Prototype",
  },
  {
    icon: GraduationCap,
    title: "Education Center",
    desc: "Marketplace edukasi digital untuk guru, sekolah, orang tua, dan komunitas.",
    to: "/edukasi",
    color: "bg-[#17787d]",
    status: "Coming Soon",
  },
  {
    icon: MapPin,
    title: "Peta & Statistik",
    desc: "Dashboard monitoring, peta GIS sebaran kasus, dan pencarian fasilitas kesehatan.",
    to: "/peta",
    color: "bg-brand-red",
    status: "Aktif",
  },
];

const collabIcons = [Activity, Users, Building2, HeartHandshake];

export function Home() {
  const { articles: allArticles, news: allNews, kecamatan: kecamatanData } = useContent();
  const articles = allArticles.filter(isPublished);
  const news = allNews.filter(isPublished);
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-brand-blue-deep">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1600&q=80"
            alt="Petugas kesehatan memberikan edukasi"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep via-brand-blue-deep/95 to-brand-blue-deep/70" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-maize">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-maize" /> Sistem Informasi Terpadu · Sidoarjo
            </span>
            <h1 className="mt-5 font-display text-[2.2rem] font-extrabold leading-[1.1] sm:text-[3rem]">
              Bersama Lawan HIV/AIDS,{" "}
              <span className="text-brand-maize">Hapus Stigma</span> di Sidoarjo
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/80">
              Platform kolaborasi masyarakat, Dinas Kesehatan, Dinas Pendidikan, dan fasilitas
              kesehatan sebagai pusat informasi, edukasi, dan layanan HIV/AIDS yang ramah dan tepercaya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/e-pelayanan"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Cek Risiko & Tes HIV <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/informasi"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
              >
                Pelajari HIV/AIDS
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              {["Rahasia & Gratis", "Ramah & Tanpa Menghakimi", "Terverifikasi Dinkes"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-maize" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-center">
            {heroStats.map((s, i) => (
              <StatCard key={s.label} item={s} icon={<>{[<Activity key="a" className="h-5 w-5" />, <HeartHandshake key="b" className="h-5 w-5" />, <Stethoscope key="c" className="h-5 w-5" />, <GraduationCap key="d" className="h-5 w-5" />][i]}</>} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODULES ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Ekosistem Platform"
          title="Empat Pilar Layanan Terpadu"
          subtitle="Satu platform yang menghubungkan informasi publik, layanan kesehatan, edukasi, dan data monitoring dalam satu ekosistem kolaboratif."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <Link
              key={m.title}
              to={m.to}
              className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.color} text-white`}>
                  <m.icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-blue">
                  {m.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-blue-deep">{m.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                Selengkapnya <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== INFO TOPICS ===== */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kenali Lebih Dekat"
            title="Informasi Dasar yang Wajib Kamu Tahu"
            subtitle="Pahami fakta seputar HIV dan AIDS agar terhindar dari mitos dan stigma yang keliru."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {infoTopics.slice(0, 3).map((topic) => (
              <div key={topic.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-brand-blue">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.summary}</p>
                <ul className="mt-4 space-y-2">
                  {topic.points.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-brand-blue-deep/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/informasi" className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:underline">
              Lihat semua topik informasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CURRICULUM (Education preview) ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Education Center · Coming Soon</Eyebrow>
            <h2 className="mt-3 font-display text-[1.8rem] font-bold leading-tight text-brand-blue-deep">
              Kurikulum edukasi kesehatan reproduksi sesuai jenjang usia
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              Serangkaian modul yang membantu keluarga, guru, dan komunitas menerapkan pendidikan
              kesehatan yang tepat, aman, dan sesuai nilai — langkah awal mencegah penularan sejak dini.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Relationship", "Kesehatan Reproduksi", "Hak & Perlindungan", "Nilai & Budaya"].map((t) => (
                <span key={t} className="rounded-full border border-brand-blue/20 px-3.5 py-1.5 text-sm text-brand-blue">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {curriculum.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className={`rounded-xl p-4 transition-colors ${
                  c.active ? "bg-brand-coral text-white" : "bg-brand-blue-deep text-white/90"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-semibold text-white">{c.title}</h4>
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">{c.level}</span>
                </div>
                {c.active && <p className="mt-2 text-sm text-white/90">{c.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLLAB STATS ===== */}
      <section className="bg-brand-cream-deep py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Dampak Kolaborasi" title="Bergerak Bersama untuk Sidoarjo" />
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {collabStats.map((s, i) => {
              const Icon = collabIcons[i];
              return <StatCard key={s.label} item={s} icon={<Icon className="h-5 w-5" />} />;
            })}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE GIS PREVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Peta GIS Interaktif</Eyebrow>
            <h2 className="mt-3 font-display text-[1.8rem] font-bold leading-tight text-brand-blue-deep">
              Pantau sebaran kasus HIV per kecamatan
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              Visualisasi heatmap membantu memetakan wilayah prioritas intervensi. Warna yang lebih
              pekat menandakan jumlah kasus terlaporkan yang lebih tinggi.
            </p>
            <Link
              to="/peta"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Buka Peta Lengkap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-2">
              {kecamatanData.slice(0, 9).map((k) => {
                const max = Math.max(...kecamatanData.map((d) => d.cases));
                const intensity = 0.2 + (k.cases / max) * 0.8;
                return (
                  <Link
                    key={k.name}
                    to="/peta"
                    className="group rounded-lg p-3 text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: `rgba(31, 154, 160, ${intensity})` }}
                  >
                    <p className="text-xs font-semibold leading-tight">{k.name}</p>
                    <p className="mt-1 font-display text-lg font-bold">{k.cases}</p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Rendah</span>
              <div className="mx-3 h-2 flex-1 rounded-full bg-gradient-to-r from-brand-teal/30 to-brand-blue" />
              <span>Tinggi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Wawasan Terbaru" title="Artikel & Edukasi" />
          <Link to="/artikel" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-blue hover:underline sm:inline-flex">
            Semua artikel <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <article key={a.id} className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg">
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-coral">{a.category}</span>
                <h3 className="mt-2 font-display text-base font-bold leading-snug text-brand-blue-deep">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{a.date} · {a.readTime}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-brand-blue-deep py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Suara Peserta" title={<span className="text-white">Apa Kata Mereka</span>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <Quote className="h-8 w-8 text-brand-maize" />
                <p className="mt-3 text-sm leading-relaxed text-white/85">{t.text}</p>
                <div className="mt-5">
                  <p className="font-display font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role} · {t.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST NEWS ===== */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Kabar Terkini" title="Berita & Kegiatan" />
            <Link to="/berita" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-blue hover:underline sm:inline-flex">
              Semua berita <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {news.slice(0, 4).map((n) => (
              <Link key={n.id} to="/berita" className="group flex flex-col rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
                <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-blue">{n.tag}</span>
                <h3 className="mt-3 font-display text-base font-bold leading-snug text-brand-blue-deep">{n.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{n.date} · {n.source}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLLABORATION PARTNERS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading center eyebrow="Mitra Kolaborasi" title="Bergerak Bersama Para Pemangku Kepentingan" />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue-deep shadow-sm"
            >
              <Building2 className="h-4 w-4 text-brand-blue" /> {p}
            </span>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark px-8 py-14 text-center text-white sm:px-14">
          <h2 className="mx-auto max-w-2xl font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
            Kenali statusmu. Satu langkah kecil untuk hidup yang lebih sehat.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Tes HIV bersifat sukarela, rahasia, dan gratis di seluruh Puskesmas Sidoarjo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/faskes" className="rounded-full bg-brand-maize px-6 py-3 font-semibold text-brand-blue-deep transition-transform hover:-translate-y-0.5">
              Cari Fasilitas Terdekat
            </Link>
            <Link to="/e-pelayanan" className="rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20">
              Skrining Mandiri
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
