'use client';

import { useState } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

interface TeamSettings {
  id: string;
  name: string;
  slug: string;
}

export default function GeneralSettingsPage({
  params,
}: {
  params: { org: string };
}) {
  const [settings] = useState<TeamSettings>({
    id: '119faa22-269e-49bd-817c-347d8557fba8',
    name: 'Stockton Street Co',
    slug: 'stockton-street-co',
  });

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your team settings</p>
      </div>

      <div className="flex">
        <SettingsSidebar activeTab="General" />

        <div className="flex-1 min-w-0 ml-8">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">General</h2>
                <p className="mt-1 text-sm text-gray-500">View details of your team</p>
              </div>
              <button
                onClick={() => {/* Handle delete team */}}
                className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
              >
                Delete Team
              </button>
            </div>

            <dl className="space-y-6 text-sm">
              <div>
                <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">ID</dt>
                <dd className="mt-1 text-gray-900">{settings.id}</dd>
              </div>
              <div>
                <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">NAME</dt>
                <dd className="mt-1 text-gray-900">{settings.name}</dd>
              </div>
              <div>
                <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">SLUG</dt>
                <dd className="mt-1 text-gray-900">{settings.slug}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
