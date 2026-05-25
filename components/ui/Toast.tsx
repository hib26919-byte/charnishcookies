'use client';

import { Toaster } from 'react-hot-toast';

export function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          border: '1px solid rgba(200,160,120,0.25)',
          color: '#3D1A00',
          background: '#fff'
        }
      }}
    />
  );
}
