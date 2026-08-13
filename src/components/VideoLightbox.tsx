import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Video } from '../lib/supabase';

interface Props {
  video: Video;
  onClose: () => void;
}

function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return url;
}

export default function VideoLightbox({ video, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const is916 = video.aspect_ratio === '9:16';

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative bg-black border border-apple-border overflow-hidden rounded-16 ${
          is916 ? 'w-full max-w-xs' : 'w-full max-w-4xl'
        }`}
        style={is916 ? { aspectRatio: '9/16', maxHeight: '85vh' } : { aspectRatio: '16/9' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 text-apple-text hover:text-apple-accent flex items-center justify-center rounded-full transition-colors"
        >
          <X size={16} />
        </button>

        {video.embed_url ? (
          <iframe
            src={getEmbedUrl(video.embed_url)}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8 text-center">
            <div className="w-12 h-12 rounded-16 bg-apple-bg flex items-center justify-center mb-4">
              <span className="font-bold text-apple-accent text-2xl">T</span>
            </div>
            <p className="font-semibold text-apple-text text-xl mb-2">{video.title}</p>
            <p className="text-apple-secondary text-sm">Video Coming Soon</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white text-base font-medium mb-1">{video.title}</p>
        <p className="text-white/70 text-xs">{video.category}</p>
      </div>
    </div>
  );
}
