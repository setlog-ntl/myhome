'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

export function ContactSection({ config }: Props) {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#ee5b2b] to-[#f59e0b] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {t('contact.title')}
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('contact.desc')}
        </motion.p>

        {config.email && (
          <motion.a
            href={`mailto:${config.email}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#ee5b2b] to-[#f59e0b] text-white font-medium hover:opacity-90 transition-opacity"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Mail className="w-4 h-4" />
            {t('contact.email')}
          </motion.a>
        )}

        {config.socials.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {config.socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 transition-colors capitalize"
              >
                {social.platform}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
