'use client';

import { CartProvider } from '@/hooks/useCart';
import { Toast } from '@/components/ui/Toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toast />
    </CartProvider>
  );
}
