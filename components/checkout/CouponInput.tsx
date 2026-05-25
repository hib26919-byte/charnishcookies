'use client';

import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { Coupon } from '@/types';

export function CouponInput({ subtotal, onDiscount }: { subtotal: number; onDiscount: (code: string, discount: number) => void }) {
  const [code, setCode] = useState('');
  async function apply(value = code) {
    const normalized = value.trim().toUpperCase();
    if (!normalized) {
      toast.error('Enter a coupon code');
      return;
    }
    const snap = await getDocs(query(collection(db, 'coupons'), where('code', '==', normalized)));
    const doc = snap.docs[0];
    if (!doc) {
      if (normalized === 'CELEBRATE') {
        const discount = Math.round(subtotal * 0.1);
        onDiscount('CELEBRATE', discount);
        toast.success('Celebrate coupon applied');
        return;
      }
      toast.error('Coupon not valid. Try CELEBRATE.');
      return;
    }
    const coupon = doc.data() as Coupon & { expiresAt?: { toDate: () => Date } };
    const expiresAt = coupon.expiresAt?.toDate ? coupon.expiresAt.toDate() : new Date(coupon.expiresAt as unknown as string);
    if (!coupon.active) return toast.error('Coupon is not active');
    if (expiresAt < new Date()) return toast.error('Coupon expired');
    if (coupon.usedCount >= coupon.maxUses) return toast.error('Coupon usage limit reached');
    if (subtotal < coupon.minOrder) return toast.error(`Minimum order is ₹${coupon.minOrder}`);
    const discount = coupon.discountType === 'percentage' ? Math.round((subtotal * coupon.discountValue) / 100) : coupon.discountValue;
    onDiscount(coupon.code, discount);
    toast.success('Coupon applied');
  }
  return (
    <div className="rounded-[14px] border-2 border-dashed border-gold-500 bg-gradient-to-br from-gold-100 to-pink-100 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <label className="text-sm font-bold text-choc-800">Celebrate with a coupon</label>
          <p className="text-xs font-bold text-pink-700">Tap CELEBRATE for a sweet 10% starter offer.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCode('CELEBRATE');
            apply('CELEBRATE');
          }}
          className="rounded-full bg-pink-500 px-4 py-2 text-sm font-black text-white shadow-warm"
        >
          CELEBRATE
        </button>
      </div>
      <div className="mt-2 flex gap-2">
        <input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} className="h-11 min-w-0 flex-1 rounded-full border border-choc-300/30 px-4" placeholder="CELEBRATE" />
        <Button variant="gold" onClick={() => apply()}>Apply</Button>
      </div>
    </div>
  );
}
