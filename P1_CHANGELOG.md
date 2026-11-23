# P1 — Gold Medallion + Poker-Card Skills

This patch is based on the existing portfolio with the throne portrait already integrated in Skills.

## 1. Hero coin: antique gold, physically modeled

- Keeps the **existing interactive, extruded Three.js AB medallion** and all X/Y/Z drag/roll controls.
- Changes the silver/gunmetal palette to **warm brushed-gold and antique bronze** for the front, rear, bevels, letters, screws, and rings.
- Adds a procedural micro-roughness map and changes the existing relief map to keep the metal from looking like smooth yellow plastic.
- Adds warm studio reflection strips and adjusts the key/fill lights and tone-mapping exposure for a believable metallic response.
- Adds actual instanced flutes around the medallion's circumference and multiple precision-gold concentric rings. These are 3D meshes, not an image overlay.
- Retains restrained crimson accent markers and supports the reduced-motion fallback, now also gold.

## 2. Skills: premium playing-card spread

- All **five original technical categories** are preserved with their underlying skills and statuses.
- Wide screens: **3 cards on the first row, 2 centered below**. Tablet: 2 columns. Mobile: 1 column.
- Dark translucent card faces with warm-gold inset borders, rank/suit corner markers, subtle gold filigree, and restrained mouse-based 3D tilt.
- The **throne portrait stays behind** the card spread, darkened and vignetted to protect readability.
- Each card has a **working “Inspect Capabilities”** action that expands actual data-driven technical notes. Focus and reduced-motion styles included.
- The existing Skills category tabs and search continue to use the original filtered layout and data.

## Scope

Only these files were intentionally modified:
- `src/components/hero/EmblemGeometry.jsx`
- `src/components/hero/EmblemLighting.jsx`
- `src/components/hero/InteractiveEmblem3D.jsx`
- `src/components/hero/EmblemFallback.jsx`
- `src/sections/Skills.jsx`
- `src/components/skills/skills-throne.css`

## Running on Windows

From the extracted project directory in PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

The source was parsed with a JavaScript/JSX syntax parser and relative import paths checked. A full Vite production build could **not** be performed in the Linux authoring environment because the uploaded dependencies are Windows-native and the npm registry could not be reached to obtain a Linux-specific Rolldown binding. Run `npm.cmd run build` on Windows to complete that check.
