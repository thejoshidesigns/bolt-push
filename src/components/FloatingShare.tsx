import { useState } from 'react';
import { Share2 } from 'lucide-react';
import ShareModal from './ShareModal';

export default function FloatingShare() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-apple-accent hover:bg-brand-gold-dark text-white flex items-center justify-center rounded-full shadow-sm transition-colors duration-200"
        aria-label="Share portfolio"
      >
        <Share2 size={16} />
      </button>
      {open && <ShareModal onClose={() => setOpen(false)} />}
    </>
  );
}
