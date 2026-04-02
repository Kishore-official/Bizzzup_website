"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { EXPO_OUT } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Workflow Step Data                                                  */
/* ------------------------------------------------------------------ */

interface WorkflowStep {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel: string;
  icon: string; // SVG path data
  accent: 1 | 2 | 3;
  delay: number;
}

const STEPS: WorkflowStep[] = [
  {
    id: "trigger",
    x: 20,
    y: 170,
    w: 120,
    h: 72,
    label: "Trigger",
    sublabel: "Webhook / Schedule",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: 1,
    delay: 0,
  },
  {
    id: "enrich",
    x: 190,
    y: 100,
    w: 120,
    h: 72,
    label: "Enrich Data",
    sublabel: "RAG + Context",
    icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M9 12h6M12 9v6M1 4h22",
    accent: 2,
    delay: 0.12,
  },
  {
    id: "analyze",
    x: 190,
    y: 240,
    w: 120,
    h: 72,
    label: "AI Analysis",
    sublabel: "Multi-Model",
    icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10l2 2 4-4",
    accent: 3,
    delay: 0.18,
  },
  {
    id: "decide",
    x: 360,
    y: 170,
    w: 120,
    h: 72,
    label: "Decision",
    sublabel: "Agent Router",
    icon: "M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9",
    accent: 1,
    delay: 0.28,
  },
  {
    id: "execute",
    x: 530,
    y: 110,
    w: 120,
    h: 72,
    label: "Execute",
    sublabel: "API / Workflow",
    icon: "M13 2L3 14h9l-1 10 10-12h-9l1-10z",
    accent: 2,
    delay: 0.38,
  },
  {
    id: "store",
    x: 530,
    y: 230,
    w: 120,
    h: 72,
    label: "Store",
    sublabel: "Vector DB",
    icon: "M12 2C6.5 2 2 4.5 2 7v10c0 2.5 4.5 5 10 5s10-2.5 10-5V7c0-2.5-4.5-5-10-5zM2 12c0 2.5 4.5 5 10 5s10-2.5 10-5",
    accent: 3,
    delay: 0.42,
  },
];

/* Connector paths between steps */
interface Connector {
  path: string;
  delay: number;
}

const CONNECTORS: Connector[] = [
  // Trigger → splits to Enrich & Analyze
  {
    path: "M140 206 Q165 206 165 168 Q165 136 190 136",
    delay: 0.5,
  },
  {
    path: "M140 206 Q165 206 165 244 Q165 276 190 276",
    delay: 0.55,
  },
  // Enrich → Decision
  {
    path: "M310 136 Q335 136 335 174 Q335 206 360 206",
    delay: 0.7,
  },
  // Analyze → Decision
  {
    path: "M310 276 Q335 276 335 238 Q335 206 360 206",
    delay: 0.75,
  },
  // Decision → splits to Execute & Store
  {
    path: "M480 206 Q505 206 505 178 Q505 146 530 146",
    delay: 0.9,
  },
  {
    path: "M480 206 Q505 206 505 234 Q505 266 530 266",
    delay: 0.95,
  },
];

/* ------------------------------------------------------------------ */
/*  Animated data particle along a path                                */
/* ------------------------------------------------------------------ */

