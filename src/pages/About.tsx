import { Mail, MapPin, Instagram } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { CREATOR_PARTNERS } from '../data/creatorPartners';

const EXPERIENCE = [
  {
    role: 'GenAI Video Creator & Animator',
    company: 'AweTales',
    period: '2024 — Present',
    description: 'Producing AI-powered animated kids stories and cinematic reels using Seedance 2.0, Veo 3, and Nano Banana. Building immersive narrative worlds for young audiences.',
    current: true,
  },
  {
    role: 'Motion Designer & Brand Strategist',
    company: 'Freelance — THEJOSHIDESIGNS',
    period: '2022 — Present',
    description: 'End-to-end brand identity and motion work for individual and enterprise clients across 10+ industries. Specializing in social-first content and cinematic storytelling.',
  },
  {
    role: 'Video Producer & Editor',
    company: 'Creative Studio',
    period: '2020 — 2022',
    description: 'Led video production pipelines for brand campaigns, product launches, and social media content. Managed creative direction from concept to final delivery.',
  },
  {
    role: 'Visual Content Creator',
    company: 'Digital Agency',
    period: '2018 — 2020',
    description: 'Designed and produced motion graphics, explainer videos, and brand reels for enterprise clients. Foundation in visual storytelling and post-production workflows.',
  },
];

const SKILLS_CORE = [
  'Seedance 2.0', 'Veo 3', 'Nano Banana', 'GenAI Prompt Engineering',
  '3D Pixar-Style Animation', 'Kids Story Animation', 'Cinematic Reel Production',
  'Character Design',
];

const SKILLS_SUPPORTING = [
  'Kling', 'Premiere Pro', 'Figma', 'Motion Branding', 'Storyboarding', 'Color Grading',
];

const TOOLS = ['Seedance 2.0', 'Veo 3', 'Nano Banana', 'Kling', 'Premiere Pro', 'Figma', 'Canva Pro', 'ChatGPT'];

