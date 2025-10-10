import LoadingView from '@/components/shared/loading-view';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import React from 'react';

export default function LoaingPage() {
  return (
    <MaxWidthWrapper className="flex items-center justiy-center">
      <LoadingView />;
    </MaxWidthWrapper>
  );
}
