'use client';

import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/admin/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Orders</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Items</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Total</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4 text-white font-mono text-sm">{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4 text-gray-300">{order.items.length} items</td>
                <td className="px-6 py-4 text-orange-400 font-bold">฿{(order.total / 100).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {new Date(order.createdAt).toLocaleDateString('th-TH')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
