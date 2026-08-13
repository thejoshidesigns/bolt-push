import { useEffect, useRef, useState } from 'react';

export interface ReelImage {
  id: string;
  title: string;
  image_url: string;
  category: string;
  video_url?: string;
  poster_url?: string;
}

interface Props {
  images: ReelImage[];
}

interface FrameStyle {
  width: string;
  height: string;
  top: string;
  left: string;
  transform: string;
  zIndex: number;
}

const FRAMES: FrameStyle[] = [
  {
    width: '62%',
    height: '72%',
    top: '10%',
    left: '19%',
    transform: 'translateZ(60px) rotateY(-7deg) rotateX(3deg)',
    zIndex: 3,
  },
  {
    width: '46%',
    height: '56%',
    top: '4%',
    left: '0%',
    transform: 'translateZ(0px) rotateY(-12deg) rotateX(2deg)',
    zIndex: 1,
  },
  {
    width: '44%',
    height: '52%',
    top: '40%',
    left: '56%',
    transform: 'translateZ(10px) rotateY(-5deg) rotateX(-2deg)',
    zIndex: 2,
  },
];

export default function HeroReel({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reducedMotionRef = useRef(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = mq.matches;
      videoRefs.current.forEach((video) => {
        if (!video) return;
        if (mq.matches) video.pause();
        else void video.play().catch(() => undefined);
      });
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const ry = Math.max(-3, Math.min(3, dx * 3));
    const rx = Math.max(-3, Math.min(3, -dy * 3));
    setTilt({ rx, ry });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  if (images.length === 0) return null;

  const reelImages = images.slice(0, 3);
  while (reelImages.length < 3 && images.length > 0) {
    reelImages.push(images[reelImages.length % images.length]);
  }

  return (
    <div
      ref={containerRef}
      className="hero-reel relative w-full h-[420px] sm:h-[480px] lg:h-[520px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformStyle: 'preserve-3d',
        }}
      >
        {reelImages.map((img, i) => {
          const frame = FRAMES[i] ?? FRAMES[0];
          return (
            <div
              key={`${img.id}-${i}`}
              className="hero-reel-frame"
              style={{
                width: frame.width,
                height: frame.height,
                top: frame.top,
                left: frame.left,
                transform: frame.transform,
                zIndex: frame.zIndex,
              }}
            >
              {img.video_url ? (
                <video
                  ref={(video) => { videoRefs.current[i] = video; }}
                  src={img.video_url}
                  poster={img.poster_url ?? img.image_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={img.title}
                  className="w-full h-full object-cover"
                  onLoadedData={(event) => {
                    if (reducedMotionRef.current) event.currentTarget.pause();
                  }}
                />
              ) : (
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              )}
              <div className="hero-reel-shade" aria-hidden="true" />
              <span className="hero-reel-label">
                {img.title} · {img.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
