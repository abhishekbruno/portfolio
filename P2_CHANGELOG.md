# P2 — Skills throne-safe layout and black-chrome silver coin

## Skills section only
- Restructured the existing five poker cards into a desktop 2+2+1 layout with left Programming/AI & Automation, a protected portrait in the center, right Frontend/Tools, and Exploration centered below.
- Kept the exact existing throne cutout, all five categories, skill details, filters, search, card hover tilt, and expandable capability notes.
- Rebalanced card heights and spacing and improved portrait brightness and central visibility.
- Tablet and mobile move the portrait above the cards, preserving an unobstructed face.
- Motion remains subtle and reduced-motion remains supported. The image is a photographic cutout, not an actual rigged animated character.

## Hero coin only
- Changed extruded AB letters to brushed silver and sidewalls to dark titanium.
- Converted the physical rings, ridges, rivets and sidewall material to polished steel/black chrome.
- Recolored front/back procedural artwork, engraved text and studio environment reflections from warm gold to cool silver/graphite.
- Adjusted the Three.js light setup to white/cool fill and retained restrained crimson accents.
- Updated static WebGL/reduced-motion fallback to match the silver finish.
- Preserved geometry, camera, XYZ controls and existing interaction logic.

## Validation performed
- All 31 JS/JSX files passed syntax parsing using TypeScript's JavaScript/JSX parser.
- Local import paths were checked and resolved.
- The Skills CSS passed parsing; a static browser layout check showed no horizontal overflow at 1920, 1440, 1024, 768 and 390 pixels, with the face unobstructed.
- The production Vite build could not be completed here: npm dependency installation timed out in the environment. Run `npm.cmd install` then `npm.cmd run build` on Windows.
- Verify live card search/filters, expansion, pointer tilt, and real coin XYZ rotation in the running Vite app; these were preserved in code but not runtime-tested.
