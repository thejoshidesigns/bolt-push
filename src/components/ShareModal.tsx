import { useEffect, useRef } from 'react';
import { X, Copy, Instagram, Linkedin } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ShareModal({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        className="bg-white border border-apple-border w-full max-w-sm rounded-18 p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-apple-secondary hover:text-apple-text transition-colors"
        >
          <X size={18} />
        </button>

        <p className="text-apple-accent text-xs font-medium tracking-wide uppercase mb-1">
          Share
        </p>
        <p className="font-semibold text-apple-text text-2xl tracking-tight mb-6">
          THEJOSHIDESIGNS
        </p>

        <div className="flex justify-center mb-6 p-4 bg-apple-bg rounded-16">
          <img
            src="/thejoshidesigns_qr.png"
            alt="Instagram QR Code — THEJOSHIDESIGNS"
            className="w-48 h-48 object-contain"
          />
        </div>

        <p className="text-apple-secondary text-xs text-center mb-6">
          Scan to follow @thejoshidesigns on Instagram
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-apple-accent text-white text-sm font-medium hover:bg-brand-gold-dark transition-colors duration-200"
          >
            <Copy size={13} />
            Copy Portfolio Link
          </button>

          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/thejoshidesigns/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-apple-border text-apple-secondary text-sm font-medium hover:text-apple-text hover:border-apple-text transition-colors duration-200"
            >
              <Instagram size={13} />
              Instagram
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-apple-border text-apple-secondary text-sm font-medium hover:text-apple-text hover:border-apple-text transition-colors duration-200"
            >
              <Linkedin size={13} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
