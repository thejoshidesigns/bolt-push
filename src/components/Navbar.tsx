import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-3">
        <nav className={`glass-nav rounded-2xl flex items-center justify-between h-14 px-4 sm:px-5 ${scrolled ? 'is-scrolled' : ''}`}>
          <NavLink
            to="/"
            className="font-semibold text-apple-text tracking-tight text-[15px] hover:text-apple-accent transition-colors duration-200"
          >
            THEJOSHIDESIGNS
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-apple-accent' : 'text-apple-secondary hover:text-apple-text'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="ml-2 px-5 py-2 rounded-full bg-apple-accent text-white text-sm font-medium hover:bg-brand-gold-dark transition-colors duration-200"
            >
              Start a Project
            </NavLink>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-apple-secondary hover:text-apple-text transition-colors p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden mt-2">
            <div className="glass-nav-mobile rounded-2xl px-5 py-5 flex flex-col gap-4">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors ${
                      isActive ? 'text-apple-accent' : 'text-apple-secondary hover:text-apple-text'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                className="self-start px-5 py-2 rounded-full bg-apple-accent text-white text-sm font-medium"
              >
                Start a Project
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
