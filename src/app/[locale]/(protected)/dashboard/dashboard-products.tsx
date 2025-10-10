'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/shared/user-avatar';
import { toast } from 'sonner';
import { Settings, Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { generateMockProduct } from '@/lib/mockProduct';
import { supabase } from '@/lib/supabase';

interface Props {
  serverProducts: Product[];
}

export default function ProductsClient({ serverProducts }: Props) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(serverProducts);
  const [isCreatingMock, setIsCreatingMock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // --- Fetch Supabase profile ---
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('user')
        .select('name, image, email')
        .eq('clerk_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load user profile.');
      } else {
        //setProfile(data);
        setName(data.name || '');
        setImageUrl(data.image || '');
      }

      setIsLoading(false);
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, supabase]);

  if (!isSignedIn || !user)
    return <p>Please sign in to view your dashboard.</p>;

  if (isLoading) {
    return <p>Loading..</p>;
  }

  const handleConvertNew = () => router.push('/convert');

  const handleAddMockProduct = async () => {
    setIsCreatingMock(true);
    const mockProduct = generateMockProduct(user.id);

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

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <UserAvatar
            name={name || user.emailAddresses[0]?.emailAddress || 'User'}
            image={imageUrl || ''}
          />
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back,{' '}
              {name ||
                user.emailAddresses[0]?.emailAddress?.split('@')[0] ||
                'User'}
              !
            </h1>
            <p className="text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <Link href="/settings">
          <Settings />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button onClick={handleConvertNew} className="bg-primary">
          Convert New Product
        </Button>
        <Button
          onClick={handleAddMockProduct}
          disabled={isCreatingMock}
          variant="secondary"
          title="Create a random mock product for testing purposes"
        >
          {isCreatingMock ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Mock Product
            </>
          )}
        </Button>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">History</h2>
          {products && products.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={product.image_url}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-sm">
                    Platform: {product.platform}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'ready'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : product.status === 'uploaded'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}
                    >
                      {product.status}
                    </span>
                    {product.listing_data && (
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <h3 className="text-lg font-semibold">No products yet</h3>
              <p className="text-muted-foreground">
                Get started by converting your first product
              </p>
            </div>
            <Button
              onClick={handleConvertNew}
              className="mt-4 rounded-full mb-10"
            >
              Convert
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
