import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const { imageUrl, platform } = await req.json();

  if (!imageUrl || !platform) {
    return NextResponse.json(
      { error: 'Missing image or platform' },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Example: using GPT to generate product info from image URL
    const prompt = `
      Analyze the product from this image URL: ${imageUrl}.
      Generate a JSON object with:
        - title
        - description
        - tags (array)
        - category
        - listing_data (platform-specific)
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0].message?.content || '{}';
    const productData = JSON.parse(content);

    const { data, error } = await supabaseAdmin.from('products').insert({
      userId: 'user-id', // replace with actual user ID
      platform,
      imageUrl,
      title: productData.title,
      description: productData.description,
      tags: productData.tags || [],
      category: productData.category || '',
      listingData: productData.listing_data || {},
      status: 'ready',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Check for error first
    if (error) throw error;

    // Safely get the inserted product
    const product = data?.[0];
    if (!product) {
      return NextResponse.json(
        { error: 'Failed to insert product into Supabase' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error('Error generating product:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
