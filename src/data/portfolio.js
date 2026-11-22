/**
 * Centralized Portfolio Configuration
 * All personal, educational, skill, project, and social data is configured here.
 * Note: No fabricated statistics, percentages, or false deployment claims are introduced.
 */

export const personalInfo = {
  name: "Abhishek Bruno",
  tagline: "Building Intelligent Systems & Digital Experiences",
  roles: [
    "AI Systems Engineer",
    "Full-Stack Developer",
    "Automation & Tools Builder",
    "Cybersecurity Explorer"
  ],
  subtitle:
    "Computer Science Engineering student focused on AI, software engineering, cybersecurity, and interactive technologies.",
  bio: [
    "I am a Computer Science Engineering student passionate about engineering practical, intelligent software systems. My work focuses on the intersection of artificial intelligence, protocol integration (Model Context Protocol / MCP), workflow automation, and modern web technologies.",
    "From developing AI-native tooling for game engines to engineering reproducible computational docking pipelines and assistive hardware prototypes, I prioritize clear system architecture, hands-on experimentation, and reliable digital craft."
  ],
  status: "Available for internships & collaborative research",
  avatarUrl: "https://avatars.githubusercontent.com/u/143131532?v=4",
  location: "India",
  email: "abhishek.bruno.dev@gmail.com", // Editable placeholder / contact target
  resumeUrl: "#contact", // Path or URL to PDF when ready
  socialLinks: {
    github: "https://github.com/abhishekbruno",
    linkedin: "https://linkedin.com/in/abhishekbruno", // Editable placeholder
    twitter: "https://x.com/abhishekbruno", // Editable placeholder
    email: "mailto:abhishek.bruno.dev@gmail.com"
  },
  stats: [
    { label: "Public Repositories", value: "12+", verified: true },
    { label: "Core Focus Domains", value: "AI & Systems", verified: true },
    { label: "Primary Languages", value: "Python & JS", verified: true },
    { label: "Status", value: "B.Tech CSE", verified: true }
  ]
};

export const skillsData = {
  categories: [
    {
      id: "programming",
      name: "Programming",
      description: "Core languages used across system development, automation, and scripting.",
      skills: [
        { name: "Python", status: "experienced", highlight: "AI, FastAPI, CLI, Docking" },
        { name: "JavaScript (ES6+)", status: "experienced", highlight: "Modern Web, Node, Async" },
        { name: "C", status: "learning", highlight: "Data Structures, Systems, Memory" },
        { name: "HTML5", status: "experienced", highlight: "Semantic Structure, Accessibility" },
        { name: "CSS3", status: "experienced", highlight: "Modern Layouts, Keyframes, Custom Vars" }
      ]
    },
    {
      id: "frontend",
      name: "Frontend & UI/UX",
      description: "Modern component-driven web frameworks and visual styling engines.",
      skills: [
        { name: "React", status: "experienced", highlight: "Hooks, Context, State Design" },
        { name: "Vite", status: "experienced", highlight: "Fast Bundling, ESM, Dev Tools" },
        { name: "Tailwind CSS", status: "experienced", highlight: "Utility Styling, Responsive, Glassmorphism" },
        { name: "Three.js / WebGL", status: "learning", highlight: "Interactive Shaders & 3D Canvas" }
      ]
    },
    {
      id: "ai-automation",
      name: "AI & Automation",
      description: "Intelligent agent orchestration, language models, and process robotics.",
      skills: [
        { name: "Artificial Intelligence", status: "experienced", highlight: "LLM integration, Prompt Design" },
        { name: "RAG Systems", status: "experienced", highlight: "Vector Retrieval & Context Synthesis" },
        { name: "AI Agents & MCP", status: "experienced", highlight: "Model Context Protocol & FastMCP" },
        { name: "UiPath / RPA", status: "learning", highlight: "Enterprise Process Automation" }
      ]
    },
    {
      id: "tools",
      name: "Tools & Infrastructure",
      description: "Version control, operating systems, and interactive creation platforms.",
      skills: [
        { name: "Git & GitHub", status: "experienced", highlight: "Version Control, Branching, PRs" },
        { name: "Linux / Bash", status: "experienced", highlight: "Shell scripting, System tooling" },
        { name: "Unreal Engine", status: "learning", highlight: "Editor Automation & Scripting" },
        { name: "FastAPI", status: "experienced", highlight: "Async REST APIs & Pydantic" }
      ]
    },
    {
      id: "exploration",
      name: "Areas of Exploration",
      description: "Active academic investigations and emerging technical disciplines.",
      skills: [
        { name: "Cybersecurity", status: "exploring", highlight: "Defensive tools, Security auditing" },
        { name: "Backend Engineering", status: "learning", highlight: "Microservices & DB integration" },
        { name: "Workflow Automation", status: "experienced", highlight: "Event-driven hooks & ETL" },
        { name: "Intelligent Systems", status: "experienced", highlight: "Local Consensus & Multi-agent" }
      ]
    }
  ]
};

