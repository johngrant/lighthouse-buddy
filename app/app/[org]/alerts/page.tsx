'use client';

import { use } from 'react';
import Link from 'next/link';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Alert {
  name: string;
  description: string;
  type: 'email';
  monitors: string[];
  id: string;
}

const dummyAlerts: Alert[] = [
  {
    name: 'Score Travel Problem',
    description: 'Performance Score is degraded',
    type: 'email',
    monitors: ['Score Travel AI'],
    id: '1',
  },
];

export default function AlertsPage({ 
  params 
}: { 
  params: Promise<{ org: string }> 
}) {
  const { org } = use(params);

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Alerts</h1>
          <p className="mt-1 text-gray-500">Get notified when Lighthouse scores change</p>
        </div>
        <Link
          href={`/app/${org}/alerts/new`}
          className="inline-flex items-center gap-x-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          New Alert
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monitors
              </th>
              <th scope="col" className="relative px-6 py-4 w-10">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyAlerts.map((alert) => (
              <tr key={alert.name} className="group hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">{alert.name}</span>
                    <span className="text-sm text-gray-500">{alert.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-500">
                    <EnvelopeIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span className="text-sm">Email</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {alert.monitors.map((monitor) => (
                    <span
                      key={monitor}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {monitor}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="rounded-full p-2 hover:bg-gray-100">
                      <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg focus:outline-none py-2">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/app/${org}/alerts/${alert.id}`}
                                className={`${
                                  active ? 'bg-gray-50' : ''
                                } text-gray-700 group flex w-full items-center px-4 py-2 text-sm`}
                              >
                                Update
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-gray-50' : ''
                                } text-gray-700 group flex w-full items-center px-4 py-2 text-sm`}
                              >
                                Remove
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
