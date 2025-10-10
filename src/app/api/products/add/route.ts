import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      imageUrl,
      platform,
      title,
      description,
      tags,
      category,
      price,
      listingData,
      status,
    } = body;

    // Required fields check
    if (!userId || !imageUrl || !platform || !status) {
      return NextResponse.json(
        {
          error: 'Missing required fields: userId, imageUrl, platform, status',
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          user_id: userId,
          image_url: imageUrl,
          platform,
          title: title || null,
          description: description || null,
          tags: tags || null,
          category: category || null,
          price: price ?? null,
          listing_data: listingData || null,
          status,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ])
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Product was not inserted' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: data[0] });
  } catch (err) {
    console.error('Error adding product:', err);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}
