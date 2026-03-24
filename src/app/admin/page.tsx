'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, DollarSign, Users } from 'lucide-react';

interface Stats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: number;
  todayRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
    todayRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/admin/orders/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Today Orders',
      value: stats.todayOrders,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Total Revenue',
      value: `฿${(stats.totalRevenue / 100).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Today Revenue',
      value: `฿${(stats.todayRevenue / 100).toLocaleString()}`,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-3xl`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-400 text-sm">{card.title}</p>
                    <Icon className={`w-8 h-8 bg-gradient-to-br ${card.color} bg-clip-text text-transparent`} />
                  </div>
                  <p className="text-3xl font-bold text-white">{card.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/menu"
            className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all text-orange-400 font-medium"
          >
            Manage Menu
          </a>
          <a
            href="/admin/promotions"
            className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all text-green-400 font-medium"
          >
            Add Promotion
          </a>
          <a
            href="/admin/orders"
            className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all text-blue-400 font-medium"
          >
            View Orders
          </a>
        </div>
      </div>
    </div>
  );
}
