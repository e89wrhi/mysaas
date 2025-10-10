import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { HeaderSection } from '../shared/header-section';

const pricingFaqData = [
  {
    id: 'item-1',
    question: 'What is included in the free Starter plan?',
    answer:
      "The Starter plan is completely free and includes up to 10 AI-generated product descriptions per month. You get access to basic AI features and support for Amazon and Shopify platforms. It's perfect for testing our service and small-scale operations.",
  },
  {
    id: 'item-2',
    question: 'How much does the Pro plan cost?',
    answer:
      'The Pro plan costs $29 per month (or $288 per year with 20% savings). It includes up to 100 product descriptions per month, advanced AI features, all major e-commerce platforms, priority processing, and enhanced analytics.',
  },
  {
    id: 'item-3',
    question: 'What does the Business plan offer?',
    answer:
      'The Business plan costs $79 per month (or $768 per year) and provides unlimited product descriptions, premium AI with SEO optimization, white-label branding, bulk upload capabilities, API access, and 24/7 priority support with a dedicated account manager.',
  },
  {
    id: 'item-4',
    question: 'Do you offer annual billing discounts?',
    answer:
      'Yes! Annual plans come with a 20% discount. The Pro plan is $288/year (vs $348 monthly), and the Business plan is $768/year (vs $948 monthly). You save significantly by paying annually.',
  },
  {
    id: 'item-5',
    question: 'Can I change my plan anytime?',
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle. You'll only pay the prorated difference for upgrades.",
  },
  {
    id: 'item-6',
    question: 'What e-commerce platforms do you support?',
    answer:
      'We support all major e-commerce platforms including Amazon, Shopify, Etsy, eBay, and many others. Higher-tier plans include custom platform integrations for specialized needs.',
  },
  {
    id: 'item-7',
    question: 'How accurate are the AI-generated descriptions?',
    answer:
      'Our AI provides highly accurate and detailed product descriptions by analyzing product images and generating comprehensive content including titles, descriptions, features, benefits, and specifications. The quality improves with higher-tier plans.',
  },
  {
    id: 'item-8',
    question: 'Is there a free trial for paid plans?',
    answer:
      "While we don't offer a traditional free trial, you can start with our free Starter plan to test the service. If you need more capacity, you can upgrade anytime and cancel within 30 days for a full refund.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
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
