import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | false | null | undefined>) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function isIndianPhone(value: string) {
  return /^[6-9]\d{9}$/.test(value.replace(/\D/g, ''));
}

export function makeOrderNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `CHK-${stamp}-${suffix}`;
}

export function upiUrl(total: number) {
  const params = new URLSearchParams({
    pa: '7676818313-2@ybl',
    pn: 'Charnish Cookies',
    am: String(total),
    cu: 'INR',
    tn: 'Order'
  });
  return `upi://pay?${params.toString()}`;
}

export function whatsappOrderText(orderNumber: string) {
  return `https://wa.me/917676818313?text=${encodeURIComponent(`Hi Charnish Cookies, my order number is ${orderNumber}.`)}`;
}
