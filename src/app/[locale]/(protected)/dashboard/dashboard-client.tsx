'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/shared/user-avatar';
import { toast } from 'sonner';
import { Settings, Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { generateMockProduct } from '@/lib/mockProduct';
import ProductsGrid from './dashboard-products';
import { useTranslations } from 'next-intl';

interface Props {
  serverProducts: Product[];
  _name: string;
  _image: string;
  _userId: string;
}

export async function deleteProduct(
  productId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/products/delete', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    return { success: data.success, error: data.error };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

export default function DashboardClient({
  serverProducts,
  _name,
  _image,
  _userId,
}: Props) {
  const router = useRouter();
  const t = useTranslations();
  const [products, setProducts] = useState<Product[]>(serverProducts);
  const [isCreatingMock, setIsCreatingMock] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState(_name);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageUrl, setImageUrl] = useState(_image);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState(_userId);

  const handleConvertNew = () => router.push('/convert');

  const handleAddMockProduct = async () => {
    if (!userId) toast.error('user id error');
    setIsCreatingMock(true);
    const mockProduct = generateMockProduct(userId);

    const res = await fetch('/api/products/add', {
      method: 'POST',
      body: JSON.stringify(mockProduct),
    });

    const data = await res.json();
    if (!data.success) {
      toast.error('Failed to add mock product: ' + data.error);
    } else {
      toast.success('Added mock product');
      setProducts([data.product, ...products]); // update UI
    }

    setIsCreatingMock(false);
  };

  const handleDelete = async (id: string) => {
    const { success, error } = await deleteProduct(id);
    if (!success) {
      alert('Failed to delete: ' + error);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <div className="flex items-center pt-20 justify-between">
        <div className="flex items-center space-x-4">
          <UserAvatar name={name || 'User'} image={imageUrl || ''} />
          <div>
            <h1 className="text-2xl font-bold">
              {t('dashboard.welcome')}
              {name || 'User'}!
            </h1>
          </div>
        </div>
        <Link href="/settings">
          <Settings />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button onClick={handleConvertNew} className="bg-primary rounded-none">
          {t('dashboard.convertNew')}
        </Button>
        <Button
          onClick={handleAddMockProduct}
          disabled={isCreatingMock}
          variant="secondary"
          className="rounded-none"
          title="Create a random mock product for testing purposes"
        >
          {isCreatingMock ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              ...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {t('dashboard.addMock')}
            </>
          )}
        </Button>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{t('dashboard.history')}</h2>
          {products && products.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {products.length} {t('dashboard.products')}
              {products.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {products && products.length > 0 ? (
          <ProductsGrid products={products} onDelete={handleDelete} />
        ) : (
          <div className="space-y-4 p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t('dashboard.emptyTitle')}
              </h3>
              <p className="text-muted-foreground">{t('dashboard.emptySub')}</p>
            </div>
            <Button
              onClick={handleConvertNew}
              className="mt-4 rounded-none mb-10"
            >
              {t('dashboard.emptyButton')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
