'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Loader2,
  Wand2,
  Sparkles,
  ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { generateMockProduct } from '@/lib/mockProduct';
import { ProductImageUploader } from './upload-img';
import { useTranslations } from 'next-intl';

interface Platform {
  id: string;
  name: string;
  description: string;
}

export default function ConvertPage() {
  const t = useTranslations();
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const PLATFORMS = [
    {
      id: 'amazon',
      name: `${t('new.amazon')}`,
      description: `${t('new.amazonSub')}`,
    },
    {
      id: 'shopify',
      name: `${t('new.shopify')}`,
      description: `${t('new.shopifySub')}`,
    },
    {
      id: 'etsy',
      name: `${t('new.etsy')}`,
      description: `${t('new.etsySub')}`,
    },
    {
      id: 'ebay',
      name: `${t('new.ebay')}`,
      description: `${t('new.ebaySub')}`,
    },
  ];
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isImageUploaded, setImageUploaded] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreatingMock, setIsCreatingMock] = useState(false);

  if (!isSignedIn || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="p-8 text-center max-w-sm">
          <CardTitle className="mb-2">Sign in required</CardTitle>
          <CardDescription>
            Please sign in to upload a product and generate descriptions.
          </CardDescription>
        </Card>
      </div>
    );
  }

  /** Generate AI product description */
  const handleGenerateDescription = async () => {
    if (!uploadedImageUrl || !selectedPlatform) {
      toast.error('Please upload an image and select a platform');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/products/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          platform: selectedPlatform,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate product');

      toast.success('✨ Product generated successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : 'Failed to generate product'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinalUploadSuccess = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl); // Store the URL for form submission
    setImageUploaded(true); // Set the status flag
    console.log('Final Upload URL received by parent:', imageUrl);
  };

  /** Create mock product */
  const handleAddMockProduct = async () => {
    setIsCreatingMock(true);
    try {
      const mockProduct = generateMockProduct(user.id);
      const res = await fetch('/api/products/add', {
        method: 'POST',
        body: JSON.stringify(mockProduct),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success('🌱 Mock product added!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add mock product'
      );
    } finally {
      setIsCreatingMock(false);
    }
  };

  const isBusy = isGenerating || isCreatingMock;

  // --- Reusable Components ---
  const PlatformButton = ({ id, name, description }: Platform) => (
    <Button
      key={id}
      variant={selectedPlatform === id ? 'default' : 'outline'}
      className="h-auto p-4 flex flex-col items-start gap-1 transition-all"
      onClick={() => setSelectedPlatform(id)}
      disabled={isBusy}
    >
      <div className="flex items-center gap-2">
        {selectedPlatform === id ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="font-semibold">{name}</span>
      </div>
      <span className="text-xs opacity-70">{description}</span>
    </Button>
  );

  const ActionButtons = () => (
    <div className="space-y-3">
      {isImageUploaded ? (
        <Button
          onClick={handleGenerateDescription}
          disabled={!uploadedImageUrl || !selectedPlatform || isBusy}
          className="w-full rounded-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              {t('new.create')}
            </>
          )}
        </Button>
      ) : (
        <div></div>
      )}

      <Button
        onClick={handleAddMockProduct}
        disabled={!selectedPlatform || isBusy}
        variant="secondary"
        className="rounded-full w-full bg-green-500 hover:bg-green-600 text-white"
        size="lg"
      >
        {isCreatingMock ? (
          <>
            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
            ...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            {t('new.createMock')}
          </>
        )}
      </Button>
    </div>
  );

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto p-6 max-w-4xl space-y-8">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('new.title')}
          </h1>
          <p className="text-muted-foreground">{t('new.sub')}</p>
        </header>
        <ProductImageUploader onUploadSuccess={handleFinalUploadSuccess} />

        {/* Platform & Generation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              {t('new.typeTitle')}
            </CardTitle>
            <CardDescription>{t('new.typeSub')}.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('new.select')}</label>
              <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map((p) => (
                  <PlatformButton key={p.id} {...p} />
                ))}
              </div>
            </div>

            <ActionButtons />

            {isGenerating && (
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing your image...
                </div>
                <p>
                  This may take 10–30 seconds depending on image complexity.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
