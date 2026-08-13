import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-apple-bg flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-bold text-[20vw] text-apple-border/60 leading-none select-none">
          404
        </span>
      </div>
      <p className="text-apple-accent text-sm font-medium tracking-wide uppercase mb-6 relative z-10">
        Page Not Found
      </p>
      <h1 className="font-bold text-apple-text text-4xl lg:text-6xl tracking-tight mb-4 relative z-10">
        Lost in the Story
      </h1>
      <p className="text-apple-secondary text-sm max-w-sm mb-10 leading-relaxed relative z-10">
        The frame you are looking for does not exist. Let&apos;s find something worth watching.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-7 py-3 rounded-full bg-apple-accent text-white text-sm font-medium hover:bg-brand-gold-dark transition-colors duration-200 relative z-10"
      >
        <ArrowLeft size={14} />
        Back to Home
      </Link>
    </div>
  );
}
