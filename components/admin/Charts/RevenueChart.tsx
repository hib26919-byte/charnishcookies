'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const emptyData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => ({ month, revenue: 0 }));

export function RevenueChart({ data = emptyData }: { data?: Array<{ month: string; revenue: number }> }) {
  return (
    <div className="brand-card h-80 p-5">
      <h3 className="font-heading text-xl font-bold text-choc-800">Verified Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5E8D4" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#E8819D" fill="#FBEAF2" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
