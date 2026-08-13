import { useState, useEffect } from 'react';
import { Video, Camera, Layers, Users, LayoutTemplate, Code2, Smile, VolumeX, TrendingUp, Settings2, Star, Zap, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Capability {
  title: string;
  icon: LucideIcon;
  short: string;
  details: string[];
  deliverables: string[];
}

const CAPABILITIES: Capability[] = [
  {
    title: 'AI-Driven Animation Production',
    icon: Video,
    short: 'Complete animation production using advanced AI pipelines with strong control over output quality and consistency.',
    details: [
      'End-to-end image-to-video workflows using Google Veo and Higgsfield',
      'Frame-first approach: design keyframes before motion generation',
      'Start-to-end frame continuity control to avoid randomness',
      'High iteration speed while maintaining visual consistency',
      'Multi-pass refinement: composition → lighting → motion → polish',
      'Convert static concepts into cinematic moving visuals',
    ],
    deliverables: ['Short-form animated videos', 'Episodic animated content', 'Cinematic sequences', 'AI production pipelines'],
  },
  {
    title: 'Cinematic Visual Direction',
    icon: Camera,
    short: 'AI visuals directed with cinematic intent, not generic generation.',
    details: [
      'FPV-style camera movements and immersive fly-throughs',
      'Lens-based prompting: wide, macro, depth-of-field control',
      'Realistic lighting design: soft light, volumetric, shadows',
      'Environmental depth: foreground, midground, background layering',
      'Motion choreography for smooth, intentional camera flow',
      'Film-style scene composition rather than flat framing',
    ],
    deliverables: ['Cinematic reels', 'High-impact visual sequences', 'Environment-driven storytelling shots'],
  },
  {
    title: 'Stylized 2D & Hybrid Animation',
    icon: Layers,
    short: 'Controlled visual styles that avoid the typical AI-generated look.',
    details: [
      'Retro-inspired 2D animation style (2000–2010 aesthetic)',
      'Reduced gloss, matte skin tones, natural textures',
      'Hybrid approach combining 2D look with 3D depth',
      'Style locking across scenes and episodes',
      'Clean character silhouettes and expressive forms',
      'Avoidance of plastic or over-rendered AI artifacts',
    ],
    deliverables: ['Stylized animated series', 'Character-driven short content', 'Brand-friendly animation styles'],
  },
  {
    title: 'Character & World Building',
    icon: Users,
    short: 'Designing characters and worlds that support storytelling and scalability.',
    details: [
      'Consistent character systems: face, body, costume, proportions',
      'Expression design for emotion and humor',
      'Cultural detailing: Indian settings, historical environments',
      'Prop and environment design aligned with narrative',
      'Scalable assets for episodic reuse',
      'Strong visual identity for recurring characters',
    ],
    deliverables: ['Character design systems', 'World environments', 'Story-driven visual ecosystems'],
  },
  {
    title: 'Storyboarding & Scene Engineering',
    icon: LayoutTemplate,
    short: 'Precise scene planning with timing, pacing, and visual continuity.',
    details: [
      'Shot-by-shot breakdowns with second-level timing',
      'Scene pacing optimized for short-form content',
      'Transition logic between shots: no abrupt cuts',
      'Visual storytelling beats mapped clearly',
      'Camera and action planning before generation',
      'Structured episodic flow',
    ],
    deliverables: ['Scene breakdown documents', 'Shot lists', 'Visual timing plans'],
  },
  {
    title: 'AI Video Prompt Engineering',
    icon: Code2,
    short: 'Highly controlled prompting systems to achieve consistent, production-ready visuals.',
    details: [
      'Structured prompts controlling motion, lighting, and realism',
      'Time-sequenced prompts: per-second breakdowns',
      'Artifact reduction: gloss, distortion, inconsistencies',
      'Style consistency across multiple generations',
      'Prompt modularization for reuse',
      'Advanced control of camera behavior through prompts',
    ],
    deliverables: ['Production-grade prompts', 'Repeatable prompt systems', 'Style-consistent outputs'],
  },
  {
    title: 'Comedic & Narrative Content Design',
    icon: Smile,
    short: 'Story-driven animation with strong emphasis on visual humor and character dynamics.',
    details: [
      'Situational comedy structuring inspired by classic sitcom formats',
      'Visual humor timing without heavy dialogue dependency',
      'Character-based humor arcs',
      'Episodic storytelling structure',
      'Writing aligned with animation timing',
      'Strong narrative hooks for short content',
    ],
    deliverables: ['Animated comedy episodes', 'Story-driven short videos', 'Script + visual integration'],
  },
  {
    title: 'Minimal-Sound Visual Storytelling',
    icon: VolumeX,
    short: 'Stories designed to work effectively without dialogue or heavy audio.',
    details: [
      'Visual-first storytelling approach',
      'Minimal SFX-driven scenes',
      'Clear motion cues to convey meaning',
      'Designed for mute viewing on social platforms',
      'Emotion and narrative conveyed through visuals alone',
    ],
    deliverables: ['Silent storytelling animations', 'Social-first video content', 'Visually driven narratives'],
  },
  {
    title: 'Social Media Content Optimization',
    icon: TrendingUp,
    short: 'Animation designed specifically for engagement, retention, and virality.',
    details: [
      'Strong first 3-second hooks',
      'Loopable video structures',
      'Vertical format optimization: Reels, Shorts',
      'Thumbnail-aware composition',
      'Caption and visual alignment strategy',
      'Fast-paced storytelling for attention retention',
    ],
    deliverables: ['Instagram Reels', 'YouTube Shorts', 'Viral-ready animations'],
  },
  {
    title: 'Creative AI Workflow Design',
    icon: Settings2,
    short: 'Building scalable systems for consistent and efficient content production.',
    details: [
      'Multi-tool pipelines combining different AI platforms',
      'Iteration frameworks for consistent output',
      'Asset reuse strategies: characters, props, environments',
      'Workflow optimization for speed and quality',
      'Episodic production systems',
      'Modular content creation pipelines',
    ],
    deliverables: ['Custom production workflows', 'Scalable animation systems', 'Pipeline documentation'],
  },
  {
    title: 'Branding & Visual Identity Through Animation',
    icon: Star,
    short: 'Using animation to build strong and recognizable brand identities.',
    details: [
      'Animated brand storytelling',
      'Logo reveal sequences with physics-based motion',
      'Visual identity systems through animation style',
      'Consistent tone across all content pieces',
      'Motion design aligned with brand personality',
    ],
    deliverables: ['Brand animations', 'Logo reveals', 'Visual identity systems'],
  },
  {
    title: 'Experimental & High-Concept Visuals',
    icon: Zap,
    short: 'Pushing beyond standard animation into unique and abstract visual experiences.',
    details: [
      'Abstract transitions: liquid, particle, morphing',
      'Symbolic storytelling through objects and transformations',
      'High-speed cinematic sequences',
      'Surreal and conceptual world creation',
      'Experimental visual narratives',
      'AI-assisted creative exploration',
    ],
    deliverables: ['Concept visuals', 'Experimental animations', 'High-impact creative pieces'],
  },
];

export default function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (activeIndex !== null) {
      requestAnimationFrame(() => setDrawerVisible(true));
    } else {
      setDrawerVisible(false);
    }
  }, [activeIndex]);

  const handleClose = () => {
    setDrawerVisible(false);
    setTimeout(() => setActiveIndex(null), 300);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const active = activeIndex !== null ? CAPABILITIES[activeIndex] : null;

  return (
    <section className="py-24 px-6 lg:px-10 bg-apple-bg border-t border-apple-border">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-apple-secondary text-sm font-medium mb-4">Capabilities</p>
          <h2 className="text-3xl lg:text-5xl font-semibold text-apple-text tracking-tight mb-4" style={{ letterSpacing: '-0.025em' }}>
            What I Do
          </h2>
          <p className="text-apple-secondary text-base max-w-xl mb-12">
            End-to-end AI animation, cinematic storytelling, and scalable creative systems.
          </p>
        </ScrollReveal>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-200 ${activeIndex !== null ? '[&>*:not([data-active])]:opacity-40' : ''}`}
          style={{ gridAutoRows: '1fr' }}
        >
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            const isActive = activeIndex === i;
            return (
              <ScrollReveal key={cap.title} delay={Math.min(i * 40, 320)} className="h-full">
                <button
                  data-active={isActive ? true : undefined}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  className={`w-full h-full text-left p-6 rounded-16 transition-all duration-200 active:scale-[0.98] flex flex-col surface-card ${isActive ? 'surface-card-hover' : 'hover:border-apple-text/20'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-16 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${isActive ? 'bg-apple-accent/10' : 'bg-apple-bg'}`}>
                      <Icon
                        size={16}
                        className={`transition-colors duration-200 ${isActive ? 'text-apple-accent' : 'text-apple-secondary'}`}
                      />
                    </div>
                    <span className="font-bold text-3xl leading-none select-none transition-colors duration-200 text-apple-border">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className={`text-sm lg:text-base font-semibold leading-snug mb-2 tracking-tight transition-colors duration-200 ${isActive ? 'text-apple-accent' : 'text-apple-text'}`}>
                    {cap.title}
                  </h3>
                  <p className="text-apple-secondary text-xs leading-5 line-clamp-2 flex-1">
                    {cap.short}
                  </p>
                  {isActive && (
                    <div className="mt-3 text-xs font-medium flex items-center gap-1 text-apple-accent">
                      Tap to expand ↓
                    </div>
                  )}
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {activeIndex !== null && active && (
        <>
          <div
            className="fixed inset-0 z-40 transition-opacity duration-200"
            style={{
              background: 'rgba(17,19,24,0.25)',
              opacity: drawerVisible ? 1 : 0,
            }}
            onClick={handleClose}
          />

          <div
            className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-200 ease-out bg-white border-t border-apple-border"
            style={{
              transform: drawerVisible ? 'translateY(0)' : 'translateY(100%)',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-16 bg-apple-bg flex items-center justify-center flex-shrink-0">
                    <active.icon size={16} className="text-apple-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-apple-text text-xl lg:text-2xl leading-tight tracking-tight">
                      {active.title}
                    </h3>
                    <p className="text-apple-secondary text-sm mt-0.5">
                      {active.short}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-apple-bg flex items-center justify-center transition-colors duration-200 flex-shrink-0 ml-4 hover:bg-apple-border active:scale-[0.97]"
                  aria-label="Close"
                >
                  <X size={14} className="text-apple-secondary" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-apple-secondary text-xs font-medium uppercase tracking-wide mb-3">Details</p>
                  <ul className="space-y-2">
                    {active.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-apple-secondary text-sm leading-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-accent flex-shrink-0 mt-1.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-apple-secondary text-xs font-medium uppercase tracking-wide mb-3">Deliverables</p>
                  <div className="flex flex-wrap gap-2">
                    {active.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-3 py-1.5 rounded-full bg-apple-bg text-apple-text text-xs font-medium border border-apple-border"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
