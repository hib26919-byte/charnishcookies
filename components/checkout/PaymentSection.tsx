'use client';

import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { businessInfo } from '@/lib/constants';
import { formatCurrency, upiUrl } from '@/lib/utils';

export function PaymentSection({ total, method, setMethod }: { total: number; method: string; setMethod: (value: 'PhonePe' | 'GooglePay' | 'Paytm') => void }) {
  const value = upiUrl(total);
  return (
    <section className="brand-card p-5">
      <h2 className="font-heading text-2xl font-bold text-choc-800">Payment</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-[180px_1fr]">
        <div className="rounded-2xl bg-white p-4">
          <QRCodeSVG value={value} size={150} />
        </div>
        <div>
          <p className="font-bold text-choc-800">Pay {formatCurrency(total)} to {businessInfo.upiId}</p>
          <p className="mt-2 text-sm text-choc-500">Open your payment app, scan the QR, or use the selected app button.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              ['PhonePe', '/phonepe-logo.svg'],
              ['Google Pay', '/gpay-logo.svg'],
              ['Paytm', '/paytm-logo.svg']
            ].map(([name, src]) => (
              <div key={name} className="flex h-12 items-center rounded-2xl border border-choc-300/20 bg-white px-3 shadow-sm">
                <span className="relative h-9 w-28 overflow-hidden">
                  <Image src={src} alt={`${name} logo`} fill className="object-contain" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {(['PhonePe', 'GooglePay', 'Paytm'] as const).map((app) => (
              <a key={app} href={value} onClick={() => setMethod(app)}>
                <Button variant={method === app ? 'pink' : 'secondary'}>{app}</Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
