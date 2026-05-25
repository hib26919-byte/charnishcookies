'use client';

import { FormEvent, useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { FAQ, Product } from '@/types';

export default function AdminChatbotPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubProducts = onSnapshot(query(collection(db, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      setProducts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Product));
    });
    const unsubFaqs = onSnapshot(query(collection(db, 'faqs'), orderBy('order', 'asc')), (snapshot) => {
      setFaqs(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as FAQ));
    });
    return () => {
      unsubProducts();
      unsubFaqs();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      await addDoc(collection(db, 'faqs'), {
        question: form.get('question'),
        answer: form.get('answer'),
        order: faqs.length + 1,
        createdAt: serverTimestamp()
      });
      event.currentTarget.reset();
      toast.success('FAQ saved');
    } catch {
      toast.error('Could not save FAQ. Check Firebase auth/rules.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Chatbot Training</h1>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="brand-card p-5">
          <h2 className="font-heading text-2xl font-bold">Known Products</h2>
          {products.map((product) => <p key={product.id} className="mt-3 text-sm text-choc-500">{product.name} - ₹{product.discountPrice ?? product.price}</p>)}
          {!products.length && <p className="mt-3 text-sm text-choc-500">No live products saved yet.</p>}
        </section>
        <section className="brand-card p-5">
          <h2 className="font-heading text-2xl font-bold">FAQs</h2>
          {faqs.map((faq) => <p key={faq.id} className="mt-3 text-sm text-choc-500"><strong>{faq.question}</strong><br />{faq.answer}</p>)}
          <form onSubmit={submit} className="mt-5 grid gap-3">
            <input name="question" required placeholder="Question" className="h-11 rounded-xl border border-choc-300/30 px-4" />
            <textarea name="answer" required placeholder="Answer" className="min-h-24 rounded-xl border border-choc-300/30 p-4" />
            <Button loading={loading}>Save FAQ</Button>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}
