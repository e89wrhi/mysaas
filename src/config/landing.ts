import { FeatureLdg, InfoLdg, TestimonialType } from '@/types';

export const infos: InfoLdg[] = [
  {
    title: 'Turn Images into Listings Instantly',
    description:
      'Port uses AI to transform your product images into complete listings for Amazon, eBay, Etsy, and more. Save hours on manual data entry and focus on growing your business.',
    image: '/_static/illustrations/product-ai.jpg',
    list: [
      {
        title: 'AI-Powered',
        description:
          'Our AI automatically detects product details, generates titles, and writes optimized descriptions.',
        icon: 'settings',
      },
      {
        title: 'Multi-Platform',
        description:
          'Publish listings directly to top marketplaces in one click—no copy-pasting required.',
        icon: 'laptop',
      },
      {
        title: 'Accurate & Fast',
        description:
          'Get reliable, high-quality listings in seconds, ready for any platform’s requirements.',
        icon: 'search',
      },
    ],
  },
  {
    title: 'Seamless Seller Workflow',
    description:
      'Integrate Port effortlessly into your eCommerce workflow. Sync with existing stores, manage listings, and track performance from a single dashboard.',
    image: '/_avatars/a9.png',
    list: [
      {
        title: 'Flexible Integrations',
        description:
          'Connect Port with Amazon, eBay, Etsy, Shopify, or any platform you sell on.',
        icon: 'laptop',
      },
      {
        title: 'Smart Organization',
        description:
          'Automatically categorize products and suggest tags to boost visibility and SEO.',
        icon: 'search',
      },
      {
        title: 'Reliable Infrastructure',
        description:
          'Built for performance and uptime—your listings and data are safe and always accessible.',
        icon: 'settings',
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: 'AI Listing Generator',
    description:
      'Upload a product photo and let Port create a complete listing with title, description, category, and pricing suggestions.',
    link: '/',
    icon: 'sparkles',
  },
  {
    title: 'Marketplace Integration',
    description:
      'Instantly connect and publish to Amazon, eBay, and Etsy with one click—no repetitive data entry.',
    link: '/',
    icon: 'cart',
  },
  {
    title: 'Smart Tagging & SEO',
    description:
      'AI automatically generates SEO-friendly keywords and tags to maximize your product’s reach.',
    link: '/',
    icon: 'search',
  },
  {
    title: 'Bulk Upload Support',
    description:
      'Upload multiple products at once and let Port process, generate, and publish them in batches.',
    link: '/',
    icon: 'copy',
  },
  {
    title: 'Performance Insights',
    description:
      'Track how your listings perform across platforms with AI-powered analytics and improvement suggestions.',
    link: '/',
    icon: 'chart',
  },
  {
    title: 'Collaborative Workspace',
    description:
      'Invite team members to review, edit, and publish listings together, ensuring quality and consistency.',
    link: '/',
    icon: 'users',
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: 'Sarah Miller',
    job: 'Etsy Shop Owner',
    image: '/_avatars/a1.png',
    review:
      "Port saves me hours every week. I just upload a product photo, and it generates the full Etsy listing — title, description, and tags included. It's like having my own AI assistant.",
  },
  {
    name: 'James Roberts',
    job: 'Amazon Seller',
    image: '/_avatars/a2.png',
    review:
      'I’ve tried other tools, but Port’s AI listings are incredibly accurate. It understands what I’m selling just from an image and creates Amazon-ready listings instantly.',
  },
  {
    name: 'Olivia Chen',
    job: 'eBay Power Seller',
    image: '/_avatars/a3.png',
    review:
      'Port has completely changed how I manage eBay listings. I can upload dozens of product images at once and publish everything in minutes.',
  },
  {
    name: 'David Lopez',
    job: 'E-commerce Manager',
    image: '/_avatars/a4.png',
    review:
      'Our team uses Port daily. It cut down our product listing time by 80%. The integration with Shopify and Amazon just works.',
  },
  {
    name: 'Nina Patel',
    job: 'Small Business Owner',
    image: '/_avatars/a5.png',
    review:
      'I’m not tech-savvy, but Port made listing products so simple. It handles everything from writing to categorizing. My Etsy shop has never looked more professional.',
  },
  {
    name: 'Robert Green',
    job: 'Dropshipper',
    image: '/_avatars/a6.png',
    review:
      'Bulk upload is a game-changer. Port generates listings faster than any VA I’ve ever hired — and it’s more consistent.',
  },
  {
    name: 'Elena Cruz',
    job: 'Creative Seller',
    image: '/_avatars/a7.png',
    review:
      'The AI-generated product descriptions sound natural and engaging. My products now rank higher and attract more buyers across marketplaces.',
  },
];
