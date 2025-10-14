import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { HeaderSection } from '../shared/header-section';
import { useTranslations } from 'next-intl';

const PricingFaqs = () => {
  const t = useTranslations();

  const faqData = [
    {
      id: 'item1',
      question: t('pricingFaq.item1.question'),
      answer: t('pricingFaq.item1.answer'),
    },
    {
      id: 'item2',
      question: t('pricingFaq.item2.question'),
      answer: t('pricingFaq.item2.answer'),
    },
    {
      id: 'item3',
      question: t('pricingFaq.item3.question'),
      answer: t('pricingFaq.item3.answer'),
    },
    {
      id: 'item4',
      question: t('pricingFaq.item4.question'),
      answer: t('pricingFaq.item4.answer'),
    },
    {
      id: 'item5',
      question: t('pricingFaq.item5.question'),
      answer: t('pricingFaq.item5.answer'),
    },
    {
      id: 'item6',
      question: t('pricingFaq.item6.question'),
      answer: t('pricingFaq.item6.answer'),
    },
    {
      id: 'item7',
      question: t('pricingFaq.item7.question'),
      answer: t('pricingFaq.item7.answer'),
    },
    {
      id: 'item8',
      question: t('pricingFaq.item8.question'),
      answer: t('pricingFaq.item8.answer'),
    },
  ];

  return faqData;
};

export function PricingFaq() {
  const t = useTranslations();
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label={t('pricing.faq')}
        title={t('pricing.faqSub')}
        subtitle=""
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {PricingFaqs().map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
