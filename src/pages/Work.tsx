import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Video, GalleryImage } from '../lib/supabase';
import VideoLightbox from '../components/VideoLightbox';
import ImageLightbox from '../components/ImageLightbox';
import ScrollReveal from '../components/ScrollReveal';
import InstagramSection from '../components/InstagramSection';

type Filter = 'All' | '9:16 Shorts' | '16:9 Films' | 'Kids Stories' | 'Cinematic & GenAI' | 'Branding' | 'Instagram';

const FILTERS: Filter[] = ['All', '9:16 Shorts', '16:9 Films', 'Instagram', 'Kids Stories', 'Cinematic & GenAI', 'Branding'];

function useTilt(maxDeg = 3) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    const ry = Math.max(-maxDeg, Math.min(maxDeg, dx * maxDeg * 2));
    const rx = Math.max(-maxDeg, Math.min(maxDeg, -dy * maxDeg * 2));
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, [maxDeg]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  }, []);

  return { ref, onMove, onLeave };
}

function VideoCard({ video, onClick, responsive }: { video: Video; onClick: () => void; responsive?: boolean }) {
  const is916 = video.aspect_ratio === '9:16';
  const { ref, onMove, onLeave } = useTilt(2.5);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      className="work-card group relative cursor-pointer overflow-hidden rounded-2xl border border-apple-border bg-white"
      style={{
        width: responsive ? '100%' : is916 ? '160px' : '100%',
        aspectRatio: is916 ? '9/16' : '16/9',
      }}
    >
      <div className="work-card-media absolute inset-0 overflow-hidden rounded-2xl">
        {video.thumbnail_url ? (
          <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 bg-apple-bg flex items-center justify-center">
            <span className="font-semibold text-apple-secondary text-sm">T</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Play size={15} className="text-apple-text ml-0.5" fill="currentColor" />
        </div>
      </div>

      <div className="work-meta-plate absolute bottom-2.5 left-2.5 right-2.5 px-3 py-2 rounded-xl pointer-events-none">
        <p className="text-white text-xs font-medium truncate">{video.title}</p>
        <p className="text-white/60 text-[10px] mt-0.5 truncate">{video.category}</p>
      </div>

      {!video.embed_url && (
        <div className="absolute top-2 left-2 text-[10px] font-medium text-apple-secondary bg-white/90 rounded-full px-2 py-0.5 z-10">
          Coming Soon
        </div>
      )}
    </div>
  );
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const stopDrag = () => { isDragging.current = false; };

  const scrollBy = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-sm border border-apple-border text-apple-secondary hover:text-apple-text flex items-center justify-center -ml-4 transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft size={14} />
      </button>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto hide-scrollbar drag-scroll py-2"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {children}
      </div>
      <button
        onClick={() => scrollBy('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-sm border border-apple-border text-apple-secondary hover:text-apple-text flex items-center justify-center -mr-4 transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

function VideoGroup916({
  title,
  videos,
  onSelect,
}: {
  title: string;
  videos: Video[];
  onSelect: (v: Video) => void;
}) {
  return (
    <ScrollReveal className="mb-14">
      <div className="flex items-baseline gap-3 mb-5">
        <h3 className="text-base font-semibold text-apple-text tracking-tight">{title}</h3>
        <span className="text-apple-secondary text-sm">{videos.length} films</span>
      </div>

      {/* Phones: 2-col grid (1-col below 360px). Tablet/desktop: horizontal scroller. */}
      <div className="min-w-0 max-w-full overflow-hidden md:overflow-visible">
        <div className="grid grid-cols-2 gap-4 min-[360px]:grid-cols-2 md:hidden">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={() => onSelect(video)} responsive />
          ))}
        </div>
        <div className="hidden md:block">
          <HorizontalScroll>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => onSelect(video)} />
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Work() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('is_published', true)
      .order('display_order')
      .then(({ data }) => data && setVideos(data as Video[]));

    supabase
      .from('gallery_images')
      .select('*')
      .eq('is_published', true)
      .order('display_order')
      .then(({ data }) => data && setGalleryImages(data as GalleryImage[]));
  }, []);

  const videos916 = videos.filter((v) => v.aspect_ratio === '9:16');
  const videos169 = videos.filter((v) => v.aspect_ratio === '16:9');

  const filtered916 = (() => {
    if (activeFilter === 'All' || activeFilter === '9:16 Shorts') return videos916;
    if (activeFilter === 'Kids Stories') return videos916.filter((v) => v.category === 'Kids Stories');
    if (activeFilter === 'Cinematic & GenAI') return videos916.filter((v) => v.category === 'Cinematic & GenAI');
    if (activeFilter === 'Branding') return videos916.filter((v) => v.category === 'Branding Reels');
    if (activeFilter === 'Instagram') return videos916.filter((v) => v.category === 'Instagram');
    return [];
  })();

  const filtered169 = (() => {
    if (activeFilter === 'All' || activeFilter === '16:9 Films') return videos169;
    return [];
  })();

  const groupedCategories = ['Kids Stories', 'Cinematic & GenAI', 'Branding Reels'];

  const show916 = ['All', '9:16 Shorts', 'Kids Stories', 'Cinematic & GenAI', 'Branding', 'Instagram'].includes(activeFilter);
  const show169 = ['All', '16:9 Films'].includes(activeFilter);

  return (
    <div className="min-h-screen bg-apple-bg pt-24 lg:pt-28">
      {/* Cinematic header */}
      <div className="work-hero pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-8 pb-10">
          <ScrollReveal>
            <p className="text-apple-secondary text-sm font-medium mb-4">Portfolio</p>
            <h1
              className="font-bold text-apple-text tracking-tight mb-6 relative z-10"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.035em' }}
            >
              Work
            </h1>
            <p className="text-apple-secondary text-base max-w-lg leading-relaxed mb-8 relative z-10">
              A showcase of animated worlds, brand narratives, and cinematic stories — each built from imagination and intent.
            </p>
          </ScrollReveal>

          {/* Glass segmented filter control */}
          <ScrollReveal delay={100}>
            <div className="work-filter inline-flex flex-wrap gap-1 p-1.5 rounded-2xl">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent focus-visible:ring-offset-1 focus-visible:ring-offset-transparent ${
                    activeFilter === f
                      ? 'bg-apple-accent text-white shadow-sm'
                      : 'text-apple-secondary hover:text-apple-text hover:bg-white/60'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="h-px bg-apple-border mx-6 lg:mx-10 mb-16" />

      {/* Instagram Reels */}
      {(activeFilter === 'All' || activeFilter === 'Instagram') && (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 mb-20 min-w-0 max-w-full overflow-hidden">
          <InstagramSection />
        </section>
      )}

      {/* 9:16 Videos */}
      {show916 && filtered916.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 mb-20">
          <ScrollReveal>
            <div className="mb-8">
              <p className="text-apple-secondary text-sm font-medium mb-2">Short Films & Reels</p>
              <p className="text-apple-secondary text-sm">Portrait format · Drag to explore</p>
            </div>
          </ScrollReveal>

          {groupedCategories.map((cat) => {
            const group = filtered916.filter((v) => v.category === cat);
            if (!group.length) return null;
            return (
              <VideoGroup916
                key={cat}
                title={cat}
                videos={group}
                onSelect={setSelectedVideo}
              />
            );
          })}
        </section>
      )}

      {/* 16:9 Videos */}
      {show169 && filtered169.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 mb-20">
          <ScrollReveal>
            <div className="mb-8">
              <p className="text-apple-secondary text-sm font-medium mb-2">Feature Films & Campaigns</p>
              <p className="text-apple-secondary text-sm">Widescreen format · Full-length showcases</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered169.map((video) => (
              <ScrollReveal key={video.id}>
                <VideoCard video={video} onClick={() => setSelectedVideo(video)} responsive />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {(activeFilter === 'All' || activeFilter === 'Branding' || activeFilter === 'Cinematic & GenAI' || activeFilter === 'Kids Stories' || activeFilter === 'Instagram') && (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
          <ScrollReveal>
            <div className="mb-8">
              <p className="text-apple-secondary text-sm font-medium mb-2">Gallery</p>
              <p className="text-apple-secondary text-sm">Stills · Frames · Brand Work</p>
            </div>
          </ScrollReveal>

          {galleryImages.length === 0 ? (
            <div className="grid grid-cols-2 min-[360px]:grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="surface-card"
                  style={{ aspectRatio: i % 3 === 2 ? '3/4' : '16/9' }}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 min-[480px]:columns-2 lg:columns-3 gap-4 space-y-4">
              {galleryImages.map((img, i) => (
                <ScrollReveal key={img.id} delay={i * 80}>
                  <GalleryCard img={img} onClick={() => setLightboxIndex(i)} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      )}

      {selectedVideo && (
        <VideoLightbox video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

      {lightboxIndex !== null && galleryImages.length > 0 && (
        <ImageLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

function GalleryCard({ img, onClick }: { img: GalleryImage; onClick: () => void }) {
  const { ref, onMove, onLeave } = useTilt(2.5);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      className="work-card group relative overflow-hidden rounded-2xl border border-apple-border bg-white cursor-pointer break-inside-avoid"
    >
      <div className="work-card-media overflow-hidden rounded-2xl">
        <img
          src={img.image_url}
          alt={img.title}
          className="w-full object-cover transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="work-meta-plate absolute bottom-2.5 left-2.5 right-2.5 px-3 py-2 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-250">
        <p className="text-white text-sm font-medium truncate">{img.title}</p>
        <p className="text-white/60 text-xs mt-0.5 truncate">{img.category}</p>
      </div>
    </div>
  );
}
