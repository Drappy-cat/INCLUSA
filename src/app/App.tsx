import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ContentProvider } from "./data/ContentStore";
import { AuthProvider, useAuth } from "./data/AuthStore";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/Home";
import { TentangKami } from "./components/pages/TentangKami";
import { InformasiUmum } from "./components/pages/InformasiUmum";
import { Artikel } from "./components/pages/Artikel";
import { ArtikelDetail } from "./components/pages/ArtikelDetail";
import { Berita } from "./components/pages/Berita";
import { BeritaDetail } from "./components/pages/BeritaDetail";
import { Faq } from "./components/pages/Faq";
import { Statistik } from "./components/pages/Statistik";
import { PetaGIS } from "./components/pages/PetaGIS";
import { CariFasilitas } from "./components/pages/CariFasilitas";
import { EPelayanan } from "./components/pages/EPelayanan";
import { EducationCenter } from "./components/pages/EducationCenter";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { AdminLogin } from "./components/admin/AdminLogin";
import { ComingSoon } from "./components/pages/ComingSoon";

function AdminRoute() {
  const { user } = useAuth();
  return user ? <AdminDashboard /> : <AdminLogin />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <ContentProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* ── Main ── */}
          <Route path="/" element={<Home />} />

          {/* ── About ── */}
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/kontak" element={<ComingSoon title="Contact Us" desc="Halaman kontak sedang disiapkan. Sementara itu, hubungi kami melalui email: halo@inclusa.id" />} />

          {/* ── Strategic Areas (new routes) ── */}
          <Route path="/data-center" element={<Statistik />} />
          <Route path="/policy-lab" element={<ComingSoon title="INCLUSA Policy Lab" desc="Halaman Policy Lab sedang disiapkan. Temukan riset kebijakan dan kemitraan INCLUSA di sini." />} />
          <Route path="/academy" element={<EducationCenter />} />
          <Route path="/research" element={<Artikel />} />
          <Route path="/consulting" element={<ComingSoon title="INCLUSA Consulting" desc="Layanan advisory pembangunan inklusif — segera hadir. Hubungi kami untuk informasi lebih lanjut." />} />

          {/* ── Redirects from old routes ── */}
          <Route path="/statistik" element={<Navigate to="/data-center" replace />} />
          <Route path="/peta" element={<Navigate to="/data-center" replace />} />
          <Route path="/artikel" element={<Navigate to="/research" replace />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
          <Route path="/berita" element={<Navigate to="/research?tab=berita" replace />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/edukasi" element={<Navigate to="/academy" replace />} />

          {/* ── HIV Project (kept, under consulting hierarchy) ── */}
          <Route path="/informasi" element={<InformasiUmum />} />
          <Route path="/faskes" element={<CariFasilitas />} />
          <Route path="/e-pelayanan" element={<EPelayanan />} />
          <Route path="/faq" element={<Faq />} />

          {/* ── Admin ── */}
          <Route path="/admin" element={<AdminRoute />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
