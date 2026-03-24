'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminMenuPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/menu')
      .then(res => res.json())
      .then(data => {
        setMenu(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Menu Management</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="space-y-6">
        {menu.map((category) => (
          <div key={category.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{category.name}</h2>
            <div className="space-y-3">
              {category.products?.map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-gray-400 text-sm">{product.description}</p>
                      <p className="text-orange-400 font-bold mt-1">฿{(product.price / 100).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
