'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, Tag, Calendar, Package, ShoppingCart, Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/menu', label: 'Menu', icon: Coffee },
    { href: '/admin/promotions', label: 'Promotions', icon: Tag },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/packages', label: 'Packages', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 backdrop-blur-xl bg-black/40 p-6">
        <div className="flex items-center gap-3 mb-8">
          <Coffee className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-white">Mina Admin</h1>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <Menu className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
