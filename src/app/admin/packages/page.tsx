'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/packages')
      .then(res => res.json())
      .then(data => {
        setPackages(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Packages</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all">
          <Plus className="w-5 h-5" />
          Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
            <p className="text-3xl font-bold text-orange-400 mb-4">฿{(pkg.price / 100).toLocaleString()}</p>
            <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
            <div className="space-y-2 mb-4">
              {pkg.features?.map((feature: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">For: {pkg.recommendedFor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
