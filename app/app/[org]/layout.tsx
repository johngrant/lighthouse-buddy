'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { use } from 'react';

const navigation = [
  { name: 'Monitors', href: 'monitors' },
  { name: 'Alerts', href: 'alerts' },
  { name: 'Measure', href: 'measure' },
  { name: 'API', href: 'api' },
  { name: 'Settings', href: 'settings/general' },
] as const;

export default function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ org: string }>;
}) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const { org } = use(params);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="sticky left-0 right-0 top-0 z-10 flex h-16 w-full bg-white border-b border-gray-200">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-4 text-sm">
          <div className="flex w-1/3 items-center">
            <Link href={`/app/${org}/monitors`} className="shrink-0 cursor-pointer">
              <Image
                src="/images/logo.svg"
                alt="Lighthouse"
                width={32}
                height={32}
                className="h-8"
              />
            </Link>
            <div className="flex w-full items-center space-x-1 pl-3">
              <div className="w-px border-r border-gray-200 py-3"></div>
              <div className="pl-2">
                <span className="text-gray-900 font-medium">{org.replace(/-/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex w-1/3 items-center justify-center space-x-8 font-medium text-gray-500">
            {navigation.map((item) => {
              const fullPath = `/app/${org}/${item.href}`;
              const isActive = pathname.startsWith(fullPath);
              return (
                <Link
                  key={item.name}
                  href={fullPath}
                  className={`${
                    isActive
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-700'
                  } -mb-px pb-4 cursor-pointer`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Navigation */}
          <div className="flex w-1/3 items-center justify-end space-x-4">
            <Link
              href="/docs"
              replace={true}
              className="text-gray-600 hover:text-gray-700 cursor-pointer"
            >
              Docs
            </Link>
            <button
              onClick={() => logout()}
              className="text-gray-600 hover:text-gray-700 cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </div>
    </div>
  );
}
