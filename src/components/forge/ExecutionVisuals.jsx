import React, { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * Abstract Engineering Blueprint Scene for the "FROM CONCEPT TO EXECUTION" intro.
 * Uses crisp vector orthographics, structural planes, and restrained crimson paths.
 */
export function IntroBlueprintScene({ reducedMotion }) {
  const uid = useId().replace(/:/g, '');

  return (
    <div className="op-intro-blueprint" aria-hidden="true">
      <svg
        viewBox="0 0 640 420"
        className="w-full h-auto block"
        fill="none"
        role="presentation"
      >
        <defs>
          <radialGradient id={`introGlow-${uid}`} cx="62%" cy="46%" r="54%">
            <stop offset="0%" stopColor="#9F1027" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#490917" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#050608" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`silverStroke-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D9DEE5" stopOpacity="0.52" />
            <stop offset="50%" stopColor="#788898" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#788898" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id={`crimsonSignal-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C41E37" stopOpacity="0.25" />
            <stop offset="55%" stopColor="#DF2238" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#9F1027" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Ambient surface tone */}
        <rect x="0" y="0" width="640" height="420" fill={`url(#introGlow-${uid})`} />

        {/* Orthogonal technical blueprint datum lines */}
        <g stroke="rgba(120, 136, 152, 0.14)" strokeWidth="0.8">
          <line x1="24" y1="74" x2="616" y2="74" />
          <line x1="24" y1="210" x2="616" y2="210" strokeDasharray="4 6" />
          <line x1="24" y1="346" x2="616" y2="346" />
          <line x1="160" y1="22" x2="160" y2="398" strokeDasharray="3 6" />
          <line x1="360" y1="22" x2="360" y2="398" />
          <line x1="540" y1="22" x2="540" y2="398" strokeDasharray="3 6" />
        </g>

        {/* Subtle isometric system layers */}
        <g stroke={`url(#silverStroke-${uid})`} strokeWidth="1.2">
          {/* Layer 1: Constraint boundary plane */}
          <polygon points="320,62 504,132 320,202 136,132" fill="rgba(16, 19, 25, 0.48)" />
          {/* Layer 2: Protocol architecture core plane */}
          <polygon points="320,128 504,198 320,268 136,198" fill="rgba(16, 19, 25, 0.72)" stroke="#788898" strokeOpacity="0.45" />
          {/* Layer 3: Execution runtime plane */}
          <polygon points="320,196 504,266 320,336 136,266" fill="rgba(10, 12, 17, 0.85)" />

          {/* Vertical structural tie pillars */}
          <line x1="320" y1="62" x2="320" y2="336" strokeDasharray="3 4" />
          <line x1="136" y1="132" x2="136" y2="266" />
          <line x1="504" y1="132" x2="504" y2="266" />
        </g>

        {/* Active crimson signal path descending & looping across planes */}
        <motion.path
          d="M 188 132 L 320 182 L 444 198 L 320 250 L 210 266 L 320 318"
          stroke={`url(#crimsonSignal-${uid})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Nodes along structural vertices */}
        {[
          [188, 132, '#B5BAC4'],
          [320, 182, '#C41E37'],
          [444, 198, '#D9DEE5'],
          [320, 250, '#C41E37'],
          [320, 318, '#DF2238']
        ].map(([cx, cy, fill], idx) => (
          <g key={idx}>
            <circle cx={cx} cy={cy} r="7" fill="rgba(196, 30, 55, 0.12)" stroke="rgba(217, 222, 229, 0.25)" strokeWidth="0.8" />
            <circle cx={cx} cy={cy} r="3" fill={fill} />
          </g>
        ))}

        {/* Blueprint technical annotations */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.6" fill="#788898">
          <text x="24" y="64">DATUM // SPEC-00</text>
          <text x="616" y="64" textAnchor="end" fill="#94a3b8">ISOMETRIC LAYERED STACK</text>
          <text x="24" y="198">P01 // CONSTRAINTS</text>
          <text x="456" y="214" fill="#cbd5e1">P02 // PROTOCOLS</text>
          <text x="24" y="338">P03 // HARNESS</text>
          <text x="616" y="338" textAnchor="end" fill="#df2238">P04 // LOOP VALIDATION</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Phase 01 — Identify the Problem:
 * Investigative decomposition showing requirement fragments & constraints isolating
 * a highlighted central problem, linked from hypothesis to grounded evidence.
 */
function Stage01Visual({ reducedMotion }) {
  const uid = useId().replace(/:/g, '');
  const fragments = [
    { x: 24, y: 42, w: 184, tag: 'SYMPTOM 01', text: 'SINGLE-MODEL DRIFT' },
    { x: 24, y: 136, w: 184, tag: 'THREAT 02', text: 'EXTERNAL DATA EGRESS' },
    { x: 24, y: 230, w: 184, tag: 'CONSTRAINT 03', text: 'LOCAL HARDWARE LIMIT' }
  ];

  return (
    <svg viewBox="0 0 640 310" className="w-full h-auto block" fill="none" role="img" aria-label="Problem identification and constraint isolation schematic">
      <defs>
        <radialGradient id={`p1Spot-${uid}`} cx="56%" cy="50%" r="42%">
          <stop offset="0%" stopColor="#C41E37" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#050608" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="640" height="310" fill={`url(#p1Spot-${uid})`} />

      {/* Constraint probing paths converging onto central core problem */}
      <g stroke="#475569" strokeWidth="1.2" strokeDasharray="4 4">
        <path d="M 208 66 C 248 66, 258 134, 294 146" />
        <path d="M 208 158 L 294 158" />
        <path d="M 208 252 C 248 252, 258 182, 294 170" />
      </g>

      {/* Fragment nodes */}
      {fragments.map((f) => (
        <g key={f.tag}>
          <rect x={f.x} y={f.y} width={f.w} height="48" fill="rgba(16, 19, 25, 0.85)" stroke="rgba(120, 136, 152, 0.35)" strokeWidth="1" />
          <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 48} stroke="#64748b" strokeWidth="2.5" />
          <text x={f.x + 12} y={f.y + 18} fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.6" fill="#64748b">{f.tag}</text>
          <text x={f.x + 12} y={f.y + 35} fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1.2" fill="#cbd5e1">{f.text}</text>
        </g>
      ))}

      {/* Central Highlighted Core Problem */}
      <g>
        <rect x="294" y="108" width="166" height="100" fill="rgba(19, 23, 34, 0.94)" stroke="#C41E37" strokeWidth="1.5" />
        <rect x="301" y="115" width="152" height="86" fill="none" stroke="rgba(217, 222, 229, 0.14)" strokeWidth="0.8" />
        <circle cx="377" cy="134" r="4" fill="#DF2238" />
        <text x="377" y="154" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.8" fill="#C41E37" fontWeight="600">CORE PROBLEM</text>
        <text x="377" y="172" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="12.5" fontWeight="700" fill="#F4F4F5">AIR-GAPPED</text>
        <text x="377" y="188" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="12.5" fontWeight="700" fill="#F4F4F5">DELIBERATION</text>
      </g>

      {/* Hypothesis -> Evidence verification path */}
      <motion.path
        d="M 460 158 L 516 158"
        stroke="#DF2238"
        strokeWidth="2"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <polygon points="514,153 524,158 514,163" fill="#DF2238" />

      <g>
        <rect x="524" y="96" width="96" height="124" fill="rgba(10, 12, 17, 0.9)" stroke="rgba(217, 222, 229, 0.28)" strokeWidth="1" />
        <text x="572" y="120" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1.4" fill="#94a3b8">EVIDENCE</text>
        <line x1="538" y1="130" x2="606" y2="130" stroke="rgba(120,136,152,0.28)" strokeWidth="0.8" />
        <text x="536" y="150" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#cbd5e1">LOCAL INFERENCE</text>
        <text x="536" y="170" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#cbd5e1">MULTI-MODEL</text>
        <text x="536" y="190" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#df2238">ZERO EGRESS</text>
      </g>
    </svg>
  );
}

/**
 * Phase 02 — Design the Architecture:
 * Typed boundary schematic detailing Client Interface, IPC Socket Bridge, and Target Runtime.
 */
function Stage02Visual({ reducedMotion }) {
  const columns = [
    { x: 22, w: 162, title: 'AI REASONING', sub: 'MCP CLIENT / CODEX', accent: '#788898' },
    { x: 238, w: 164, title: 'IPC SOCKET BRIDGE', sub: 'TYPED JSON SCHEMA', accent: '#C41E37' },
    { x: 456, w: 162, title: 'UNREAL RUNTIME', sub: 'ACTORS / VIEWPORT', accent: '#D9DEE5' }
  ];

  return (
    <svg viewBox="0 0 640 310" className="w-full h-auto block" fill="none" role="img" aria-label="Architecture and typed IPC protocol blueprint">
      {/* Precision blueprint frame lines */}
      <line x1="22" y1="32" x2="618" y2="32" stroke="rgba(120,136,152,0.2)" strokeWidth="0.8" />
      <text x="24" y="22" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.8" fill="#64748b">PROTOCOL BOUNDARY SCHEMATIC // TYPED CONTRACT LAYER</text>

      {columns.map((col) => (
        <g key={col.title}>
          <rect x={col.x} y="58" width={col.w} height="196" fill="rgba(14, 17, 23, 0.88)" stroke="rgba(120, 136, 152, 0.34)" strokeWidth="1" />
          <line x1={col.x} y1="58" x2={col.x + col.w} y2="58" stroke={col.accent} strokeWidth="2.5" />
          <text x={col.x + 14} y="86" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="700" fill="#F4F4F5">{col.title}</text>
          <text x={col.x + 14} y="104" fontFamily="IBM Plex Mono, monospace" fontSize="8.8" letterSpacing="1.2" fill="#94a3b8">{col.sub}</text>
          <line x1={col.x + 14} y1="118" x2={col.x + col.w - 14} y2="118" stroke="rgba(120,136,152,0.22)" strokeWidth="0.8" />
          <rect x={col.x + 14} y="134" width={col.w - 28} height="34" fill="rgba(5, 6, 8, 0.65)" stroke="rgba(120,136,152,0.2)" strokeWidth="0.8" />
          <rect x={col.x + 14} y="182" width={col.w - 28} height="34" fill="rgba(5, 6, 8, 0.65)" stroke="rgba(120,136,152,0.2)" strokeWidth="0.8" />
          <rect x={col.x + 14} y="228" width={col.w - 28} height="12" fill="rgba(196, 30, 55, 0.12)" />
        </g>
      ))}

      {/* Internal schema identifiers */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#cbd5e1">
        <text x="46" y="155">TOOL DISPATCH()</text>
        <text x="46" y="203">STATE QUERY()</text>
        <text x="262" y="155" fill="#df2238">VALIDATE SCHEMA</text>
        <text x="262" y="203">ASYNC DISPATCH</text>
        <text x="480" y="155">ACTOR GRAPH</text>
        <text x="480" y="203">EDITOR API</text>
      </g>

      {/* Bi-directional typed data paths */}
      <motion.path
        d="M 184 150 L 238 150 M 402 150 L 456 150"
        stroke="#DF2238"
        strokeWidth="2"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M 456 198 L 402 198 M 238 198 L 184 198"
        stroke="#788898"
        strokeWidth="1.6"
        strokeDasharray="4 3"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Interface boundary labels */}
      <text x="211" y="140" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#df2238">REQ</text>
      <text x="429" y="140" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#df2238">IPC</text>
      <text x="429" y="215" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#94a3b8">ACK</text>
      <text x="211" y="215" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#94a3b8">RES</text>

      <text x="24" y="286" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.6" fill="#788898">LATENCY ENVELOPE: DETERMINISTIC SUB-2MS IPC CONTRACT</text>
    </svg>
  );
}

/**
 * Phase 03 — Build the System:
 * Modular harness assembly where independent subsystems lock into an active runtime core.
 */
function Stage03Visual({ reducedMotion }) {
  const modules = [
    { x: 24, y: 40, name: 'SCHEMA GEN', code: 'json_schema.build()', dx: -10 },
    { x: 24, y: 128, name: 'TEST HARNESS', code: 'assert_mcp_io()', dx: -10 },
    { x: 24, y: 216, name: 'CLI PACKAGING', code: 'bundle.connector()', dx: -10 }
  ];

  return (
    <svg viewBox="0 0 640 310" className="w-full h-auto block" fill="none" role="img" aria-label="Modular system build and runtime assembly">
      {/* Assembling left modules */}
      {modules.map((m, idx) => (
        <motion.g
          key={m.name}
          initial={reducedMotion ? false : { opacity: 0.25, x: m.dx }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x={m.x} y={m.y} width="194" height="58" fill="rgba(16, 19, 25, 0.9)" stroke="rgba(120, 136, 152, 0.38)" strokeWidth="1" />
          <text x={m.x + 14} y={m.y + 23} fontFamily="Space Grotesk, sans-serif" fontSize="11.5" fontWeight="700" fill="#E4E7ED">{m.name}</text>
          <text x={m.x + 14} y={m.y + 42} fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#94a3b8">{m.code}</text>
          <circle cx={m.x + 194} cy={m.y + 29} r="3.5" fill="#C41E37" />
        </motion.g>
      ))}

      {/* Integration conduits powering central FastMCP bus */}
      <motion.path
        d="M 218 69 L 294 128 M 218 157 L 294 157 M 218 245 L 294 186"
        stroke="#C41E37"
        strokeWidth="1.8"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Core FastMCP Runtime Assembly Block */}
      <g>
        <rect x="294" y="64" width="176" height="186" fill="rgba(19, 23, 34, 0.95)" stroke="#788898" strokeWidth="1.4" />
        <rect x="302" y="72" width="160" height="170" fill="none" stroke="rgba(196, 30, 55, 0.38)" strokeWidth="1" />
        <text x="382" y="102" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.6" fill="#C41E37">RUNTIME BUS</text>
        <text x="382" y="126" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="15" fontWeight="700" fill="#FFFFFF">FASTMCP CORE</text>
        <line x1="316" y1="142" x2="448" y2="142" stroke="rgba(120,136,152,0.28)" strokeWidth="0.9" />
        <text x="318" y="164" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#cbd5e1">@mcp.tool()</text>
        <text x="318" y="184" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#cbd5e1">def execute_connector():</text>
        <text x="318" y="204" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#788898">  return contract.verify()</text>
      </g>

      {/* Output pipeline arrow to Connector Artifact */}
      <motion.path
        d="M 470 157 L 518 157"
        stroke="#D9DEE5"
        strokeWidth="2"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <rect x="518" y="112" width="100" height="90" fill="rgba(12, 14, 19, 0.94)" stroke="#C41E37" strokeWidth="1.3" />
      <text x="568" y="148" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1.4" fill="#df2238">BUILT</text>
      <text x="568" y="168" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="11.5" fontWeight="700" fill="#F4F4F5">SECURE</text>
      <text x="568" y="184" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="11.5" fontWeight="700" fill="#F4F4F5">CONNECTOR</text>
    </svg>
  );
}

/**
 * Phase 04 — Validate the Result:
 * Verification checkpoints with explicit non-linear crimson corrective feedback loop
 * demonstrating that failed checks route back to refine architecture and code.
 */
function Stage04Visual({ reducedMotion }) {
  const checkpoints = [
    { x: 24, label: 'GATE 01', name: 'LIGAND PREP' },
    { x: 184, label: 'GATE 02', name: 'VINA DOCKING' },
    { x: 344, label: 'GATE 03', name: '1IEP RMSD CHECK' }
  ];

  return (
    <svg viewBox="0 0 640 310" className="w-full h-auto block" fill="none" role="img" aria-label="Validation checkpoints and corrective iteration feedback loop">
      <text x="24" y="24" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.8" fill="#64748b">EMPIRICAL CHECKPOINTS &amp; NON-LINEAR REFINEMENT LOOP</text>

      {/* Checkpoint nodes */}
      {checkpoints.map((cp, idx) => (
        <g key={cp.label}>
          <rect x={cp.x} y="66" width="132" height="72" fill="rgba(16, 19, 25, 0.9)" stroke={idx === 2 ? '#C41E37' : 'rgba(120, 136, 152, 0.36)'} strokeWidth="1.2" />
          <text x={cp.x + 12} y="90" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1.4" fill={idx === 2 ? '#df2238' : '#788898'}>{cp.label}</text>
          <text x={cp.x + 12} y="114" fontFamily="Space Grotesk, sans-serif" fontSize="11.5" fontWeight="700" fill="#F4F4F5">{cp.name}</text>
          {idx < 2 && (
            <line x1={cp.x + 132} y1="102" x2={cp.x + 160} y2="102" stroke="#788898" strokeWidth="1.5" />
          )}
        </g>
      ))}

      {/* Pass branch -> Ground-Truth Reference */}
      <motion.path
        d="M 476 102 L 516 102"
        stroke="#D9DEE5"
        strokeWidth="1.8"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
      <rect x="516" y="66" width="102" height="72" fill="rgba(12, 14, 19, 0.94)" stroke="rgba(217, 222, 229, 0.35)" strokeWidth="1" />
      <text x="567" y="92" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#94a3b8">PASS THRESHOLD</text>
      <text x="567" y="113" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="11.5" fontWeight="700" fill="#F4F4F5">1IEP BASELINE</text>

      {/* Explicit Failed Check -> Backtrack Iteration Loop (Non-Linear Engineering) */}
      <motion.path
        d="M 410 138 C 410 236, 168 236, 90 138"
        stroke="#DF2238"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Arrowhead pointing UP-BACK to Gate 01 / earlier stages */}
      <polygon points="84,146 90,136 97,146" fill="#DF2238" />

      {/* Corrective loop annotation pill */}
      <rect x="136" y="198" width="286" height="32" fill="#050608" stroke="#C41E37" strokeWidth="1" />
      <text x="279" y="218" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.2" fill="#df2238">
        TEST FAILURE -&gt; REFINE STAGE 02 / 03
      </text>

      <text x="24" y="280" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.6" fill="#788898">
        NON-LINEAR VALIDATION: FAILED CHECKS TRIGGER PARAMETER &amp; SCHEMA ITERATION
      </text>
    </svg>
  );
}

export function StageEngineeringVisual({ stageIndex, reducedMotion }) {
  switch (stageIndex) {
    case 0:
      return <Stage01Visual reducedMotion={reducedMotion} />;
    case 1:
      return <Stage02Visual reducedMotion={reducedMotion} />;
    case 2:
      return <Stage03Visual reducedMotion={reducedMotion} />;
    case 3:
    default:
      return <Stage04Visual reducedMotion={reducedMotion} />;
  }
}
