'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UploadDropzone } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2, Upload, Wand2, Sparkles } from 'lucide-react';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { generateMockProduct } from '@/lib/mockProduct';

const PLATFORMS = [
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Generate Amazon product listings',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Create Shopify product descriptions',
  },
  { id: 'etsy', name: 'Etsy', description: 'Craft Etsy marketplace listings' },
  { id: 'ebay', name: 'eBay', description: 'Build eBay auction descriptions' },
];

export default function ConvertPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreatingMock, setIsCreatingMock] = useState(false);

  if (!isSignedIn || !user) {
    return <p>Please sign in to convert products.</p>;
  }

  /** Upload handler */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = async (res: any) => {
    if (res && res[0]?.url) {
      setUploadedImageUrl(res[0].url);
      toast.success('Image uploaded successfully!');
    }
  };

  /** Generate product via OpenAI + Supabase */
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

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate product');
      }

      toast.success('Product generated successfully!');
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
      router.push('/dashboard');
    }

    setIsCreatingMock(false);
  };

  const isBusy = isGenerating || isCreatingMock;

  // --- Components for clarity ---
  const PlatformButton = ({
    platform,
  }: {
    platform: (typeof PLATFORMS)[0];
  }) => (
    <Button
      key={platform.id}
      variant={selectedPlatform === platform.id ? 'default' : 'outline'}
      className="h-auto p-4 flex flex-col items-start gap-1"
      onClick={() => setSelectedPlatform(platform.id)}
    >
      <span className="font-semibold">{platform.name}</span>
      <span className="text-xs opacity-70">{platform.description}</span>
    </Button>
  );

  const UploadedImagePreview = () =>
    uploadedImageUrl ? (
      <div className="space-y-4">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
          <Image
            src={uploadedImageUrl}
            alt="Uploaded product"
            fill
            className="object-cover"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setUploadedImageUrl('')}
          className="w-full"
        >
          Upload Different Image
        </Button>
      </div>
    ) : (
      <UploadDropzone
        endpoint="productImage"
        onClientUploadComplete={handleImageUpload}
        onUploadError={(error) => {
          console.error('Upload error:', error);
          toast.error('Upload failed. Please try again.');
        }}
        appearance={{
          button:
            'ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-r-none bg-primary px-4 py-2 text-sm font-medium text-primary-foreground',
          container:
            'flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:bg-muted/50 transition-colors',
          allowedContent: 'text-xs text-muted-foreground mt-2',
        }}
      />
    );

  const ActionButtons = () => (
    <div className="space-y-3">
      <Button
        onClick={handleGenerateDescription}
        disabled={!uploadedImageUrl || !selectedPlatform || isBusy}
        className="w-full rounded-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Description...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Product Description
          </>
        )}
      </Button>

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
            Creating Mock Product...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Create Mock Product (Testing)
          </>
        )}
      </Button>
    </div>
  );

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto p-6 max-w-4xl space-y-8">
        <header className="mb-4">
          <h1 className="text-3xl font-bold">Convert Product</h1>
          <p className="text-muted-foreground">
            Upload an image and generate AI-powered product descriptions
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Image Upload */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Upload className="h-5 w-5" />
              <h2 className="font-bold text-lg">Upload Product Image</h2>
            </div>
            <p className="text-sm mb-4">Upload a clear image for AI analysis</p>
            <UploadedImagePreview />
          </section>

          {/* Platform & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Platform & Generation
              </CardTitle>
              <CardDescription>
                Select your target platform and generate optimized content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Platform</label>
                <div className="grid grid-cols-2 gap-3">
                  {PLATFORMS.map((platform) => (
                    <PlatformButton key={platform.id} platform={platform} />
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
                    This may take 10-30 seconds depending on image complexity.
                  </p>
                </div>
              )}

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">What happens next:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>AI analyzes your product image</li>
                  <li>Generates optimized title and description</li>
                  <li>Creates platform-specific content</li>
                  <li>Adds relevant tags and categories</li>
                  <li>Saves to your product library</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
