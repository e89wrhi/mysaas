import React from 'react';
import { createAuthClient } from 'better-auth/react';
import {
  organizationClient,
  passkeyClient,
  twoFactorClient,
} from 'better-auth/client/plugins';
import { toast } from 'sonner';

export const client = createAuthClient({
  plugins: [organizationClient(), twoFactorClient(), passkeyClient()],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error('Too many requests. Please try again later.');
      }
    },
  },
});

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  organization,
  useListOrganizations,
  useActiveOrganization,
} = client;

// Better Auth doesn't export SessionProvider directly, we'll use a custom wrapper
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