function DataParticle({
  path,
  delay,
  reduced,
  inView,
}: {
  path: string;
  delay: number;
  reduced: boolean;
  inView: boolean;
}) {
  if (reduced || !inView) return null;

  const dur = 2.8 + Math.random() * 0.6;
  const begin = 3.5 + delay * 2;

  return (
    <>
      {/* Main particle */}
      <circle r={3} opacity={0} style={{ fill: "var(--color-accent-1)" }}>
        <animate
          attributeName="opacity"
          values="0;0.7;0.7;0"
          dur={`${dur}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
        />
        <animateMotion
          dur={`${dur}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
      {/* Trail particle */}
      <circle r={2} opacity={0} style={{ fill: "var(--color-accent-2)" }}>
        <animate
          attributeName="opacity"
          values="0;0.4;0.4;0"
          dur={`${dur}s`}
          begin={`${begin + 0.15}s`}
          repeatCount="indefinite"
        />
        <animateMotion
          dur={`${dur}s`}
          begin={`${begin + 0.15}s`}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Card                                                          */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  inView,
  reduced,
}: {
  step: WorkflowStep;
  inView: boolean;
  reduced: boolean;
}) {
  const accentVar = `var(--color-accent-${step.accent})`;
  const baseDelay = 1.2 + step.delay;

  return (
    <motion.g
      initial={reduced ? {} : { opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay: baseDelay, ease: EXPO_OUT }}
    >
      {/* Card shadow */}
      <rect
        x={step.x + 1}
        y={step.y + 2}
        width={step.w}
        height={step.h}
        rx={10}
        style={{ fill: "var(--color-border)" }}
        opacity={0.3}
      />

      {/* Card background */}
      <rect
        x={step.x}
        y={step.y}
        width={step.w}
        height={step.h}
        rx={10}
        style={{
          fill: "var(--color-bg-card)",
          stroke: "var(--color-border)",
        }}
        strokeWidth={1}
      />

      {/* Top accent bar */}
      <rect
        x={step.x}
        y={step.y}
        width={step.w}
        height={3}
        rx={1.5}
        style={{ fill: accentVar }}
        opacity={0.6}
      />

      {/* Icon circle */}
      <circle
        cx={step.x + 18}
        cy={step.y + 30}
        r={11}
        style={{ fill: accentVar }}
        opacity={0.08}
      />

      {/* Icon */}
      <g
        transform={`translate(${step.x + 9}, ${step.y + 21}) scale(0.72)`}
      >
        <path
          d={step.icon}
          stroke={accentVar}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Label */}
      <text
        x={step.x + 35}
        y={step.y + 27}
        style={{
          fill: "var(--color-text-primary)",
          fontFamily: "var(--font-display)",
          fontSize: 10.5,
          fontWeight: 700,
        }}
      >
        {step.label}
      </text>

      {/* Sublabel */}
      <text
        x={step.x + 35}
        y={step.y + 40}
        style={{
          fill: "var(--color-text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: 7,
          letterSpacing: "0.02em",
        }}
      >
        {step.sublabel}
      </text>

      {/* Status indicator */}
      <motion.g
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: baseDelay + 0.6 }}
      >
        <circle
          cx={step.x + step.w - 14}
          cy={step.y + 58}
          r={3}
          style={{ fill: accentVar }}
          opacity={0.2}
        />
        {!reduced && (
          <circle
            cx={step.x + step.w - 14}
            cy={step.y + 58}
            r={3}
            style={{ fill: accentVar }}
            opacity={0}
          >
            <animate
              attributeName="r"
              values="3;6;3"
              dur="3s"
              begin={`${3.5 + step.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0;0.2"
              dur="3s"
              begin={`${3.5 + step.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        )}
        <text
          x={step.x + step.w - 24}
          y={step.y + 61}
          textAnchor="end"
          style={{
            fill: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: 6.5,
          }}
        >
          Active
        </text>
      </motion.g>
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/*  Connector Line                                                     */
/* ------------------------------------------------------------------ */

function ConnectorLine({
  connector,
  inView,
  reduced,
}: {
  connector: Connector;
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <motion.path
      d={connector.path}
      style={{ stroke: "var(--color-border-hover)" }}
      strokeWidth={1.5}
      fill="none"
      strokeDasharray={200}
      initial={reduced ? { strokeDashoffset: 0, opacity: 0.5 } : { strokeDashoffset: 200, opacity: 0 }}
      animate={inView ? { strokeDashoffset: 0, opacity: 0.5 } : undefined}
      transition={{ duration: 0.8, delay: 1.6 + connector.delay, ease: EXPO_OUT }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Branch diamond (split point visual)                                */
/* ------------------------------------------------------------------ */

function BranchDiamond({
  cx,
  cy,
  delay,
  inView,
  reduced,
}: {
  cx: number;
  cy: number;
  delay: number;
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <motion.g
      initial={reduced ? {} : { opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.4, delay: 1.8 + delay, ease: EXPO_OUT }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <rect
        x={cx - 6}
        y={cy - 6}
        width={12}
        height={12}
        rx={2}
        transform={`rotate(45 ${cx} ${cy})`}
        style={{
          fill: "var(--color-bg-card)",
          stroke: "var(--color-accent-1)",
        }}
        strokeWidth={1}
      />
      <circle
        cx={cx}
        cy={cy}
        r={2}
        style={{ fill: "var(--color-accent-1)" }}
        opacity={0.5}
      />
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-aware wrapper                                               */
/* ------------------------------------------------------------------ */

function ScrollFade({
  children,
  scrollProgress,
}: {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.8, 0]);
  const scale = useTransform(scrollProgress, [0, 0.5], [1, 0.94]);
  const y = useTransform(scrollProgress, [0, 0.5], [0, -20]);

  return (
    <motion.g style={{ opacity, scale, y, transformOrigin: "340px 206px" }}>
      {children}
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface WorkflowCanvasProps {
  mode: "entrance" | "scroll";
  inView: boolean;
  reduced: boolean;
  scrollProgress?: MotionValue<number>;
}

/* ------------------------------------------------------------------ */
/*  Main WorkflowCanvas                                                */
/* ------------------------------------------------------------------ */

export default function WorkflowCanvas({
  mode,
  inView,
  reduced,
  scrollProgress,
}: WorkflowCanvasProps) {
  const isScroll = mode === "scroll" && scrollProgress && !reduced;

  const content = (
    <>
      {/* Subtle grid background */}
      <defs>
        <pattern
          id="wf-grid"
          width={24}
          height={24}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 0H0v24"
            fill="none"
            style={{ stroke: "var(--color-border)" }}
            strokeWidth={0.3}
            opacity={0.5}
          />
        </pattern>
      </defs>
      <motion.rect
        x={0}
        y={60}
        width={680}
        height={300}
        rx={16}
        fill="url(#wf-grid)"
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Canvas border (workspace feel) */}
      <motion.rect
        x={4}
        y={64}
        width={672}
        height={292}
        rx={14}
        fill="none"
        style={{ stroke: "var(--color-border)" }}
        strokeWidth={0.5}
        strokeDasharray="4 4"
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 0.4 } : undefined}
        transition={{ duration: 0.8, delay: 0.9 }}
      />

      {/* Connector lines */}
      {CONNECTORS.map((c, i) => (
        <ConnectorLine key={`conn-${i}`} connector={c} inView={inView} reduced={reduced} />
      ))}

      {/* Branch point diamonds */}
      <BranchDiamond cx={155} cy={206} delay={0} inView={inView} reduced={reduced} />
      <BranchDiamond cx={345} cy={206} delay={0.25} inView={inView} reduced={reduced} />
      <BranchDiamond cx={515} cy={206} delay={0.45} inView={inView} reduced={reduced} />

      {/* Data flow particles */}
      {CONNECTORS.map((c, i) => (
        <DataParticle
          key={`particle-${i}`}
          path={c.path}
          delay={c.delay}
          reduced={reduced}
          inView={inView}
        />
      ))}

      {/* Step cards */}
      {STEPS.map((step) => (
        <StepCard key={step.id} step={step} inView={inView} reduced={reduced} />
      ))}

      {/* "Live" badge top-left */}
      <motion.g
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 3.0 }}
      >
        <rect
          x={16}
          y={76}
          width={60}
          height={20}
          rx={10}
          style={{ fill: "var(--color-accent-2)" }}
          opacity={0.1}
        />
        {!reduced && (
          <circle cx={30} cy={86} r={3} style={{ fill: "var(--color-accent-2)" }}>
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        {reduced && (
          <circle cx={30} cy={86} r={3} style={{ fill: "var(--color-accent-2)" }} opacity={0.6} />
        )}
        <text
          x={40}
          y={90}
          style={{
            fill: "var(--color-accent-2)",
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}
        >
          LIVE
        </text>
      </motion.g>

      {/* Step counter top-right */}
      <motion.g
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 3.2 }}
      >
        <text
          x={660}
          y={90}
          textAnchor="end"
          style={{
            fill: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: "0.04em",
          }}
        >
          6 steps · 3 agents
        </text>
      </motion.g>
    </>
  );

  return (
    <svg
      viewBox="-10 60 700 280"
      fill="none"
      className="w-full max-w-full mx-auto"
    >
      {isScroll ? (
        <ScrollFade scrollProgress={scrollProgress}>{content}</ScrollFade>
      ) : (
        content
      )}
    </svg>
  );
}
