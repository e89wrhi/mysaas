import { ArrowUpRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Icons } from './icons';
import { SignInButton } from '@clerk/nextjs';

interface SignInEmptyViewProps {
  text: string;
}

export function SignInEmptyView({ text }: SignInEmptyViewProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icons.appdesign />
        </EmptyMedia>
        <EmptyTitle>SignIn to view {text}</EmptyTitle>
        <EmptyDescription>
          You have to signin to view and interact with {text}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <SignInButton>
            <Button variant="outline" className="rounded-full">
              SignIn
            </Button>
          </SignInButton>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}
