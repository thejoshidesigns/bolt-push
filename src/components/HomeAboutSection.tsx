import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CAPS = [
  {
    title: 'Short Story Series',
    desc: 'Episodic content designed for reels with strong hooks and loop endings.',
  },
  {
    title: 'AI Video Ads',
    desc: 'Cinematic product storytelling built for performance and brand recall.',
  },
  {
    title: 'Cinematic Animation',
    desc: 'Camera-driven visuals with lighting, depth, and intentional motion.',
  },
  {
    title: 'Cultural Nostalgia',
    desc: 'Telugu stories and Indian memories turned into emotionally rich visuals.',
  },
];

export default function HomeAboutSection() {
  return (
    <section className="py-20 px-6 lg:px-10 border-t border-apple-border">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-apple-secondary text-sm font-medium mb-4">About</p>
          <h2
            className="font-semibold text-apple-text leading-tight max-w-3xl mb-16"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            Building animated stories that people actually watch till the end.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Big stat */}
          <ScrollReveal delay={100}>
            <div>
              <div
                className="font-bold text-apple-accent leading-none mb-4"
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', letterSpacing: '-0.04em' }}
              >
                5M+
              </div>
              <p className="text-apple-secondary text-base max-w-xs leading-relaxed mb-6">
                Total views across Instagram animated series.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-apple-accent text-sm font-medium hover:underline transition-colors"
              >
                About Me <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats grid */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Individual Clients', value: '10+' },
                { label: 'Enterprise Clients', value: '15+' },
                { label: 'Current Role', value: 'AweTales' },
              ].map((stat) => (
                <div key={stat.label} className="surface-card p-5">
                  <p className="text-apple-secondary text-xs font-medium uppercase tracking-wide mb-2">
                    {stat.label}
                  </p>
                  <p className="font-bold text-apple-text text-xl tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Capability cards */}
        <ScrollReveal delay={150}>
          <div className="grid md:grid-cols-2 gap-4 mb-20">
            {CAPS.map((item) => (
              <div key={item.title} className="surface-card surface-card-hover p-6">
                <h3 className="text-base font-semibold text-apple-text tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-apple-secondary text-sm leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Positioning line */}
        <ScrollReveal delay={200}>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-apple-border" />
            <p className="text-lg lg:text-xl font-semibold text-apple-text tracking-tight text-center">
              I don't just generate AI videos. <span className="text-apple-accent">I direct them.</span>
            </p>
            <div className="h-px flex-1 bg-apple-border" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
