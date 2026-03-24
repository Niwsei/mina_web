'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/promotions')
      .then(res => res.json())
      .then(data => {
        setPromotions(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Promotions</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all">
          <Plus className="w-5 h-5" />
          Add Promotion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all"
          >
            {promo.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium mb-3">
                {promo.badge}
              </span>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
            {promo.code && (
              <p className="text-orange-400 font-mono font-bold mb-2">{promo.code}</p>
            )}
            <p className="text-gray-400 text-sm mb-4">{promo.description}</p>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                promo.status === 'active' ? 'bg-green-500/20 text-green-400' :
                promo.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {promo.status}
              </span>
              <span className="text-gray-500 text-xs">
                {promo.period.start} - {promo.period.end || 'No end'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
