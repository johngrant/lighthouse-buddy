'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Monitor {
  id: string;
  name: string;
  url: string;
  region: string;
  createdAt: string;
  status: 'active' | 'inactive';
  lastRun: string | null;
  schedule: 'daily' | 'hourly';
  device: 'mobile' | 'desktop';
}

export default function MonitorsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  useEffect(() => {
    // Load monitors from localStorage
    const savedMonitors = localStorage.getItem('monitors');
    if (savedMonitors) {
      setMonitors(JSON.parse(savedMonitors));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
          <div className="relative pb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Monitors</h1>
              <p className="mt-1 text-gray-500">Schedule automated Lighthouse checks</p>
            </div>
            <Link
              href={`/app/${org}/monitors/new`}
              className="inline-flex items-center gap-x-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <PlusIcon className="h-5 w-5" />
              New Monitor
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {monitors.map((monitor) => (
              <div
                key={monitor.id}
                className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{monitor.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {monitor.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{monitor.url}</p>
                  <div className="mt-4 flex items-center gap-x-2 text-xs text-gray-500">
                    <span>{monitor.schedule}</span>
                    <span>•</span>
                    <span>{monitor.device === 'mobile' ? 'Mobile' : 'Desktop'}</span>
                    <span>•</span>
                    <span>{monitor.region}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
                  <div className="text-xs text-gray-500">
                    Created {new Date(monitor.createdAt).toLocaleDateString()}
                  </div>
                  <Link
                    href={`/app/${org}/monitors/${monitor.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
