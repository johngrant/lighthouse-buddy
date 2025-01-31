'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface SettingsSidebarProps {
  activeTab: string;
}

export default function SettingsSidebar({ activeTab }: SettingsSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { name: 'General', href: 'general' },
    { name: 'Members', href: 'members' },
    { name: 'Billing & Usage', href: 'billing' },
  ];

  return (
    <div className="w-48 flex-shrink-0">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={`${pathname.split('/settings')[0]}/settings/${tab.href}`}
            className={`block px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.name
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
