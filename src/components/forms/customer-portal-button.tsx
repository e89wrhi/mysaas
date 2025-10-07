'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userStripeId,
}: CustomerPortalButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [isPending, startTransition] = useTransition();
  //const generateUserStripeSession = openCustomerPortal.bind(null, userStripeId);

  //const stripeSessionAction = () =>
  //  startTransition(async () => await generateUserStripeSession());

  return (
    <Button disabled={isPending}>
      {isPending ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : null}
      Open Customer Portal
    </Button>
  );
}
