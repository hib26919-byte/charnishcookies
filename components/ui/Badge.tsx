import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('inline-flex rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-700', className)}>{children}</span>;
}
