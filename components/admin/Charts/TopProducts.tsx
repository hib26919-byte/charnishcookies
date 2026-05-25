'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const emptyData = [{ name: 'No verified orders', units: 0 }];

export function TopProducts({ data = emptyData }: { data?: Array<{ name: string; units: number }> }) {
  return (
    <div className="brand-card h-80 p-5">
      <h3 className="font-heading text-xl font-bold text-choc-800">Top Products</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data.length ? data : emptyData} layout="vertical">
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={120} />
          <Tooltip />
          <Bar dataKey="units" fill="#C9A84C" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
