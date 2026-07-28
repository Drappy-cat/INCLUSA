import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "./translations";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations["id"]) => string;
};

const STORAGE_KEY = "inclusa:lang:v1";

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      if (stored === "id" || stored === "en") return stored;
    }
    return "id";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);
  const toggleLang = () => setLangState((prev) => (prev === "id" ? "en" : "id"));

  const t = (key: keyof typeof translations["id"]) => {
    return translations[lang][key] || translations["id"][key] || (key as string);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage harus digunakan di dalam <LanguageProvider>");
  return ctx;
}
