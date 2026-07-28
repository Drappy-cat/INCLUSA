import markUrl from "../../../imports/inclusa-mark.png";

/** INCLUSA wordmark rendered in brand letter colors (IN coral · CLUS teal · A yellow). */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className}`}>
      <span className="text-brand-coral">IN</span>
      <span className="text-brand-blue">CLUS</span>
      <span className="text-brand-maize">A</span>
    </span>
  );
}

export function Logo({
  size = 36,
  showText = true,
  subtitle = true,
}: {
  size?: number;
  showText?: boolean;
  subtitle?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <img src={markUrl} alt="Logo INCLUSA" style={{ width: size, height: size }} className="object-contain" />
      {showText && (
        <span className="flex flex-col leading-none">
          <Wordmark className="text-[1.15rem]" />
          {subtitle && (
            <span className="mt-0.5 text-[0.58rem] font-medium tracking-wide text-muted-foreground">
              Terpadu HIV/AIDS · Sidoarjo
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export { markUrl };
