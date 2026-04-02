"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUpVariants, scaleLineVariants, EXPO_OUT } from "@/lib/animations";

/* ── Rotating word (CSS transition — immune to parent motion context) ── */

const ROTATE_WORDS = ["mark", "impact", "legacy", "statement"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATE_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="gradient-text font-[800] transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ROTATE_WORDS[index]}
    </span>
  );
}

/* ── Abstract visual — network constellation ── */

function AbstractVisual({ prefersReduced }: { prefersReduced: boolean | null }) {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-surface border border-border">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--gradient-mesh)",
        }}
      />

      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="showcase-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#showcase-grid)" />
      </svg>

      {/* Network constellation SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        <line x1="150" y1="120" x2="300" y2="200" stroke="var(--color-accent-1)" strokeWidth="1" opacity="0.15" />
        <line x1="300" y1="200" x2="450" y2="150" stroke="var(--color-accent-2)" strokeWidth="1" opacity="0.15" />
        <line x1="300" y1="200" x2="200" y2="320" stroke="var(--color-accent-1)" strokeWidth="1" opacity="0.12" />
        <line x1="300" y1="200" x2="430" y2="300" stroke="var(--color-accent-3)" strokeWidth="1" opacity="0.12" />
        <line x1="200" y1="320" x2="430" y2="300" stroke="var(--color-border)" strokeWidth="1" opacity="0.2" />
        <line x1="450" y1="150" x2="430" y2="300" stroke="var(--color-accent-2)" strokeWidth="1" opacity="0.1" />
        <line x1="100" y1="250" x2="200" y2="320" stroke="var(--color-border)" strokeWidth="1" opacity="0.15" />
        <line x1="500" y1="220" x2="450" y2="150" stroke="var(--color-border)" strokeWidth="1" opacity="0.12" />

        {/* Primary nodes */}
        <circle cx="300" cy="200" r="28" fill="var(--color-accent-1)" opacity="0.08" />
        <circle cx="300" cy="200" r="16" fill="var(--color-accent-1)" opacity="0.12" />
        <circle cx="300" cy="200" r="5" fill="var(--color-accent-1)" opacity="0.6" />

        <circle cx="150" cy="120" r="20" fill="var(--color-accent-2)" opacity="0.06" />
        <circle cx="150" cy="120" r="10" fill="var(--color-accent-2)" opacity="0.1" />
        <circle cx="150" cy="120" r="4" fill="var(--color-accent-2)" opacity="0.5" />

        <circle cx="450" cy="150" r="22" fill="var(--color-accent-3)" opacity="0.06" />
        <circle cx="450" cy="150" r="11" fill="var(--color-accent-3)" opacity="0.1" />
        <circle cx="450" cy="150" r="4" fill="var(--color-accent-3)" opacity="0.5" />

        <circle cx="200" cy="320" r="18" fill="var(--color-accent-1)" opacity="0.06" />
        <circle cx="200" cy="320" r="9" fill="var(--color-accent-1)" opacity="0.1" />
        <circle cx="200" cy="320" r="3.5" fill="var(--color-accent-1)" opacity="0.5" />

        <circle cx="430" cy="300" r="20" fill="var(--color-accent-2)" opacity="0.06" />
        <circle cx="430" cy="300" r="10" fill="var(--color-accent-2)" opacity="0.1" />
        <circle cx="430" cy="300" r="4" fill="var(--color-accent-2)" opacity="0.5" />

        {/* Secondary data points */}
        <circle cx="100" cy="250" r="2.5" fill="var(--color-accent-1)" opacity="0.3" />
        <circle cx="500" cy="220" r="2.5" fill="var(--color-accent-3)" opacity="0.3" />
        <circle cx="350" cy="100" r="2" fill="var(--color-border-hover)" opacity="0.4" />
        <circle cx="250" cy="380" r="2" fill="var(--color-border-hover)" opacity="0.4" />
        <circle cx="520" cy="350" r="2" fill="var(--color-accent-2)" opacity="0.2" />
        <circle cx="80" cy="160" r="2" fill="var(--color-accent-3)" opacity="0.2" />

        {/* Node labels */}
        <text x="300" y="245" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.5">ORCHESTRATOR</text>
        <text x="150" y="155" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.4">INGEST</text>
        <text x="450" y="185" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.4">REASON</text>
        <text x="200" y="350" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.4">STORE</text>
        <text x="430" y="330" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.4">EXECUTE</text>
      </svg>

      {/* Pulsing ring on center node */}
      {!prefersReduced && (
        <motion.div
          className="absolute rounded-full border border-accent-1/20"
          style={{
            width: 80,
            height: 80,
            left: "calc(50% - 40px)",
            top: "calc(44.4% - 40px)",
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </div>
  );
}

/* ── Stats data ── */

interface Stat {
  value: number;
  suffix: string;
  label: string;
  accent: string;
}

const STATS: Stat[] = [
  { value: 150, suffix: "+", label: "AI models deployed", accent: "var(--color-accent-1)" },
  { value: 40, suffix: "ms", label: "Avg. response latency", accent: "var(--color-accent-2)" },
  { value: 99.9, suffix: "%", label: "Uptime guarantee", accent: "var(--color-accent-1)" },
  { value: 12, suffix: "x", label: "Faster than manual", accent: "var(--color-accent-3)" },
];

/* ── Count-up hook ── */

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const isFloat = target % 1 !== 0;

  const animate = useCallback(() => {
    setDone(false);
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCurrent(
        isFloat
          ? parseFloat((eased * target).toFixed(1))
          : Math.round(eased * target)
      );
      if (elapsed < 1) {
        requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration, isFloat]);

  useEffect(() => {
    if (active) animate();
  }, [active, animate]);

  return { current, done };
}

/* ── Stat item with glow ── */

function StatItem({
  stat,
  active,
  prefersReduced,
}: {
  stat: Stat;
  active: boolean;
  prefersReduced: boolean | null;
}) {
  const { current: count, done } = useCountUp(stat.value, active);

  return (
    <div className="relative flex flex-col items-center text-center">
      <p
        className="font-display font-[800] leading-none relative whitespace-nowrap"
        style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          color: stat.accent,
          letterSpacing: "-0.02em",
        }}
      >
        <motion.span
          animate={!prefersReduced && done ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {count}
        </motion.span>
        <motion.span
          className="text-[0.6em] inline-block"
          animate={
            prefersReduced
              ? { opacity: 1, scale: 1 }
              : {
                  scale: done ? [0, 1.3, 1] : 0,
                  opacity: done ? 1 : 0,
                }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {stat.suffix}
        </motion.span>
      </p>
      <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.1em] text-text-muted mt-1.5">
        {stat.label}
      </p>
    </div>
  );
}

/* ── Main section ── */

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-10 sm:py-12 lg:py-14 bg-bg-deep overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Two-column responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual side — abstract constellation */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: "-5vw" }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EXPO_OUT }}
          >
            <AbstractVisual prefersReduced={prefersReduced} />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: "5vw" }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EXPO_OUT }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-[30px] bg-accent-1" />
              <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
                Showcase
              </span>
            </div>

            <h2
              className="font-display font-[800] leading-[1.15] text-text-primary mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}
            >
              Experiences that{" "}
              <span className="whitespace-nowrap">
                leave a{" "}
                <span className="italic">
                  <RotatingWord />
                </span>
              </span>
            </h2>

            <p className="text-lg lg:text-xl leading-[1.75] text-text-secondary mb-10 max-w-lg">
              We craft digital experiences that perform under pressure — sub-40ms
              responses, 99.9% uptime, and interfaces that feel alive. Every pixel,
              every prompt, every pipeline is built to ship and scale.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  stat={stat}
                  active={isInView}
                  prefersReduced={prefersReduced}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
