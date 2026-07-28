import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ImageSliderProps {
  images?: string[];
  fallbackImage?: string;
  alt: string;
  className?: string;
}

export function ImageSlider({ images = [], fallbackImage, alt, className = "" }: ImageSliderProps) {
  // Consolidate images list
  const list = images.length > 0 ? images : fallbackImage ? [fallbackImage] : [];
  const [index, setIndex] = useState(0);

  if (list.length === 0) return null;

  if (list.length === 1) {
    return (
      <div className={`overflow-hidden rounded-2xl border border-border bg-slate-100 dark:bg-slate-800 ${className}`}>
        <ImageWithFallback
          src={list[0]}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const prev = () => setIndex((i) => (i === 0 ? list.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === list.length - 1 ? 0 : i + 1));

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-slate-900 group ${className}`}>
      {/* Current Slide Image */}
      <ImageWithFallback
        src={list[index]}
        alt={`${alt} - Gambar ${index + 1}`}
        className="h-full w-full object-cover transition-opacity duration-300"
      />

      {/* Slide Counter Badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/20">
        <ImageIcon className="h-3.5 w-3.5 text-brand-maize" />
        <span>{index + 1} / {list.length}</span>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        aria-label="Gambar Sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-white backdrop-blur-md opacity-90 transition-all hover:scale-110 hover:bg-slate-900 focus:outline-none"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={next}
        aria-label="Gambar Selanjutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-white backdrop-blur-md opacity-90 transition-all hover:scale-110 hover:bg-slate-900 focus:outline-none"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Bottom Indicator Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-slate-900/60 px-3 py-1.5 backdrop-blur-md border border-white/10">
        {list.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ke gambar ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-maize" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
