'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import SettingsSidebar from '../components/SettingsSidebar';

interface BillingInfo {
  plan: string;
  state: string;
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

export default function BillingSettingsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const [billing] = useState<BillingInfo>({
    plan: 'Basic',
    state: 'Trial',
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

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your team settings</p>
      </div>

      <div className="flex">
        <SettingsSidebar activeTab="Billing & Usage" />

        <div className="flex-1 min-w-0 ml-8">
          <div className="mb-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Billing</h2>
                <p className="mt-1 text-sm text-gray-500">View your subscription details</p>
              </div>
              <Link
                href={`/app/${org}/settings/billing/subscription`}
                className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
              >
                Manage Subscription
              </Link>
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
                <dt className="text-gray-500 uppercase tracking-wider text-xs font-medium">STATE</dt>
                <dd className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {billing.state}
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
      </div>
    </div>
  );
}
