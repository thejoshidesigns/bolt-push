import { NavLink } from 'react-router-dom';
import { Instagram, Linkedin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-apple-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-semibold text-apple-text tracking-tight text-base mb-1" style={{ letterSpacing: '-0.02em' }}>
              THEJOSHIDESIGNS
            </p>
            <p className="text-apple-secondary text-sm mb-1">
              Joshi Bhavani Prasad Saladi
            </p>
            <p className="text-apple-secondary text-xs mb-4">
              GenAI Animator & Creative Director
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-apple-success" />
              <span className="text-apple-secondary text-sm">Open to Projects</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-apple-secondary text-xs font-medium uppercase tracking-wide mb-5">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/work', label: 'Work' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="text-apple-secondary text-sm hover:text-apple-accent transition-colors duration-200"
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-apple-secondary text-xs font-medium uppercase tracking-wide mb-5">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/thejoshidesigns/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-apple-secondary text-sm hover:text-apple-accent transition-colors duration-200"
              >
                <Instagram size={14} />
                @thejoshidesigns
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-apple-secondary text-sm hover:text-apple-accent transition-colors duration-200"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href="https://www.behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-apple-secondary text-sm hover:text-apple-accent transition-colors duration-200"
              >
                <ExternalLink size={14} />
                Behance
              </a>
            </div>
          </div>
        </div>

        <div className="h-px bg-apple-border mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-apple-secondary text-sm">
            &copy; 2026 THEJOSHIDESIGNS &middot; Columbia, MO
          </p>
          <p className="text-apple-secondary text-sm">
            Crafted with intent &middot; Every frame matters
          </p>
        </div>
      </div>
    </footer>
  );
}
