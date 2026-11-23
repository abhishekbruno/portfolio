# Skills page — throne integration

This version updates **only the Skills section** of the supplied portfolio.

## What changed
- Added a compressed transparent `seated-throne.webp` image under `src/assets/throne/`.
- Added `src/components/skills/SkillsThroneBackdrop.jsx`: subtle scroll-linked depth and CSS breathing-like micro-motion.
- Added `src/components/skills/skills-throne.css`: dark foreground/background integration, crimson halo, strong vignette, and translucent readable panels.
- Updated `src/sections/Skills.jsx` to render the backdrop behind the **original five skill categories** while keeping filtering and search unchanged.
- On large desktops, skill cards form left/right rows around the central portrait; on narrower screens, panels return to 2/1 columns and the portrait fades further into the background.

## What was not changed
- Home hero, original rotating AB emblem, About, Projects, GitHub, Experience, Contact and navigation.
- Text content, repository links, skill records, or existing filter/search actions.

## Run on Windows PowerShell
```powershell
cd D:\protfolio
npm.cmd install
npm.cmd run dev
```

## Important notes
- The subject is a transparent **2.5D image**, not a rigged character. A very slight CSS scale movement and scroll parallax are implemented; realistic independent blinking, hair movement, or hand animation require separate prepared layers and are **not claimed** here.
- An actual Vite production build could not be run in the sandbox because project dependencies could not be installed from the unavailable registry. The two modified JSX files passed standalone TypeScript JSX transpilation/parse validation (not full dependency resolution). Run `npm.cmd run build` locally.
- Source files are packaged without `.git`, `node_modules`, and `dist` to keep the download lightweight and avoid bundling machine-specific packages. Existing dependencies are defined in `package.json`.
