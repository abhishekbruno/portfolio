import React, { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code,
  Layout,
  Cpu,
  Wrench,
  Shield,
  ArrowRight,
  Search
} from 'lucide-react';
import { skillsData } from '../data/portfolio';
import SectionHeader from '../components/ui/SectionHeader';
import TechBadge from '../components/ui/TechBadge';
import ChapterTransition from '../components/layout/ChapterTransition';
import SkillsThroneBackdrop from '../components/skills/SkillsThroneBackdrop';
import '../components/skills/skills-throne.css';

const CARD_FACES = {
  programming: { rank: 'A', suit: '♠', suitName: 'spades' },
  frontend: { rank: 'K', suit: '♦', suitName: 'diamonds' },
  'ai-automation': { rank: 'Q', suit: '♥', suitName: 'hearts' },
  tools: { rank: 'J', suit: '♣', suitName: 'clubs' },
  exploration: { rank: '10', suit: '♠', suitName: 'spades' }
};

const CATEGORY_ICONS = {
  programming: Code,
  frontend: Layout,
  'ai-automation': Cpu,
  tools: Wrench,
  exploration: Shield
};

const CATEGORY_NUMBERS = {
  programming: '01',
  frontend: '02',
  'ai-automation': '03',
  tools: '04',
  exploration: '05'
};

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const sectionRectRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const ambientRafRef = useRef(0);
  const ambientTargetRef = useRef({ x: 0, y: 0 });
  const cardRefs = useRef({});
  const indexRefs = useRef({});
  const cardRectsRef = useRef(new WeakMap());
  const cardRafRef = useRef(new WeakMap());
  const activeHoverIdRef = useRef(null);

  // Sync card <-> index visual active highlight directly on DOM nodes (0 React re-renders on hover!)
  const setSyncedCategory = (categoryId) => {
    const prev = activeHoverIdRef.current;
    if (prev === categoryId) return;
    if (prev) {
      cardRefs.current[prev]?.classList.remove('skills-playing-card--active-synced');
      indexRefs.current[prev]?.classList.remove('skills-index-item--active');
    }
    activeHoverIdRef.current = categoryId;
    if (categoryId) {
      cardRefs.current[categoryId]?.classList.add('skills-playing-card--active-synced');
      indexRefs.current[categoryId]?.classList.add('skills-index-item--active');
    }
  };

  const handleSectionPointerEnter = (e) => {
    if (shouldReduceMotion || e.pointerType !== 'mouse') return;
    sectionRectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleSectionPointerMove = (e) => {
    if (shouldReduceMotion || e.pointerType !== 'mouse' || !ambientGlowRef.current) return;
    if (!sectionRectRef.current) sectionRectRef.current = e.currentTarget.getBoundingClientRect();
    const rect = sectionRectRef.current;
    ambientTargetRef.current.x = e.clientX - rect.left;
    ambientTargetRef.current.y = e.clientY - rect.top;

    if (!ambientRafRef.current) {
      ambientRafRef.current = requestAnimationFrame(() => {
        ambientRafRef.current = 0;
        const glowEl = ambientGlowRef.current;
        if (!glowEl) return;
        const { x, y } = ambientTargetRef.current;
        glowEl.style.transform = `translate3d(${(x - 275).toFixed(1)}px, ${(y - 275).toFixed(1)}px, 0)`;
      });
    }
  };

  const handleSectionPointerLeave = () => {
    sectionRectRef.current = null;
  };

  const handleCardPointerEnter = (event, categoryId) => {
    setSyncedCategory(categoryId);
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;
    cardRectsRef.current.set(event.currentTarget, event.currentTarget.getBoundingClientRect());
  };

  const handleCardPointerMove = (event) => {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;
    const container = event.currentTarget;
    let bounds = cardRectsRef.current.get(container);
    if (!bounds) {
      bounds = container.getBoundingClientRect();
      cardRectsRef.current.set(container, bounds);
    }
    const clientX = event.clientX;
    const clientY = event.clientY;

    if (cardRafRef.current.get(container)) return;
    const id = requestAnimationFrame(() => {
      cardRafRef.current.delete(container);
      const face = container.querySelector('.skills-playing-card-face');
      if (!face || !bounds.width || !bounds.height) return;
      const px = (clientX - bounds.left) / bounds.width - 0.5;
      const py = (clientY - bounds.top) / bounds.height - 0.5;
      face.style.setProperty('--tilt-x', `${(-py * 5).toFixed(2)}deg`);
      face.style.setProperty('--tilt-y', `${(px * 5).toFixed(2)}deg`);
      face.style.setProperty('--pointer-x', `${((px + 0.5) * 100).toFixed(0)}%`);
      face.style.setProperty('--pointer-y', `${((py + 0.5) * 100).toFixed(0)}%`);
    });
    cardRafRef.current.set(container, id);
  };

  const resetCardPointer = (event) => {
    const container = event.currentTarget;
    const pending = cardRafRef.current.get(container);
    if (pending) {
      cancelAnimationFrame(pending);
      cardRafRef.current.delete(container);
    }
    cardRectsRef.current.delete(container);
    const face = container.querySelector('.skills-playing-card-face');
    if (face) {
      face.style.setProperty('--tilt-x', '0deg');
      face.style.setProperty('--tilt-y', '0deg');
    }
  };

  const handleIndexClick = (categoryId) => {
    const cardElement = cardRefs.current[categoryId];
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setSyncedCategory(categoryId);
      const actionButton = cardElement.querySelector('.skills-playing-card-action');
      actionButton?.focus({ preventScroll: true });
    }
  };

  const allSkills = useMemo(
    () =>
      skillsData.categories.flatMap((cat) =>
        cat.skills.map((skill) => ({
          ...skill,
          categoryId: cat.id,
          categoryName: cat.name,
          catNumber: CATEGORY_NUMBERS[cat.id] || '00'
        }))
      ),
    []
  );

  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allSkills.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.categoryId === activeCategory;
      const matchesSearch =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        (skill.highlight && skill.highlight.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, activeCategory, searchQuery]);

  return (
    <section
      id="skills"
      onPointerEnter={handleSectionPointerEnter}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="py-24 md:py-32 relative border-b border-[#292929] overflow-hidden bg-[#080808]"
    >
      {/* Chapter Transition Laser & Ambient Lighting */}
      <ChapterTransition />

      {/* ─── ENVIRONMENTAL ATMOSPHERIC LIGHTING (Far-Left Crimson & Right Subtle Gold) ─── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        {/* 1. Far-Left Soft Crimson Illumination */}
        <div
          className="absolute top-1/4 -left-[12%] w-[55vw] max-w-[700px] h-[75%] rounded-full opacity-70"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 0% 50%, rgba(193, 18, 31, 0.14) 0%, rgba(120, 0, 0, 0.05) 45%, transparent 75%)'
          }}
        />

        {/* 2. Right-Hand Subtle Gold Rim Lighting */}
        <div
          className="absolute top-1/3 -right-[12%] w-[50vw] max-w-[650px] h-[70%] rounded-full opacity-65"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 100% 50%, rgba(198, 155, 92, 0.12) 0%, rgba(138, 102, 53, 0.04) 45%, transparent 75%)'
          }}
        />

        {/* 3. Pointer-Responsive Ambient Lighting (GPU transform sprite, zero gradient repaints!) */}
        <div
          ref={ambientGlowRef}
          className="skills-ambient-cursor-glow hidden lg:block"
        />

        {/* 4. Peripheral Atmospheric Dark Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/40 to-[#080808]/90" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionHeader
          chapter="003"
          category="TECHNICAL ARSENAL"
          title="SYSTEM CAPABILITIES & EXPERTISE"
          subtitle="Editorial breakdown of programming paradigms, agentic AI protocols, engineering tooling, and active computational disciplines."
        />

        {/* Legend / Status Protocol */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#A1A1A1]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#C1121F]">■</span>
            <span>VERIFIED CAPABILITY (EXPERIENCED)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#A1A1A1]">■</span>
            <span>ACTIVE SYSTEM DEPLOYMENT (LEARNING)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#666666]">■</span>
            <span>EXPLORATORY RESEARCH</span>
          </div>
        </motion.div>

        {/* Category Filter Buttons & Search Input */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12"
        >
          {/* Sharp Rectangular Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setActiveCategory('all')}
              type="button"
              className={`px-4 py-2 font-title text-xs uppercase tracking-[0.15em] border transition-all duration-200 interactive-target ${
                activeCategory === 'all'
                  ? 'border-[#C1121F] bg-[#C1121F] text-white font-bold'
                  : 'border-[#292929] bg-[#111111] text-[#A1A1A1] hover:border-[#C1121F] hover:text-white'
              }`}
            >
              ALL PROTOCOLS
            </button>
            {skillsData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`px-4 py-2 font-title text-xs uppercase tracking-[0.15em] border transition-all duration-200 interactive-target ${
                  activeCategory === cat.id
                    ? 'border-[#C1121F] bg-[#C1121F] text-white font-bold'
                    : 'border-[#292929] bg-[#111111] text-[#A1A1A1] hover:border-[#C1121F] hover:text-white'
                }`}
              >
                {CATEGORY_NUMBERS[cat.id]} / {cat.name}
              </button>
            ))}
          </div>

          {/* Precision Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="text"
              placeholder="SEARCH PROTOCOL OR TECH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 font-mono text-xs uppercase bg-[#111111] border border-[#292929] text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#C1121F]"
            />
          </div>
        </motion.div>

        {/* Cinematic poker-card spread flanked by atmospheric identity & interactive category index */}
        {activeCategory === 'all' && !searchQuery ? (
          <div className="skills-cinematic-stage">
            {/* ─── LEFT ATMOSPHERIC COLUMN: 03 / THE ARSENAL ─── */}
            <motion.aside
              initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="skills-side-rail skills-side-rail--left hidden xl:flex flex-col items-center pt-6 select-none pointer-events-none"
              aria-hidden="true"
            >
              <span className="font-display text-4xl xl:text-5xl text-[#c69b5c]/30 font-bold tracking-widest">
                03
              </span>
              <div className="skills-gold-rule my-4" />
              <span className="skills-arsenal-vertical-title">
                THE ARSENAL
              </span>
              <div className="skills-gold-rule my-4" />
              <p className="font-mono text-[8px] xl:text-[9px] text-[#777777]/70 tracking-[0.2em] text-center max-w-[85px] uppercase leading-relaxed mt-2">
                HIGH-CALIBER ENGINEERING PROTOCOLS
              </p>
            </motion.aside>

            {/* ─── CENTER: 5 POKER CARDS FRAMING SEATED THRONE PORTRAIT ─── */}
            <div className="skills-portrait-stage">
              <div className="skills-dossier-grid" aria-label="Five technical skill cards framing the seated throne portrait">
                {skillsData.categories.map((category, idx) => {
                  const Icon = CATEGORY_ICONS[category.id] || Cpu;
                  const num = CATEGORY_NUMBERS[category.id] || '01';
                  const card = CARD_FACES[category.id];
                  const expanded = expandedCard === category.id;
                  const detailsId = `card-details-${category.id}`;

                  return (
                    <motion.article
                      key={category.id}
                      ref={(node) => {
                        cardRefs.current[category.id] = node;
                      }}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 34, rotateZ: idx % 2 ? 2 : -2 }}
                      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ duration: 0.65, delay: Math.min(idx * 0.09, 0.36), ease: [0.16, 1, 0.3, 1] }}
                      onPointerMove={handleCardPointerMove}
                      onPointerEnter={(e) => handleCardPointerEnter(e, category.id)}
                      onPointerLeave={(e) => {
                        resetCardPointer(e);
                        setSyncedCategory(null);
                      }}
                      onFocus={() => setSyncedCategory(category.id)}
                      onBlur={() => setSyncedCategory(null)}
                      className={`skills-playing-card skills-playing-card--${card.suitName} skills-playing-card--${category.id}`}
                      aria-label={`${category.name} skill category`}
                    >
                      <div className="skills-playing-card-face">
                        <div className="skills-playing-card-border" aria-hidden="true" />
                        <div className="skills-playing-card-corner skills-playing-card-corner--top" aria-hidden="true">
                          <strong>{card.rank}</strong><span>{card.suit}</span>
                        </div>
                        <div className="skills-playing-card-corner skills-playing-card-corner--bottom" aria-hidden="true">
                          <strong>{card.rank}</strong><span>{card.suit}</span>
                        </div>
                        <span className="skills-playing-card-watermark" aria-hidden="true">{card.suit}</span>

                        <div className="skills-playing-card-content">
                          <div className="skills-playing-card-eyebrow">
                            <span>FILE {num} / 05</span>
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </div>

                          <div className="skills-playing-card-heading">
                            <span className="skills-playing-card-ornament" aria-hidden="true">{card.suit}</span>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                          </div>

                          <ul className="skills-playing-card-skills" aria-label={`${category.name} technologies`}>
                            {category.skills.map((skill) => (
                              <li key={skill.name} className="skills-playing-card-skill">
                                <span className={`skills-playing-card-status skills-playing-card-status--${skill.status}`} aria-hidden="true" />
                                <span className="skills-playing-card-skill-name">{skill.name}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            type="button"
                            className="skills-playing-card-action interactive-target"
                            onClick={() => setExpandedCard(expanded ? null : category.id)}
                            aria-expanded={expanded}
                            aria-controls={detailsId}
                          >
                            <span>{expanded ? 'CLOSE DOSSIER' : 'INSPECT CAPABILITIES'}</span>
                            <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? '-rotate-90' : 'group-hover:translate-x-1'}`} aria-hidden="true" />
                          </button>
                          <div id={detailsId} className="skills-playing-card-expansion" hidden={!expanded}>
                            <p className="skills-playing-card-expansion-title">SPECIALIZATION NOTES</p>
                            <ul>
                              {category.skills.map((skill) => (
                                <li key={skill.name}><strong>{skill.name}</strong><span>{skill.highlight || 'Technical capability'}</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
                <div className="skills-throne-column">
                  <SkillsThroneBackdrop />
                </div>
              </div>
            </div>

            {/* ─── RIGHT INTERACTIVE COLUMN: 01-05 SKILL CATEGORY INDEX ─── */}
            <motion.aside
              initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="skills-side-rail skills-side-rail--right hidden xl:flex flex-col pt-6 select-none"
              aria-label="Skill category quick index"
            >
              <div className="skills-index-header">
                <span className="font-mono text-[9px] tracking-[0.28em] text-[#888888] uppercase block">
                  INDEX // ARSENAL
                </span>
              </div>

              <nav className="flex flex-col gap-2" role="navigation" aria-label="Skill card quick navigation">
                {skillsData.categories.map((cat) => {
                  const num = CATEGORY_NUMBERS[cat.id] || '01';

                  return (
                    <button
                      key={cat.id}
                      ref={(node) => {
                        indexRefs.current[cat.id] = node;
                      }}
                      type="button"
                      onClick={() => handleIndexClick(cat.id)}
                      onMouseEnter={() => setSyncedCategory(cat.id)}
                      onMouseLeave={() => setSyncedCategory(null)}
                      onFocus={() => setSyncedCategory(cat.id)}
                      onBlur={() => setSyncedCategory(null)}
                      className="skills-index-item group transition-colors duration-200 cursor-pointer"
                      aria-label={`Jump to ${cat.name} card`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="skills-index-num font-mono text-[10px] tracking-wider transition-colors duration-200">
                          {num}
                        </span>
                        <span className="skills-index-name font-title text-[11px] uppercase tracking-[0.14em] transition-colors duration-200">
                          {cat.name}
                        </span>
                      </div>
                      {/* Small animated gold indicator line */}
                      <div className="skills-index-indicator" aria-hidden="true" />
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </div>
        ) : (
          /* Filtered View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={`${skill.name}-${skill.categoryId}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.04, 0.4),
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="p-5 border border-[#292929] bg-[#141414] hover:border-[#C1121F] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-[#C1121F] uppercase tracking-widest">
                      {skill.catNumber} // {skill.categoryName}
                    </span>
                  </div>
                  <div className="mb-3">
                    <TechBadge text={skill.name} status={skill.status} size="md" />
                  </div>
                  {skill.highlight && (
                    <p className="font-mono text-xs text-[#888888] uppercase mt-2">
                      {skill.highlight}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
