'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const historyOptions = [
  { id: '24h', label: 'past 24 hours' },
  { id: '7d', label: 'past 7 days' },
  { id: '30d', label: 'past 30 days' },
  { id: '3m', label: 'past 3 months' },
  { id: '6m', label: 'past 6 months' },
  { id: '1y', label: 'past year' },
];

// Sample performance data for each metric
const metricData = {
  'First Contentful Paint': [
    { date: '2024-01-24', value: 1.2 },
    { date: '2024-01-25', value: 1.1 },
    { date: '2024-01-26', value: 1.4 },
    { date: '2024-01-27', value: 1.0 },
    { date: '2024-01-28', value: 1.3 },
    { date: '2024-01-29', value: 1.2 },
    { date: '2024-01-30', value: 1.1 },
  ],
  'Speed Index': [
    { date: '2024-01-24', value: 2.8 },
    { date: '2024-01-25', value: 2.5 },
    { date: '2024-01-26', value: 2.9 },
    { date: '2024-01-27', value: 2.4 },
    { date: '2024-01-28', value: 2.6 },
    { date: '2024-01-29', value: 2.3 },
    { date: '2024-01-30', value: 2.5 },
  ],
  'Largest Contentful Paint': [
    { date: '2024-01-24', value: 2.1 },
    { date: '2024-01-25', value: 2.3 },
    { date: '2024-01-26', value: 2.0 },
    { date: '2024-01-27', value: 1.9 },
    { date: '2024-01-28', value: 2.2 },
    { date: '2024-01-29', value: 2.0 },
    { date: '2024-01-30', value: 1.8 },
  ],
  'Time to Interactive': [
    { date: '2024-01-24', value: 3.5 },
    { date: '2024-01-25', value: 3.2 },
    { date: '2024-01-26', value: 3.8 },
    { date: '2024-01-27', value: 3.3 },
    { date: '2024-01-28', value: 3.4 },
    { date: '2024-01-29', value: 3.1 },
    { date: '2024-01-30', value: 3.2 },
  ],
  'Total Blocking Time': [
    { date: '2024-01-24', value: 150 },
    { date: '2024-01-25', value: 120 },
    { date: '2024-01-26', value: 180 },
    { date: '2024-01-27', value: 130 },
    { date: '2024-01-28', value: 140 },
    { date: '2024-01-29', value: 110 },
    { date: '2024-01-30', value: 125 },
  ],
  'Cumulative Layout Shift': [
    { date: '2024-01-24', value: 0.12 },
    { date: '2024-01-25', value: 0.10 },
    { date: '2024-01-26', value: 0.15 },
    { date: '2024-01-27', value: 0.09 },
    { date: '2024-01-28', value: 0.11 },
    { date: '2024-01-29', value: 0.08 },
    { date: '2024-01-30', value: 0.10 },
  ],
};

const metricUnits = {
  'First Contentful Paint': 's',
  'Speed Index': 's',
  'Largest Contentful Paint': 's',
  'Time to Interactive': 's',
  'Total Blocking Time': 'ms',
  'Cumulative Layout Shift': '',
};

interface MonitorDetailsProps {
  params: Promise<{ org: string; id: string }>;
}

export default function MonitorDetailsPage({ params }: MonitorDetailsProps) {
  const { org, id } = use(params);
  const monitors = JSON.parse(localStorage.getItem('monitors') || '[]');
  const monitor = monitors.find((m: any) => m.id === id);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(historyOptions[1]);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Sample performance data - in a real app, this would come from your backend
  const performanceData = [
    { date: '2024-01-24', score: 85 },
    { date: '2024-01-25', score: 88 },
    { date: '2024-01-26', score: 82 },
    { date: '2024-01-27', score: 90 },
    { date: '2024-01-28', score: 87 },
    { date: '2024-01-29', score: 92 },
    { date: '2024-01-30', score: 89 },
  ];

  if (!monitor) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Monitor not found</h1>
                <p className="mt-1 text-base text-gray-500">Please check the URL and try again.</p>
              </div>
              <div className="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href={`/app/${org}/monitors`}
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Go back to monitors
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/app/${org}/monitors`}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Monitors
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">{monitor.name}</h1>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-sm font-medium text-gray-500">URL</div>
                <div className="mt-1 text-sm text-gray-900">{monitor.url}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Region</div>
                <div className="mt-1 text-sm text-gray-900">
                  <span className="inline-flex items-center">
                    <img
                      src={`https://flagcdn.com/w20/${monitor.region.toLowerCase().slice(0, 2)}.png`}
                      alt=""
                      className="mr-1 h-3 w-4"
                    />
                    {monitor.region}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Schedule</div>
                <div className="mt-1 text-sm text-gray-900">{monitor.schedule}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Device</div>
                <div className="mt-1 text-sm text-gray-900">{monitor.device}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Version</div>
                <div className="mt-1 text-sm text-gray-900">12.2.1</div>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              >
                {selectedHistory.label}
                <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
              </button>

              {isHistoryOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  {historyOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        option.id === selectedHistory.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedHistory(option);
                        setIsHistoryOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Performance</h3>
              <p className="mt-1 text-sm text-gray-500">Performance scores over time</p>
              <div className="mt-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value) => [`${value}`, 'Score']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ fill: '#2563eb' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
                <p className="mt-1 text-sm text-gray-500">Click on a metric to view its performance over time</p>
                <div className="mt-4 space-y-4">
                  {Object.keys(metricData).map((metric) => (
                    <div 
                      key={metric} 
                      className="space-y-2 cursor-pointer"
                      onClick={() => setSelectedMetric(selectedMetric === metric ? null : metric)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">{metric}</div>
                        <div className="text-sm text-gray-500">
                          {metricData[metric][metricData[metric].length - 1].value}
                          {metricUnits[metric]}
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200">
                        <div 
                          className={`h-2 rounded-full transition-all duration-200 ${
                            selectedMetric === metric ? 'bg-blue-600' : 'bg-blue-400'
                          }`} 
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                      {selectedMetric === metric && (
                        <div className="mt-4 h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={metricData[metric]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="date" 
                                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                              />
                              <YAxis 
                                domain={['auto', 'auto']}
                                tickFormatter={(value) => `${value}${metricUnits[metric]}`}
                              />
                              <Tooltip
                                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                                formatter={(value) => [`${value}${metricUnits[metric]}`, metric]}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#2563eb" 
                                strokeWidth={2}
                                dot={{ fill: '#2563eb' }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Lighthouse Scores</h3>
                <p className="mt-1 text-sm text-gray-500">Impact Accessibility, Best Practices and SEO scores</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { name: 'Accessibility', score: 95 },
                    { name: 'Best Practices', score: 87 },
                    { name: 'SEO', score: 98 },
                  ].map((score) => (
                    <div key={score.name} className="text-center">
                      <div className="text-2xl font-semibold text-gray-900">{score.score}</div>
                      <div className="mt-1 text-sm text-gray-500">{score.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
