"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  fadeUpBlurVariants,
  scaleLineVariants,
  EXPO_OUT,
} from "@/lib/animations";

/* ── Team data ── */

const MEMBERS = [
  {
    name: "Suhail",
    initial: "S",
    role: "Founder · Principal Design",
    bio: "Orchestrates vision, design systems, and the creative direction behind every Bizzzup product.",
    gradient: "linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))",
    ringColor: "var(--color-accent-1)",
  },
  {
    name: "Edwin Swanith",
    initial: "E",
    role: "Co-Founder · AI/ML Specialist",
    bio: "Architects multi-agent systems and ML pipelines — from research prototypes to production scale.",
    gradient: "linear-gradient(135deg, var(--color-accent-2), var(--color-accent-1))",
    ringColor: "var(--color-accent-2)",
  },
  {
    name: "Kishore",
    initial: "K",
    role: "AI Engineer",
    bio: "Builds RAG platforms, fine-tuning workflows, and the inference infrastructure that powers our stack.",
    gradient: "linear-gradient(135deg, var(--color-accent-3), var(--color-accent-1))",
    ringColor: "var(--color-accent-3)",
  },
  {
    name: "Vikram",
    initial: "V",
    role: "AI Engineer",
    bio: "Develops voice interfaces, automation pipelines, and real-time AI integrations across the product suite.",
    gradient: "linear-gradient(135deg, var(--color-accent-1), var(--color-accent-3))",
    ringColor: "var(--color-accent-1)",
  },
];

/* ── Avatar with rotating ring ── */

function Avatar({
  initial,
  gradient,
  ringColor,
  prefersReduced,
}: {
  initial: string;
  gradient: string;
  ringColor: string;
  prefersReduced: boolean | null;
}) {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
      {/* Rotating ring — constant speed, will-change for GPU compositing */}
      {!prefersReduced && (
        <motion.div
          className="absolute -inset-1 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${ringColor}, transparent 40%, ${ringColor})`,
            opacity: 0.6,
            willChange: "transform",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
      {/* Avatar circle */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ background: gradient }}
      >
        <span className="text-2xl sm:text-3xl font-bold text-white font-display">
          {initial}
        </span>
      </div>
    </div>
  );
}

/* ── Single card ── */

function TeamCard({
  member,
  index,
  prefersReduced,
}: {
  member: (typeof MEMBERS)[number];
  index: number;
  prefersReduced: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={prefersReduced ? undefined : fadeUpBlurVariants}
      whileHover={prefersReduced ? {} : { y: -8 }}
      transition={
        prefersReduced
          ? undefined
          : { type: "spring", stiffness: 300, damping: 20 }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="clip-corner-xl relative overflow-hidden bg-bg-card border border-border p-7 sm:p-9 transition-colors duration-400"
      style={{
        background: hovered
          ? "linear-gradient(180deg, var(--color-bg-card-hover) 0%, var(--color-bg-card) 100%)"
          : undefined,
      }}
    >
      {/* Avatar */}
      <div className="mb-5">
        <Avatar
          initial={member.initial}
          gradient={member.gradient}
          ringColor={member.ringColor}
          prefersReduced={prefersReduced}
        />
      </div>

      {/* Name */}
      <h3 className="font-display text-2xl font-bold text-text-primary mb-1">
        {member.name}
      </h3>

      {/* Role */}
      <span className="font-mono text-[0.8rem] tracking-wide text-accent-1 block mb-3">
        {member.role}
      </span>

      {/* Bio */}
      <motion.p
        className="text-[1rem] leading-[1.7] text-text-secondary"
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        {member.bio}
      </motion.p>

      {/* Hover gradient line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: member.gradient,
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
      />
    </motion.div>
  );
}

/* ── Section ── */

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id="team"
      className="relative py-10 sm:py-12 lg:py-14 bg-bg-deep"
    >
      <motion.div
        key={replayKey}
        className="mx-auto max-w-[1400px] px-6 lg:px-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section heading — centered */}
        <motion.div
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="text-center mb-14 sm:mb-18"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
              The People
            </span>
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
          </div>

          <h2
            className="font-display font-[800] leading-[1.15] text-text-primary"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
          >
            Built by{" "}
            <span className="gradient-text italic">builders</span>
          </h2>
        </motion.div>

        {/* Grid — proper responsive with Tailwind */}
        <motion.div
          variants={
            prefersReduced
              ? undefined
              : {
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                  },
                }
          }
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {MEMBERS.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              index={i}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
