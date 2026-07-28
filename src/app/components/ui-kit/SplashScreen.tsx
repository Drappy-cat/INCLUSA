import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { markUrl } from "../layout/Logo";

/**
 * SplashScreen — Premium loading screen with:
 * - INCLUSA logo with glowing pulse
 * - Colorful wordmark (IN coral, CLUS teal, A yellow)
 * - Full institute name subtitle
 * - 0-100% progress meter with animated bar
 * - Curtain slide-up exit transition
 * - sessionStorage guard so it only shows once per session
 */
export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Simulate loading progress 0 → 100 in ~2.4s
    const totalDuration = 2400;
    const intervalMs = 30;
    const steps = totalDuration / intervalMs;
    let step = 0;
    let finishTimeout: any;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve for natural feel: fast start, slow finish
      const linear = step / steps;
      const eased = 1 - Math.pow(1 - linear, 3);
      const value = Math.min(Math.round(eased * 100), 100);
      setProgress(value);

      if (value >= 100) {
        clearInterval(timer);
        // Small pause at 100% before curtain slides up
        finishTimeout = setTimeout(() => setIsDone(true), 400);
      }
    }, intervalMs);

    return () => {
      clearInterval(timer);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, []);

  // After exit animation completes, notify parent
  const handleExitComplete = () => {
    sessionStorage.setItem("inclusa_splash_seen", "true");
    onFinish();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isDone && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0b1329 0%, #123a40 50%, #0f1c30 100%)" }}
        >
          {/* Animated background glow circles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(52,190,196,0.4) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, rgba(240,101,78,0.3) 0%, transparent 70%)",
              }}
              animate={{ scale: [1.1, 1, 1.1], x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Logo + Content */}
          <div className="relative flex flex-col items-center gap-6 px-6">
            {/* Logo with glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 60px 20px rgba(52,190,196,0.3), 0 0 120px 40px rgba(52,190,196,0.1)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 60px 20px rgba(52,190,196,0.3), 0 0 120px 40px rgba(52,190,196,0.1)",
                    "0 0 80px 30px rgba(52,190,196,0.4), 0 0 150px 50px rgba(52,190,196,0.15)",
                    "0 0 60px 20px rgba(52,190,196,0.3), 0 0 120px 40px rgba(52,190,196,0.1)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={markUrl}
                alt="INCLUSA"
                className="relative h-24 w-24 sm:h-28 sm:w-28 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span style={{ color: "#f0654e" }}>IN</span>
                <span style={{ color: "#1f9aa0" }}>CLUS</span>
                <span style={{ color: "#f7c948" }}>A</span>
              </span>
            </motion.div>

            {/* Full Institute Name */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="max-w-sm text-center text-xs sm:text-sm font-medium tracking-wide text-white/60"
            >
              Indonesia Institute for Children, Women,
              <br />
              Disability and Inclusion
            </motion.p>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-4 flex w-64 flex-col items-center gap-3"
            >
              {/* Percentage */}
              <span
                className="font-display text-2xl font-bold tabular-nums"
                style={{
                  background: "linear-gradient(90deg, #34bec4, #f7c948)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {progress}%
              </span>

              {/* Progress bar */}
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #34bec4, #1f9aa0, #f7c948)",
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    animation: "shimmerSlide 1.5s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Loading text */}
              <p className="text-[0.7rem] font-medium tracking-widest uppercase text-white/40">
                Memuat Platform...
              </p>
            </motion.div>
          </div>

          {/* Shimmer animation */}
          <style>{`
            @keyframes shimmerSlide {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
