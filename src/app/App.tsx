import { BrowserRouter, Routes, Route } from "react-router";
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
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/informasi" element={<InformasiUmum />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/peta" element={<PetaGIS />} />
          <Route path="/faskes" element={<CariFasilitas />} />
          <Route path="/e-pelayanan" element={<EPelayanan />} />
          <Route path="/edukasi" element={<EducationCenter />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
