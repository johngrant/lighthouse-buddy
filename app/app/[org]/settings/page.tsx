'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TeamSettings {
  id: string;
  name: string;
  slug: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Member';
  avatar?: string;
}

interface BillingInfo {
  plan: string;
  tier: string;
  cycle: string;
  usage: {
    dailyMonitors: {
      current: number;
      limit: number;
    };
    webRuns: {
      current: number;
      limit: number;
    };
    members: {
      current: number;
      limit: number;
    };
  };
}

export default function SettingsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('General');

  // This would come from your API in a real application
  const [settings] = useState<TeamSettings>({
    id: '119faa22-269e-49bd-817c-347d8557fba8',
    name: 'Stockton Street Co',
    slug: 'stockton-street-co',
  });

  const [members] = useState<Member[]>([
    {
      id: '1',
      name: 'jmquigley78',
      email: 'jmquigley78@gmail.com',
      role: 'Owner',
      avatar: '/path/to/avatar.jpg',
    },
  ]);

  const [billing] = useState<BillingInfo>({
    plan: 'Basic',
    tier: 'Trial',
    cycle: '01/30/25 - 02/13/25',
    usage: {
      dailyMonitors: {
        current: 1,
        limit: 5,
      },
      webRuns: {
        current: 3,
        limit: 100,
      },
      members: {
        current: 1,
        limit: 1,
      },
    },
  });

  const tabs = ['General', 'Members', 'Billing & Usage'];

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your team settings</p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 ml-8">
          {/* General Settings */}
          {activeTab === 'General' && (
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
          )}

          {/* Members */}
          {activeTab === 'Members' && (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Members</h2>
                  <p className="mt-1 text-sm text-gray-500">Manage your team members</p>
                </div>
                <button
                  onClick={() => {/* Handle invite */}}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
                >
                  Invite Link
                </button>
              </div>

              <div className="mt-6">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0">
                        {member.avatar && (
                          <Image
                            src={member.avatar}
                            alt=""
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                      </div>
                      <div className="ml-4 truncate">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500 truncate">{member.email}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing & Usage */}
          {activeTab === 'Billing & Usage' && (
            <div>
              <div className="mb-12">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Billing</h2>
                    <p className="mt-1 text-sm text-gray-500">View your subscription details</p>
                  </div>
                  <button
                    onClick={() => {/* Handle subscription management */}}
                    className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
                  >
                    Manage Subscription
                  </button>
                </div>

                <dl className="space-y-6 text-sm">
                  <div>
                    <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">PLAN</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {billing.plan}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">TIER</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {billing.tier}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">CYCLE</dt>
                    <dd className="mt-1 text-gray-900">{billing.cycle}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Usage</h3>
                <p className="text-sm text-gray-500 mb-6">View your current usage and limits</p>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Daily Lighthouse Monitors</h4>
                    <p className="text-2xl font-semibold text-blue-600">
                      {billing.usage.dailyMonitors.current}
                      <span className="text-gray-500 font-normal">/{billing.usage.dailyMonitors.limit}</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Web Lighthouse Runs</h4>
                    <p className="text-2xl font-semibold text-blue-600">
                      {billing.usage.webRuns.current}
                      <span className="text-gray-500 font-normal">/{billing.usage.webRuns.limit}</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Members</h4>
                    <p className="text-2xl font-semibold text-blue-600">
                      {billing.usage.members.current}
                      <span className="text-gray-500 font-normal">/{billing.usage.members.limit}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
