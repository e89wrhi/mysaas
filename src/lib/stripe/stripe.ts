/*import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { PrismaClient, Subscription } from '@prisma/client';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { env } from '@/../env.mjs';

const prisma = new PrismaClient();
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export type ActiveSubscriptionResult = {
  plan: Stripe.Plan;
  subscription: Subscription;
} | null;

// Helper for error handling
const handleError = (res: NextApiResponse, error: Error) => {
  console.error(error);
  res.status(400).json({ error: error.message || 'Something went wrong' });
};

// ================= CREATE CUSTOMER USER =================
export const createCustomerUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    const bodySchema = z.object({ userId: z.string() });
    const { userId } = bodySchema.parse(req.body);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        headers.set(key, value[0]); // take the first value if it's an array
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }
    const session = await auth.api.getSession({ headers });
    if (!session?.user) throw new Error('User not found');

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: { userId: user.id },
    });

    await prisma.customer.create({
      data: { stripeCustomerId: stripeCustomer.id, userId: user.id },
    });

    res.json({ stripeCustomerId: stripeCustomer.id });
  } catch (err) {
    handleError(res, err);
  }
};

// ================= CREATE CUSTOMER ORGANIZATION =================
export const createCustomerOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    const bodySchema = z.object({ organizationId: z.string() });
    const { organizationId } = bodySchema.parse(req.body);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        headers.set(key, value[0]); // take the first value if it's an array
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }
    const session = await auth.api.getSession({ headers });
    if (!session?.user) throw new Error('User not found');

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });
    if (!organization) throw new Error('Organization not found');

    const stripeCustomer = await stripe.customers.create({
      name: organization.name,
      metadata: { organizationId: organization.id },
    });

    await prisma.customer.create({
      data: {
        stripeCustomerId: stripeCustomer.id,
        organizationId: organization.id,
      },
    });

    res.json({ stripeCustomerId: stripeCustomer.id });
  } catch (err) {
    handleError(res, err);
  }
};

// ================= GET ACTIVE SUBSCRIPTION =================
export const getActiveSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== 'GET') return res.status(405).end();
    const paramsSchema = z.object({ id: z.string() });
    const { id } = paramsSchema.parse(req.query);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        headers.set(key, value[0]); // take the first value if it's an array
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }
    const session = await auth.api.getSession({ headers });
    if (!session?.user) throw new Error('User not found');

    const customer = await prisma.customer.findFirst({
      where: { OR: [{ userId: id }, { organizationId: id }] },
    });
    if (!customer) throw new Error('Customer not found');

    const subscription = await prisma.subscription.findFirst({
      where: { customerId: customer.id, status: 'active' },
    });

    if (!subscription) return res.json(null as ActiveSubscriptionResult);

    const plan = await stripe.plans.retrieve(subscription.plan);

    res.json({ plan, subscription } as ActiveSubscriptionResult);
  } catch (err) {
    handleError(res, err);
  }
};

// ================= CREATE CHECKOUT SESSION =================
export const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    const bodySchema = z.object({
      customerId: z.string(),
      priceId: z.string(),
    });
    const { customerId, priceId } = bodySchema.parse(req.body);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        headers.set(key, value[0]); // take the first value if it's an array
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }
    const session = await auth.api.getSession({ headers });
    if (!session?.user) throw new Error('You are not signed in.');

    const customer = await prisma.customer.findFirst({
      where: { OR: [{ userId: customerId }, { organizationId: customerId }] },
    });
    if (!customer) throw new Error('Customer not found');

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer.stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard`,
      subscription_data: { metadata: { payingUserId: session.user.id } },
    });

    if (!checkoutSession.url)
      throw new Error('Could not create checkout session');
    res.json({ session: checkoutSession });
  } catch (err) {
    handleError(res, err);
  }
};

// ================= CREATE PORTAL SESSION =================
export const createPortalSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    const bodySchema = z.object({ customerId: z.string() });
    const { customerId } = bodySchema.parse(req.body);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        headers.set(key, value[0]); // take the first value if it's an array
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }
    const session = await auth.api.getSession({ headers });
    if (!session?.user) throw new Error('You are not signed in.');

    const customer = await prisma.customer.findFirst({
      where: { OR: [{ userId: customerId }, { organizationId: customerId }] },
    });
    if (!customer) throw new Error('Customer not found');

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    res.json({ sessionURL: portalSession.url });
  } catch (err) {
    handleError(res, err);
  }
};

// ================= GET PRICING =================
export const getPricing = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') return res.status(405).end();

    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
      limit: 100,
    });

    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
          active: true,
          limit: 100,
        });
        return { ...product, prices: prices.data };
      })
    );

    res.json(productsWithPrices);
  } catch (err) {
    handleError(res, err);
  }
};

// get plans
export async function getPlans(): Promise<Stripe.Plan[]> {
  const plans = await stripe.plans.list({
    active: true,
    limit: 100,
  });
  return plans.data;
}
*/
