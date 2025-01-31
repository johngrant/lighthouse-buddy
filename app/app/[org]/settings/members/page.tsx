'use client';

import { useState } from 'react';
import Image from 'next/image';
import SettingsSidebar from '../components/SettingsSidebar';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Member';
  avatar?: string;
}

export default function MembersSettingsPage({
  params,
}: {
  params: { org: string };
}) {
  const [members] = useState<Member[]>([
    {
      id: '1',
      name: 'jmquigley78',
      email: 'jmquigley78@gmail.com',
      role: 'Owner',
      avatar: '/path/to/avatar.jpg',
    },
  ]);

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your team settings</p>
      </div>

      <div className="flex">
        <SettingsSidebar activeTab="Members" />

        <div className="flex-1 min-w-0 ml-8">
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
        </div>
      </div>
    </div>
  );
}
