import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';

export function HowtoList() {
  const data = [
    {
      title: 'Step 1: Create Your Account',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Sign up to access your personal workspace where notes, tasks, and
            projects are securely stored.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 2: Set Up Your Notes',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Start by creating notes for your ideas, projects, or tasks. Organize
            them with folders, tags, or categories.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 3: Use Real-Time Collaboration',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Share notes with your team or collaborators. Enjoy secure, real-time
            chat with end-to-end encryption for messaging and feedback.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 4: Organize Tasks and To-Dos',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Convert notes into actionable tasks. Assign deadlines, priorities,
            and team members to stay on track.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 5: Engage with Social & Team Feeds',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Participate in team updates, group discussions, and story-like feeds
            to keep everyone connected and informed.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 6: Leverage AI Features',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Use AI-powered summaries, task recommendations, and smart
            prioritization to streamline your workflow and focus on what
            matters.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: 'Step 7: Track Updates & Use Advanced Features',
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            Explore advanced options like dark mode, live collaboration tools,
            AI recommendations, verified content, and one-click actions for
            efficiency.
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt="phone"
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
