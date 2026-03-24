'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Events</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all">
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-400 mb-4">{event.blurb}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-orange-400">📅 {event.date}</span>
                  <span className="text-orange-400">🕐 {event.time}</span>
                  <span className="text-orange-400">📍 {event.location}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
