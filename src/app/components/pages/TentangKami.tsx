import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  Target, Eye, Users, Network, HeartPulse, Sparkles, ArrowRight,
  BookOpen, Building2, LineChart, FlaskConical,
  Search, PenTool, Code, CheckCircle, Rocket, RefreshCw,
  Handshake, Lightbulb, Leaf, Linkedin, Mail, Stethoscope, Video
} from "lucide-react";
import { SectionHeading, Eyebrow } from "../ui-kit/Shared";
import { ScrollReveal } from "../ui-kit/ScrollReveal";
import { useScrollReveal, useCountUp } from "../../hooks/useAnimations";
import { markUrl } from "../layout/Logo";
import { organization } from "../../data/content";
import founderImg from "../../../assets/founder.jpg";
import slider1 from "../../../assets/about-slider-1.png";
import slider2 from "../../../assets/about-slider-2.png";
import slider3 from "../../../assets/about-slider-3.jpg";
import slider4 from "../../../assets/about-slider-4.png";
import { useLanguage } from "../../data/LanguageContext";

const bgImages = [slider1, slider2, slider3, slider4];

const avatarTone: Record<string, string> = {
  blue: "bg-brand-blue",
  teal: "bg-brand-teal",
  coral: "bg-brand-coral",
  maize: "bg-brand-maize text-brand-blue-deep",
};

/* ─── Count-Up Stats Grid (animated numbers) ─── */
const statsData = [
  { icon: Building2, target: 50, suffix: "+", title: "Mitra Layanan Kesehatan", desc: "Fasilitas kesehatan dan klinik yang terhubung" },
  { icon: Users, target: 10, suffix: "k+", title: "Komunitas Terlayani", desc: "Masyarakat yang telah menerima edukasi" },
  { icon: Video, target: 100, suffix: "+", title: "Media Edukasi", desc: "Artikel, video, dan infografis interaktif" },
  { icon: Network, target: 15, suffix: "+", title: "Kolaborasi Aktif", desc: "Lembaga pemerintah dan NGO" },
];

function CountUpStatsGrid() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  return (
    <>
      {statsData.map((stat, i) => {
        const count = useCountUp(stat.target, isVisible, 2000);
        return (
          <ScrollReveal key={i} staggerIndex={i} distance={20}>
            <div ref={i === 0 ? ref : undefined} className="group rounded-3xl border border-border bg-white p-8 shadow-sm card-hover-lift dark:bg-slate-900 dark:border-slate-800">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-teal">
                <stat.icon className="h-7 w-7 icon-hover-spin" />
              </div>
              <h4 className="font-display text-4xl font-bold text-brand-blue-deep dark:text-white tabular-nums">
                {count}{stat.suffix}
              </h4>
              <h5 className="mt-2 font-display text-sm font-bold text-brand-blue dark:text-brand-teal">{stat.title}</h5>
              <p className="mt-1 text-sm text-muted-foreground dark:text-slate-300">{stat.desc}</p>
            </div>
          </ScrollReveal>
        );
      })}
    </>
  );
}

