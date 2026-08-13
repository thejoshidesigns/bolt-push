import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const REELS = [
  'https://www.instagram.com/reel/DUUpcdyjZdH/',
  'https://www.instagram.com/reel/DU4rszXjRd0/',
  'https://www.instagram.com/reel/DX0YeCZxBIY/',
];

function InstagramEmbed({ permalink }: { permalink: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const forceContain = () => {
      el.style.width = '';
      el.style.maxWidth = '100%';
      el.style.boxSizing = 'border-box';
      el.querySelectorAll('iframe, blockquote').forEach((child) => {
        (child as HTMLElement).style.setProperty('width', '100%', 'important');
        (child as HTMLElement).style.setProperty('max-width', '100%', 'important');
        (child as HTMLElement).style.setProperty('box-sizing', 'border-box', 'important');
      });
    };
    forceContain();
    const observer = new MutationObserver(forceContain);
    observer.observe(el, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'width'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="instagram-embed-wrap flex-shrink-0 w-[280px] max-w-full"
      style={{ boxSizing: 'border-box' }}
    >
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${permalink}?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '16px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.08), 0 2px 12px 0 rgba(0,0,0,0.08)',
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export default function InstagramSection() {
  useEffect(() => {
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <ScrollReveal>
      <div className="min-w-0 max-w-full overflow-hidden">
        <div className="flex items-baseline gap-3 mb-6">
          <h3 className="text-base font-semibold text-apple-text tracking-tight">Instagram Reels</h3>
          <span className="text-apple-secondary text-sm">@thejoshidesigns · {REELS.length} reels</span>
        </div>

        <div
          className="flex gap-4 overflow-x-auto hide-scrollbar py-2 items-start overscroll-x-contain"
          style={{ maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}
        >
          {REELS.map((permalink) => (
            <InstagramEmbed key={permalink} permalink={permalink} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
