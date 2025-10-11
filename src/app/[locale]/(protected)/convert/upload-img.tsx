'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ProductImageUploadedProps {
  onUploadSuccess: (imageUrl: string) => void;
}

export function ProductImageUploader({
  onUploadSuccess,
}: ProductImageUploadedProps) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (res?: { url: string }[]) => {
    if (!res || res.length === 0) {
      toast.error('Upload failed');
      setIsUploading(false);
      return;
    }
    console.log(`toke`, process.env.UPLOADTHING_TOKEN);
    setUploadedImageUrl(res[0].url);
    setIsUploading(false);
    setUploadProgress(100);
    toast.success('Image uploaded successfully!');

    onUploadSuccess(res[0].url);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleFileSelect = (files: File[]) => {
    if (!files || files.length === 0) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const file = files[0];
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    // Clear previous uploaded url if picking a new file
    setUploadedImageUrl('');
  };

  return (
    <div className="space-y-4">
      {/* Show preview if picked or uploaded */}
      {previewUrl || uploadedImageUrl ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border">
          <Image
            src={uploadedImageUrl || previewUrl}
            alt="Uploaded product"
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div></div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2 w-full" />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {!uploadedImageUrl && !isUploading && (
        <UploadDropzone
          endpoint="productImage"
          onUploadBegin={() => {
            setIsUploading(true);
            setUploadProgress(0);
          }}
          onUploadProgress={(progress) => {
            setUploadProgress(progress);
          }}
          onClientUploadComplete={handleImageUpload}
          onBeforeUploadBegin={(files) => {
            if (files[0]) {
              handleFileSelect(files);
            }
            return files;
          }}
          onUploadError={(error) => {
            console.error(error);
            toast.error('Upload failed. Please try again.');
            setIsUploading(false);
          }}
          appearance={{
            button:
              'ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-4xl bg-green-400 px-4 py-2 text-sm font-medium text-white dark:text-black',
            container:
              'flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:bg-muted/50 transition-colors',
            allowedContent: 'text-xs text-muted-foreground mt-2',
          }}
        />
      )}

      {uploadedImageUrl && (
        <Button
          variant="outline"
          onClick={() => {
            setUploadedImageUrl('');
            setPreviewUrl('');
          }}
          className="w-full"
        >
          Upload Different Image
        </Button>
      )}
    </div>
  );
}
