// https://www.prisma.io/docs/guides/betterauth-nextjs
import { betterAuth } from 'better-auth';
import { organization, twoFactor } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import { reactInvitationEmail } from './email/invitation';
import { reactResetPasswordEmail } from './email/reset-password';
import { resend } from './email/resend';
import { PrismaClient } from '@prisma/client';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from '@/../env.mjs';
import Stripe from 'stripe';

const db = new PrismaClient();
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

const from = env.BETTER_AUTH_EMAIL || 'delivered@resend.dev';
const to = env.TEST_EMAIL || '';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await resend.emails.send({
        from,
        to: user.email,
        subject: 'Reset your password',
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: `${
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : env.NEXT_PUBLIC_APP_URL ||
                env.BETTER_AUTH_URL ||
                process.env.VERCEL_URL
          }/reset-password/${token}`,
        }),
      });
    },
    sendEmailVerificationOnSignUp: true,
    async sendVerificationEmail(email, url) {
      const res = await resend.emails.send({
        from,
        to: to || email,
        subject: 'Verify your email address',
        html: `<a href="${url}">Verify your email address</a>`,
      });
      console.log(res, email);
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const res = await resend.emails.send({
          from,
          to: data.email,
          subject: "You've been invited to join an organization",
          react: reactInvitationEmail({
            username: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink:
              process.env.NODE_ENV === 'development'
                ? `http://localhost:3000/accept-invitation/${data.id}`
                : `https://${
                    env.NEXT_PUBLIC_APP_URL ||
                    env.BETTER_AUTH_URL ||
                    process.env.VERCEL_URL
                  }/accept-invitation/${data.id}`,
          }),
        });
        console.log(res, data.email);
      },
    }),
    twoFactor({
      otpOptions: {
        sendOTP(user, otp) {
          console.log({ otp });
        },
      },
    }),
    passkey(),
  ],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    ...(env.GITHUB_CLIENT_ID &&
      env.GITHUB_CLIENT_SECRET && {
        github: {
          clientId: env.GITHUB_CLIENT_ID,
          clientSecret: env.GITHUB_CLIENT_SECRET,
        },
      }),
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          //perform additional actions, like creating a stripe customer
          const stripeCustomer = await stripe.customers.create({
            email: user.email,
            name: user.name,
            metadata: {
              userId: user.id,
            },
          });

          await db.customer.create({
            data: {
              stripeCustomerId: stripeCustomer.id,
              userId: user.id,
            },
          });
        },
      },
    },
  },
});
