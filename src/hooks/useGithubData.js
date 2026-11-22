import { useState, useEffect } from 'react';

// Verified static fallback data in case GitHub API hits rate limit (60 req/hr unauthenticated)
const fallbackRepos = [
  {
    name: 'forge-ai-integration-platform',
    description: 'FORGE is an AI-native integration development platform that generates, validates, tests, and packages secure MCP connectors for supported software applications.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-21T18:12:57Z',
    html_url: 'https://github.com/abhishekbruno/forge-ai-integration-platform',
    topics: ['mcp', 'fastmcp', 'ai-integration', 'automation']
  },
  {
    name: 'unreal-codex-bridge',
    description: 'An open-source integration connecting OpenAI Codex to Unreal Engine through MCP, enabling AI-assisted game development and live editor automation.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-22T18:26:21Z',
    html_url: 'https://github.com/abhishekbruno/unreal-codex-bridge',
    topics: ['unreal-engine', 'codex', 'mcp', 'game-dev']
  },
  {
    name: 'SAKSHI',
    description: 'AI-powered investigative assistant exploring intelligent information processing, retrieval, and analysis.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-28T14:45:22Z',
    html_url: 'https://github.com/abhishekbruno/SAKSHI',
    topics: ['ai-assistant', 'rag', 'investigation']
  },
  {
    name: 'triad-desktop',
    description: 'Local AI Consensus Workspace exploring collaborative multi-model consensus and offline reasoning.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-21T09:10:48Z',
    html_url: 'https://github.com/abhishekbruno/triad-desktop',
    topics: ['multi-agent', 'consensus', 'local-ai']
  },
  {
    name: 'smart-invoice-processor',
    description: 'AI-powered invoice processing and personal assistant with React, Flutter, FastAPI, Gmail automation, and Gemini AI.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-01T22:14:22Z',
    html_url: 'https://github.com/abhishekbruno/smart-invoice-processor',
    homepage: 'https://smart-invoice-processor.vercel.app',
    topics: ['fastapi', 'gemini-ai', 'react', 'automation']
  },
  {
    name: 'drug-discovery-phase1',
    description: 'Reproducible CPU molecular docking pipeline with RDKit, Meeko, AutoDock Vina, a local researcher UI, and validated 1IEP redocking.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-22T15:33:21Z',
    html_url: 'https://github.com/abhishekbruno/drug-discovery-phase1',
    topics: ['docking', 'rdkit', 'autodock-vina', 'bioinformatics']
  },
  {
    name: 'bushido-chronicles',
    description: 'An immersive, cinematic Samurai heritage website featuring interactive Japanese history, animated Sakura landscapes, and scroll-driven katana forging.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-04T11:37:58Z',
    html_url: 'https://github.com/abhishekbruno/bushido-chronicles',
    topics: ['threejs', 'gsap', 'react', 'creative-web']
  },
  {
    name: 'POS',
    description: 'Point of sale management system with responsive catalog and order total calculation.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-01-30T13:15:10Z',
    html_url: 'https://github.com/abhishekbruno/POS',
    topics: ['pos', 'javascript', 'inventory']
  },
  {
    name: 'run-from-dog',
    description: 'A 2D canvas arcade game exploring sprite collision, scoring loops, and physics animations.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-01-28T19:22:28Z',
    html_url: 'https://github.com/abhishekbruno/run-from-dog',
    topics: ['game', 'canvas']
  },
  {
    name: 'tetris-game',
    description: 'Classic grid-based block puzzle web game with rotation algorithms and interactive controls.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-03T10:43:01Z',
    html_url: 'https://github.com/abhishekbruno/tetris-game',
    topics: ['tetris', 'javascript']
  },
  {
    name: 'smart-content-scanner',
    description: 'Collaborative project with peer engineering team focused on automated content scanning and validation.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-02-07T10:24:28Z',
    html_url: 'https://github.com/abhishekbruno/smart-content-scanner',
    topics: ['text-scanner', 'collaboration']
  },
  {
    name: '-EduVista-project',
    description: 'Early-stage scaffolding exploration for educational workflows.',
    language: 'Web',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-03-28T20:10:39Z',
    html_url: 'https://github.com/abhishekbruno/-EduVista-project',
    topics: ['education']
  }
];

export function useGithubData() {
  const [repos, setRepos] = useState(fallbackRepos);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalRepos: fallbackRepos.length,
    stars: 0,
    forks: 0,
    languages: { Python: 6, JavaScript: 5, Other: 1 }
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/users/abhishekbruno/repos?per_page=100');
        if (!res.ok) {
          throw new Error(`GitHub API responded with status ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          if (isMounted) {
            setRepos(data);
            setIsLive(true);

            // Compute actual statistics from verified live data
            const stars = data.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
            const forks = data.reduce((acc, r) => acc + (r.forks_count || 0), 0);
            const langCounts = {};
            data.forEach(r => {
              const lang = r.language || 'Other';
              langCounts[lang] = (langCounts[lang] || 0) + 1;
            });

            setStats({
              totalRepos: data.length,
              stars,
              forks,
              languages: langCounts
            });
            setError(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('GitHub API fetch notice (using verified fallback cache):', err.message);
          setError(err.message);
          setIsLive(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { repos, loading, isLive, error, stats };
}
