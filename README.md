# Abhishek Bruno — Cinematic Neo-Noir Developer Portfolio

An immersive, high-end neo-noir developer portfolio and systems engineering showcase inspired by cinematic brutalism, architectural minimalism, and the John Wick aesthetic. Engineered with **React 19**, **Vite**, **Tailwind CSS v4**, **Three.js**, and **Lucide Icons**.

---

## ⚡ Visual Transformation & Design Highlights

- **Cinematic Neo-Noir Aesthetic**: Deep obsidian and charcoal palette (`#080808`, `#111111`, `#171717`), high-contrast off-white typography (`#F5F5F5`), subtle red ambient illumination, hairline borders (`#292929`), and sharp crimson accent lines (`#C1121F` & `#780000`).
- **Monumental Cinematic Typography**:
  - **Bebas Neue** for monumental hero title lettering (`ABHISHEK BRUNO`).
  - **Oswald** for cinematic section chapter headers, navigation, and badges.
  - **Inter** for readable, comfortable editorial narrative and body copy.
  - **JetBrains Mono** for technical coordinates, telemetry, and metadata.
- **Interactive 3D AB Medallion Artifact (Centerpiece)**:
  - Custom procedural Three.js medallion artifact featuring a multi-faceted coin body with knurled gunmetal edge, high-resolution curved circular typography (`ABHISHEK BRUNO` and `SOFTWARE • AI • SYSTEMS`), modeled reverse face with technical cipher, 4 cardinal crimson sight notches, and a true 3D extruded and beveled 'AB' monogram.
  - Interactive full 3-axis (XYZ) quaternion trackball rotation with momentum inertia, mobile multi-touch twist roll, double-click/button canonical reset, and autonomous neo-noir idle breathing drift.
- **Cinematic Neo-Noir Lighting & Scroll Transitions**:
  - Soft directional upper-left crimson lighting with physics mouse tracking and subtle 8s breathing oscillation.
  - 3-layer parallax background depth composing ambient illumination, atmospheric rings, and the 3D medallion.
  - Scroll-scrubbed headline motion with vertical clipping masks, letter-spacing expansion, and progressive opacity falloff.
  - Consistent chapter reveals and horizontal crimson laser separators across all sections.
- **Editorial Rectangular Text Panels**:
  - Zero generic pill bubbles or childish badges.
  - Clean rectangular panels with chapter numbers, thin borders, crimson laser hover rules, and spacious internal padding.
- **Interactive Project Showcase**:
  - Features all 8 primary verified GitHub repositories (`FORGE`, `Unreal Codex Bridge`, `SAKSHI`, `TRIAD`, `Smart Invoice Processor`, `Dockpipe`, `Bushido Chronicles`, `POS System`).
  - Full architectural specifications dossier modal with keyboard accessibility (Escape to dismiss).
  - Expandable "More Repositories" drawer (`run-from-dog`, `tetris-game`, `smart-content-scanner` with peer attribution, `-EduVista-project` with early-stage notes).
- **Live GitHub REST API Synchronization**:
  - Live public telemetry fetched from `https://api.github.com/users/abhishekbruno/repos?per_page=100`.
  - Automatic fallback to verified static cache with zero API token exposure.
- **Neo-Noir Precision Reticle Cursor**:
  - Desktop-only dual-element red reticle and trailing halo that snaps to interactive elements.
- **Direct Communication & Contact Terminal**:
  - Sharp rectangular input fields with crimson focus outlines.
  - Real-time client-side validation, celebratory red/charcoal confetti burst (`canvas-confetti`), and pre-filled native `mailto:` fallback.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-driven UI library |
| **Vite** | Modern bundler and instant development server |
| **Tailwind CSS v4** | Modern utility engine integrated via `@tailwindcss/vite` |
| **Framer Motion** | Cinematic scroll-triggered animations and parallax transforms |
| **Three.js** | Interactive 3D AB Medallion artifact centerpiece |
| **Lucide React** | Clean minimalist interface glyphs |
| **Canvas Confetti** | Subtle celebratory microinteraction on transmission |

---

## 📁 Project Structure

```text
src/
├── assets/                  # Static assets and media
├── components/
│   ├── 3d/
│   │   └── HeroCanvas.jsx   # Preserved & enhanced dark metallic 3D sphere
│   ├── layout/
│   │   ├── Navbar.jsx       # Minimalist black navigation bar with active indicators
│   │   ├── Footer.jsx       # Cinematic architectural footer with coordinates
│   │   └── ScrollProgress.jsx # Top crimson laser scroll progress line
│   └── ui/
│       ├── CustomCursor.jsx # Neo-noir precision reticle pointer
│       ├── Icons.jsx        # Crisp SVG brand glyphs (GitHub, LinkedIn, X)
│       ├── ProjectModal.jsx # Sharp architectural dossier modal
│       ├── SectionHeader.jsx# Cinematic chapter header with red laser line
│       ├── TechBadge.jsx    # Sharp rectangular technical tags
│       └── ThemeToggle.jsx  # Neo-noir dark/light contrast toggle
├── data/
│   └── portfolio.js         # Centralized single source of truth for all content
├── hooks/
│   ├── useGithubData.js     # Real-time GitHub API fetcher with fallback cache
│   ├── useScrollSpy.js      # Viewport observer for active navigation highlighting
│   └── useTheme.js          # Persistent theme state manager
├── sections/
│   ├── Hero.jsx             # Monumental Bebas typography & 3D metallic sphere
│   ├── About.jsx            # The Architect dossier, philosophy & credentials
│   ├── Skills.jsx           # Editorial rectangular technical arsenal panels
│   ├── Projects.jsx         # Selected works gallery & dossier modals
│   ├── GithubSection.jsx    # Live GitHub repository archives & telemetry
│   ├── Experience.jsx       # Chronology & record with vertical crimson laser
│   └── Contact.jsx          # Secure transmission terminal with mailto fallback
├── index.css                # Global neo-noir design tokens, fonts & keyframes
├── App.jsx                  # Main application coordinator
└── main.jsx                 # Application entry point
```

---

## 🚀 Getting Started

### 1. Installation

Clone or open the project directory and install dependencies:

```bash
npm install
```

### 2. Development Server

Start the local Vite dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Production Build

Compile the production-ready bundle:

```bash
npm run build
```

### 4. Preview Build

Preview the production output locally:

```bash
npm run preview
```

---

## ⚙️ Content Customization

All portfolio data is centralized in **`src/data/portfolio.js`**:

- **Personal Details**: Update `name`, `roles`, `subtitle`, `bio`, `avatarUrl`, `socialLinks`, and `email`.
- **Skills Matrix**: Update `skillsData.categories` with technologies classified as `'experienced'`, `'learning'`, or `'exploring'`.
- **Featured Repositories**: Modify or extend `featuredProjects` and `additionalRepositories`.
- **Milestones**: Add or update academic or industry entries in `timelineData`.

---

## 📄 License

MIT © Abhishek Bruno.
