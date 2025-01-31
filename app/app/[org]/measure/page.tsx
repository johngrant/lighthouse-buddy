'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface MeasureResult {
  url: string;
  device: string;
  version: string;
  result: number;
  requestTime: string;
}

export default function MeasurePage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const router = useRouter();
  const [results] = useState<MeasureResult[]>([
    {
      url: 'https://scooterrental.ai',
      device: 'desktop',
      version: '12.2.1',
      result: 98,
      requestTime: '1 day ago',
    },
    {
      url: 'https://www.scooterrental.ai',
      device: 'mobile',
      version: '12.2.1',
      result: 95,
      requestTime: '1 day ago',
    },
    {
      url: 'https://www.scooterrental.ai',
      device: 'mobile',
      version: '12.2.1',
      result: 96,
      requestTime: '1 day ago',
    },
  ]);

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Measure</h1>
          <p className="mt-1 text-gray-500">Run Lighthouse checks on your site</p>
        </div>
        <Link
          href={`/app/${org}/measure/new`}
          className="inline-flex items-center gap-x-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          New Check
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3">DEVICE</th>
              <th className="px-6 py-3">VERSION</th>
              <th className="px-6 py-3">RESULT</th>
              <th className="px-6 py-3">REQUEST TIME</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr
                key={index}
                onClick={() => router.push(`/app/${org}/measure/${index + 1}`)}
                className="text-sm text-gray-900 hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    {result.url}
                  </div>
                </td>
                <td className="px-6 py-4">{result.device}</td>
                <td className="px-6 py-4">{result.version}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{result.requestTime}</td>
                <td className="px-6 py-4">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