export const featuredProjects = [
  {
    id: "forge-ai-integration-platform",
    title: "FORGE — AI Integration Platform",
    tagline: "AI-native development platform for Model Context Protocol (MCP)",
    description:
      "FORGE is an AI-native integration development platform designed to generate, validate, test, and package secure Model Context Protocol (MCP) connectors for software applications. It streamlines bridging agentic intelligence with external ecosystem APIs.",
    longDescription:
      "Modern AI agents require deterministic, well-typed interfaces to execute actions. FORGE automates the tedious boilerplate of MCP connector construction by providing validation harnesses, schema testing, and secure packaging pipelines. Built specifically to empower developers creating AI-augmented workflows.",
    category: "AI & Systems",
    technologies: ["Python", "Model Context Protocol", "FastMCP", "JSON Schema", "CLI"],
    githubUrl: "https://github.com/abhishekbruno/forge-ai-integration-platform",
    liveUrl: null,
    status: "Active Development",
    featured: true,
    accentColor: "from-blue-500 to-cyan-400",
    stats: { language: "Python", mcpSupport: "v1.0 Ready", type: "Dev Platform" }
  },
  {
    id: "unreal-codex-bridge",
    title: "Unreal Codex Bridge",
    tagline: "Connecting OpenAI Codex to Unreal Engine via MCP",
    description:
      "An open-source integration connecting OpenAI Codex to Unreal Engine through Model Context Protocol (MCP), enabling AI-assisted game development, live editor automation, and procedural viewport manipulation.",
    longDescription:
      "Eliminates the friction of context switching during game development. The Unreal Codex Bridge exposes engine commands, asset queries, and actor transformation APIs as callable MCP tool endpoints, letting AI assistants construct scenes, inspect hierarchies, and trigger editor automation natively.",
    category: "AI & Systems",
    technologies: ["Python", "Unreal Engine", "OpenAI Codex", "MCP", "IPC"],
    githubUrl: "https://github.com/abhishekbruno/unreal-codex-bridge",
    liveUrl: null,
    status: "Open Source Tooling",
    featured: true,
    accentColor: "from-cyan-400 to-emerald-400",
    stats: { language: "Python", engine: "Unreal Engine", protocol: "MCP" }
  },
  {
    id: "sakshi",
    title: "SAKSHI — AI Investigative Assistant",
    tagline: "Intelligent information processing, retrieval, and analysis assistant",
    description:
      "AI-powered investigative assistant exploring intelligent information processing, retrieval-augmented document synthesis, and multi-source investigative analysis for structured and unstructured data.",
    longDescription:
      "Investigative workflows often drown in disconnected documents, timeline discrepancies, and heterogeneous evidence. SAKSHI applies modern vector retrieval and NLP reasoning to cross-examine textual records, uncover relationship links, and assist analysts in assembling chronological case summaries.",
    category: "AI & Systems",
    technologies: ["Python", "RAG", "NLP", "Vector Embeddings", "FastAPI"],
    githubUrl: "https://github.com/abhishekbruno/SAKSHI",
    liveUrl: null,
    status: "Prototype & Research",
    featured: true,
    accentColor: "from-violet-500 to-indigo-500",
    stats: { language: "Python", domain: "Investigation", pipeline: "RAG" }
  },
  {
    id: "triad-desktop",
    title: "TRIAD — Local AI Consensus Workspace",
    tagline: "Multi-model consensus and offline reasoning environment",
    description:
      "Local AI Consensus Workspace designed for multi-model deliberation, parallel reasoning aggregation, and decentralized prompt evaluation running entirely on local developer hardware.",
    longDescription:
      "Rather than relying on a single monolithic model output, TRIAD coordinates a council of localized model runtimes to cross-evaluate solutions, detect hallucinated code patterns, and converge on high-confidence consensus without transmitting sensitive context to cloud servers.",
    category: "AI & Systems",
    technologies: ["Python", "Local LLMs", "Desktop Architecture", "Multi-Agent"],
    githubUrl: "https://github.com/abhishekbruno/triad-desktop",
    liveUrl: null,
    status: "Active Research",
    featured: true,
    accentColor: "from-purple-500 to-pink-500",
    stats: { language: "Python", privacy: "100% Local", mechanism: "Consensus" }
  },
  {
    id: "smart-invoice-processor",
    title: "Smart Invoice Processor",
    tagline: "AI-driven invoice extraction and personal automated assistant",
    description:
      "AI-powered invoice processing and personal financial assistant built with React, Flutter, FastAPI, Gmail automation, and Gemini AI. Automatically analyzes attachments and generates structured accounting records.",
    longDescription:
      "Solves tedious manual expense tracking by continuously monitoring transaction emails, extracting receipt/invoice line items via Gemini Vision & text reasoning, validating totals against tax schemas, and presenting actionable expenditure breakdowns across responsive web and mobile interfaces.",
    category: "Web & Automation",
    technologies: ["Python", "FastAPI", "React", "Gemini AI", "Gmail API", "Flutter"],
    githubUrl: "https://github.com/abhishekbruno/smart-invoice-processor",
    liveUrl: "https://smart-invoice-processor.vercel.app",
    status: "Live Deployment",
    featured: true,
    accentColor: "from-emerald-400 to-teal-500",
    stats: { language: "Python / React", aiModel: "Gemini", deployment: "Vercel Live" }
  },
  {
    id: "drug-discovery-phase1",
    title: "Drug Discovery — Dockpipe (Phase 1)",
    tagline: "Reproducible CPU molecular docking pipeline with AutoDock Vina & RDKit",
    description:
      "A reproducible CPU molecular docking pipeline built with RDKit, Meeko, AutoDock Vina, and a local researcher UI. Includes validated 1IEP redocking benchmarks for computational biochemistry.",
    longDescription:
      "Computational screening often suffers from complex dependency chains. Dockpipe creates an end-to-end reproducible workflow for ligand preparation, grid parameterization, receptor conformation, and batch docking evaluation on standard CPU hardware with verified experimental benchmark metrics.",
    category: "AI & Systems",
    technologies: ["Python", "RDKit", "Meeko", "AutoDock Vina", "Streamlit"],
    githubUrl: "https://github.com/abhishekbruno/drug-discovery-phase1",
    liveUrl: null,
    status: "Research Pipeline",
    featured: true,
    accentColor: "from-cyan-500 to-blue-600",
    stats: { language: "Python", benchmark: "1IEP Redocking", domain: "Bio-Informatics" }
  },
  {
    id: "bushido-chronicles",
    title: "Bushido Chronicles",
    tagline: "Immersive Samurai heritage experience with Three.js & GSAP",
    description:
      "An immersive, cinematic Samurai heritage website featuring interactive Japanese history, animated Sakura landscapes, scroll-driven katana forging, and vintage-inspired UI/UX.",
    longDescription:
      "An exploration in high-fidelity creative web development, combining Three.js 3D viewport canvas rendering, GSAP timeline choreography, particle systems for falling blossom petals, and modern responsive editorial typography.",
    category: "Web & 3D",
    technologies: ["JavaScript", "React", "Three.js", "GSAP", "Tailwind CSS"],
    githubUrl: "https://github.com/abhishekbruno/bushido-chronicles",
    liveUrl: null,
    status: "Creative Showcase",
    featured: true,
    accentColor: "from-rose-500 to-amber-500",
    stats: { language: "JavaScript", graphics: "Three.js & WebGL", style: "Editorial 3D" }
  },
  {
    id: "pos-system",
    title: "POS Management System",
    tagline: "Lightweight retail checkout and inventory computation utility",
    description:
      "A responsive Point of Sale management system handling item inventory, dynamic cart balance calculations, receipt preparation, and persistent checkout records.",
    longDescription:
      "Built to demonstrate clean algorithmic state management, DOM event architecture, and responsive terminal-style order processing with zero external bloat.",
    category: "Web & Systems",
    technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage API"],
    githubUrl: "https://github.com/abhishekbruno/POS",
    liveUrl: null,
    status: "Core Utility",
    featured: true,
    accentColor: "from-amber-400 to-orange-500",
    stats: { language: "JavaScript", type: "Checkout Engine", storage: "Client-Side" }
  },
  {
    id: "sahiwatch",
    title: "SahiWatch — Tactile Assistive Wearable",
    tagline: "Screenless haptic assistive system for multi-sensory support",
    description:
      "Screenless tactile assistive wearable designed to support individuals with visual, hearing, and speech impairments through discrete vibrotactile language patterns.",
    longDescription:
      "Conventional assistive hardware frequently demands visual attention or bulky displays. SahiWatch investigates screenless interaction paradigms, translating environmental alerts and text messages into distinctive vibrotactile rhythms and spatial haptic cues.",
    category: "Hardware & Systems",
    technologies: ["Embedded C/C++", "Haptic Actuators", "Sensors", "Assistive UX"],
    githubUrl: null, // Hardware & Concept project
    liveUrl: null,
    status: "Concept & Prototype",
    featured: false,
    accentColor: "from-teal-400 to-cyan-500",
    stats: { type: "Hardware Prototype", focus: "Accessibility", modality: "Tactile" }
  },
  {
    id: "rpa-uipath-automation",
    title: "RPA Automation Workflows",
    tagline: "Workflow automation and digital robotic worker experiments",
    description:
      "Practical workflow automation experiments using UiPath Studio, automating structured data extraction, cross-application data synchronization, and repetitive business reporting.",
    longDescription:
      "Exploratory robotic process automation (RPA) workflows engineered to interact reliably with enterprise user interfaces, scrape table records, validate OCR inputs, and dispatch audit logs.",
    category: "Automation",
    technologies: ["UiPath", "RPA", "VB.NET", "Workflow Automation"],
    githubUrl: null,
    liveUrl: null,
    status: "Exploratory Workflows",
    featured: false,
    accentColor: "from-blue-400 to-indigo-500",
    stats: { platform: "UiPath Studio", scope: "Process Automation", type: "RPA" }
  }
];

