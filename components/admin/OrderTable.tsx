'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { buildReceipt, buildReceipts } from '@/lib/pdf';

const PAYMENT_COLORS: Record<string, string> = {
  pending:  'bg-amber-100 text-amber-800',
  verified: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const STATUS_COLORS: Record<string, string> = {
  received:         'bg-blue-100 text-blue-800',
  preparing:        'bg-purple-100 text-purple-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered:        'bg-green-100 text-green-800',
};

const STATUS_LABELS: Record<string, string> = {
  received:         'Received',
  preparing:        'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered:        'Delivered',
};

export function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [viewing, setViewing] = useState<Order | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ ...d.data(), id: d.id } as Order));
      setOrders(data);
      setLoading(false);
    }, (err) => {
      console.error('Orders fetch error:', err);
      toast.error('Failed to load orders');
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function updatePayment(id: string, status: Order['paymentStatus']) {
    setUpdating(id);
    try {
      await updateDoc(doc(db, 'orders', id), { paymentStatus: status, updatedAt: new Date() });
      toast.success(`Payment marked as ${status}`);
    } catch {
      toast.error('Failed to update payment');
    } finally {
      setUpdating(null);
    }
  }

  async function updateStatus(id: string, status: Order['orderStatus']) {
    setUpdating(id);
    try {
      await updateDoc(doc(db, 'orders', id), { orderStatus: status, updatedAt: new Date() });
      toast.success(`Order status updated to ${STATUS_LABELS[status]}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this order?')) return;
    try {
      await deleteDoc(doc(db, 'orders', id));
      toast.success('Order deleted');
    } catch {
      toast.error('Failed to delete order');
    }
  }

  function downloadReceipt(order: Order) {
    buildReceipt(order).save(`${order.orderNumber || 'charnish-order'}-receipt.pdf`);
  }

  function downloadAllReceipts() {
    if (!orders.length) {
      toast.error('No orders to download');
      return;
    }
    buildReceipts(orders).save(`charnish-all-receipts-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  if (loading) {
    return (
      <div className="brand-card p-5">
        <div className="flex items-center gap-3 text-choc-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-choc-300 border-t-choc-700" />
          Loading orders...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="brand-card p-10 text-center text-choc-500">
        <p className="text-2xl">🍪</p>
        <p className="mt-2 font-medium">No orders yet</p>
        <p className="text-sm">Orders will appear here when customers place them.</p>
      </div>
    );
  }

  return (
    <div className="brand-card overflow-x-auto p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-choc-800">
          All Orders <span className="ml-2 text-sm font-normal text-choc-500">({orders.length})</span>
        </h2>
        <Button variant="gold" className="h-9 px-4 text-xs" onClick={downloadAllReceipts}>
          Download All Receipts
        </Button>
      </div>
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="text-choc-800">
          <tr className="bg-choc-50/50">
            {['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Actions'].map((h) => (
              <th key={h} className="p-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-choc-300/20 hover:bg-choc-50/30 transition-colors">
              <td className="p-3 font-bold text-choc-800">{order.orderNumber}</td>
              <td className="p-3">
                <div className="font-medium">{order.customerName}</div>
                <div className="text-xs text-choc-500">{order.customerPhone}</div>
              </td>
              <td className="p-3">{order.items?.length ?? 0} item{order.items?.length !== 1 ? 's' : ''}</td>
              <td className="p-3 font-semibold">{formatCurrency(order.total)}</td>
              <td className="p-3">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${PAYMENT_COLORS[order.paymentStatus]}`}>
                  {order.paymentStatus}
                </span>
              </td>
              <td className="p-3">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_COLORS[order.orderStatus]}`}>
                  {STATUS_LABELS[order.orderStatus]}
                </span>
              </td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {order.paymentScreenshot && (
                    <Button
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={() => setViewing(order)}
                    >
                      View Screenshot
                    </Button>
                  )}
                  <Button variant="gold" className="h-7 px-2 text-xs" onClick={() => downloadReceipt(order)}>
                    Receipt
                  </Button>
                  {order.paymentStatus === 'pending' && (
                    <>
                      <Button
                        variant="secondary"
                        className="h-7 px-2 text-xs bg-green-50 text-green-700 hover:bg-green-100"
                        loading={updating === order.id}
                        onClick={() => updatePayment(order.id, 'verified')}
                      >
                        ✓ Verify
                      </Button>
                      <Button
                        variant="secondary"
                        className="h-7 px-2 text-xs bg-red-50 text-red-700 hover:bg-red-100"
                        loading={updating === order.id}
                        onClick={() => updatePayment(order.id, 'rejected')}
                      >
                        ✗ Reject
                      </Button>
                    </>
                  )}
                  {order.orderStatus !== 'delivered' && (
                    <select
                      className="h-7 rounded border border-choc-300/30 px-1 text-xs"
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order['orderStatus'])}
                      disabled={updating === order.id}
                    >
                      <option value="received">Received</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  )}
                  <Button variant="secondary" className="h-7 px-2 text-xs bg-red-50 text-red-700 hover:bg-red-100" onClick={() => remove(order.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-choc-900/70 p-4">
          <section className="brand-card w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-choc-300/20 p-4">
              <div>
                <h3 className="font-heading text-2xl font-bold text-choc-800">Payment Screenshot</h3>
                <p className="text-sm text-choc-500">{viewing.orderNumber} - {viewing.customerName} - {formatCurrency(viewing.total)}</p>
              </div>
              <button className="rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-choc-700" onClick={() => setViewing(null)}>Close</button>
            </div>
            <div className="max-h-[75vh] overflow-auto bg-cream-dark p-4">
              <img src={viewing.paymentScreenshot} alt={`Payment screenshot for ${viewing.orderNumber}`} className="mx-auto max-h-[70vh] max-w-full rounded-xl object-contain" />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
