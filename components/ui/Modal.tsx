'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Modal({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: React.ReactNode; label: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-choc-900/60 p-4">
      <section className="brand-card max-h-[90vh] w-full max-w-3xl overflow-auto" aria-label={label}>
        <div className="flex justify-end p-3">
          <Button variant="ghost" className="h-10 w-10 px-0" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
