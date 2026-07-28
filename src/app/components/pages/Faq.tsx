import { useMemo, useState } from "react";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHero, Chip } from "../ui-kit/Shared";
import { ScrollReveal } from "../ui-kit/ScrollReveal";
import { useContent } from "../../data/ContentStore";

export function Faq() {
  const { faqs } = useContent();
  const [cat, setCat] = useState("Semua");
  const [open, setOpen] = useState<number | null>(0);
  const categories = useMemo(() => ["Semua", ...Array.from(new Set(faqs.map((f) => f.category)))], [faqs]);
  const filtered = faqs.filter((f) => cat === "Semua" || f.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Pertanyaan Umum"
        title="Frequently Asked Questions"
        subtitle="Jawaban atas pertanyaan yang paling sering diajukan seputar HIV/AIDS, penularan, pencegahan, dan layanannya."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => { setCat(c); setOpen(null); }}>{c}</Chip>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-8 space-y-3">
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={f.q} delay={i * 60} direction="up" distance={20}>
                <div className="overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md dark:bg-slate-900 dark:border-slate-800">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-cream/30 dark:hover:bg-slate-800/50"
                  >
                    <HelpCircle className={`h-5 w-5 shrink-0 transition-colors duration-300 ${isOpen ? "text-brand-blue" : "text-muted-foreground"}`} />
                    <span className="flex-1 font-display font-semibold text-brand-blue-deep dark:text-white">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5 pl-14 text-[0.95rem] leading-relaxed text-muted-foreground dark:text-slate-300">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-brand-cream p-8 text-center dark:bg-slate-900">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white animate-cta-pulse">
              <MessageCircleQuestion className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-brand-blue-deep dark:text-white">Masih punya pertanyaan?</h3>
              <p className="mt-1 text-sm text-muted-foreground dark:text-slate-300">Konselor kami siap membantu secara rahasia melalui hotline 24 jam.</p>
            </div>
            <a href="tel:08001448243" className="rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg">
              Hubungi Hotline 0800-1-HIV-AIDS
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
