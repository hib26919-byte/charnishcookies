'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const emptyData = [1, 2, 3, 4, 5].map((rating) => ({ rating: `${rating} star`, count: 0 }));

export function ReviewsChart({ data = emptyData }: { data?: Array<{ rating: string; count: number }> }) {
  return (
    <div className="brand-card h-80 p-5">
      <h3 className="font-heading text-xl font-bold text-choc-800">Reviews Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="rating" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#E8819D" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
