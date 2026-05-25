'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const emptyData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => ({ month, orders: 0 }));

export function OrdersChart({ data = emptyData }: { data?: Array<{ month: string; orders: number }> }) {
  return (
    <div className="brand-card h-80 p-5">
      <h3 className="font-heading text-xl font-bold text-choc-800">Verified Monthly Orders</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5E8D4" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="#6B2F0A" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
