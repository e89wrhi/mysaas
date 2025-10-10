import React from 'react';
import { Spinner } from '../ui/spinner';

export default function LoadingView() {
  return (
    <div className="flex items-center justify-center my-10 md:my-20">
      <Spinner className="size-8" />
    </div>
  );
}
