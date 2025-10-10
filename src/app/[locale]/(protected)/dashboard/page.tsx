import React from 'react';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { Product } from '@/types';
import ProductsClient from './dashboard-products';

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
      {
        cache: 'no-store', // always fresh
      }
    );
    if (!res.ok) throw new Error('Failed to fetch products');
    const data: Product[] = await res.json();
    return data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function DashboardPage() {
  const produts = await fetchProducts();
  return (
    <MaxWidthWrapper>
      <ProductsClient serverProducts={produts} />
    </MaxWidthWrapper>
  );
}
