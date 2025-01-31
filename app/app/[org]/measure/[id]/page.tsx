'use client';

import { use, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface RunDetails {
  url: string;
  region: string;
  state: 'succeeded' | 'failed';
  device: string;
  version: string;
  requestTime: string;
}

export default function MeasureDetailsPage({
  params,
}: {
  params: Promise<{ org: string; id: string }>;
}) {
  const { org } = use(params);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // In a real app, this would be fetched from an API
  const runDetails: RunDetails = {
    url: 'https://scoretravel.ai',
    region: 'US East',
    state: 'succeeded',
    device: 'Desktop',
    version: '12.2.1',
    requestTime: 'about 20 hours ago',
  };

  useEffect(() => {
    fetch('/0194b4be-a4ea-745b-b7cb-518221223500.json')
      .then(response => response.json())
      .then(jsonData => {
        if (iframeRef.current) {
          const handleIframeLoad = () => {
            iframeRef.current?.contentWindow?.postMessage({
              jsonText: JSON.stringify(jsonData),
              type: 'lh-load'
            }, '*');
          };

          iframeRef.current.addEventListener('load', handleIframeLoad);
          return () => {
            iframeRef.current?.removeEventListener('load', handleIframeLoad);
          };
        }
      })
      .catch(error => console.error('Error loading Lighthouse report:', error));
  }, []);

  return (
    <div className="mx-auto mb-20 mt-14 w-full max-w-6xl flex-1">
      <div className="mb-8 w-full border-b pb-6">
        <div className="relative flex items-center justify-between pb-8">
          <div>
            <div className="absolute -mt-7">
              <Link
                href={`/app/${org}/measure`}
                className="flex items-center text-sm font-medium text-gray-500 duration-150 ease-in-out hover:text-gray-600"
              >
                <ArrowLeftIcon className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                Back to Check details
              </Link>
            </div>
            <h1 className="font-display text-gray-800 text-3xl font-bold truncate">
              Run Details
            </h1>
          </div>
        </div>
        <div className="flex w-full justify-between leading-7">
          <dl className="mt-2 grid w-full grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-[auto,90px,87px,50px,max-content,9rem]">
            <div className="overflow-hidden sm:col-span-1">
              <dt className="text-sm font-medium text-gray-800">URL</dt>
              <dd className="block w-full truncate text-sm text-gray-600">
                {runDetails.url}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-800">Region</dt>
              <dd className="ml-px text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 bg-gray-100/50 drop-shadow-md">
                    <span className="mr-1">🇺🇸</span>
                  </div>
                  <span className="whitespace-nowrap text-sm">{runDetails.region}</span>
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-800">State</dt>
              <dd className="text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="flex h-2 w-2 flex-shrink-0 rounded-full bg-green-400" />
                  <div>{runDetails.state}</div>
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-800">Device</dt>
              <dd className="text-sm text-gray-600">{runDetails.device}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-800">Version</dt>
              <dd className="text-sm text-gray-600">{runDetails.version}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-800">Request Time</dt>
              <dd className="text-sm text-gray-600">{runDetails.requestTime}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Lighthouse Report Viewer */}
      <div className="w-full">
        <iframe
          ref={iframeRef}
          src="https://googlechrome.github.io/lighthouse/viewer/"
          className="min-h-[1500px] w-full border-0"
          title="Lighthouse Report"
        />
      </div>
    </div>
  );
}
