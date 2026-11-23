import React, { useRef, useState, useMemo } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';

/**
 * ForgeAssemblyStructure
 *
 * An original 3D architectural engineering structure for "THE FORGE".
 * Built with layered SVG hardware acceleration and 3D perspective transforms.
 *
 * Mechanical Layers:
 * - Layer 1: Structural Chassis & Foundation Frame (Stage 01: IDENTIFY THE PROBLEM)
 * - Layer 2: Architecture Bus & Interconnect Lattice (Stage 02: DESIGN THE ARCHITECTURE)
 * - Layer 3: 4 Precision Engine Modules (Stage 03: BUILD THE SYSTEM)
 * - Layer 4: Hardened Validation Shroud & Diagnostics (Stage 04: VALIDATE THE RESULT)
 */
export default function ForgeAssemblyStructure({ scrollProgress, activeStage = 1, onStageSelect }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredModule, setHoveredModule] = useState(null);

  // Fallback if scrollProgress is undefined
  const defaultMotionValue = useMemo(() => ({ get: () => 0.25 }), []);
  const progress = scrollProgress || defaultMotionValue;

  // Scroll-controlled dynamic assembly transformations
  // Stage 01: Chassis anchor (0.0 -> 0.3)
  const chassisOpacity = useTransform(progress, [0, 0.15], [0.4, 1]);
  const chassisScale = useTransform(progress, [0, 0.25], [0.92, 1]);

  // Stage 02: Bus & Conduit connection (0.2 -> 0.5)
  const busProgress = useTransform(progress, [0.15, 0.45], [0, 1]);
  const conduitDashOffset = useTransform(progress, [0.15, 0.45], [100, 0]);

  // Stage 03: 4 Modules docking from corners toward center (0.4 -> 0.75)
  const moduleOffsetX = useTransform(progress, [0.4, 0.7], [35, 0]);
  const moduleOffsetY = useTransform(progress, [0.4, 0.7], [35, 0]);
  const negModuleOffsetX = useTransform(moduleOffsetX, (v) => -v);
  const negModuleOffsetY = useTransform(moduleOffsetY, (v) => -v);
  const moduleOpacity = useTransform(progress, [0.35, 0.6], [0.2, 1]);

  // Stage 04: Top Shroud & Validation lock (0.65 -> 0.95)
  const shroudScale = useTransform(progress, [0.65, 0.9], [1.15, 1]);
  const shroudOpacity = useTransform(progress, [0.65, 0.85], [0, 1]);
  const diagnosticGlow = useTransform(progress, [0.75, 1], [0.3, 1]);

  // Mouse perspective tilt
  const handlePointerMove = (e) => {
    if (shouldReduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: (-py * 12).toFixed(2),
      y: (px * 12).toFixed(2)
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Module definitions for hover annotations & interaction
  const modules = [
    {
      id: 'mcp-harness',
      name: 'FORGE // MCP PROTOCOL ADAPTER',
      spec: 'FastMCP • Dynamic Tool Schemas • Zero-Leak Sandbox',
      status: 'RUNTIME // VERIFIED',
      stage: 3
    },
    {
      id: 'ipc-bridge',
      name: 'UE5 // SOCKET IPC BRIDGE',
      spec: 'Low-Latency TCP/IPC • Viewport Control • Realtime Telemetry',
      status: 'LATENCY // SUB-2MS',
      stage: 2
    },
    {
      id: 'local-consensus',
      name: 'TRIAD // OFFLINE CONSENSUS CORE',
      spec: 'Multi-Model Deliberation • Decentralized Execution • Zero Cloud Exposure',
      status: 'ISOLATION // 100%',
      stage: 1
    },
    {
      id: 'dockpipe-rig',
      name: 'DOCKPIPE // 1IEP BENCHMARK RIG',
      spec: 'AutoDock Vina • RDKit Ligand Prep • Empirical Redocking Suite',
      status: 'RMSD // GROUND_TRUTH',
      stage: 4
    }
  ];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="forge-stage-wrap"
      aria-label="The Forge 3D Architectural Engineering Structure"
      role="region"
    >
      <div
        className="forge-stage-perspective"
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="forge-svg-container select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Gradients */}
            <linearGradient id="chassisSteel" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a202c" />
              <stop offset="35%" stopColor="#0f131a" />
              <stop offset="70%" stopColor="#161b24" />
              <stop offset="100%" stopColor="#0a0d13" />
            </linearGradient>

            <linearGradient id="milledPlateBevel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="busConduitGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="crimsonLaserGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c1121f" />
              <stop offset="50%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#780000" />
            </linearGradient>

            {/* Glowing Laser Filters */}
            <filter id="forgeLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="forgeIntenseGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* =================================================================
              LAYER 1: STRUCTURAL CHASSIS & FOUNDATION FRAME (STAGE 01)
              ================================================================= */}
          <motion.g
            id="layer-1-chassis"
            style={{
              opacity: shouldReduceMotion ? 1 : chassisOpacity,
              scale: shouldReduceMotion ? 1 : chassisScale,
              transformOrigin: '300px 300px'
            }}
          >
            {/* Outer Structural Steel Base Plate with chamfered corners */}
            <path
              d="M 120 70 L 480 70 L 530 120 L 530 480 L 480 530 L 120 530 L 70 480 L 70 120 Z"
              fill="url(#chassisSteel)"
              stroke="#263143"
              strokeWidth="2"
            />

            {/* Inner Recessed Chassis Cavity */}
            <path
              d="M 135 90 L 465 90 L 510 135 L 510 465 L 465 510 L 135 510 L 90 465 L 90 135 Z"
              fill="#080b10"
              stroke="#1b2330"
              strokeWidth="1.5"
            />

            {/* Precision Datum Crosshairs & Calibration Scales */}
            <g opacity="0.65" stroke="#334155" strokeWidth="1">
              {/* Horizontal & Vertical Axis */}
              <line x1="70" y1="300" x2="530" y2="300" strokeDasharray="3 6" />
              <line x1="300" y1="70" x2="300" y2="530" strokeDasharray="3 6" />

              {/* Central Target Reticle */}
              <circle cx="300" cy="300" r="45" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              <circle cx="300" cy="300" r="15" stroke="#c1121f" strokeWidth="1.5" fill="none" filter="url(#forgeLaserGlow)" />
              <circle cx="300" cy="300" r="3" fill="#c1121f" />

              {/* Outer Dimension Ticks */}
              {[150, 200, 250, 350, 400, 450].map((pos) => (
                <React.Fragment key={`tick-${pos}`}>
                  <line x1={pos} y1="65" x2={pos} y2="75" stroke="#64748b" strokeWidth="1.5" />
                  <line x1={pos} y1="525" x2={pos} y2="535" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="65" y1={pos} x2="75" y2={pos} stroke="#64748b" strokeWidth="1.5" />
                  <line x1="525" y1={pos} x2="535" y2={pos} stroke="#64748b" strokeWidth="1.5" />
                </React.Fragment>
              ))}
            </g>

            {/* 4 Corner Heavy Mounting Bolts */}
            {[
              { cx: 120, cy: 120 },
              { cx: 480, cy: 120 },
              { cx: 480, cy: 480 },
              { cx: 120, cy: 480 }
            ].map((bolt, i) => (
              <g key={`bolt-${i}`}>
                <circle cx={bolt.cx} cy={bolt.cy} r="9" fill="#1e2633" stroke="#475569" strokeWidth="1.5" />
                <circle cx={bolt.cx} cy={bolt.cy} r="5" fill="#0b0e14" />
                <line x1={bolt.cx - 6} y1={bolt.cy} x2={bolt.cx + 6} y2={bolt.cy} stroke="#64748b" strokeWidth="1" />
              </g>
            ))}

            {/* Stage 01 Active Alignment Lasers */}
            <rect
              x="130"
              y="130"
              width="340"
              height="340"
              stroke="#c1121f"
              strokeWidth="1.5"
              strokeDasharray="12 12"
              fill="none"
              opacity={activeStage >= 1 ? 0.8 : 0.25}
              filter={activeStage >= 1 ? "url(#forgeLaserGlow)" : undefined}
            />

            {/* Technical Markings */}
            <text x="140" y="85" fill="#64748b" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="0.2em">
              DATUM // CHASSIS_FRAME_A0
            </text>
            <text x="360" y="85" fill="#c1121f" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="0.2em">
              BOUNDARIES // RIGID_INVARIANTS
            </text>
          </motion.g>

          {/* =================================================================
              LAYER 2: ARCHITECTURE BUS & INTERCONNECT LATTICE (STAGE 02)
              ================================================================= */}
          <motion.g
            id="layer-2-bus"
            style={{
              opacity: shouldReduceMotion ? 1 : busProgress,
              transformOrigin: '300px 300px'
            }}
          >
            {/* Primary Bus Cross Conduit Tracks */}
            <path
              d="M 170 300 L 430 300 M 300 170 L 300 430"
              stroke="#2e3a4d"
              strokeWidth="18"
              strokeLinecap="square"
            />
            <path
              d="M 170 300 L 430 300 M 300 170 L 300 430"
              stroke="url(#busConduitGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Diagonal Bus Interconnects */}
            <line x1="210" y1="210" x2="390" y2="390" stroke="#1f293d" strokeWidth="3" />
            <line x1="390" y1="210" x2="210" y2="390" stroke="#1f293d" strokeWidth="3" />

            {/* Active Flowing Crimson Data Conduits */}
            <motion.path
              d="M 170 300 L 300 300 L 300 170 M 430 300 L 300 300 L 300 430"
              stroke="url(#crimsonLaserGrad)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="8 8"
              style={{
                strokeDashoffset: shouldReduceMotion ? 0 : conduitDashOffset
              }}
              filter="url(#forgeLaserGlow)"
            />

            {/* 4 Protocol Node Gateways */}
            {[
              { x: 300, y: 170, label: 'SOCKET_IN' },
              { x: 430, y: 300, label: 'IPC_OUT' },
              { x: 300, y: 430, label: 'BUS_SYNC' },
              { x: 170, y: 300, label: 'MCP_PIPE' }
            ].map((node, i) => (
              <g key={`gateway-${i}`}>
                <rect x={node.x - 12} y={node.y - 12} width="24" height="24" fill="#0d1117" stroke="#3b82f6" strokeWidth="1" />
                <circle cx={node.x} cy={node.y} r="5" fill="#c1121f" filter="url(#forgeLaserGlow)" />
              </g>
            ))}

            <text x="210" y="295" fill="#94a3b8" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="0.15em">
              INTERCONNECT // TYPED_SCHEMAS
            </text>
          </motion.g>

          {/* =================================================================
              LAYER 3: 4 PRECISION ENGINE MODULES (STAGE 03)
              ================================================================= */}
          <g id="layer-3-modules">
            {/* Top-Left: Module 01 (MCP PROTOCOL ADAPTER) */}
            <motion.g
              style={{
                x: shouldReduceMotion ? 0 : negModuleOffsetX,
                y: shouldReduceMotion ? 0 : negModuleOffsetY,
                opacity: shouldReduceMotion ? 1 : moduleOpacity
              }}
              onMouseEnter={() => setHoveredModule(modules[0])}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => onStageSelect?.(3)}
              className="cursor-pointer"
            >
              <rect
                x="145"
                y="145"
                width="120"
                height="120"
                rx="2"
                fill="url(#milledPlateBevel)"
                stroke={hoveredModule?.id === 'mcp-harness' ? '#c1121f' : '#334155'}
                strokeWidth={hoveredModule?.id === 'mcp-harness' ? '2' : '1.5'}
              />
              <rect x="150" y="150" width="110" height="110" fill="#0b0e14" stroke="#1f2735" strokeWidth="1" />
              {/* Internal micro-circuit pattern */}
              <line x1="160" y1="170" x2="220" y2="170" stroke="#64748b" strokeWidth="1" />
              <line x1="220" y1="170" x2="220" y2="200" stroke="#64748b" strokeWidth="1" />
              <circle cx="220" cy="200" r="3" fill="#c1121f" filter="url(#forgeLaserGlow)" />
              <text x="160" y="195" fill="#cbd5e1" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700">
                M01 // FORGE
              </text>
              <text x="160" y="210" fill="#94a3b8" fontFamily="'IBM Plex Mono', monospace" fontSize="7" letterSpacing="0.08em">
                MCP RUNTIME
              </text>
              <circle cx="245" cy="160" r="3" fill="#22c55e" />
            </motion.g>

            {/* Top-Right: Module 02 (UE5 SOCKET IPC BRIDGE) */}
            <motion.g
              style={{
                x: shouldReduceMotion ? 0 : moduleOffsetX,
                y: shouldReduceMotion ? 0 : negModuleOffsetY,
                opacity: shouldReduceMotion ? 1 : moduleOpacity
              }}
              onMouseEnter={() => setHoveredModule(modules[1])}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => onStageSelect?.(2)}
              className="cursor-pointer"
            >
              <rect
                x="335"
                y="145"
                width="120"
                height="120"
                rx="2"
                fill="url(#milledPlateBevel)"
                stroke={hoveredModule?.id === 'ipc-bridge' ? '#c1121f' : '#334155'}
                strokeWidth={hoveredModule?.id === 'ipc-bridge' ? '2' : '1.5'}
              />
              <rect x="340" y="150" width="110" height="110" fill="#0b0e14" stroke="#1f2735" strokeWidth="1" />
              {/* Internal micro-circuit pattern */}
              <line x1="380" y1="170" x2="440" y2="170" stroke="#64748b" strokeWidth="1" />
              <line x1="380" y1="170" x2="380" y2="210" stroke="#64748b" strokeWidth="1" />
              <circle cx="380" cy="210" r="3" fill="#c1121f" filter="url(#forgeLaserGlow)" />
              <text x="350" y="195" fill="#cbd5e1" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700">
                M02 // UE5 IPC
              </text>
              <text x="350" y="210" fill="#94a3b8" fontFamily="'IBM Plex Mono', monospace" fontSize="7" letterSpacing="0.08em">
                SOCKET ENGINE
              </text>
              <circle cx="435" cy="160" r="3" fill="#22c55e" />
            </motion.g>

            {/* Bottom-Left: Module 03 (TRIAD OFFLINE CONSENSUS) */}
            <motion.g
              style={{
                x: shouldReduceMotion ? 0 : negModuleOffsetX,
                y: shouldReduceMotion ? 0 : moduleOffsetY,
                opacity: shouldReduceMotion ? 1 : moduleOpacity
              }}
              onMouseEnter={() => setHoveredModule(modules[2])}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => onStageSelect?.(1)}
              className="cursor-pointer"
            >
              <rect
                x="145"
                y="335"
                width="120"
                height="120"
                rx="2"
                fill="url(#milledPlateBevel)"
                stroke={hoveredModule?.id === 'local-consensus' ? '#c1121f' : '#334155'}
                strokeWidth={hoveredModule?.id === 'local-consensus' ? '2' : '1.5'}
              />
              <rect x="150" y="340" width="110" height="110" fill="#0b0e14" stroke="#1f2735" strokeWidth="1" />
              {/* Tri-star consensus pattern */}
              <circle cx="180" cy="390" r="4" fill="#38bdf8" />
              <circle cx="210" cy="375" r="4" fill="#38bdf8" />
              <circle cx="225" cy="405" r="4" fill="#38bdf8" />
              <line x1="180" y1="390" x2="210" y2="375" stroke="#0284c7" strokeWidth="1" />
              <line x1="210" y1="375" x2="225" y2="405" stroke="#0284c7" strokeWidth="1" />
              <line x1="225" y1="405" x2="180" y2="390" stroke="#0284c7" strokeWidth="1" />
              <text x="160" y="430" fill="#cbd5e1" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700">
                M03 // TRIAD
              </text>
              <text x="160" y="442" fill="#94a3b8" fontFamily="'IBM Plex Mono', monospace" fontSize="7" letterSpacing="0.08em">
                CONSENSUS CORE
              </text>
              <circle cx="245" cy="350" r="3" fill="#22c55e" />
            </motion.g>

            {/* Bottom-Right: Module 04 (DOCKPIPE BENCHMARK RIG) */}
            <motion.g
              style={{
                x: shouldReduceMotion ? 0 : moduleOffsetX,
                y: shouldReduceMotion ? 0 : moduleOffsetY,
                opacity: shouldReduceMotion ? 1 : moduleOpacity
              }}
              onMouseEnter={() => setHoveredModule(modules[3])}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => onStageSelect?.(4)}
              className="cursor-pointer"
            >
              <rect
                x="335"
                y="335"
                width="120"
                height="120"
                rx="2"
                fill="url(#milledPlateBevel)"
                stroke={hoveredModule?.id === 'dockpipe-rig' ? '#c1121f' : '#334155'}
                strokeWidth={hoveredModule?.id === 'dockpipe-rig' ? '2' : '1.5'}
              />
              <rect x="340" y="340" width="110" height="110" fill="#0b0e14" stroke="#1f2735" strokeWidth="1" />
              {/* Molecular hexagonal ring */}
              <polygon points="380,380 395,372 410,380 410,396 395,404 380,396" stroke="#c1121f" strokeWidth="1.2" fill="none" />
              <circle cx="395" cy="388" r="3" fill="#c1121f" filter="url(#forgeLaserGlow)" />
              <text x="350" y="430" fill="#cbd5e1" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="700">
                M04 // DOCKPIPE
              </text>
              <text x="350" y="442" fill="#94a3b8" fontFamily="'IBM Plex Mono', monospace" fontSize="7" letterSpacing="0.08em">
                1IEP BENCHMARK
              </text>
              <circle cx="435" cy="350" r="3" fill="#22c55e" />
            </motion.g>
          </g>

          {/* =================================================================
              LAYER 4: HARDENED VALIDATION SHROUD & DIAGNOSTICS (STAGE 04)
              ================================================================= */}
          <motion.g
            id="layer-4-shroud"
            style={{
              opacity: shouldReduceMotion ? 1 : shroudOpacity,
              scale: shouldReduceMotion ? 1 : shroudScale,
              transformOrigin: '300px 300px'
            }}
          >
            {/* Top Hardened Titanium Cross Clamping Shroud */}
            <path
              d="M 270 110 L 330 110 L 330 270 L 490 270 L 490 330 L 330 330 L 330 490 L 270 490 L 270 330 L 110 330 L 110 270 L 270 270 Z"
              fill="rgba(15, 23, 42, 0.75)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              backdropFilter="blur(4px)"
            />

            {/* Diagnostic Hex Inspection Window in Center */}
            <polygon
              points="300,240 352,270 352,330 300,360 248,330 248,270"
              fill="#06080c"
              stroke="#c1121f"
              strokeWidth="2"
              filter="url(#forgeLaserGlow)"
            />

            {/* Center Core Ground Truth Core */}
            <circle cx="300" cy="300" r="28" fill="#0d1117" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="14" fill="#c1121f" filter="url(#forgeIntenseGlow)" />
            <circle cx="300" cy="300" r="6" fill="#ffffff" />

            {/* Telemetry Status Marks */}
            <text x="300" y="262" textAnchor="middle" fill="#cbd5e1" fontFamily="'IBM Plex Mono', monospace" fontSize="7" letterSpacing="0.2em">
              VALIDATED
            </text>
            <text x="300" y="345" textAnchor="middle" fill="#22c55e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" letterSpacing="0.1em">
              SYS // PASS
            </text>

            {/* Mechanical Shroud Locking Pins */}
            {[
              { x: 300, y: 120 },
              { x: 480, y: 300 },
              { x: 300, y: 480 },
              { x: 120, y: 300 }
            ].map((pin, i) => (
              <g key={`shroud-pin-${i}`}>
                <circle cx={pin.x} cy={pin.y} r="5" fill="#c1121f" filter="url(#forgeLaserGlow)" />
                <circle cx={pin.x} cy={pin.y} r="2" fill="#ffffff" />
              </g>
            ))}
          </motion.g>

          {/* Dynamic Telemetry Scan Line */}
          <motion.line
            x1="100"
            y1="100"
            x2="500"
            y2="100"
            stroke="#c1121f"
            strokeWidth="1"
            strokeDasharray="16 32"
            opacity={shouldReduceMotion ? 0 : diagnosticGlow}
            filter="url(#forgeLaserGlow)"
            style={{
              transformOrigin: '300px 300px',
              y: useTransform(progress, [0, 1], [0, 400])
            }}
          />
        </svg>

        {/* Live Hover HUD Tooltip */}
        {hoveredModule && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="forge-hud-tooltip"
          >
            <div className="font-bold text-[#c1121f]">{hoveredModule.name}</div>
            <div className="text-[10px] text-[#94a3b8]">{hoveredModule.spec}</div>
            <div className="text-[9px] text-[#22c55e] mt-0.5">{hoveredModule.status}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
