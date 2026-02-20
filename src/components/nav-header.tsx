'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { LanguageToggle } from './language-toggle';

const sectionIds = ['hero', 'about', 'values', 'gallery', 'contact'];

const sectionKeys: Record<string, string> = {
  hero: 'nav.home',
  about: 'nav.about',
  values: 'nav.values',
  gallery: 'nav.gallery',
  contact: 'nav.contact',
};

export function NavHeader() {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0f0f0f]/80 border-b border-white/5">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-1">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                active === id
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {t(sectionKeys[id])}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            className="sm:hidden p-2 text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="sm:hidden border-t border-white/5 bg-[#0f0f0f]/95 backdrop-blur-md">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm ${
                active === id ? 'text-white' : 'text-gray-400'
              }`}
            >
              {t(sectionKeys[id])}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
