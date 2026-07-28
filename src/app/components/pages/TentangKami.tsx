import { Link } from "react-router";
import { Target, Eye, Heart, Users, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { PageHero, SectionHeading, Eyebrow } from "../ui-kit/Shared";
import { markUrl, Wordmark } from "../layout/Logo";
import { BRAND, logoPhilosophy, coreValues, partners, organization } from "../../data/content";

const avatarTone: Record<string, string> = {
  blue: "bg-brand-blue",
  teal: "bg-brand-teal",
  coral: "bg-brand-coral",
  maize: "bg-brand-maize text-brand-blue-deep",
};

const philColor: Record<string, { dot: string; ring: string; text: string }> = {
  teal: { dot: "bg-brand-teal", ring: "ring-brand-teal/30", text: "text-brand-teal" },
  coral: { dot: "bg-brand-coral", ring: "ring-brand-coral/30", text: "text-brand-coral" },
  maize: { dot: "bg-brand-maize", ring: "ring-brand-maize/50", text: "text-[#b9880a]" },
  red: { dot: "bg-brand-red", ring: "ring-brand-red/30", text: "text-brand-red" },
};

const valueIcons = [Sparkles, Heart, Users, ShieldCheck];

export function TentangKami() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Ruang Inklusif untuk Semua"
        subtitle="INCLUSA hadir sebagai sistem informasi terpadu HIV/AIDS Sidoarjo — menyatukan masyarakat, pemerintah, dan fasilitas kesehatan dalam satu ekosistem yang hangat, aman, dan bebas stigma."
      />

      {/* executive summary */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Eyebrow>Ringkasan Eksekutif</Eyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <p className="text-[1.05rem] leading-relaxed text-brand-blue-deep/85">
              INCLUSA merupakan platform digital berbasis yayasan yang berfungsi sebagai pusat
              kolaborasi antara masyarakat, tenaga kesehatan, institusi pendidikan, pemerintah daerah,
              serta berbagai stakeholder dalam mendukung pencegahan, edukasi, pelayanan, monitoring,
              dan pengembangan pengetahuan mengenai HIV/AIDS di Kabupaten Sidoarjo. Platform ini tidak
              hanya berfungsi sebagai website informasi, tetapi juga sebagai <em>digital ecosystem</em>
              {" "}yang menghubungkan data, edukasi, pelayanan kesehatan, penelitian, dan kolaborasi
              lintas institusi.
            </p>
            <div className="rounded-2xl bg-brand-cream p-6 ring-1 ring-border">
              <h3 className="font-display font-bold text-brand-blue-deep">Fungsi Utama</h3>
              <ul className="mt-3 space-y-2 text-sm text-brand-blue-deep/80">
                {["Pusat informasi HIV/AIDS tepercaya", "Media edukasi masyarakat", "Pintu masuk layanan kesehatan digital", "Dashboard monitoring berbasis data", "Media kolaborasi antar stakeholder"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* intro + logo */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Siapa Kami</Eyebrow>
            <h2 className="mt-3 font-display text-[1.8rem] font-bold leading-tight text-brand-blue-deep">
              Lebih dari sekadar informasi — sebuah gerakan kepedulian
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Nama <Wordmark className="text-base" /> berasal dari kata <em>Inclusive Space</em> — ruang inklusif tempat
              setiap orang berhak belajar, tumbuh, dan mendapatkan dukungan tanpa rasa takut dihakimi.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Kami percaya bahwa penanggulangan HIV/AIDS bukan hanya soal data dan pengobatan, tetapi juga tentang
              empati, kebersamaan, dan penerimaan. Melalui kolaborasi lintas sektor, INCLUSA menjadi jembatan
              informasi, edukasi, dan layanan bagi masyarakat Sidoarjo.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {partners.map((p) => (
                <span key={p} className="rounded-full bg-brand-cream px-3.5 py-1.5 text-sm font-medium text-brand-blue-deep">{p}</span>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-[2rem] bg-brand-cream p-10 ring-1 ring-border">
              <img src={markUrl} alt="Logo INCLUSA" className="mx-auto h-52 w-52 object-contain" />
              <div className="mt-4 text-center">
                <Wordmark className="text-3xl" />
                <p className="mt-2 text-sm text-muted-foreground">{BRAND.meaning}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* logo philosophy */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Filosofi Logo"
            title="Makna di Balik Setiap Elemen"
            subtitle="Setiap bagian dari logo INCLUSA memiliki arti yang menggambarkan nilai dan semangat kami."
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[360px_1fr]">
            <div className="flex justify-center">
              <img src={markUrl} alt="Logo INCLUSA" className="h-64 w-64 object-contain drop-shadow-sm" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {logoPhilosophy.map((p) => {
                const c = philColor[p.color] ?? philColor.teal;
                return (
                  <div key={p.id} className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ${c.ring}`}>
                    <div className="flex items-center gap-3">
                      <span className={`h-4 w-4 rounded-full ${c.dot}`} />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{p.part}</p>
                        <h3 className={`font-display font-bold ${c.text}`}>{p.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-brand-blue-deep/80">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* vision mission */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-brand-blue p-8 text-white sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Eye className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">Visi</h3>
            <p className="mt-3 leading-relaxed text-white/85">
              Mewujudkan Sidoarjo yang inklusif dan bebas stigma HIV/AIDS, di mana setiap individu memperoleh akses
              informasi, edukasi, dan layanan kesehatan yang setara.
            </p>
          </div>
          <div className="rounded-3xl bg-brand-blue-deep p-8 text-white sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">Misi</h3>
            <ul className="mt-3 space-y-2 leading-relaxed text-white/85">
              <li>• Menyediakan informasi HIV/AIDS yang akurat dan tepercaya.</li>
              <li>• Memperkuat kolaborasi lintas sektor dan fasilitas kesehatan.</li>
              <li>• Menghadirkan edukasi kesehatan reproduksi sesuai jenjang usia.</li>
              <li>• Mendorong layanan yang ramah, rahasia, dan tanpa diskriminasi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="bg-brand-cream-deep py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Nilai Kami" title="Prinsip yang Kami Pegang" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-brand-blue-deep">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* organization */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Struktur Organisasi"
          title="Tim di Balik INCLUSA"
          subtitle="Gerakan kolaboratif yang digerakkan oleh tenaga kesehatan, pendidik, pengelola data, dan relawan komunitas."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organization.map((m) => (
            <div key={m.id} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display font-bold text-white ${avatarTone[m.tone] ?? "bg-brand-blue"}`}>
                {m.initials}
              </span>
              <div>
                <h3 className="font-display font-bold text-brand-blue-deep">{m.name}</h3>
                <p className="text-sm font-semibold text-brand-blue">{m.role}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark px-8 py-12 text-center text-white sm:flex-row sm:text-left sm:px-12">
          <div>
            <h2 className="font-display text-2xl font-bold">Mari bergerak bersama INCLUSA</h2>
            <p className="mt-2 text-white/85">Jadilah bagian dari gerakan kepedulian untuk Sidoarjo yang lebih inklusif.</p>
          </div>
          <Link to="/e-pelayanan" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-maize px-6 py-3 font-semibold text-brand-blue-deep">
            Mulai Sekarang <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
