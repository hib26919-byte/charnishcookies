'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CouponInput } from '@/components/checkout/CouponInput';
import { PaymentSection } from '@/components/checkout/PaymentSection';
import { ScreenshotUpload } from '@/components/checkout/ScreenshotUpload';
import { useCart } from '@/hooks/useCart';
import { formatCurrency, isIndianPhone, makeOrderNumber, whatsappOrderText } from '@/lib/utils';
import { db } from '@/lib/firebase';

export function OrderForm() {
  const cart = useCart();
  const router = useRouter();
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PhonePe' | 'GooglePay' | 'Paytm'>('PhonePe');
  const [paymentScreenshot, setPaymentScreenshot] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customerName: '', customerPhone: '', customerEmail: '', deliveryAddress: '', pincode: '', notes: '' });
  const total = Math.max(0, cart.subtotal - discount);

  async function submit() {
    if (!cart.items.length) return toast.error('Your cart is empty');
    if (!form.customerName || !isIndianPhone(form.customerPhone) || !form.deliveryAddress || !form.pincode) return toast.error('Please complete customer details');
    if (!paymentScreenshot) return toast.error('Please upload payment proof');
    setLoading(true);
    const orderNumber = makeOrderNumber();
    const payload = {
      ...form,
      orderNumber,
      items: cart.items,
      subtotal: cart.subtotal,
      discount,
      couponCode,
      total,
      paymentMethod,
      paymentScreenshot,
      paymentStatus: 'pending',
      orderStatus: 'received'
    };
    const orderForFirestore = {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await addDoc(collection(db, 'orders'), orderForFirestore);
    sessionStorage.setItem('charnish-last-order', JSON.stringify({ ...payload, createdAt: new Date(), updatedAt: new Date() }));
    cart.clear();
    window.open(whatsappOrderText(orderNumber), '_blank');
    router.push(`/order-success?order=${orderNumber}`);
  }

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
      <section className="space-y-6">
        <div className="brand-card p-5">
          <h1 className="font-heading text-3xl font-bold text-choc-800">Checkout</h1>
          <div className="mt-5 space-y-3">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex flex-wrap items-center justify-between gap-3 border-b border-choc-300/20 pb-3">
                <div className="min-w-[180px] flex-1">
                  <p className="font-bold text-choc-800">{item.name}</p>
                  <p className="text-sm text-choc-500">Qty {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-gold-100 text-choc-700" onClick={() => cart.update(item.productId, item.quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={15} />
                  </button>
                  <span className="w-8 text-center font-bold text-choc-800">{item.quantity}</span>
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-gold-100 text-choc-700" onClick={() => cart.update(item.productId, item.quantity + 1)} aria-label="Increase quantity">
                    <Plus size={15} />
                  </button>
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-700" onClick={() => cart.remove(item.productId)} aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
                <strong className="min-w-24 text-right text-choc-700">{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            ))}
            {!cart.items.length && <p className="text-choc-500">Your cart is empty. Add cookies from the shop to place an order.</p>}
          </div>
        </div>
        <CouponInput subtotal={cart.subtotal} onDiscount={(code, amount) => { setCouponCode(code); setDiscount(amount); }} />
        <div className="brand-card p-5">
          <h2 className="font-heading text-2xl font-bold text-choc-800">Customer Details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              ['customerName', 'Full Name'],
              ['customerPhone', 'Phone Number'],
              ['customerEmail', 'Email'],
              ['pincode', 'Pincode']
            ].map(([key, label]) => (
              <label key={key} className="text-sm font-bold text-choc-800">
                {label}
                <input value={form[key as keyof typeof form]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" />
              </label>
            ))}
            <label className="text-sm font-bold text-choc-800 md:col-span-2">
              Delivery Address
              <textarea value={form.deliveryAddress} onChange={(event) => setForm({ ...form, deliveryAddress: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-choc-300/30 p-4 font-normal" />
            </label>
            <label className="text-sm font-bold text-choc-800 md:col-span-2">
              Special instructions
              <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-2 min-h-20 w-full rounded-xl border border-choc-300/30 p-4 font-normal" />
            </label>
          </div>
        </div>
      </section>
      <aside className="space-y-5">
        <div className="brand-card p-5">
          <h2 className="font-heading text-2xl font-bold text-choc-800">Order Total</h2>
          <div className="mt-4 space-y-2 text-sm text-choc-500">
            <div className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(cart.subtotal)}</strong></div>
            <div className="flex justify-between"><span>Discount</span><strong>{formatCurrency(discount)}</strong></div>
            <div className="flex justify-between border-t border-choc-300/20 pt-3 text-lg text-choc-800"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
          </div>
        </div>
        <PaymentSection total={total} method={paymentMethod} setMethod={setPaymentMethod} />
        <ScreenshotUpload value={paymentScreenshot} onChange={setPaymentScreenshot} />
        <Button className="w-full" loading={loading} onClick={submit}>Place Order</Button>
      </aside>
    </div>
  );
}