export function TentangKami() {
  const { t } = useLanguage();
  const supervisor = organization[0];
  const devTeam = organization.slice(1);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. Hero Section (About Us) */}
      <section id="about-us" className="relative overflow-hidden pb-16 pt-24 sm:pt-32 min-h-[500px] lg:min-h-[600px] flex items-center">
        {/* Background Slider */}
        {bgImages.map((img, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === bgIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img src={img} alt="Background" className="h-full w-full object-cover" />
          </div>
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-blue-deep/80 dark:bg-[#0b1329]/80"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-maize">{t("aboutEyebrow")}</span>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("aboutTitle")}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-200">
                {t("aboutSub")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#what-we-do" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-md">
                  {t("heroBtnExplore")}
                </a>
                <Link to="/kontak" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  {t("navHubungiKami")}
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="relative flex h-80 w-80 sm:h-96 sm:w-96 items-center justify-center p-4">
                 <img src={markUrl} alt="INCLUSA Logo" className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section About Us */}
      <section className="bg-white py-20 dark:bg-[#0f1c30]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-blue-deep dark:text-white">Visi & Misi</h2>
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-border bg-brand-cream p-6 dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Eye className="h-6 w-6 text-brand-blue dark:text-brand-teal" />
                      <h3 className="font-display text-lg font-bold text-brand-blue-deep dark:text-white">Visi</h3>
                    </div>
                    <p className="mt-3 text-brand-blue-deep/80 leading-relaxed dark:text-slate-300">
                      Mewujudkan Sidoarjo yang inklusif dan bebas stigma HIV/AIDS, di mana setiap individu memperoleh akses informasi, edukasi, dan layanan kesehatan yang setara.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-brand-cream-deep p-6 dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-brand-coral" />
                      <h3 className="font-display text-lg font-bold text-brand-blue-deep dark:text-white">Misi</h3>
                    </div>
                    <ul className="mt-3 space-y-2 text-brand-blue-deep/80 leading-relaxed dark:text-slate-300">
                      <li>• Menyediakan informasi HIV/AIDS yang akurat dan tepercaya.</li>
                      <li>• Memperkuat kolaborasi lintas sektor dan fasilitas kesehatan.</li>
                      <li>• Menghadirkan edukasi kesehatan reproduksi sesuai jenjang usia.</li>
                      <li>• Mendorong layanan yang ramah, rahasia, dan tanpa diskriminasi.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-blue-deep dark:text-white">Latar Belakang & Tujuan</h2>
                <p className="mt-4 text-brand-blue-deep/80 leading-relaxed dark:text-slate-300">
                  INCLUSA lahir dari kebutuhan akan sebuah ekosistem digital yang tidak hanya memberikan informasi, tetapi juga menghubungkan berbagai pihak dalam penanggulangan HIV/AIDS di Kabupaten Sidoarjo. Kami membangun platform ini untuk memecah batasan informasi, mengurangi stigma, dan memastikan bahwa setiap individu, terlepas dari status kesehatan mereka, mendapatkan dukungan yang mereka butuhkan secara holistik dan berkelanjutan.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-center">
               <CountUpStatsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section What We Do (5 Pilar Utama - 3 Atas, 2 Bawah Center) */}
      <section id="what-we-do" className="bg-brand-cream py-20 scroll-mt-16 dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Apa yang Kami Lakukan" title="5 Pilar Utama INCLUSA" subtitle="Pendekatan holistik dan terpadu dalam mewujudkan pembangunan inklusif bagi anak, perempuan, dan penyandang disabilitas." />
          
          <div className="mt-16 space-y-6">
            {/* Baris 1: 3 Pilar Atas */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: LineChart, color: "text-[#b9880a]", bg: "bg-brand-maize/20", title: "INCLUSA Data Center", desc: "Visualisasi data spasial GIS, kasus, dan statistik terkini untuk mendukung pemantauan dan pengambilan keputusan berbasis bukti." },
                { icon: Handshake, color: "text-brand-coral", bg: "bg-brand-coral/10", title: "INCLUSA Policy Lab", desc: "Riset kebijakan berbasis bukti, penyusunan naskah akademik, dan advokasi peraturan daerah ramah disabilitas & gender." },
                { icon: BookOpen, color: "text-brand-blue", bg: "bg-brand-blue/10", title: "INCLUSA Academy", desc: "Program pelatihan bersertifikat dan modul pengembangan kapasitas untuk nakes, pendidik inklusif, dan fasilitator masyarakat." },
              ].map((feature, i) => (
              <ScrollReveal key={i} staggerIndex={i} distance={24}>
                <div className="group rounded-3xl border border-border bg-white p-8 shadow-sm card-hover-lift hover-glow-border dark:bg-[#0f1c30] dark:border-slate-800">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                    <feature.icon className="h-7 w-7 icon-hover-spin" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-blue-deep dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-brand-blue-deep/70 leading-relaxed dark:text-slate-300">{feature.desc}</p>
                </div>
              </ScrollReveal>
              ))}
            </div>

            {/* Baris 2: 2 Pilar Bawah (Ditengah / Centered) */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: FlaskConical, color: "text-brand-teal", bg: "bg-brand-teal/10", title: "INCLUSA Research & Knowledge Hub", desc: "Pusat publikasi riset, artikel pengetahuan, berita kegiatan, dan inovasi inklusi lintas sektor." },
                { icon: Stethoscope, color: "text-brand-red", bg: "bg-brand-red/10", title: "INCLUSA Consulting", desc: "Layanan advisory pembangunan inklusif, pendampingan program CSR/ESG, dan audit aksesibilitas fasilitas publik." },
              ].map((feature, i) => (
                <ScrollReveal key={i} staggerIndex={i + 3} distance={24} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="group rounded-3xl border border-border bg-white p-8 shadow-sm card-hover-lift hover-glow-border dark:bg-[#0f1c30] dark:border-slate-800">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                    <feature.icon className="h-7 w-7 icon-hover-spin" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-blue-deep dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-brand-blue-deep/70 leading-relaxed dark:text-slate-300">{feature.desc}</p>
                </div>
              </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section Our Team */}
      <section id="our-team" className="bg-white py-20 scroll-mt-16 dark:bg-[#0f1c30]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Tim Kami" title="Meet Our Team" subtitle="Kolaborasi para akademisi dan pengembang muda yang berdedikasi tinggi." />
          
          <div className="mt-16">
            <h3 className="text-center font-display text-2xl font-bold text-brand-blue-deep mb-8 dark:text-white">Founder</h3>
            <div className="flex justify-center">
              <div className="group w-full max-w-[280px] rounded-3xl border border-border bg-white overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                <div className="aspect-[3/4] bg-brand-cream relative overflow-hidden dark:bg-slate-800">
                   <img src={founderImg} alt="Kharizha Krishnandya, S.H., M.H." className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-brand-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-5 pt-6 text-center relative z-20 bg-white dark:bg-slate-900">
                  <h4 className="font-display text-lg font-bold text-brand-blue-deep dark:text-white">Kharizha Krishnandya, S.H., M.H.</h4>
                  <p className="mt-1 text-sm font-medium text-brand-blue dark:text-brand-teal">Founder & Penasihat Ahli</p>
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-3 dark:text-slate-300">Mengarahkan visi dan memastikan keberjalanan program-program inklusi sesuai dengan tujuan strategis organisasi.</p>
                  <div className="mt-5 flex justify-center gap-4">
                    <a href="#" aria-label="LinkedIn" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-blue"><Linkedin className="h-5 w-5" /></a>
                    <a href="#" aria-label="Email" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-blue"><Mail className="h-5 w-5" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-center font-display text-2xl font-bold text-brand-blue-deep mb-8 dark:text-white">Development Team</h3>
            <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {devTeam.map((member, i) => (
                <div key={member.id ?? i} className="group rounded-3xl border border-border bg-white overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                  <div className={`aspect-[3/4] flex items-center justify-center relative overflow-hidden ${avatarTone[member.tone] ?? "bg-brand-blue"}`}>
                     <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                     <div className="relative z-10 text-6xl font-display font-bold text-white transition-transform duration-300 group-hover:scale-110">
                       {member.initials}
                     </div>
                  </div>
                  <div className="p-5 text-center bg-white dark:bg-slate-900">
                    <h4 className="font-display text-lg font-bold text-brand-blue-deep dark:text-white">{member.name}</h4>
                    <p className="mt-1 text-sm font-medium text-brand-coral">{member.role}</p>
                    <p className="mt-3 text-xs text-muted-foreground line-clamp-2 dark:text-slate-300">{member.focus}</p>
                    <div className="mt-5 flex justify-center gap-4">
                      <a href="#" aria-label="LinkedIn" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-blue"><Linkedin className="h-4 w-4" /></a>
                      <a href="#" aria-label="Email" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-blue"><Mail className="h-4 w-4" /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Timeline Pengembangan */}
      <section className="bg-brand-cream-deep py-20 overflow-hidden dark:bg-[#0b1329]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Perjalanan Kami" title="Timeline Pengembangan" subtitle="Tahapan dari ide hingga menjadi platform inklusif terpadu." />
          <div className="mt-20">
            <div className="relative">
              {/* horizontal line for desktop */}
              <div className="hidden md:block absolute top-8 left-10 right-10 h-1 bg-border dark:bg-slate-800" />
              {/* vertical line for mobile */}
              <div className="md:hidden absolute left-8 top-8 bottom-8 w-1 bg-border dark:bg-slate-800" />
              
              <div className="grid gap-10 md:grid-cols-6 md:gap-4 relative z-10">
                {[
                  { icon: Search, title: "Research", desc: "Studi literatur & analisis" },
                  { icon: PenTool, title: "Design", desc: "Perancangan arsitektur" },
                  { icon: Code, title: "Development", desc: "Implementasi fitur platform" },
                  { icon: CheckCircle, title: "Testing", desc: "Uji coba dan validasi" },
                  { icon: Rocket, title: "Deployment", desc: "Peluncuran rilis awal" },
                  { icon: RefreshCw, title: "Improvement", desc: "Evaluasi dan iterasi" },
                ].map((step, i) => (
                  <div key={i} className="group relative flex md:flex-col items-center md:text-center gap-6 md:gap-4 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                     <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-brand-cream-deep bg-white text-brand-blue shadow-md md:mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-blue/20 dark:bg-slate-900 dark:border-slate-800 dark:text-brand-teal">
                       <step.icon className="h-7 w-7" />
                     </div>
                     <div>
                       <h4 className="font-display font-bold text-brand-blue-deep dark:text-white">{step.title}</h4>
                       <p className="mt-1 text-xs text-muted-foreground dark:text-slate-300">{step.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Values */}
      <section className="bg-white py-20 dark:bg-[#0f1c30]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Nilai Utama" title="Prinsip INCLUSA" subtitle="Landasan kami dalam berkarya dan melayani masyarakat." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, title: "Inclusion", desc: "Merangkul semua kalangan tanpa mendiskriminasi siapapun." },
              { icon: Handshake, title: "Collaboration", desc: "Bekerja sama erat untuk dampak yang lebih besar dan nyata." },
              { icon: Lightbulb, title: "Innovation", desc: "Terus berinovasi dengan solusi digital terdepan masa kini." },
              { icon: Leaf, title: "Sustainability", desc: "Membangun ekosistem yang mandiri dan berkelanjutan secara terus menerus." },
            ].map((v, i) => (
              <div key={i} className="group rounded-3xl border border-border bg-brand-cream p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 dark:bg-slate-900 dark:border-slate-800" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-sm transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110 dark:bg-slate-800 dark:text-brand-teal">
                  <v.icon className="h-8 w-8" />
                </span>
                <h3 className="font-display text-xl font-bold text-brand-blue-deep dark:text-white">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-slate-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <section className="bg-brand-cream py-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-blue-deep to-brand-blue px-8 py-16 text-center shadow-2xl sm:px-16 sm:py-20 animate-in fade-in zoom-in-95 duration-1000">
            {/* Background decorations */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl"></div>
            
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                Mari Bangun Ekosistem yang Lebih Inklusif Bersama Kami
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                Kolaborasi adalah kunci utama. Jadilah bagian dari gerakan INCLUSA untuk menciptakan ruang aman, edukatif, dan bebas stigma di Kabupaten Sidoarjo.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/kontak" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-maize px-8 py-3.5 text-base font-bold text-brand-blue-deep transition-all hover:-translate-y-1 hover:bg-brand-maize-soft hover:shadow-lg">
                  Hubungi Kami
                </Link>
                <Link to="/data-center" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/20">
                  Jelajahi Strategic Areas <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
