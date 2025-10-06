/*'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Stripe from 'stripe';
import { absoluteUrl } from '@/lib/utils';
import { headers } from 'next/headers';

export interface responseAction {
  status: 'success' | 'error';
  stripeUrl?: string;
}

const billingUrl = absoluteUrl('/dashboard/billing');

export async function openCustomerPortal(
  userStripeId: string
): Promise<responseAction> {
  let redirectUrl = '';

  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user || !session?.user.email) {
      throw new Error('Unauthorized');
    }

    if (userStripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userStripeId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch {
    throw new Error('Failed to generate user stripe session');
  }

  redirect(redirectUrl);
}
*/
