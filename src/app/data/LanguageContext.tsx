import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "./translations";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations["id"]) => string;
};

const STORAGE_KEY = "inclusa:lang:v2";

const LanguageContext = createContext<LanguageContextType | null>(null);

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function applyGoogleTranslate(l: Language) {
  if (typeof document === "undefined") return;
  
  const val = l === "en" ? "/id/en" : "/id/id";
  document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=${val}; path=/`;

  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (select) {
    select.value = l === "en" ? "en" : "id";
    select.dispatchEvent(new Event("change"));
  }
}

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
    applyGoogleTranslate(lang);
  }, [lang]);

  // Inject Google Translate script dynamically once for full automatic page translation
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "id",
              includedLanguages: "id,en",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    applyGoogleTranslate(l);
  };

  const toggleLang = () => {
    const nextLang = lang === "id" ? "en" : "id";
    setLangState(nextLang);
    applyGoogleTranslate(nextLang);
  };

  const t = (key: keyof typeof translations["id"]) => {
    return translations[lang]?.[key] || translations["id"][key] || (key as string);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {/* Hidden google translate container */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage harus digunakan di dalam <LanguageProvider>");
  return ctx;
}
