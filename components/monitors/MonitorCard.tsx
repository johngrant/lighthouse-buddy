'use client';

import { Monitor } from '@/types/monitor';
import Image from 'next/image';
import Link from 'next/link';

interface MonitorCardProps {
  name: string;
  url: string;
  region: string;
  status: 'loading' | 'active' | 'error';
  org: string;
}

export default function MonitorCard({ name, url, region, status, org }: MonitorCardProps) {
  return (
    <Link 
      href={`/app/${org}/monitors/${encodeURIComponent(name)}`}
      className="block rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
    >
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-500">{url}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/us-flag.svg"
              alt="US Flag"
              width={20}
              height={15}
              className="rounded-sm"
            />
            <span className="text-gray-600">{region}</span>
          </div>
          <div className="text-gray-500">
            {status === 'loading' && 'Waiting for data'}
          </div>
        </div>
      </div>
    </Link>
  );
}
