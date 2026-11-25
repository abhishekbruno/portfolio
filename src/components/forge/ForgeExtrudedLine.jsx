import React from 'react';

/**
 * ForgeExtrudedLine
 *
 * Dual-layer 3D extruded typography primitive for the John Wick–inspired
 * "002 / THE FORGE" cinematic title card.
 *
 * Separates the hard-edged 3D extrusion depth wall (back layer) from the
 * lit metallic front surface (front layer) and an optional one-shot specular
 * light sweep layer so gradient text fills never clash with stepped 3D depth.
 */
export default function ForgeExtrudedLine({
  text,
  variant = 'silver', // 'silver' | 'crimson'
  reflection = false,
  sweepActive = false,
  reducedMotion = false,
  className = '',
  as: Component = 'span'
}) {
  if (reflection) {
    return (
      <Component className={`block relative select-none ${className}`}>
        <span
          className={
            variant === 'crimson'
              ? 'forge-reflect-text-crimson'
              : 'forge-reflect-text-silver'
          }
        >
          {text}
        </span>
      </Component>
    );
  }

  const depthClass =
    variant === 'crimson' ? 'forge-depth-crimson' : 'forge-depth-silver';
  const faceClass =
    variant === 'crimson' ? 'forge-face-crimson' : 'forge-face-silver';

  return (
    <Component className={`forge-extruded-line relative block ${className}`}>
      {/* Layer 1: Hard-edged physical 3D extrusion body & ambient room cast shadow */}
      <span aria-hidden="true" className={`forge-extruded-depth ${depthClass}`}>
        {text}
      </span>

      {/* Layer 2: Lit metallic surface face */}
      <span className={`forge-extruded-face ${faceClass}`}>{text}</span>

      {/* Layer 3: Subtle one-shot clipped specular light sweep across letterfaces */}
      {!reducedMotion && sweepActive && (
        <span
          aria-hidden="true"
          className={`forge-extruded-sweep ${
            variant === 'crimson'
              ? 'forge-sweep-crimson'
              : 'forge-sweep-silver'
          }`}
        >
          {text}
        </span>
      )}
    </Component>
  );
}