export default function About() {
  return (
    <div className="min-h-screen bg-apple-bg pt-24 lg:pt-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
        {/* Header */}
        <ScrollReveal>
          <p className="text-apple-secondary text-sm font-medium mb-4">About</p>
          <h1
            className="font-bold text-apple-text tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.035em' }}
          >
            Joshi Bhavani<br />Prasad Saladi
          </h1>
          <div className="glass-pill inline-flex items-center gap-2.5 mb-12 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-apple-success" />
            <span className="text-apple-text text-sm font-medium">
              Open to Projects · CPP Partner · 7 Platforms
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left — Main content */}
          <div className="lg:col-span-2">
            {/* Bio */}
            <ScrollReveal delay={100}>
              <div className="mb-14">
                <p className="text-apple-secondary text-base leading-7 mb-4">
                  I am a Video Producer, GenAI Animator, and Creative Strategist operating under the banner of THEJOSHIDESIGNS. Born and raised along the banks of the Godavari river in Telugu Nadu, I now create from Columbia, MO — turning the nostalgia of Indian childhood memories into animated stories that resonate globally.
                </p>
                <p className="text-apple-secondary text-base leading-7 mb-4">
                  My work spans 3D Pixar-style kids animations, AI-powered cinematic reels, and brand campaigns for clients across the globe. Currently at AweTales, I am pioneering the use of tools like Seedance 2.0, Veo 3, and Nano Banana to craft immersive animated worlds for young audiences.
                </p>
                <p className="text-apple-secondary text-base leading-7">
                  As a Certified Creator Partner across seven leading AI platforms — OpenArt, Pollo AI, ImagineArt, Dreamina, ThankYouAI, RunDiffusion, and VideoDuck AI — I sit at the intersection of cultural storytelling and cutting-edge AI technology — creating work that feels both deeply human and technically exceptional.
                </p>
              </div>
            </ScrollReveal>

            {/* Photo section */}
            <ScrollReveal delay={150}>
              <div className="mb-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="surface-card overflow-hidden">
                  <img
                    src="/d.png"
                    alt="Joshi Bhavani Prasad Saladi"
                    className="w-full h-72 sm:h-80 object-cover object-top"
                  />
                </div>
                <div className="surface-card overflow-hidden">
                  <img
                    src="/A_dimly_lit_animation_studio_room_interior_a_dark__delpmaspu.png"
                    alt="Character creations by THEJOSHIDESIGNS"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Experience */}
            <ScrollReveal delay={200}>
              <div className="mb-14">
                <h2 className="text-lg font-semibold text-apple-text tracking-tight mb-6">Experience</h2>
                <div className="divide-y divide-apple-border">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="py-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="font-semibold text-apple-text text-base leading-snug tracking-tight">
                            {exp.role}
                          </h3>
                          <p className="text-apple-secondary text-sm mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-apple-secondary text-sm">{exp.period}</span>
                          {exp.current && (
                            <span className="text-xs font-medium rounded-full bg-apple-accent/10 text-apple-accent border border-apple-accent/20 px-2.5 py-0.5">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-apple-secondary text-sm leading-6 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal delay={250}>
              <div className="mb-14">
                <h2 className="text-lg font-semibold text-apple-text tracking-tight mb-6">Skills &amp; Tools</h2>

                <p className="text-apple-secondary text-sm font-medium mb-3">Core Expertise</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {SKILLS_CORE.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full border border-apple-border bg-white text-apple-text text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-apple-secondary text-sm font-medium mb-3">Supporting Skills</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {SKILLS_SUPPORTING.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full border border-apple-border bg-white text-apple-secondary text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-apple-secondary text-sm font-medium mb-3">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full border border-apple-border bg-apple-bg text-apple-secondary text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Sidebar */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={300}>
              <div className="sticky top-24 space-y-4">
                {/* Availability card */}
                <div className="surface-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-apple-success" />
                    <span className="text-apple-success text-sm font-medium">Available</span>
                  </div>
                  <p className="text-apple-text text-sm leading-6 font-medium">
                    Open to Animation, GenAI, and Creative Projects
                  </p>
                </div>

                {/* CPP Partners — non-interactive glass tiles */}
                <div className="surface-card p-6">
                  <p className="text-apple-secondary text-sm font-medium mb-4">CPP Partners</p>
                  <div className="flex flex-col gap-3">
                    {CREATOR_PARTNERS.map((p) => (
                      <div
                        key={p.name}
                        className="glass-tile flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        aria-label={`${p.name} — ${p.desc}`}
                      >
                        {p.logoPath ? (
                          <img
                            src={p.logoPath}
                            alt={`${p.name} logo`}
                            className="h-6 w-auto object-contain"
                          />
                        ) : (
                          <div className="flex items-center gap-2.5">
                            {p.iconPath && (
                              <img
                                src={p.iconPath}
                                alt={`${p.name} icon`}
                                className="h-6 w-6 object-contain flex-shrink-0"
                              />
                            )}
                            <span className="text-sm font-medium text-apple-text whitespace-nowrap">
                              {p.name}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div className="surface-card p-6 space-y-4">
                  <p className="text-apple-secondary text-sm font-medium mb-2">Contact</p>
                  <a
                    href="mailto:joshibhavaniprasad@gmail.com"
                    className="flex items-center gap-3 text-apple-secondary text-sm hover:text-apple-accent transition-colors"
                  >
                    <Mail size={14} className="text-apple-accent flex-shrink-0" />
                    joshibhavaniprasad@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-apple-secondary text-sm">
                    <MapPin size={14} className="text-apple-accent flex-shrink-0" />
                    Columbia, MO
                  </div>
                  <a
                    href="https://www.instagram.com/thejoshidesigns/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-apple-secondary text-sm hover:text-apple-accent transition-colors"
                  >
                    <Instagram size={14} className="text-apple-accent flex-shrink-0" />
                    @thejoshidesigns
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
