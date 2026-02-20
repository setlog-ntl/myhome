'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

export function HeroSection({ config }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { locale, t } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const tagline = locale === 'en' && config.taglineEn ? config.taglineEn : config.tagline;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {config.heroImageUrl && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <img
            src={config.heroImageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      {!config.heroImageUrl && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ee5b2b]/10 to-transparent" />
      )}

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl"
        style={{ opacity }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#ee5b2b] to-[#f59e0b] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tagline}
        </motion.p>
        <motion.a
          href="#about"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#ee5b2b] to-[#f59e0b] text-white font-medium hover:opacity-90 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('hero.cta')}
        </motion.a>
      </motion.div>
    </section>
  );
}
