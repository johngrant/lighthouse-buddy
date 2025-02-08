'use client';

import { useState } from 'react';
import NewTokenModal from './components/NewTokenModal';
import ManageWebhookModal from './components/ManageWebhookModal';

interface Token {
  name: string;
  token: string;
  lastUsed: string | null;
  created: string;
}

interface LogEntry {
  url: string;
  device: string;
  version: string;
  result: string;
  requestTime: string;
}

interface WebhookDelivery {
  id: string;
  event: string;
  url: string;
  status: string;
  timestamp: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ApiPage({}: {
  params: Promise<{ org: string }>;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [logs] = useState<LogEntry[]>([]);
  const [webhook, setWebhook] = useState({
    status: 'disabled',
    events: 'N/A',
    url: 'N/A',
    deliveries: [] as WebhookDelivery[],
  });
  const [showNewTokenModal, setShowNewTokenModal] = useState(false);
  const [showManageWebhookModal, setShowManageWebhookModal] = useState(false);

  const handleCreateToken = (name: string) => {
    const newToken = {
      name,
      token: `lh_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
      lastUsed: null,
      created: new Date().toISOString(),
    };
    setTokens(prev => [...prev, newToken]);
  };

  const handleSaveWebhook = (webhookData: { enabled: boolean; url: string; events: string[] }) => {
    setWebhook(prev => ({
      ...prev,
      status: webhookData.enabled ? 'active' : 'disabled',
      url: webhookData.enabled ? webhookData.url : 'N/A',
      events: webhookData.enabled ? webhookData.events.join(', ') : 'N/A',
    }));
  };

  const tabNames = ['Tokens', 'Log', 'Webhook'];

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">API</h1>
        <p className="mt-1 text-gray-500">Run Lighthouse via API</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabNames.map((name, index) => (
              <button
                key={name}
                onClick={() => setSelectedTab(index)}
                className={classNames(
                  selectedTab === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Tokens</h2>
                  <p className="mt-1 text-sm text-gray-500">Manage your API tokens</p>
                </div>
                <button
                  onClick={() => setShowNewTokenModal(true)}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
                >
                  New Token
                </button>
              </div>

              {tokens.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">You have no tokens</p>
                  <p className="text-sm text-gray-500">Create your first token to interact with the API</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Name</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Token</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Last Used</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <tr key={token.token}>
                        <td className="py-4">{token.name}</td>
                        <td className="py-4 font-mono text-sm">{token.token}</td>
                        <td className="py-4">{token.lastUsed || 'Never'}</td>
                        <td className="py-4">{new Date(token.created).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {selectedTab === 1 && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-900">Log</h2>
                <p className="mt-1 text-sm text-gray-500">Inspect and view the most recent Lighthouse checks created through the API</p>
              </div>

              {logs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">No entries to display</p>
                  <p className="text-sm text-gray-500">Get started by making your first API request</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th scope="col" className="whitespace-nowrap py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          URL
                        </th>
                        <th scope="col" className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          DEVICE
                        </th>
                        <th scope="col" className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          VERSION
                        </th>
                        <th scope="col" className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          RESULT
                        </th>
                        <th scope="col" className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          REQUEST TIME
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {logs.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                            {log.url}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {log.device}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {log.version}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {log.result}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {log.requestTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {selectedTab === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Webhook</h2>
                  <p className="mt-1 text-sm text-gray-500">Get notified about updates and events</p>
                </div>
                <button
                  onClick={() => setShowManageWebhookModal(true)}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
                >
                  Manage Webhook
                </button>
              </div>

              <div className="mb-8 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <div className="mt-1 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        webhook.status === 'disabled' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {webhook.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Events</div>
                    <div className="mt-1 text-sm text-gray-900">{webhook.events}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">URL</div>
                    <div className="mt-1 text-sm text-gray-900">{webhook.url}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Webhook Deliveries</h3>
                <p className="mt-1 mb-4 text-sm text-gray-500">Review recently triggered webhook events</p>

                {webhook.deliveries.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">No webhook deliveries yet</p>
                    <p className="text-sm text-gray-500">Get started by setting up a webhook</p>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Event</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">URL</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Status</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webhook.deliveries.map((delivery) => (
                        <tr key={delivery.id}>
                          <td className="py-4">{delivery.event}</td>
                          <td className="py-4">{delivery.url}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              delivery.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {delivery.status}
                            </span>
                          </td>
                          <td className="py-4">{delivery.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <NewTokenModal
        isOpen={showNewTokenModal}
        onClose={() => setShowNewTokenModal(false)}
        onCreateToken={handleCreateToken}
      />

      <ManageWebhookModal
        isOpen={showManageWebhookModal}
        onClose={() => setShowManageWebhookModal(false)}
        onSave={handleSaveWebhook}
        initialData={{
          enabled: webhook.status === 'active',
          url: webhook.url === 'N/A' ? '' : webhook.url,
          events: webhook.events === 'N/A' ? [] : webhook.events.split(', '),
        }}
      />
    </div>
  );
}
