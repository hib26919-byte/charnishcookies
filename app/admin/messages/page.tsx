'use client';

import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  createdAt?: { toDate: () => Date };
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc')), (snapshot) => {
      setMessages(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as ContactMessage));
    }, () => toast.error('Could not load contact messages. Check Firebase rules.'));
  }, []);

  async function remove(id: string) {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      toast.success('Message deleted');
    } catch {
      toast.error('Could not delete message');
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Customer Messages</h1>
      <div className="mt-6 grid gap-4">
        {messages.map((item) => (
          <article key={item.id} className="brand-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-choc-800">{item.name}</h2>
                <p className="mt-1 text-sm font-bold text-choc-500">{item.phone}{item.email ? ` | ${item.email}` : ''}</p>
                <p className="mt-1 text-xs text-choc-300">{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString('en-IN') : ''}</p>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${item.phone}`}><Button variant="secondary" className="h-9 px-4">Call</Button></a>
                <a href={`https://wa.me/91${item.phone.replace(/\D/g, '').slice(-10)}`}><Button variant="pink" className="h-9 px-4">WhatsApp</Button></a>
                <Button variant="secondary" className="h-9 bg-red-50 px-4 text-red-700" onClick={() => remove(item.id)}>Delete</Button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap rounded-xl bg-cream p-4 text-choc-700">{item.message}</p>
          </article>
        ))}
        {!messages.length && <div className="brand-card p-10 text-center text-choc-500">No customer messages yet.</div>}
      </div>
    </AdminLayout>
  );
}