export const additionalRepositories = [
  {
    name: "run-from-dog",
    title: "Run From Dog",
    description: "A fun and dynamic 2D canvas arcade game exploring sprite collision, score loops, and physics animations.",
    language: "JavaScript",
    githubUrl: "https://github.com/abhishekbruno/run-from-dog",
    tags: ["Game Dev", "Canvas", "Vanilla JS"],
    status: "Completed Fun Project"
  },
  {
    name: "tetris-game",
    title: "Tetris Web Game",
    description: "Classic grid-based block puzzle game with rotation matrices, line clearing mechanics, and keydown listeners.",
    language: "JavaScript",
    githubUrl: "https://github.com/abhishekbruno/tetris-game",
    tags: ["Game Dev", "Algorithms", "JavaScript"],
    status: "Completed Game"
  },
  {
    name: "smart-content-scanner",
    title: "Smart Content Scanner",
    description: "Collaborative project with peer engineering team focused on automated content scanning, text parsing, and rule-based validation.",
    language: "JavaScript",
    githubUrl: "https://github.com/abhishekbruno/smart-content-scanner",
    tags: ["Collaboration", "Text Processing", "Scanner"],
    status: "Collaborative Project",
    attribution: "Collaborative project with engineering peers"
  },
  {
    name: "-EduVista-project",
    title: "EduVista Platform",
    description: "Initial architectural repository exploring educational tool scaffolding and student learning resource organization.",
    language: "Web",
    githubUrl: "https://github.com/abhishekbruno/-EduVista-project",
    tags: ["Education", "Early Exploration"],
    status: "Early Scaffolding (In-Progress)",
    note: "Early-stage repository setup; architectural design in progress."
  }
];

