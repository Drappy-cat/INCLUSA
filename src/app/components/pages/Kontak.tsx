import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
  Building2,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../../data/LanguageContext";

const WHATSAPP_NUMBER = "6281100001234";
const CONTACT_EMAIL = "halo@inclusa.id";

export function Kontak() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const setField = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const getWaUrl = () => {
    const text = `Halo INCLUSA Institute,\n\nSaya ${form.name}${form.company ? ` dari ${form.company}` : ""}.\nEmail: ${form.email}\nNo. Telp: ${form.mobile}\n\nPesan:\n${form.message}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* ─────────────── 1. HERO BANNER (JOIN US) ─────────────── */}
      <section className="relative min-h-[440px] overflow-hidden bg-brand-blue-deep text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
            alt="INCLUSA Community & Children"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/85 to-brand-blue-deep/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/90 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[440px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-maize/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-maize backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-maize animate-pulse" />
              {t("contactHeroTag")}
            </span>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-maize sm:text-4xl lg:text-5xl">
              {t("contactHeroTitle")}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              {t("contactHeroSub")}
            </p>

            <p className="mt-4 font-display text-lg font-bold text-white">
              Children, Women & Disability Can’t Wait.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── 2. CONTACT US SECTION (INFO + FORM) ─────────────── */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl lg:grid lg:grid-cols-12">

            {/* Left Column: Institutional Contact Details */}
            <div className="bg-brand-blue-deep p-8 text-white sm:p-12 lg:col-span-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-maize">
                {t("contactEyebrow")}
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("contactHeading")}
              </h2>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-maize">
                    INCLUSA Institute
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-white/90">
                    Indonesia Institute for Children, Women, Disability and Inclusion
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-maize" />
                    <div>
                      <p className="font-semibold text-white">{t("officeAddress")}</p>
                      <p className="mt-0.5 leading-relaxed text-white/60 italic">
                        Akan diperbarui
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-brand-maize" />
                    <div>
                      <p className="font-semibold text-white">{t("partnershipEmail")}</p>
                      <p className="text-white/60 italic">
                        Akan diperbarui
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-brand-maize" />
                    <div>
                      <p className="font-semibold text-white">{t("phoneWhatsapp")}</p>
                      <p className="text-white/60 italic">Akan diperbarui</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-white/60 mb-3">
                    {t("waFastResponse")}
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo INCLUSA Institute, saya ingin berkonsultasi / berkolaborasi.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#20BD5A] hover:shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" /> {t("chatViaWa")}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="p-8 sm:p-12 lg:col-span-7 dark:bg-slate-900">
              {submitted ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-brand-blue-deep dark:text-white">
                    {t("submittedSuccess")}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground dark:text-slate-300">
                    {t("submittedSub")}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={getWaUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#20BD5A]"
                    >
                      <MessageCircle className="h-4 w-4" /> {t("chatViaWa")}
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", company: "", mobile: "", email: "", message: "" });
                      }}
                      className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-brand-blue-deep hover:bg-accent dark:text-white dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      {t("btnSendAnother")}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-blue-deep dark:text-white">
                      {t("formHeading")}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-slate-300">
                      {t("formSub")}
                    </p>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-blue-deep dark:text-slate-200 mb-1.5">
                      {t("labelName")} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder={t("placeholderName")}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>

                  {/* Company field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-blue-deep dark:text-slate-200 mb-1.5">
                      {t("labelCompany")}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setField("company", e.target.value)}
                      placeholder={t("placeholderCompany")}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>

                  {/* Mobile & Email 2-col */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-blue-deep dark:text-slate-200 mb-1.5">
                        {t("labelPhone")} <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) => setField("mobile", e.target.value)}
                        placeholder={t("placeholderPhone")}
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-blue-deep dark:text-slate-200 mb-1.5">
                        {t("labelEmail")} <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder={t("placeholderEmail")}
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-blue-deep dark:text-slate-200 mb-1.5">
                      {t("labelMessage")} <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder={t("placeholderMessage")}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-blue-deep outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-blue-dark hover:shadow-lg"
                    >
                      {t("btnSubmit")} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
