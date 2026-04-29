import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export const maxDuration = 60; // Allow Next.js edge/serverless function to run longer safely

export async function POST(req: NextRequest) {
  const { imageUrl, platform } = await req.json();

  if (!imageUrl || !platform) {
    return NextResponse.json(
      { error: 'Missing image or platform' },
      { status: 400 }
    );
  }

  try {
    const prompt = `
      Analyze the product from this image URL: ${imageUrl}.
      Generate highly realistic and optimized details for listing this product on ${platform}.
    `;

    const result = await streamObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        title: z.string().describe('Catchy and SEO-friendly product title.'),
        description: z
          .string()
          .describe(
            'Detailed and realistic product description suitable for the target platform.'
          ),
        tags: z
          .array(z.string())
          .describe('Array of relevant SEO tags or keywords for the product.'),
        category: z.string().describe('The main product category.'),
        listing_data: z
          .record(z.any())
          .describe('Any extra platform-specific listing data needed.'),
      }),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image: imageUrl },
          ],
        },
      ],
      onFinish: async ({ object }) => {
        if (object) {
          const { error } = await supabaseAdmin.from('products').insert({
            userId: 'user-id', // TODO: replace with actual user ID from clerk
            platform,
            imageUrl,
            title: object.title,
            description: object.description,
            tags: object.tags || [],
            category: object.category || '',
            listingData: object.listing_data || {},
            status: 'ready',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });

          if (error) {
            console.error('Failed to insert product into Supabase:', error);
          }
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error('Error generating product:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
