import { useState } from "react";
import { ShieldCheck, LogIn, AlertCircle } from "lucide-react";
import { useAuth, DEMO_ACCOUNTS } from "../../data/AuthStore";
import { Wordmark } from "../layout/Logo";

export function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) setError(res.error ?? "Gagal masuk.");
  };

  const quickFill = (em: string, pw: string) => {
    setEmail(em);
    setPassword(pw);
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue text-white">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-xl font-bold text-brand-blue-deep">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Masuk untuk mengelola konten <Wordmark className="text-sm" />
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@inclusa.id"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Kata Sandi</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </label>

            {error && (
              <p className="flex items-center gap-2 rounded-lg bg-brand-red/10 px-3 py-2 text-xs font-medium text-brand-red">
                <AlertCircle className="h-4 w-4" /> {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              <LogIn className="h-4 w-4" /> Masuk
            </button>
          </form>

          {/* akun demo */}
          <div className="mt-6 rounded-xl bg-brand-cream p-4">
            <p className="text-xs font-semibold text-brand-blue-deep">Akun Demo (klik untuk isi otomatis)</p>
            <div className="mt-2 space-y-1.5">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => quickFill(a.email, a.password)}
                  className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-1.5 text-left text-xs ring-1 ring-border transition-colors hover:bg-accent"
                >
                  <span className="font-medium text-brand-blue-deep">{a.role}</span>
                  <span className="text-muted-foreground">{a.email}</span>
                </button>
              ))}
              <p className="pt-1 text-center text-[0.7rem] text-muted-foreground">Kata sandi semua akun: <code className="font-semibold">admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
