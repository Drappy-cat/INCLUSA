import { useState } from "react";
import { Link } from "react-router";
import { ShieldCheck, ArrowRight, ArrowLeft, RotateCcw, ClipboardCheck, Stethoscope, MessageCircle, Send } from "lucide-react";
import { PageHero } from "../ui-kit/Shared";

type Q = { id: string; text: string; weight: number };

const questions: Q[] = [
  { id: "q1", text: "Pernah berhubungan seksual tanpa kondom dengan pasangan yang tidak diketahui status HIV-nya?", weight: 2 },
  { id: "q2", text: "Pernah berganti-ganti pasangan seksual dalam 12 bulan terakhir?", weight: 2 },
  { id: "q3", text: "Pernah menggunakan jarum suntik secara bergantian?", weight: 3 },
  { id: "q4", text: "Pernah menerima transfusi darah sebelum tahun 1992?", weight: 1 },
  { id: "q5", text: "Pasangan Anda pernah didiagnosis HIV atau infeksi menular seksual?", weight: 2 },
  { id: "q6", text: "Mengalami gejala seperti demam berkepanjangan, penurunan berat badan, atau diare kronis?", weight: 1 },
];

const services = [
  { icon: ClipboardCheck, title: "Assessment & Skrining", desc: "Penilaian risiko mandiri sebagai langkah awal." },
  { icon: Stethoscope, title: "Rujukan Faskes", desc: "Diarahkan ke Puskesmas/RS penyedia layanan VCT." },
  { icon: MessageCircle, title: "Konseling", desc: "Pendampingan konselor secara rahasia & empatik." },
];

export function EPelayanan() {
  const [step, setStep] = useState(0); // 0 = intro, 1..n = questions, n+1 = result
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const total = questions.length;

  const score = questions.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0);
  const maxScore = questions.reduce((a, q) => a + q.weight, 0);
  const pct = Math.round((score / maxScore) * 100);
  const level = score >= 5 ? "Tinggi" : score >= 2 ? "Sedang" : "Rendah";
  const levelColor = level === "Tinggi" ? "text-brand-red" : level === "Sedang" ? "text-brand-coral" : "text-[#17787d]";

  const answer = (val: boolean) => {
    const q = questions[step - 1];
    setAnswers((a) => ({ ...a, [q.id]: val }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <>
      <PageHero
        eyebrow="e-Pelayanan · Prototype"
        title="Skrining Risiko HIV Mandiri"
        subtitle="Jawab beberapa pertanyaan singkat untuk mengetahui tingkat risiko Anda. Bersifat rahasia dan bukan pengganti tes medis."
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-white p-7 sm:p-10">
          {/* progress */}
          {step > 0 && step <= total && (
            <>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Pertanyaan {step} dari {total}</span>
                <span>{Math.round(((step - 1) / total) * 100)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-accent">
                <div className="h-full rounded-full bg-brand-blue transition-all" style={{ width: `${((step - 1) / total) * 100}%` }} />
              </div>
            </>
          )}

          {/* intro */}
          {step === 0 && (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <ShieldCheck className="h-8 w-8" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-brand-blue-deep">Mulai Skrining Mandiri</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Terdiri dari {total} pertanyaan ya/tidak. Jawaban Anda tidak disimpan dan tidak dibagikan.
                Hasilnya bersifat indikatif untuk membantu Anda mengambil langkah selanjutnya.
              </p>
              <button
                onClick={() => setStep(1)}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Mulai Sekarang <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* questions */}
          {step > 0 && step <= total && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold leading-snug text-brand-blue-deep">
                {questions[step - 1].text}
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() => answer(true)}
                  className="rounded-xl border-2 border-border py-5 font-semibold text-brand-blue-deep transition-colors hover:border-brand-red hover:bg-brand-red/5"
                >
                  Ya
                </button>
                <button
                  onClick={() => answer(false)}
                  className="rounded-xl border-2 border-border py-5 font-semibold text-brand-blue-deep transition-colors hover:border-brand-teal hover:bg-brand-teal/10"
                >
                  Tidak
                </button>
              </div>
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-blue"
                >
                  <ArrowLeft className="h-4 w-4" /> Kembali
                </button>
              )}
            </div>
          )}

          {/* result */}
          {step > total && (
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Estimasi Tingkat Risiko</p>
              <p className={`mt-2 font-display text-4xl font-extrabold ${levelColor}`}>{level}</p>
              <div className="mx-auto mt-5 h-3 w-full max-w-sm overflow-hidden rounded-full bg-accent">
                <div
                  className={`h-full rounded-full ${level === "Tinggi" ? "bg-brand-red" : level === "Sedang" ? "bg-brand-coral" : "bg-brand-teal"}`}
                  style={{ width: `${Math.max(pct, 8)}%` }}
                />
              </div>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                {level === "Rendah"
                  ? "Risiko Anda tergolong rendah. Tetap jaga perilaku sehat dan lakukan tes HIV secara berkala."
                  : "Kami menyarankan Anda melakukan tes VCT di fasilitas kesehatan terdekat. Tes bersifat gratis, rahasia, dan ramah."}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/faskes" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white">
                  Cari Faskes untuk Tes <ArrowRight className="h-4 w-4" />
                </Link>
                <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-brand-blue-deep hover:bg-accent">
                  <RotateCcw className="h-4 w-4" /> Ulangi
                </button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                * Hasil ini bersifat indikatif dan bukan diagnosis medis.
              </p>
            </div>
          )}
        </div>

        {/* service pillars */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-white p-5 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-cream text-brand-blue">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-sm font-bold text-brand-blue-deep">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* konseling cta */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-blue-deep p-6 text-white sm:flex-row">
          <div>
            <h3 className="font-display text-lg font-bold">Butuh bicara dengan konselor?</h3>
            <p className="mt-1 text-sm text-white/70">Ajukan sesi konseling online yang rahasia dan gratis.</p>
          </div>
          <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-maize px-6 py-3 font-semibold text-brand-blue-deep">
            Ajukan Konseling <Send className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
