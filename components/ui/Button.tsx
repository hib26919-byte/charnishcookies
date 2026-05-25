'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { CookieLoader } from '@/components/ui/CookieLoader';

type Variant = 'primary' | 'secondary' | 'pink' | 'gold' | 'ghost';

const variants: Record<Variant, string> = {
  primary: 'bg-choc-700 text-cream hover:shadow-warm',
  secondary: 'border border-choc-700 text-choc-700 bg-transparent hover:bg-gold-100',
  pink: 'bg-pink-500 text-white hover:shadow-warm',
  gold: 'border border-gold-500 text-gold-700 bg-transparent hover:bg-gold-100',
  ghost: 'bg-pink-100 text-choc-700 hover:bg-pink-300/45'
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export function Button({ className, variant = 'primary', loading, children, disabled, ...props }: Props) {
  return (
    <button className={cn('pill min-h-11 px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-60', variants[variant], className)} disabled={disabled || loading} {...props}>
      {loading ? <CookieLoader size={20} /> : children}
    </button>
  );
}
