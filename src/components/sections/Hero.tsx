"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import WorkflowCanvas from "@/components/ui/WorkflowCanvas";
import { useIsMobile } from "@/hooks/useIsMobile";
import { EXPO_OUT } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Gradient Orbs (simplified — 2 orbs)                                */
/* ------------------------------------------------------------------ */

function GradientOrbs() {
  return (
    <>
      <div
        className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-accent-1), transparent 70%)",
          filter: "blur(120px)",
          animation: "float-gentle 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[10%] w-[450px] h-[450px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-accent-3), transparent 70%)",
          filter: "blur(120px)",
          animation: "float-gentle 20s ease-in-out infinite reverse",
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Word Reveal — word-by-word stagger                                 */
/* ------------------------------------------------------------------ */

function WordReveal({
  text,
  delay = 0,
  reduced,
}: {
  text: string;
  delay?: number;
  reduced: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={reduced ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: delay + i * 0.06, ease: EXPO_OUT }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();

  /* Scroll-driven transforms */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Entrance complete state — wait for entrance animations to finish */
  const [entranceComplete, setEntranceComplete] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const canScroll = entranceComplete && !prefersReduced && !isMobile;

  /* Parallax transforms for text and orbs */
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const orbY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-deep"
    >
      {/* Background orbs */}
      {!prefersReduced && (
        <motion.div style={{ y: canScroll ? orbY : 0 }}>
          <GradientOrbs />
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:pt-[110px] md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* ── Left: Text Content ── */}
          <motion.div style={{ y: canScroll ? textY : 0 }}>
            {/* Badge */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border-accent bg-accent-glow"
            >
              <span className="relative flex h-2 w-2">
                {!prefersReduced && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-75 bg-accent-1" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-1" />
              </span>
              <span className="text-xs font-semibold tracking-[0.12em] uppercase font-mono text-accent-1">
                AI Systems Engineering
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-display font-[800] leading-[1.1] tracking-tight mb-10 text-text-primary"
              style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)" }}
            >
              <WordReveal
                text="We Engineer Intelligence Into Systems That Run Work."
                delay={0.2}
                reduced={prefersReduced}
              />
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: EXPO_OUT }}
              className="text-xl md:text-2xl leading-[1.75] max-w-xl mb-10 text-text-secondary"
            >
              Multi-agent architectures, workflow engines, and model-driven
              systems designed to execute, optimize, and scale real operations
              not just assist them.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: EXPO_OUT }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <motion.a
                href="#contact"
                className="clip-corner-md relative overflow-hidden inline-flex items-center justify-center px-10 py-4 !text-white font-display font-bold text-base uppercase tracking-widest bg-accent-1"
                whileHover={prefersReduced ? {} : { scale: 1.04 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
              >
                {!prefersReduced && (
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, color-mix(in srgb, var(--color-bg-card) 15%, transparent) 50%, transparent 60%)",
                    }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: EXPO_OUT }}
                  />
                )}
                Build With Us
              </motion.a>

              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 font-display font-semibold text-base uppercase tracking-widest rounded-sm transition-colors border border-border text-text-primary"
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        scale: 1.03,
                        borderColor: "var(--color-accent-1)",
                        color: "var(--color-accent-1)",
                      }
                }
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
              >
                See Systems in Action
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="inline-block"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: AI Workflow Canvas ── */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.0, delay: 0.6, ease: EXPO_OUT }}
            className="relative flex flex-col items-center justify-center md:col-span-1 scale-90 sm:scale-95 md:scale-[0.82] lg:scale-95 xl:scale-100"
          >
            {/* ── Top decorative elements ── */}
            <div className="w-full flex items-center justify-between px-4 mb-3">
              {/* Floating metric pills */}
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-bg-card/60 backdrop-blur-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 1.8, ease: EXPO_OUT }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" />
                <span className="text-[0.6rem] font-mono text-text-muted tracking-wide">Sub-40ms latency</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-bg-card/60 backdrop-blur-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 2.0, ease: EXPO_OUT }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-1 animate-pulse" />
                <span className="text-[0.6rem] font-mono text-text-muted tracking-wide">99.9% uptime</span>
              </motion.div>
            </div>

            {/* Main workflow canvas */}
            <WorkflowCanvas
              inView={inView}
              reduced={prefersReduced}
              scrollProgress={canScroll ? scrollYProgress : undefined}
              mode={canScroll ? "scroll" : "entrance"}
            />

            {/* ── Bottom decorative elements ── */}
            <div className="w-full flex items-center justify-between px-4 mt-3">
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-bg-card/60 backdrop-blur-sm"
                initial={{ opacity: 0, y: -6 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 2.2, ease: EXPO_OUT }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-3 animate-pulse" />
                <span className="text-[0.6rem] font-mono text-text-muted tracking-wide">Multi-agent ready</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-bg-card/60 backdrop-blur-sm"
                initial={{ opacity: 0, y: -6 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 2.4, ease: EXPO_OUT }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" />
                <span className="text-[0.6rem] font-mono text-text-muted tracking-wide">Production-grade</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-text-muted">
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background: "linear-gradient(to bottom, var(--color-accent-1), transparent)",
              animation: prefersReduced ? "none" : "pulse 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