export const timelineData = [
  {
    id: "btech-cse",
    period: "2023 — Present",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Undergraduate Degree Program",
    badge: "Academics",
    description:
      "Pursuing a rigorous Bachelor of Technology in Computer Science and Engineering. Core coursework spans Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Artificial Intelligence.",
    highlights: [
      "Deep focus on algorithmic problem solving and low-level system concepts",
      "Academic exploration in discrete mathematics, cryptography, and secure software engineering",
      "Hands-on lab implementations in C, Python, and modern software paradigms"
    ]
  },
  {
    id: "ai-tooling-forge",
    period: "2024 — 2026",
    title: "AI & Model Context Protocol Engineering",
    organization: "Open-Source & Independent Systems",
    badge: "Systems & AI",
    description:
      "Architected specialized developer tooling including FORGE (AI-native MCP generation platform) and Unreal Codex Bridge (bridging OpenAI Codex to Unreal Engine via real-time IPC and MCP tool protocols).",
    highlights: [
      "Implemented FastMCP-based tools and schema validation harnesses in Python",
      "Constructed live editor automation workflows for 3D game engines",
      "Investigated multi-agent consensus topologies in TRIAD"
    ]
  },
  {
    id: "computational-docking",
    period: "2025 — 2026",
    title: "Biochemical Docking & Research Pipelines",
    organization: "Scientific Computing Exploration",
    badge: "Bio-Informatics",
    description:
      "Developed Dockpipe Phase 1, building a CPU-bound reproducible molecular docking pipeline leveraging RDKit, Meeko, and AutoDock Vina with validated 1IEP crystal benchmark redocking.",
    highlights: [
      "Automated ligand preparation and receptor active-site grid configurations",
      "Constructed intuitive researcher interface with Streamlit and Python",
      "Validated RMSD scoring against published crystal structures"
    ]
  },
  {
    id: "assistive-and-automation",
    period: "2024 — 2025",
    title: "Assistive Hardware & Process Automation",
    organization: "R&D Experiments",
    badge: "Hardware & RPA",
    description:
      "Formulated SahiWatch, an innovative screenless haptic wearable for multi-sensory communication assistance, alongside UiPath robotic process automation flows and full-stack Gemini AI applications.",
    highlights: [
      "Engineered Smart Invoice Processor connecting FastAPI, Gemini AI, and Gmail API",
      "Designed tactile vibrotactile encoding schemes for assistive communication",
      "Developed UiPath automation workflows for repetitive enterprise business tasks"
    ]
  }
];

export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "GitHub", href: "#github" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];
