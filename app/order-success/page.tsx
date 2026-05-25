'use client';

import Link from 'next/link';
import { CheckCircle2, Download, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { businessInfo } from '@/lib/constants';
import { buildReceipt } from '@/lib/pdf';
import { Order } from '@/types';

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const order = params.get('order') ?? 'CHK-PENDING';
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('charnish-last-order');
    if (saved) setLastOrder(JSON.parse(saved));
  }, []);

  function downloadReceipt() {
    if (!lastOrder) return;
    buildReceipt(lastOrder).save(`${lastOrder.orderNumber}.pdf`);
  }

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-12">
      <section className="brand-card max-w-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto text-green-600" size={70} />
        <h1 className="mt-5 font-heading text-4xl font-bold text-choc-800">Order Received</h1>
        <p className="mt-3 text-choc-500">Your order number is <strong className="text-choc-800">{order}</strong>. We will verify your payment screenshot and confirm on WhatsApp.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="secondary" disabled={!lastOrder} onClick={downloadReceipt}><Download size={18} /> Download Receipt</Button>
          <Link href={businessInfo.socialLinks.whatsapp}><Button variant="pink"><MessageCircle size={18} /> WhatsApp Support</Button></Link>
          <Link href="/shop"><Button>Continue Shopping</Button></Link>
        </div>
      </section>
    </div>
  );
}
