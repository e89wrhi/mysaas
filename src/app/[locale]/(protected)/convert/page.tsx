'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Wand2, ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { ProductImageUploader } from './upload-img';
import { useTranslations } from 'next-intl';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { z } from 'zod';

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

  const {
    submit: submitObject,
    isLoading: isGenerating,
    object: generatedProduct,
  } = useObject({
    api: '/api/products/generate',
    schema: z.object({
      title: z
        .string()
        .describe('Catchy and SEO-friendly product title.')
        .optional(),
      description: z
        .string()
        .describe(
          'Detailed and realistic product description suitable for the target platform.'
        )
        .optional(),
      tags: z
        .array(z.string())
        .describe('Array of relevant SEO tags or keywords for the product.')
        .optional(),
      category: z.string().describe('The main product category.').optional(),
      listing_data: z
        .record(z.any())
        .describe('Any extra platform-specific listing data needed.')
        .optional(),
    }),
    onFinish: () => {
      toast.success('✨ Product generated successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to generate product: ' + error.message);
    },
  });

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
    submitObject({
      imageUrl: uploadedImageUrl,
      platform: selectedPlatform,
    });
  };

  const handleFinalUploadSuccess = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl); // Store the URL for form submission
    setImageUploaded(true); // Set the status flag
    console.log('Final Upload URL received by parent:', imageUrl);
  };

  const isBusy = isGenerating;

  // --- Reusable Components ---
  const PlatformButton = ({ id, name, description }: Platform) => (
    <Button
      key={id}
      variant={selectedPlatform === id ? 'default' : 'outline'}
      className="h-auto p-4 flex flex-col items-start gap-1 rounded-none transition-all"
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
    </div>
  );

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto p-6 pt-22 max-w-4xl space-y-8">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('new.title')}
          </h1>
          <p className="text-muted-foreground">{t('new.sub')}</p>
        </header>
        <ProductImageUploader onUploadSuccess={handleFinalUploadSuccess} />

        {/* Platform & Generation Section */}
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              {t('new.typeTitle')}
            </CardTitle>
            <CardDescription>{t('new.typeSub')}.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 rounded-none">
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
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground border">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Generating realistic listing using AI...
                </div>

                {generatedProduct && (
                  <div className="space-y-2 mt-4">
                    {generatedProduct.title && (
                      <h4 className="font-semibold text-lg text-foreground transition-all">
                        {generatedProduct.title}
                      </h4>
                    )}
                    {generatedProduct.category && (
                      <div className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {generatedProduct.category}
                      </div>
                    )}
                    {generatedProduct.description && (
                      <p className="text-sm text-foreground/80 whitespace-pre-wrap transition-opacity">
                        {generatedProduct.description}
                      </p>
                    )}
                    {generatedProduct.tags &&
                      generatedProduct.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {generatedProduct.tags.map((t, i) => (
                            <span
                              key={i}
                              className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded border"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
