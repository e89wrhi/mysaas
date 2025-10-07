'use client';

import { Icons } from '../shared/icons';
import Image from 'next/image';

interface AiIllustrationProps {
  width?: string;
  height?: number;
  autoplay?: boolean;
}

export default function AiTransformIllustration({}: AiIllustrationProps) {
  return (
    <div className="flex justify-center items-center h-[450px] relative w-[400px] mx-auto overflow-hidden">
      {/* 1. Camera Icon (Built with Divs) */}
      {/* Position: top-14 is 56px, close to the original 60px. */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10">
        {/* Outer Circle Container (Simulates the lens/main body wrapper) */}
        <div className="relative w-22 h-22 rounded-2xl flex items-center justify-center overflow-hidden">
          {/* Background Image - Absolute position to fill the div */}
          <Image
            src="/_products/arc/item8.png" // <--- IMPORTANT: Change this to your image path
            alt="product"
            layout="fill"
            className="absolute object-cover inset-0 z-0 opacity-70" // z-0 puts it behind, opacity makes it subtle
          />

          {/* Foreground Icon - z-10 ensures it's above the image */}
          <div className="relative z-10">
            <Icons.camera /> {/* Render the actual icon component */}
          </div>
        </div>
      </div>

      {/* 2. Dashed Connector Line (Straight Line Approximation) */}
      {/* top-[100px] is roughly where the icon ends, h-[260px] goes down to the box's top edge. */}
      <div className="absolute top-[100px] left-1/2 w-[3px] h-[260px] -translate-x-1/2 border-l-[3px] border-dashed border-primary" />

      {/* 3. Bottom Info Box */}
      {/* Dimensions: w-[250px], h-[290px]. Position: top-[360px] */}
      <div className="absolute w-[250px] h-[290px] rounded-2xl p-5 top-[360px] left-1/2 -translate-x-1/2 shadow-lg bg-card border-2 border-border flex flex-col space-y-2">
        {/* Info lines inside the box */}
        {/* Line 1 (Primary, widest) */}
        <div className="h-3 rounded-sm w-[100px] bg-primary"></div>

        {/* Line 2 (Muted) */}
        <div className="h-2.5 rounded-sm w-[80px] bg-muted"></div>

        {/* Line 3 (Muted) */}
        <div className="h-2.5 rounded-sm w-[90px] bg-muted"></div>

        {/* Line 4 (Muted, longest) */}
        <div className="h-2.5 rounded-sm w-[190px] bg-muted"></div>
      </div>
    </div>
  );
}
