import { auth } from '@clerk/nextjs/server';

import { createUploadthing } from 'uploadthing/next';
import type { FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log('Error uploading file', err.message);
    console.log('  - Above error caused by:', err.cause);

    return { message: err.message };
  },
});

/**
 * This is your Uploadthing file router. For more information:
 * @see https://docs.uploadthing.com/api-reference/server#file-routes
 */
export const uploadRouter = {
  productImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 4,
    },
  })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .middleware(async ({ req }) => {
      const { userId } = await auth();

      if (!userId) {
        throw new UploadThingError('Please sign in');
      }

      return { userId };
    })
    .onUploadComplete(({ file, metadata }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      metadata;
      // ^?
      console.log('upload completed', file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
