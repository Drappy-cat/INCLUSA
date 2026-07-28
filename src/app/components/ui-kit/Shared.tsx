import type { ReactNode } from "react";
import type { StatItem } from "../../data/content";

const toneMap: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: "bg-brand-blue/10", text: "text-brand-blue", ring: "ring-brand-blue/20" },
  coral: { bg: "bg-brand-coral/15", text: "text-brand-coral", ring: "ring-brand-coral/20" },
  maize: { bg: "bg-brand-maize/40", text: "text-[#b9880a]", ring: "ring-brand-maize/50" },
  teal: { bg: "bg-brand-teal/20", text: "text-[#17787d]", ring: "ring-brand-teal/30" },
};

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-coral">{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-[1.7rem] font-bold leading-tight text-brand-blue-deep sm:text-[2rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function StatCard({ item, icon }: { item: StatItem; icon?: ReactNode }) {
  const t = toneMap[item.tone] ?? toneMap.blue;
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ${t.ring}`}>
      {icon && (
        <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${t.bg} ${t.text}`}>{icon}</span>
      )}
      <p className={`font-display text-[1.9rem] font-extrabold leading-none ${t.text}`}>{item.value}</p>
      <p className="mt-2 font-display text-sm font-semibold text-brand-blue-deep">{item.label}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{item.sub}</p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="border-b border-border bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[2rem] font-extrabold leading-tight text-brand-blue-deep sm:text-[2.6rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground">{subtitle}</p>
      </div>
    </section>
  );
}

export function Chip({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-brand-blue bg-brand-blue text-white"
          : "border-border bg-white text-brand-blue-deep/70 hover:border-brand-blue/40 hover:text-brand-blue"
      }`}
    >
      {children}
    </button>
  );
}
