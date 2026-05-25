'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';

const ADMIN_EMAIL = 'cookies@gmail.com';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim().toLowerCase();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (email !== ADMIN_EMAIL) {
      toast.error('Access denied.');
      setLoading(false);
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error('Server verification failed');

      toast.success('Welcome back!');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        toast.error('Invalid email or password.');
      } else if (code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Try again later.');
      } else {
        toast.error('Login failed. Please try again.');
      }
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cream p-4">
      <form onSubmit={submit} className="brand-card w-full max-w-md p-8">
        <h1 className="font-heading text-3xl font-bold text-choc-800">Admin Login</h1>
        <p className="mt-2 text-sm text-choc-500">Restricted to authorised administrators only.</p>
        <input required name="email" type="email" placeholder="Admin email" className="mt-6 h-12 w-full rounded-xl border border-choc-300/30 px-4" />
        <input required name="password" type="password" placeholder="Password" className="mt-4 h-12 w-full rounded-xl border border-choc-300/30 px-4" />
        <Button loading={loading} className="mt-6 w-full">Login</Button>
      </form>
    </div>
  );
}
