import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Auth Store — pondasi autentikasi Admin (mock, front-end only).
// Menyimpan sesi login di localStorage. Untuk project real, ganti verifyLogin
// dengan Supabase Auth / backend sungguhan.
// ---------------------------------------------------------------------------

export type Role = "Super Admin" | "Admin Public" | "Admin Dinas Kesehatan" | "Admin Pendidikan";

export type AdminUser = { email: string; name: string; role: Role };

const STORAGE_KEY = "inclusa:auth:v1";

// Daftar akun demo. Untuk project real, ganti dengan verifikasi backend.
export const DEMO_ACCOUNTS: { email: string; password: string; name: string; role: Role }[] = [
  { email: "super@inclusa.id", password: "admin123", name: "Super Admin", role: "Super Admin" },
  { email: "public@inclusa.id", password: "admin123", name: "Admin Publikasi", role: "Admin Public" },
  { email: "dinkes@inclusa.id", password: "admin123", name: "Admin Dinkes", role: "Admin Dinas Kesehatan" },
  { email: "pendidikan@inclusa.id", password: "admin123", name: "Admin Pendidikan", role: "Admin Pendidikan" },
];

type AuthState = {
  user: AdminUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

function loadUser(): AdminUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(loadUser);

  useEffect(() => {
    try {
      if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // abaikan kegagalan penyimpanan
    }
  }, [user]);

  const login: AuthState["login"] = (email, password) => {
    const match = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!match) return { ok: false, error: "Email atau kata sandi salah." };
    setUser({ email: match.email, name: match.name, role: match.role });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
