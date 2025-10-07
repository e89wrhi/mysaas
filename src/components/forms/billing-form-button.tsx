'use client';

import { useTransition } from 'react';
//import { generateUserStripe } from '@/../actions/generate-user-stripe';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
//import { ActiveSubscriptionResult } from '@/lib/stripe/stripe';
import Stripe from 'stripe';

interface BillingFormButtonProps {
  offer: Stripe.Plan;
  //subscriptionPlan: null;
  year: boolean;
}

export function BillingFormButton(
  {
    //year,
    //offer,
    //subscriptionPlan,
  }: BillingFormButtonProps
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [isPending, startTransition] = useTransition();
  //const generateUserStripeSession = generateUserStripe.bind(
  //  null,
  //  offer.interval[year ? 'yearly' : 'monthly']
  //);

  //const stripeSessionAction = () =>
  //  startTransition(async () => await generateUserStripeSession());

  //const userOffer =
  //subscriptionPlan?.plan.interval ===
  //offer.interval[year ? 'yearly' : 'monthly'];

  return (
    <Button
      variant={'default'}
      className="w-full rounded-full"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>{'Manage Subscription'}</>
      )}
    </Button>
  );
}
