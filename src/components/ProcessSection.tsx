import { useEffect, useState } from 'react';
import { Lightbulb, Frame, Code2, Play, Sparkles, Upload } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEPS: { number: string; title: string; desc: string; icon: LucideIcon; cardDetail: string; cardStat: { label: string; value: string } }[] = [
  {
    number: '01',
    title: 'Concept & Intent',
    desc: 'Define story, tone, and visual direction.',
    icon: Lightbulb,
    cardDetail: 'Story structure · Tone mapping · Mood board',
    cardStat: { label: 'First step', value: 'Define' },
  },
  {
    number: '02',
    title: 'Frame Design',
    desc: 'Create keyframes and visual anchors.',
    icon: Frame,
    cardDetail: 'Keyframe layout · Scene anchors · Composition',
    cardStat: { label: 'Output', value: 'Storyboard' },
  },
  {
    number: '03',
    title: 'Prompt Engineering',
    desc: 'Build structured prompts for controlled output.',
    icon: Code2,
    cardDetail: 'Per-second breakdowns · Style tokens · Motion descriptors',
    cardStat: { label: 'Precision', value: 'High' },
  },
  {
    number: '04',
    title: 'Motion Generation',
    desc: 'Generate video with cinematic control.',
    icon: Play,
    cardDetail: 'Seedance 2.0 · Veo 3 · Kling · Nano Banana',
    cardStat: { label: 'Tools', value: '4+' },
  },
  {
    number: '05',
    title: 'Refinement',
    desc: 'Fix artifacts, improve lighting, consistency.',
    icon: Sparkles,
    cardDetail: 'Multi-pass polish · Lighting correction · Style locking',
    cardStat: { label: 'Pass count', value: '3–5x' },
  },
  {
    number: '06',
    title: 'Final Output',
    desc: 'Optimize for platform and delivery.',
    icon: Upload,
    cardDetail: 'Reels · Shorts · Widescreen · Brand formats',
    cardStat: { label: 'Formats', value: '4+' },
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('process-section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.min(
        Math.max((window.innerHeight - rect.top) / rect.height, 0),
        1
      );
      const index = Math.floor(scrollProgress * STEPS.length);
      setActive(Math.min(index, STEPS.length - 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const step = STEPS[active];
  const Icon = step.icon;

  return (
    <section id="process-section" className="relative bg-white" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="relative isolate min-w-0">
            <p className="text-apple-secondary text-sm font-medium mb-8 relative z-10">How I Work</p>

            {/* Background numeral layer — fully visible, behind text */}
            <div
              className="absolute top-0 left-0 w-full pointer-events-none select-none"
              style={{
                fontSize: 'clamp(80px, 14vw, 180px)',
                lineHeight: 0.85,
                color: '#E5E7EB',
                zIndex: 0,
                overflow: 'visible',
                paddingBottom: '0.1em',
              }}
              aria-hidden="true"
            >
              <span className="block" style={{ display: 'inline-block' }}>{step.number}</span>
            </div>

            {/* Text content — transparent background, sits in front of numeral */}
            <div
              className="relative z-10 max-w-xl"
              style={{ paddingTop: 'clamp(90px, 12vw, 150px)' }}
            >
              <h2
                key={`title-${active}`}
                className="font-semibold text-apple-text leading-tight mb-6 animate-fade-up"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
              >
                {step.title}
              </h2>
              <p
                key={`desc-${active}`}
                className="text-apple-secondary text-lg max-w-sm leading-relaxed animate-fade-up"
                style={{ animationDelay: '0.05s' }}
              >
                {step.desc}
              </p>
            </div>

            <div className="relative z-10 mt-10 flex gap-3" aria-label={`Workflow progress: step ${active + 1} of ${STEPS.length}`}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-[3px] w-10 rounded-full transition-all duration-200"
                  style={{
                    background: i <= active ? '#087FE7' : '#E5E7EB',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — Card */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-4 relative">
            <div key={`main-${active}`} className="w-full surface-card p-7 animate-fade-up">
              <div className="w-12 h-12 rounded-16 bg-apple-bg flex items-center justify-center mb-5">
                <Icon size={22} className="text-apple-accent" />
              </div>
              <p className="text-apple-secondary text-xs font-medium uppercase tracking-wide mb-2">
                Step {step.number}
              </p>
              <h3 className="font-semibold text-apple-text text-xl tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-apple-secondary text-sm leading-relaxed">{step.cardDetail}</p>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-apple-border">
                <span className="text-apple-secondary text-xs font-medium">{step.cardStat.label}</span>
                <span className="font-bold text-apple-text text-xl tracking-tight">{step.cardStat.value}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              {[1, 2].map((offset) => {
                const nextIndex = (active + offset) % STEPS.length;
                const NextStep = STEPS[nextIndex];
                const NextIcon = NextStep.icon;
                return (
                  <div
                    key={`preview-${active}-${offset}`}
                    className="surface-card p-4 animate-fade-up"
                    style={{ animationDelay: `${offset * 0.06}s`, opacity: 1 - offset * 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-16 bg-apple-bg flex items-center justify-center mb-3">
                      <NextIcon size={14} className="text-apple-accent" />
                    </div>
                    <p className="text-apple-secondary text-[10px] font-medium uppercase tracking-wide mb-0.5">
                      Step {NextStep.number}
                    </p>
                    <p className="font-semibold text-apple-text text-xs tracking-tight leading-snug">
                      {NextStep.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
