'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { OrdersChart } from '@/components/admin/Charts/OrdersChart';
import { RevenueChart } from '@/components/admin/Charts/RevenueChart';
import { ReviewsChart } from '@/components/admin/Charts/ReviewsChart';
import { TopProducts } from '@/components/admin/Charts/TopProducts';
import { OrderTable } from '@/components/admin/OrderTable';
import { db } from '@/lib/firebase';
import { formatCurrency } from '@/lib/utils';
import { Order, Product } from '@/types';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toDate(value: unknown) {
  if (value instanceof Date) return value;
  if (value && typeof value === 'object' && 'toDate' in value) return (value as { toDate: () => Date }).toDate();
  return new Date();
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubOrders = onSnapshot(query(collection(db, 'orders')), (snapshot) => {
      setOrders(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Order));
    });
    const unsubProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
      setProducts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Product));
    });
    return () => {
      unsubOrders();
      unsubProducts();
    };
  }, []);

  const metrics = useMemo(() => {
    const verified = orders.filter((order) => order.paymentStatus === 'verified');
    const pending = orders.filter((order) => order.paymentStatus === 'pending').length;
    const ordersByMonth = monthLabels.map((month) => ({ month, orders: 0 }));
    const revenueByMonth = monthLabels.map((month) => ({ month, revenue: 0 }));
    const productUnits = new Map<string, number>();

    verified.forEach((order) => {
      const month = toDate(order.createdAt).getMonth();
      ordersByMonth[month].orders += 1;
      revenueByMonth[month].revenue += Number(order.total || 0);
      order.items?.forEach((item) => {
        productUnits.set(item.name, (productUnits.get(item.name) ?? 0) + item.quantity);
      });
    });

    return {
      verifiedOrders: verified.length,
      revenue: verified.reduce((sum, order) => sum + Number(order.total || 0), 0),
      pending,
      products: products.length,
      ordersByMonth,
      revenueByMonth,
      topProducts: Array.from(productUnits.entries()).map(([name, units]) => ({ name, units })).sort((a, b) => b.units - a.units).slice(0, 5)
    };
  }, [orders, products]);

  const stats = [
    ['Verified Orders', String(metrics.verifiedOrders), 'after payment verify'],
    ['Verified Revenue', formatCurrency(metrics.revenue), 'after payment verify'],
    ['Pending Orders', String(metrics.pending), 'waiting'],
    ['Total Products', String(metrics.products), 'active catalog']
  ];

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map(([label, value, change]) => (
          <article key={label} className="brand-card p-5">
            <p className="text-sm font-bold text-choc-500">{label}</p>
            <strong className="mt-2 block font-heading text-3xl text-choc-800">{value}</strong>
            <span className="mt-2 inline-block text-sm font-bold text-pink-700">{change}</span>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <OrdersChart data={metrics.ordersByMonth} />
        <RevenueChart data={metrics.revenueByMonth} />
        <TopProducts data={metrics.topProducts} />
        <ReviewsChart />
      </div>
      <h2 className="mt-8 font-heading text-3xl font-bold text-choc-800">Recent Orders</h2>
      <div className="mt-4"><OrderTable /></div>
    </AdminLayout>
  );
}
