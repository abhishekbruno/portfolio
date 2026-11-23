# P3 — Performance, clarity and scroll enhancements

- **Hero medallion:** render loop is now viewport- and tab-aware; caps render rates (60 fps desktop / 30 fps smaller screens), reduces device pixel ratio (max 1.3 desktop / 1.0 mobile), reduces particles, avoids per-frame GPU particle-buffer uploads, and uses lower-resolution procedural textures on smaller screens. Existing XYZ controls and physical coin geometry remain.
- **Loading screen:** a short-lived full-screen noir AB loader resolves after the coin’s first successful 3D render, with a 6.5-second failsafe for unavailable WebGL. It shows no invented percentage.
- **Up/down scrolling:** section entrance reveals can be replayed on re-entering sections when scrolling either direction; uses existing Framer Motion, no scroll hijacking.
- **Skills clarity:** portrait WebP re-encoded from the original 1536x1024 transparent source at higher quality; removes 7px card backdrop-filter, brightens portrait moderately, delays lower-body fade, and keeps faint breathing motion at a 4.8-second cycle with small amplitude.
- **Truthful limitation:** realistic independent eye blinking, eye tracking, joint motion or foot articulation are not achievable reliably from this single flattened portrait. These require a layered face/leg animation set, video capture or a rigged 3D character; this project does not pretend to offer physically accurate skeletal animation.

## Validation
JavaScript/JSX syntax and relative imports parsed and verified. npm ci --offline fails because cached packages are incomplete (zustand 5.1.0 missing). Run `npm.cmd install`, `npm.cmd run build` and browser visual tests on Windows.
