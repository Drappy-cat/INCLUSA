import { useState } from "react";
import { UserPlus, Trash2, Check, ShieldCheck, KeyRound } from "lucide-react";
import { DEMO_ACCOUNTS, type Role } from "../../data/AuthStore";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const ROLES: Role[] = ["Super Admin", "Admin Public", "Admin Dinas Kesehatan", "Admin Pendidikan"];

// Matriks izin per peran (mock — pondasi untuk sistem RBAC nyata).
const PERMISSIONS = [
  { label: "Kelola Artikel & Berita", roles: ["Super Admin", "Admin Public"] },
  { label: "Approval Konten", roles: ["Super Admin"] },
  { label: "Kelola Data GIS & Statistik", roles: ["Super Admin", "Admin Dinas Kesehatan"] },
  { label: "Kelola Konten Edukasi", roles: ["Super Admin", "Admin Pendidikan"] },
  { label: "Kelola Pengguna & Peran", roles: ["Super Admin"] },
  { label: "Kelola FAQ", roles: ["Super Admin", "Admin Public"] },
];

type Row = { id: string; name: string; email: string; role: Role };

export function UsersManager({ mode }: { mode: "users" | "roles" }) {
  const [users, setUsers] = useState<Row[]>(
    DEMO_ACCOUNTS.map((a, i) => ({ id: `u-${i}`, name: a.name, email: a.email, role: a.role }))
  );
  const [form, setForm] = useState<{ name: string; email: string; role: Role }>({ name: "", email: "", role: "Admin Public" });

  const addUser = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setUsers((u) => [...u, { id: `u-${Date.now()}`, ...form }]);
    setForm({ name: "", email: "", role: "Admin Public" });
  };

  if (mode === "roles") {
    return (
      <div>
        <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
          <KeyRound className="h-4 w-4 text-brand-blue" /> Matriks izin per peran (RBAC). Pondasi untuk kontrol akses yang dapat dihubungkan ke backend.
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Izin</th>
                {ROLES.map((r) => (
                  <th key={r} className="px-3 py-3 text-center font-semibold">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((p) => (
                <tr key={p.label} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-brand-blue-deep">{p.label}</td>
                  {ROLES.map((r) => (
                    <td key={r} className="px-3 py-3 text-center">
                      {p.roles.includes(r) ? (
                        <Check className="mx-auto h-4 w-4 text-[#17787d]" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-brand-blue" /> Kelola akun admin dan peran mereka.
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* form tambah */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="flex items-center gap-2 font-display font-bold text-brand-blue-deep">
            <UserPlus className="h-4 w-4 text-brand-blue" /> Tambah Pengguna
          </h3>
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Nama</span>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="Nama lengkap" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Email</span>
              <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} placeholder="nama@inclusa.id" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-brand-blue-deep">Peran</span>
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))} className={inputCls}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </label>
            <button onClick={addUser} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">
              <Check className="h-4 w-4" /> Tambah
            </button>
          </div>
        </div>

        {/* daftar */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-brand-blue-deep">Daftar Pengguna</h3>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue">{users.length} akun</span>
          </div>
          <div className="mt-4 space-y-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-bold text-white">
                  {u.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand-blue-deep">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-brand-blue">{u.role}</span>
                <button onClick={() => setUsers((us) => us.filter((x) => x.id !== u.id))} className="rounded-lg border border-border p-1.5 text-brand-red hover:bg-brand-red/10" title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
