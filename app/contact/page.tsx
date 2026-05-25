'use client';

import { FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { businessInfo } from '@/lib/constants';
import { db } from '@/lib/firebase';

export default function ContactPage() {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: form.get('name'),
        phone: form.get('phone'),
        email: form.get('email'),
        message: form.get('message'),
        createdAt: serverTimestamp()
      });
      event.currentTarget.reset();
      toast.success('Message saved. We will get back to you soon.');
    } catch {
      toast.error('Could not save message. Please WhatsApp us.');
    }
  }
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-2">
      <section>
        <h1 className="font-heading text-4xl font-bold text-choc-800">Contact Charnish Cookies</h1>
        <p className="mt-3 text-choc-500">For fresh orders, gift boxes, or custom requests, send a message or reach us on WhatsApp.</p>
        <form onSubmit={submit} className="brand-card mt-8 grid gap-4 p-5">
          <input required name="name" placeholder="Name" className="h-12 rounded-xl border border-choc-300/30 px-4" />
          <input required name="phone" placeholder="Phone" className="h-12 rounded-xl border border-choc-300/30 px-4" />
          <input name="email" placeholder="Email" className="h-12 rounded-xl border border-choc-300/30 px-4" />
          <textarea required name="message" placeholder="Message" className="min-h-32 rounded-xl border border-choc-300/30 p-4" />
          <Button>Send Message</Button>
        </form>
      </section>
      <aside className="space-y-5">
        <div className="brand-card p-6">
          <h2 className="font-heading text-2xl font-bold text-choc-800">Business Details</h2>
          <p className="mt-4 text-choc-500">{businessInfo.address}</p>
          <p className="mt-2 text-choc-500">{businessInfo.phone1} / {businessInfo.phone2}</p>
          <p className="mt-2 text-choc-500">{businessInfo.email}</p>
          <a href={businessInfo.socialLinks.whatsapp}><Button variant="pink" className="mt-5"><MessageCircle size={18} /> WhatsApp</Button></a>
        </div>
        <iframe title="Singasandra map" className="h-80 w-full rounded-2xl border-0" loading="lazy" src="https://www.google.com/maps?q=Singasandra%2C%20Bangalore&output=embed" />
      </aside>
    </div>
  );
}
