import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { GalleryImage } from '../lib/supabase';
import ScrollReveal from '../components/ScrollReveal';
import HeroReel from '../components/HeroReel';
import ProcessSection from '../components/ProcessSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import HomeAboutSection from '../components/HomeAboutSection';
import { CREATOR_PARTNERS } from '../data/creatorPartners';

export default function Home() {
  const [previewImages, setPreviewImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .eq('is_published', true)
      .order('display_order')
      .limit(6)
      .then(({ data }) => data && setPreviewImages(data as GalleryImage[]));
  }, []);

  const reelImages = previewImages.slice(0, 3).map((img) => ({
    id: img.id,
    title: img.title,
    image_url: img.image_url,
    category: img.category,
  }));

  const featured = previewImages[0];
  const supporting = previewImages.slice(1, 6);

  return (
    <div className="bg-apple-bg">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pb-24 px-6 lg:px-10">
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] gap-10 xl:gap-16 items-center"
        >
          {/* Left column — copy first */}
          <div className="order-1 xl:order-1 min-w-0">
            {/* Eyebrow — frosted glass capsule */}
            <div className="glass-pill inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-apple-success" />
              <span className="text-apple-text text-sm font-medium">
                Open to Projects · CPP Partner · 7 Platforms
              </span>
            </div>

            {/* Heading — full wordmark on one line at all viewports */}
            <h1 className="hero-wordmark font-bold text-apple-text leading-[1.05] mb-6">
              <span className="block whitespace-nowrap">THEJOSHIDESIGNS</span>
            </h1>

            {/* Positioning statement */}
            <p className="text-apple-text text-xl lg:text-2xl font-medium leading-snug mb-4 max-w-2xl">
              GenAI animator and creative director turning cultural stories into cinematic motion.
            </p>

            {/* Supporting line */}
            <p className="text-apple-secondary text-base lg:text-lg leading-relaxed mb-10 max-w-xl">
              Telugu nostalgia, Indian tales in motion, and brand campaigns — directed with intent, frame by frame.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/work"
                className="px-7 py-3 rounded-full bg-apple-accent text-white text-sm font-medium hover:bg-brand-gold-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent focus-visible:ring-offset-2"
              >
                View Work
              </Link>
              <Link
                to="/contact"
                className="btn-neu px-7 py-3 rounded-full text-apple-text text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent focus-visible:ring-offset-2"
              >
                Start a Project
              </Link>
            </div>
          </div>

          {/* Right column — cinematic 3D reel, stays in its grid cell */}
          <div className="order-2 xl:order-2 min-w-0 max-w-full">
            <HeroReel images={reelImages} />
          </div>
        </div>
      </section>

      {/* CPP Partner Section — non-interactive glass tiles */}
      <section className="py-16 px-6 lg:px-10 border-t border-apple-border">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-apple-secondary text-sm font-medium mb-6">
              Certified Creator Partner across seven leading AI platforms
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CREATOR_PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="glass-tile flex items-center justify-center p-6 h-24"
                  aria-label={`${partner.name} — ${partner.desc}`}
                >
                  {partner.logoPath ? (
                    <img
                      src={partner.logoPath}
                      alt={`${partner.name} official logo`}
                      className="max-h-12 max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {partner.iconPath && (
                        <img
                          src={partner.iconPath}
                          alt={`${partner.name} icon`}
                          className="h-8 w-8 object-contain flex-shrink-0"
                        />
                      )}
                      <span className="font-semibold text-apple-text text-base tracking-tight whitespace-nowrap">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About preview */}
      <HomeAboutSection />

      {/* Process */}
      <ProcessSection />

      {/* Capabilities */}
      <CapabilitiesSection />

      {/* Selected Work — editorial layout on charcoal */}
      {previewImages.length > 0 && (
        <section className="section-charcoal py-20 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#9BA3AF' }}>Selected Work</p>
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight" style={{ color: '#F2F4F7' }}>
                    Recent Projects
                  </h2>
                </div>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline transition-colors duration-200"
                  style={{ color: '#3B9BF1' }}
                >
                  See All <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Featured wide card */}
            {featured && (
              <ScrollReveal delay={80}>
                <Link
                  to="/work"
                  className="group relative block overflow-hidden rounded-2xl mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  style={{ aspectRatio: featured.orientation === 'portrait' ? '4/3' : '21/9' }}
                >
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="meta-glass absolute bottom-0 left-0 right-0 p-6 transition-transform duration-250 group-hover:-translate-y-1">
                    <p className="text-white text-lg font-semibold">{featured.title}</p>
                    <p className="text-white/70 text-sm mt-1">{featured.category}</p>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* Supporting grid */}
            {supporting.length > 0 && (
              <ScrollReveal delay={140}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {supporting.map((img) => (
                    <Link
                      key={img.id}
                      to="/work"
                      className="group relative block overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      style={{ aspectRatio: img.orientation === 'portrait' ? '3/4' : '16/10' }}
                    >
                      <img
                        src={img.image_url}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="meta-glass absolute bottom-0 left-0 right-0 p-4 transition-transform duration-250 group-hover:-translate-y-1">
                        <p className="text-white text-sm font-medium">{img.title}</p>
                        <p className="text-white/70 text-xs mt-0.5">{img.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-semibold text-apple-text tracking-tight mb-4">
              Let's Tell Your Story
            </h2>
            <p className="text-apple-secondary text-base mb-8 max-w-lg mx-auto leading-relaxed">
              From emotional nostalgia to brand campaigns — I bring cultural depth and cinematic craft to every frame.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-apple-accent text-white text-sm font-medium hover:bg-brand-gold-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent focus-visible:ring-offset-2"
            >
              Start a Project <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
