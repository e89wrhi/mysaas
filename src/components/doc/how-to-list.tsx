import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';

export function HowtoList() {
  const data = [
    {
      title: 'Step 1: Create Your Port Account',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Sign up to get access to your Port dashboard where you can upload
            product images and manage listings across Amazon, eBay, Etsy, and
            more.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="Create account illustration"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 2: Upload Your Product Image',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Simply drag and drop your product photo. Port’s AI instantly
            analyzes the image and prepares product details such as title,
            category, and description.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="Upload image"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 3: Generate Listing Information',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Port’s AI converts your image into structured product data optimized
            for multiple marketplaces—title, description, tags, and pricing
            suggestions included.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="AI generating product info"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 4: Edit & Customize Your Listings',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Review and adjust AI-generated content. Edit keywords, descriptions,
            and pricing for better SEO and conversion performance.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="Editing listing"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 5: Publish to Marketplaces',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Instantly push your finalized listings to Amazon, eBay, Etsy, and
            other platforms with one click—no manual data entry needed.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="Publishing listings"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 6: Track Performance with AI Insights',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Monitor your product performance across platforms. Port’s AI
            provides insights on listing quality, engagement, and conversion
            optimization.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="Analytics dashboard"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 7: Automate & Scale with AI Tools',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Use Port’s automation tools to bulk upload, sync listings, and
            optimize pricing automatically—letting AI handle repetitive work
            while you grow your business.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="AI automation"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
