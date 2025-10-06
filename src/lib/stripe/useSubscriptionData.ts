import { useActiveOrganization, useSession } from '@/lib/auth-client';
import { ActiveSubscriptionResult } from '@/lib/stripe/stripe';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { client } from '../apiClient';
import { Subscription } from '@prisma/client';
import Stripe from 'stripe';

export function useSubscriptionData() {
  const activeOrg = useActiveOrganization();
  const { data: sessionData } = useSession();
  const [subscription, setSubscription] =
    useState<ActiveSubscriptionResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      const customerId = activeOrg?.data?.id ?? sessionData?.user.id;
      console.log('Customer ID:', customerId);
      if (customerId) {
        setLoading(true);
        try {
          const sub = await client.get<Subscription>(
            '/active-subscription/:id',
            { id: customerId ?? '' },
            { includeDetails: true }
          );

          if (sub) {
            // For now, we'll create a minimal plan object since we only have the plan ID
            const plan: Stripe.Plan = {
              id: sub.plan,
              object: 'plan',
              active: true,
              amount: 0,
              currency: 'usd',
              interval: 'month',
              interval_count: 1,
              created: Date.now(),
              livemode: false,
              metadata: {},
              nickname: null,
              product: '',
              tiers_mode: null,
              transform_usage: null,
              trial_period_days: null,
              usage_type: 'licensed',
            } as Stripe.Plan;

            setSubscription({
              plan: plan,
              subscription: sub,
            });
            console.log('Subscription:', sub);
          } else {
            setSubscription(null);
          }
        } catch (error) {
          console.error('Error fetching subscription:', error);
          toast.error('Failed to fetch subscription information');
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSubscription();
  }, [activeOrg?.data?.id, sessionData?.user.id]);

  return {
    subscription,
    loading,
    activeOrg: activeOrg?.data,
    user: sessionData?.user,
  };
}
