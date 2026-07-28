import { Link } from "react-router";
import {
  GraduationCap,
  BookOpen,
  Users,
  Stethoscope,
  Building2,
  Monitor,
  MessageCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { PageHero, SectionHeading } from "../ui-kit/Shared";

const WHATSAPP_NUMBER = "6281100001234"; // TODO: Ganti dengan nomor WhatsApp resmi INCLUSA
const WHATSAPP_MESSAGE = encodeURIComponent("Halo INCLUSA Academy, saya tertarik untuk mendaftar pelatihan. Mohon informasi lebih lanjut.");

const programs = [
  /* 
  // Dinonaktifkan sementara sesuai instruksi pengguna:
  {
    icon: GraduationCap,
    title: "Teacher Training",
    desc: "Pelatihan untuk guru dalam menerapkan pendidikan inklusif, kesehatan reproduksi, dan pencegahan kekerasan di lingkungan sekolah.",
    audience: "Guru SD, SMP, SMA",
    duration: "3–5 Hari",
    status: "Segera Hadir",
  },
  {
    icon: Stethoscope,
    title: "Health Worker Training",
    desc: "Program peningkatan kapasitas tenaga kesehatan dalam layanan inklusif, penanganan kasus kekerasan, dan pendekatan berbasis bukti.",
    audience: "Nakes, Bidan, Perawat",
    duration: "2–4 Hari",
    status: "Segera Hadir",
  },
  {
    icon: Users,
    title: "Community Facilitator",
    desc: "Membekali fasilitator komunitas dengan keterampilan advokasi, pendampingan, dan pemberdayaan masyarakat untuk isu inklusi sosial.",
    audience: "Relawan, Fasilitator",
    duration: "3 Hari",
    status: "Segera Hadir",
  },
  {
    icon: Building2,
    title: "Executive Training",
    desc: "Program khusus untuk pemimpin organisasi dan pengambil kebijakan dalam merancang program pembangunan inklusif berbasis data.",
    audience: "Pimpinan, Manajer, Pejabat",
    duration: "1–2 Hari",
    status: "Segera Hadir",
  },
  */
  {
    icon: Monitor,
    title: "Digital Course",
    desc: "Modul pembelajaran online yang dapat diakses kapan saja — mencakup materi inklusi sosial, hak anak, dan kesetaraan gender.",
    audience: "Umum",
    duration: "Self-paced",
    status: "Coming Soon",
  },
];

function WhatsAppButton({ text = "Daftar via WhatsApp", className = "" }: { text?: string; className?: string }) {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-lg ${className}`}
    >
      <MessageCircle className="h-5 w-5" /> {text}
    </a>
  );
}

export function EducationCenter() {
  return (
    <>
      <PageHero
        eyebrow="INCLUSA Academy"
        title="Professional Training & Capacity Building"
        subtitle="Program pelatihan intensif untuk tenaga kesehatan, pendidik, fasilitator komunitas, dan pemimpin organisasi di seluruh Indonesia."
      />

      {/* Dashboard-style overview */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Stats overview cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Program Pelatihan", value: "5", sub: "Kategori tersedia", color: "bg-brand-blue" },
            { label: "Total Peserta", value: "—", sub: "Menunggu data", color: "bg-brand-teal" },
            { label: "Mitra Pelatihan", value: "—", sub: "Menunggu data", color: "bg-brand-coral" },
            { label: "Sertifikat Terbit", value: "—", sub: "Menunggu data", color: "bg-brand-maize" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-brand-blue-deep">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground italic">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* About Academy */}
        <div className="mt-14 rounded-3xl bg-brand-cream p-8 sm:p-10">
          <SectionHeading
            eyebrow="Tentang INCLUSA Academy"
            title="Apa Itu INCLUSA Academy?"
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-brand-blue-deep">INCLUSA Academy</strong> adalah unit pelatihan profesional
                di bawah INCLUSA Institute yang berfokus pada peningkatan kapasitas sumber daya manusia dalam
                bidang pembangunan inklusif.
              </p>
              <p>
                Kami menyediakan program pelatihan berbasis bukti untuk tenaga kesehatan, pendidik, fasilitator
                komunitas, dan pemimpin organisasi. Setiap program dirancang oleh tim ahli dan akademisi yang
                berpengalaman di bidangnya.
              </p>
              <p>
                Semua pelatihan bersifat <strong className="text-brand-blue-deep">praktis dan langsung dapat
                diterapkan</strong> di lapangan — bukan sekadar teori.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Kurikulum berbasis riset & evidence-based",
                "Narasumber ahli dari akademisi & praktisi",
                "Pendekatan partisipatif & interaktif",
                "Sertifikat resmi INCLUSA Institute",
                "Jaringan alumni & komunitas praktisi",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="text-sm font-medium text-brand-blue-deep">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="mt-14">
          <SectionHeading
            eyebrow="Program Pelatihan"
            title="Pilih Program yang Sesuai"
            subtitle="Setiap program dirancang khusus untuk target peserta yang berbeda. Klik tombol WhatsApp untuk mendaftar."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((prog) => (
              <div
                key={prog.title}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <prog.icon className="h-6 w-6" />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${
                      prog.status === "Coming Soon"
                        ? "bg-brand-maize/20 text-brand-maize"
                        : "bg-brand-teal/15 text-brand-teal"
                    }`}
                  >
                    {prog.status}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-brand-blue-deep">
                  {prog.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {prog.desc}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {prog.audience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {prog.duration}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya tertarik dengan program ${prog.title}. Mohon informasi lebih lanjut.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="h-4 w-4" /> Daftar via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-14 grid gap-8 rounded-3xl bg-brand-blue-deep p-8 text-white sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-brand-maize">
              <GraduationCap className="h-4 w-4" /> Mulai Sekarang
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight">
              Siap Meningkatkan Kapasitas Tim Anda?
            </h2>
            <p className="mt-3 text-white/75">
              Hubungi kami melalui WhatsApp untuk informasi jadwal, biaya, dan pendaftaran program pelatihan INCLUSA Academy.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 text-center">
            <MessageCircle className="h-12 w-12 text-[#25D366]" />
            <p className="font-display text-lg font-semibold">Hubungi Kami via WhatsApp</p>
            <p className="text-sm text-white/60">Respon cepat di jam kerja (08.00–17.00 WIB)</p>
            <WhatsAppButton text="Chat WhatsApp Sekarang" />
            <p className="mt-2 text-xs text-white/40">
              Nomor ini juga berlaku untuk kerja sama & kemitraan
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
