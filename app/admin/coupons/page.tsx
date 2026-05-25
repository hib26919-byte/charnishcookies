'use client';

import { FormEvent, useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { Coupon } from '@/types';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'coupons'), orderBy('createdAt', 'desc')), (snapshot) => {
      setCoupons(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Coupon));
    }, () => toast.error('Could not load coupons. Check Firebase auth/rules.'));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const payload = {
        code: String(form.get('code')).trim().toUpperCase(),
        discountType: form.get('discountType'),
        discountValue: Number(form.get('discountValue')),
        minOrder: Number(form.get('minOrder')),
        maxUses: Number(form.get('maxUses')),
        usedCount: editing?.usedCount ?? 0,
        expiresAt: new Date(String(form.get('expiresAt'))).toISOString(),
        active: form.get('active') === 'on'
      };
      const response = await fetch('/api/coupons', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: editing?.id, ...payload })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Coupon save failed');
      }
      event.currentTarget.reset();
      setEditing(null);
      toast.success(editing?.id ? 'Coupon updated' : 'Coupon saved');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save coupon.');
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      const response = await fetch('/api/coupons', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Coupon delete failed');
      toast.success('Coupon deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not delete coupon');
    }
  }

  const toInputDate = (value: unknown) => {
    if (!value) return '';
    const date = value && typeof value === 'object' && 'toDate' in value ? (value as { toDate: () => Date }).toDate() : new Date(String(value));
    return date.toISOString().slice(0, 10);
  };

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Coupons</h1>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="brand-card p-5">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-choc-300/20 py-3">
              <strong>{coupon.code}</strong>
              <span>{coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`} off</span>
              <span>{coupon.usedCount}/{coupon.maxUses}</span>
              <div className="flex gap-2">
                <button className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-700" onClick={() => setEditing(coupon)}>Edit</button>
                <button className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700" onClick={() => remove(coupon.id)}>Delete</button>
              </div>
            </div>
          ))}
          {!coupons.length && <p className="py-8 text-center text-choc-500">No coupons saved yet.</p>}
        </div>
        <form onSubmit={submit} className="brand-card grid gap-4 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold text-choc-800">{editing ? 'Edit Coupon' : 'Add Coupon'}</h2>
            {editing && <button type="button" className="text-sm font-bold text-pink-700" onClick={() => setEditing(null)}>Cancel</button>}
          </div>
          <input key={`code-${editing?.id ?? 'new'}`} name="code" required defaultValue={editing?.code ?? ''} placeholder="Coupon Code" className="h-11 rounded-xl border border-choc-300/30 px-4" />
          <select key={`type-${editing?.id ?? 'new'}`} name="discountType" defaultValue={editing?.discountType ?? 'percentage'} className="h-11 rounded-xl border border-choc-300/30 px-4"><option value="percentage">Percentage</option><option value="fixed">Fixed</option></select>
          <input key={`value-${editing?.id ?? 'new'}`} name="discountValue" required type="number" defaultValue={editing?.discountValue ?? ''} placeholder="Discount Value" className="h-11 rounded-xl border border-choc-300/30 px-4" />
          <input key={`min-${editing?.id ?? 'new'}`} name="minOrder" required type="number" defaultValue={editing?.minOrder ?? ''} placeholder="Minimum Order Amount" className="h-11 rounded-xl border border-choc-300/30 px-4" />
          <input key={`max-${editing?.id ?? 'new'}`} name="maxUses" required type="number" defaultValue={editing?.maxUses ?? ''} placeholder="Maximum Uses" className="h-11 rounded-xl border border-choc-300/30 px-4" />
          <input key={`expires-${editing?.id ?? 'new'}`} name="expiresAt" required type="date" defaultValue={toInputDate(editing?.expiresAt)} className="h-11 rounded-xl border border-choc-300/30 px-4" />
          <label key={`active-${editing?.id ?? 'new'}`} className="font-bold text-choc-800"><input name="active" type="checkbox" defaultChecked={editing?.active ?? true} /> Active</label>
          <Button loading={loading}>Save Coupon</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
