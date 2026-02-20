'use client';

import { motion } from 'framer-motion';
import type { ValueItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  values: ValueItem[];
}

export function ValuesSection({ values }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="values" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-[#ee5b2b] to-[#f59e0b] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {t('values.title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, i) => {
            const title = locale === 'en' && value.titleEn ? value.titleEn : value.title;
            const desc = locale === 'en' && value.descEn ? value.descEn : value.desc;
            return (
              <motion.div
                key={i}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="text-2xl mb-3 block">{value.emoji}</span>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
