'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
//import { UserSubscriptionPlan } from '@/types';

import { Stripe } from 'stripe';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { BillingFormButton } from '@/components/forms/billing-form-button';
import { ModalContext } from '@/components/modals/providers';
import { HeaderSection } from '@/components/shared/header-section';
import { Icons } from '@/components/shared/icons';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { useSubscriptionData } from '@/lib/stripe/useSubscriptionData';

interface PricingCardsProps {
  userId?: string;
  plans: Stripe.Plan[];
}
export function PricingCards({ userId, plans }: PricingCardsProps) {
  const { subscription } = useSubscriptionData();

  const isYearlyDefault =
    !subscription?.subscription.customerId ||
    subscription.plan.interval === 'year'
      ? true
      : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const { setShowSignInModal } = useContext(ModalContext);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const monthlyPlan: Stripe.Plan | undefined = plans.find(
    (p) => p.interval === 'month'
  );
  const yearlyPlan: Stripe.Plan | undefined = plans.find(
    (p) => p.interval === 'year'
  );
  const monthlyPrice = monthlyPlan ? monthlyPlan?.amount || 0 / 100 : 0;
  const yearlyPrice = yearlyPlan ? yearlyPlan?.amount || 0 / 100 : 0;

  const PricingCard = ({ offer }: { offer: Stripe.Plan }) => {
    const benefits = offer.metadata?.benefits?.split(',') || [];
    const limitations = offer.metadata?.limitations?.split(',') || [];
    return (
      <div
        className={cn(
          'relative flex flex-col overflow-hidden rounded-3xl border shadow-sm',
          offer.product?.toString().toLocaleLowerCase() === 'pro'
            ? '-m-0.5 border-2 border-green-400'
            : ''
        )}
        key={offer.product?.toString()}
      >
        <div className="min-h-[150px] items-start space-y-4 bg-muted/50 p-6">
          <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {offer.product?.toString()}
          </p>

          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-3xl font-semibold leading-6">
                {isYearly && yearlyPrice > 0 ? (
                  <>
                    <span className="mr-2 text-muted-foreground/80 line-through">
                      ${monthlyPrice}
                    </span>
                    <span>${(yearlyPrice / 12).toFixed(2)}</span>
                  </>
                ) : (
                  `$${monthlyPrice}`
                )}
              </div>
              <div className="-mb-1 ml-2 text-left text-sm font-medium text-muted-foreground">
                <div>/month</div>
              </div>
            </div>
          </div>
          {monthlyPrice > 0 ? (
            <div className="text-left text-sm text-muted-foreground">
              {isYearly
                ? `$${yearlyPrice} will be charged when annual`
                : 'when charged monthly'}
            </div>
          ) : null}
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-6">
          <ul className="space-y-2 text-left text-sm font-medium leading-normal">
            {benefits?.map((feature) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check className="size-5 shrink-0 text-green-500" />
                <p>{feature}</p>
              </li>
            ))}

            {limitations.length > 0 &&
              limitations.map((feature) => (
                <li
                  className="flex items-start text-muted-foreground"
                  key={feature}
                >
                  <Icons.close className="mr-3 size-5 shrink-0" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>

          {userId && subscription ? (
            offer.id === 'Starter' ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                  }),
                  'w-full rounded-full'
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <BillingFormButton
                year={isYearly}
                offer={offer}
                subscriptionPlan={subscription}
              />
            )
          ) : (
            <Button
              variant={
                offer.id.toLocaleLowerCase() === 'pro' ? 'default' : 'outline'
              }
              className="rounded-full"
              onClick={() => setShowSignInModal(true)}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center text-center">
        <HeaderSection label="Pricing" title="Start at full speed !" />

        <div className="mb-4 mt-10 flex items-center gap-5">
          <ToggleGroup
            type="single"
            size="sm"
            defaultValue={isYearly ? 'yearly' : 'monthly'}
            onValueChange={toggleBilling}
            aria-label="toggle-year"
            className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
          >
            <ToggleGroupItem
              value="yearly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle yearly billing"
            >
              Yearly (-20%)
            </ToggleGroupItem>
            <ToggleGroupItem
              value="monthly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle monthly billing"
            >
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-5 bg-inherit py-5 lg:grid-cols-3">
          {plans.map((offer, index) => {
            return <PricingCard offer={offer} key={index} />;
          })}
        </div>

        <p className="mt-3 text-balance text-center text-base text-muted-foreground">
          Email{' '}
          <a
            className="font-medium text-primary hover:underline"
            href="mailto:support@saas-starter.com"
          >
            support@saas-starter.com
          </a>{' '}
          for to contact our support team.
          <br />
          <strong>
            You can test the subscriptions and won&apos;t be charged.
          </strong>
        </p>
      </section>
    </MaxWidthWrapper>
  );
}
