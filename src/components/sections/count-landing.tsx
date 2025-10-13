'use client';

import { Separator } from '@/components/ui/separator';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

export default function CountsSection() {
  const t = useTranslations();
  const [animate, setAnimate] = React.useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Define animation variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('landing.ourStats')}
        </h2>

        <div className="flex flex-col md:flex-row text-center py-5 md:py-9 items-center border-t border-b border-gray-200 dark:border-gray-800">
          {/* Generate */}
          <motion.div
            className="flex-1 py-6"
            variants={itemVariants}
            initial="hidden"
            animate={animate ? 'visible' : 'hidden'}
            custom={0}
          >
            <h3 className="text-5xl font-extrabold">
              {t('landing.generateValue')}
            </h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              {t('landing.generate')}
            </p>
          </motion.div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-15 w-0.5 bg-gray-200 dark:bg-gray-800"
          />

          {/* Sales */}
          <motion.div
            className="flex-1 py-6"
            variants={itemVariants}
            initial="hidden"
            animate={animate ? 'visible' : 'hidden'}
            custom={1}
          >
            <h3 className="text-5xl font-extrabold">
              {t('landing.salesValue')}
            </h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              {t('landing.sales')}
            </p>
          </motion.div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-15 w-0.5 bg-gray-200 dark:bg-gray-800"
          />

          {/* Revenue */}
          <motion.div
            className="flex-1 py-6"
            variants={itemVariants}
            initial="hidden"
            animate={animate ? 'visible' : 'hidden'}
            custom={2}
          >
            <h3 className="text-5xl font-extrabold">
              {t('landing.revenueValue')}
            </h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              {t('landing.revenue')}
            </p>
          </motion.div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-15 w-0.5 bg-gray-200 dark:bg-gray-800"
          />

          {/* Growth */}
          <motion.div
            className="flex-1 py-6"
            variants={itemVariants}
            initial="hidden"
            animate={animate ? 'visible' : 'hidden'}
            custom={3}
          >
            <h3 className="text-5xl font-extrabold">
              {t('landing.growthValue')}
            </h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              {t('landing.growth')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
