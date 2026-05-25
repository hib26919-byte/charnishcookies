'use client';

import { FormEvent, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { businessInfo } from '@/lib/constants';
import { db } from '@/lib/firebase';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      await setDoc(doc(db, 'siteSettings', 'global'), {
        businessName: form.get('businessName'),
        address: form.get('address'),
        phone1: form.get('phone1'),
        phone2: form.get('phone2'),
        email: form.get('email'),
        upiId: form.get('upiId'),
        aboutText: form.get('aboutText'),
        paymentApps: {
          phonePe: form.get('PhonePe') === 'on',
          googlePay: form.get('Google Pay') === 'on',
          paytm: form.get('Paytm') === 'on'
        },
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Settings saved');
    } catch {
      toast.error('Could not save settings. Check Firebase auth/rules.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Settings</h1>
      <form onSubmit={submit} className="brand-card mt-6 grid gap-4 p-5">
        {Object.entries({ businessName: businessInfo.name, address: businessInfo.address, phone1: businessInfo.phone1, phone2: businessInfo.phone2, email: businessInfo.email, upiId: businessInfo.upiId }).map(([key, value]) => (
          <label key={key} className="text-sm font-bold text-choc-800">{key}<input name={key} defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
        ))}
        <textarea name="aboutText" defaultValue="Homemade cookies baked fresh in Bangalore." className="min-h-32 rounded-xl border border-choc-300/30 p-4" />
        <div className="grid gap-3 md:grid-cols-3">{['PhonePe', 'Google Pay', 'Paytm'].map((app) => <label key={app} className="font-bold text-choc-800"><input name={app} type="checkbox" defaultChecked /> {app}</label>)}</div>
        <Button loading={loading}>Save Settings</Button>
      </form>
    </AdminLayout>
  );
}
