/*'use server';

import { auth } from '@/lib/auth';
import { env } from '@/../env.mjs';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

import { absoluteUrl } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple subscription plan function
async function getUserSubscriptionPlan(userId: string) {
  try {
    const customer = await prisma.customer.findFirst({
      where: { userId },
      include: {
        Subscription: {
          where: { status: 'active' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return {
      isPaid: !!customer?.Subscription?.[0],
      stripeCustomerId: customer?.stripeCustomerId || null,
      stripeSubscriptionId:
        customer?.Subscription?.[0]?.stripeSubscriptionId || null,
      stripePriceId: customer?.Subscription?.[0]?.plan || null,
    };
  } catch (error) {
    return {
      isPaid: false,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
    };
  }
}

export type responseAction = {
  status: 'success' | 'error';
  stripeUrl?: string;
};

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl('/pricing');

export async function generateUserStripe(
  priceId: string
): Promise<responseAction> {
  let redirectUrl: string = '';

  try {
    const session = await auth.api.getSession({
      headers: new Headers(),
    });
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      throw new Error('Unauthorized');
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
        },
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    throw new Error('Failed to generate user stripe session');
  }

  // no revalidatePath because redirect
  redirect(redirectUrl);
}
*/
