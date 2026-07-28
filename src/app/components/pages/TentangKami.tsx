import { Link } from "react-router";
import { 
  Target, Eye, Users, Network, HeartPulse, Sparkles, ArrowRight,
  BookOpen, Building2, LineChart, FlaskConical,
  Search, PenTool, Code, CheckCircle, Rocket, RefreshCw,
  Handshake, Lightbulb, Leaf, Linkedin, Mail, Stethoscope, Video
} from "lucide-react";
import { SectionHeading, Eyebrow } from "../ui-kit/Shared";
import { markUrl } from "../layout/Logo";
import { organization } from "../../data/content";
import founderImg from "../../../assets/founder.jpg";

const avatarTone: Record<string, string> = {
  blue: "bg-brand-blue",
  teal: "bg-brand-teal",
  coral: "bg-brand-coral",
  maize: "bg-brand-maize text-brand-blue-deep",
};

export function TentangKami() {
  const supervisor = organization[0];
  const devTeam = organization.slice(1);

  return (
    <>
      {/* 1. Hero Section (About Us) */}
      <section id="about-us" className="relative overflow-hidden bg-brand-cream pb-16 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Eyebrow>Tentang Kami</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand-blue-deep sm:text-5xl">
                Ruang Inklusif untuk Semua
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-brand-blue-deep/80">
                INCLUSA merupakan platform digital terpadu yang berfokus pada penyediaan informasi HIV/AIDS, edukasi masyarakat, kolaborasi antar stakeholder, layanan kesehatan digital, serta pemberdayaan masyarakat inklusif di Kabupaten Sidoarjo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#what-we-do" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-md">
                  Pelajari Lebih Lanjut
                </a>
                <Link to="/kontak" className="inline-flex items-center gap-2 rounded-full border border-brand-blue-deep/20 bg-transparent px-6 py-3 text-sm font-semibold text-brand-blue-deep transition-all hover:-translate-y-0.5 hover:bg-brand-blue-deep/5">
                  Hubungi Kami
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="relative flex h-80 w-80 sm:h-96 sm:w-96 items-center justify-center rounded-full bg-gradient-to-tr from-brand-teal/20 to-brand-maize/20 p-12">
                 <img src={markUrl} alt="INCLUSA Logo" className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105" />
                 
                 <div className="absolute top-12 left-0 animate-bounce rounded-2xl bg-white p-3 shadow-lg" style={{ animationDuration: '3s' }}>
                   <HeartPulse className="h-6 w-6 text-brand-coral" />
                 </div>
                 <div className="absolute bottom-12 right-0 animate-bounce rounded-2xl bg-white p-3 shadow-lg" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                   <Network className="h-6 w-6 text-brand-blue" />
                 </div>
                 <div className="absolute top-1/2 -right-4 animate-bounce rounded-2xl bg-white p-3 shadow-lg" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                   <Sparkles className="h-6 w-6 text-brand-maize" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section About Us */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-blue-deep">Visi & Misi</h2>
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-border bg-brand-cream p-6">
                    <div className="flex items-center gap-3">
                      <Eye className="h-6 w-6 text-brand-blue" />
                      <h3 className="font-display text-lg font-bold text-brand-blue-deep">Visi</h3>
                    </div>
                    <p className="mt-3 text-brand-blue-deep/80 leading-relaxed">
                      Mewujudkan Sidoarjo yang inklusif dan bebas stigma HIV/AIDS, di mana setiap individu memperoleh akses informasi, edukasi, dan layanan kesehatan yang setara.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-brand-cream-deep p-6">
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-brand-coral" />
                      <h3 className="font-display text-lg font-bold text-brand-blue-deep">Misi</h3>
                    </div>
                    <ul className="mt-3 space-y-2 text-brand-blue-deep/80 leading-relaxed">
                      <li>• Menyediakan informasi HIV/AIDS yang akurat dan tepercaya.</li>
                      <li>• Memperkuat kolaborasi lintas sektor dan fasilitas kesehatan.</li>
                      <li>• Menghadirkan edukasi kesehatan reproduksi sesuai jenjang usia.</li>
                      <li>• Mendorong layanan yang ramah, rahasia, dan tanpa diskriminasi.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-blue-deep">Latar Belakang & Tujuan</h2>
                <p className="mt-4 text-brand-blue-deep/80 leading-relaxed">
                  INCLUSA lahir dari kebutuhan akan sebuah ekosistem digital yang tidak hanya memberikan informasi, tetapi juga menghubungkan berbagai pihak dalam penanggulangan HIV/AIDS di Kabupaten Sidoarjo. Kami membangun platform ini untuk memecah batasan informasi, mengurangi stigma, dan memastikan bahwa setiap individu, terlepas dari status kesehatan mereka, mendapatkan dukungan yang mereka butuhkan secara holistik dan berkelanjutan.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
               {[
                 { icon: Building2, count: "50+", title: "Mitra Layanan Kesehatan", desc: "Fasilitas kesehatan dan klinik yang terhubung" },
                 { icon: Users, count: "10k+", title: "Komunitas Terlayani", desc: "Masyarakat yang telah menerima edukasi" },
                 { icon: Video, count: "100+", title: "Media Edukasi", desc: "Artikel, video, dan infografis interaktif" },
                 { icon: Network, count: "15+", title: "Kolaborasi Aktif", desc: "Lembaga pemerintah dan NGO" },
               ].map((stat, i) => (
                 <div key={i} className="group rounded-3xl border border-border bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                   <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                     <stat.icon className="h-7 w-7" />
                   </div>
                   <h4 className="font-display text-4xl font-bold text-brand-blue-deep">{stat.count}</h4>
                   <h5 className="mt-2 font-display text-sm font-bold text-brand-blue">{stat.title}</h5>
                   <p className="mt-1 text-sm text-muted-foreground">{stat.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section What We Do */}
      <section id="what-we-do" className="bg-brand-cream py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Apa yang Kami Lakukan" title="Fitur & Layanan Utama INCLUSA" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, color: "text-brand-blue", bg: "bg-brand-blue/10", title: "Pusat Informasi HIV/AIDS", desc: "Sumber informasi tepercaya, komprehensif, dan mudah dipahami seputar HIV/AIDS." },
              { icon: Video, color: "text-brand-coral", bg: "bg-brand-coral/10", title: "Edukasi Masyarakat", desc: "Modul pembelajaran interaktif dan kampanye kesadaran untuk semua kalangan." },
              { icon: Stethoscope, color: "text-brand-teal", bg: "bg-brand-teal/10", title: "Direktori Layanan Kesehatan", desc: "Kemudahan akses mencari fasilitas kesehatan dan layanan konseling terdekat." },
              { icon: LineChart, color: "text-[#b9880a]", bg: "bg-brand-maize/20", title: "Dashboard Monitoring", desc: "Visualisasi data dan statistik terkini untuk mendukung pengambilan keputusan." },
              { icon: Handshake, color: "text-brand-red", bg: "bg-brand-red/10", title: "Kolaborasi Stakeholder", desc: "Wadah sinergi antara pemerintah, institusi pendidikan, dan komunitas lokal." },
              { icon: FlaskConical, color: "text-brand-blue-dark", bg: "bg-brand-blue-dark/10", title: "Research & Knowledge Hub", desc: "Pusat publikasi riset, kebijakan, dan inovasi terkait kesehatan masyarakat." },
            ].map((feature, i) => (
              <div key={i} className="group rounded-3xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-blue-deep">{feature.title}</h3>
                <p className="mt-3 text-brand-blue-deep/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section Our Team */}
      <section id="our-team" className="bg-white py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Tim Kami" title="Meet Our Team" subtitle="Kolaborasi para akademisi dan pengembang muda yang berdedikasi tinggi." />
          
          <div className="mt-16">
            <h3 className="text-center font-display text-2xl font-bold text-brand-blue-deep mb-8">Founder</h3>
            <div className="flex justify-center">
              <div className="group w-full max-w-[280px] rounded-3xl border border-border bg-white overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[3/4] bg-brand-cream relative overflow-hidden">
                   <img src={founderImg} alt="Kharizha Krishnandya, S.H., M.H." className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-brand-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-5 pt-6 text-center relative z-20 bg-white">
                  <h4 className="font-display text-lg font-bold text-brand-blue-deep">Kharizha Krishnandya, S.H., M.H.</h4>
                  <p className="mt-1 text-sm font-medium text-brand-blue">Founder & Penasihat Ahli</p>
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-3">Mengarahkan visi dan memastikan keberjalanan program-program inklusi sesuai dengan tujuan strategis organisasi.</p>
                  <div className="mt-5 flex justify-center gap-4">
                    <a href="#" aria-label="LinkedIn" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white"><Linkedin className="h-5 w-5" /></a>
                    <a href="#" aria-label="Email" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white"><Mail className="h-5 w-5" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-center font-display text-2xl font-bold text-brand-blue-deep mb-8">Development Team</h3>
            <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {devTeam.map((member, i) => (
                <div key={member.id ?? i} className="group rounded-3xl border border-border bg-white overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className={`aspect-[3/4] flex items-center justify-center relative overflow-hidden ${avatarTone[member.tone] ?? "bg-brand-blue"}`}>
                     <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                     <div className="relative z-10 text-6xl font-display font-bold text-white transition-transform duration-300 group-hover:scale-110">
                       {member.initials}
                     </div>
                  </div>
                  <div className="p-5 text-center bg-white">
                    <h4 className="font-display text-lg font-bold text-brand-blue-deep">{member.name}</h4>
                    <p className="mt-1 text-sm font-medium text-brand-coral">{member.role}</p>
                    <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{member.focus}</p>
                    <div className="mt-5 flex justify-center gap-4">
                      <a href="#" aria-label="LinkedIn" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white"><Linkedin className="h-4 w-4" /></a>
                      <a href="#" aria-label="Email" className="rounded-full bg-brand-cream p-2 text-muted-foreground transition-colors hover:bg-brand-blue hover:text-white"><Mail className="h-4 w-4" /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Timeline Pengembangan */}
      <section className="bg-brand-cream-deep py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Perjalanan Kami" title="Timeline Pengembangan" subtitle="Tahapan dari ide hingga menjadi platform inklusif terpadu." />
          <div className="mt-20">
            <div className="relative">
              {/* horizontal line for desktop */}
              <div className="hidden md:block absolute top-8 left-10 right-10 h-1 bg-border" />
              {/* vertical line for mobile */}
              <div className="md:hidden absolute left-8 top-8 bottom-8 w-1 bg-border" />
              
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
                     <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-brand-cream-deep bg-white text-brand-blue shadow-md md:mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-blue/20">
                       <step.icon className="h-7 w-7" />
                     </div>
                     <div>
                       <h4 className="font-display font-bold text-brand-blue-deep">{step.title}</h4>
                       <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Values */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Nilai Utama" title="Prinsip INCLUSA" subtitle="Landasan kami dalam berkarya dan melayani masyarakat." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, title: "Inclusion", desc: "Merangkul semua kalangan tanpa mendiskriminasi siapapun." },
              { icon: Handshake, title: "Collaboration", desc: "Bekerja sama erat untuk dampak yang lebih besar dan nyata." },
              { icon: Lightbulb, title: "Innovation", desc: "Terus berinovasi dengan solusi digital terdepan masa kini." },
              { icon: Leaf, title: "Sustainability", desc: "Membangun ekosistem yang mandiri dan berkelanjutan secara terus menerus." },
            ].map((v, i) => (
              <div key={i} className="group rounded-3xl border border-border bg-brand-cream p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-sm transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110">
                  <v.icon className="h-8 w-8" />
                </span>
                <h3 className="font-display text-xl font-bold text-brand-blue-deep">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
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
