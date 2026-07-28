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
import { PolicyLab } from "./components/pages/PolicyLab";
import { Academy } from "./components/pages/Academy";
import { Consulting } from "./components/pages/Consulting";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { AdminLogin } from "./components/admin/AdminLogin";
import { ComingSoon } from "./components/pages/ComingSoon";
import { Kontak } from "./components/pages/Kontak";

import { ThemeProvider } from "./data/ThemeContext";
import { LanguageProvider } from "./data/LanguageContext";

function AdminRoute() {
  const { user } = useAuth();
  return user ? <AdminDashboard /> : <AdminLogin />;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <ContentProvider>
              <Routes>
                <Route element={<Layout />}>
          {/* ── Main ── */}
          <Route path="/" element={<Home />} />

          {/* ── About ── */}
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/kontak" element={<Kontak />} />

          {/* ── Strategic Areas (5 Pilar) ── */}
          <Route path="/data-center" element={<Statistik />} />
          <Route path="/policy-lab" element={<PolicyLab />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/research" element={<Artikel />} />
          <Route path="/consulting" element={<Consulting />} />

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
      </LanguageProvider>
    </ThemeProvider>
  );
}
