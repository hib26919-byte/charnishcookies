'use client';

import { QRCodeSVG } from 'qrcode.react';
import { businessInfo } from '@/lib/constants';
import { formatCurrency, upiUrl } from '@/lib/utils';

function PaymentLogo({ app }: { app: 'PhonePe' | 'Google Pay' | 'Paytm' }) {
  if (app === 'PhonePe') {
    return (
      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#5f259f] text-xl font-black text-white shadow-sm" aria-label="PhonePe logo">
        पे
      </span>
    );
  }

  if (app === 'Google Pay') {
    return (
      <span className="grid h-12 w-12 place-items-center rounded-full border border-choc-300/20 bg-white shadow-sm" aria-label="Google Pay logo">
        <svg viewBox="0 0 48 48" className="h-8 w-8" role="img">
          <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 34 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.3l6-6C34.8 4.8 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.8 0 20.5-7.9 20.5-21 0-1.4-.1-2.7-.3-4Z" />
          <path fill="#34A853" d="M6.9 14.1 14 19.3C15.9 14.4 19.5 11 24 11c3.3 0 6.3 1.2 8.6 3.3l6-6C34.8 4.8 29.7 3 24 3 16.1 3 9.2 7.4 5.7 13.9l1.2.2Z" />
          <path fill="#FBBC05" d="M24 45c5.6 0 10.4-1.8 14-5l-6.8-5.5C29.3 36.1 26.9 37 24 37c-5.9 0-10.9-4-12.6-9.4l-7.1 5.5C7.8 40.2 15.2 45 24 45Z" />
          <path fill="#EA4335" d="M11.4 27.6A13.1 13.1 0 0 1 11 24c0-1.2.2-2.4.5-3.5l-7.2-5.6A21 21 0 0 0 3 24c0 3.3.8 6.4 2.1 9.1l6.3-5.5Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black shadow-sm ring-1 ring-choc-300/20" aria-label="Paytm logo">
      <span><span className="text-[#002970]">Pay</span><span className="text-[#00baf2]">tm</span></span>
    </span>
  );
}

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
              ['PhonePe', 'PhonePe'],
              ['GooglePay', 'Google Pay'],
              ['Paytm', 'Paytm']
            ].map(([key, name]) => {
              const active = method === key;
              return (
              <a
                key={key}
                href={value}
                onClick={() => setMethod(key as 'PhonePe' | 'GooglePay' | 'Paytm')}
                className={`flex items-center gap-2 rounded-full border py-2 pl-2 pr-4 shadow-sm transition hover:-translate-y-0.5 ${active ? 'border-pink-500 bg-pink-100 ring-2 ring-pink-300/50' : 'border-choc-300/20 bg-white'}`}
              >
                <PaymentLogo app={name as 'PhonePe' | 'Google Pay' | 'Paytm'} />
                <span className="text-xs font-black text-choc-700">{name}</span>
              </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
