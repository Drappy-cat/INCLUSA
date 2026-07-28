import { useState } from "react";
import { Link } from "react-router";
import { ShieldCheck, LogIn, AlertCircle, Home } from "lucide-react";
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-4 py-12 dark:bg-[#070d18] transition-colors duration-200">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-brand-blue-deep shadow-sm transition-all hover:bg-accent dark:bg-slate-800 dark:text-white dark:border-slate-700"
          >
            <Home className="h-4 w-4 text-brand-blue dark:text-brand-teal" /> Kembali ke Beranda Utama
          </Link>
        </div>
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm dark:bg-[#0f1c30] dark:border-slate-800">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-md">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-xl font-bold text-brand-blue-deep dark:text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground dark:text-slate-300">
              Masuk untuk mengelola konten <Wordmark className="text-sm" />
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep dark:text-slate-200">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@inclusa.id"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep dark:text-slate-200">Kata Sandi</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
              />
            </label>

            {error && (
              <p className="flex items-center gap-2 rounded-lg bg-brand-red/10 px-3 py-2 text-xs font-medium text-brand-red dark:bg-red-950/60 dark:text-red-300">
                <AlertCircle className="h-4 w-4" /> {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark shadow-sm"
            >
              <LogIn className="h-4 w-4" /> Masuk
            </button>
          </form>

          {/* akun demo */}
          <div className="mt-6 rounded-xl bg-brand-cream p-4 dark:bg-slate-900/80 dark:border dark:border-slate-800">
            <p className="text-xs font-semibold text-brand-blue-deep dark:text-slate-200">Akun Demo (klik untuk isi otomatis)</p>
            <div className="mt-2 space-y-1.5">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => quickFill(a.email, a.password)}
                  className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-1.5 text-left text-xs ring-1 ring-border transition-colors hover:bg-accent dark:bg-slate-800 dark:ring-slate-700 dark:hover:bg-slate-700"
                >
                  <span className="font-semibold text-brand-blue-deep dark:text-white">{a.role}</span>
                  <span className="text-muted-foreground dark:text-slate-300">{a.email}</span>
                </button>
              ))}
              <p className="pt-1 text-center text-[0.7rem] text-muted-foreground dark:text-slate-400">Kata sandi semua akun: <code className="font-semibold text-brand-blue dark:text-brand-teal">admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
