"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ITEMS = [
  "Multi-Agent Systems",
  "CrewAI Workflows",
  "AI Chatbots & Assistants",
  "RAG Platforms",
  "ComfyUI Pipelines",
  "Voice AI",
  "Data Preprocessing AI",
  "AI Brand Creatives",
];

function Diamond({ index }: { index: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.span
      className="mx-5 sm:mx-6 inline-block h-[8px] w-[8px] sm:h-[10px] sm:w-[10px] shrink-0 bg-accent-1"
      style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      }}
      animate={
        !prefersReduced
          ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }
          : {}
      }
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay: index * 0.3,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}

function MarqueeTrack({ offset }: { offset: number }) {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <Diamond index={offset + i} />
          <span className="opacity-40 transition-opacity duration-300 hover:opacity-80">
            {item}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-surface border-t border-b border-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={
        !prefersReduced
          ? { duration: 0.6, ease: "easeOut" }
          : { duration: 0 }
      }
    >
      <div
        className="marquee-wrapper flex w-full items-center py-6 sm:py-8 cursor-default"
      >
        <div
          className="marquee-track flex items-center font-display font-[800] text-text-secondary"
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
            animation: "marquee-scroll 120s linear infinite",
          }}
        >
          <MarqueeTrack offset={0} />
          <MarqueeTrack offset={ITEMS.length} />
        </div>
      </div>
    </motion.section>
  );
}
