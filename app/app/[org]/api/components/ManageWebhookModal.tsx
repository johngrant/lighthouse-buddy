'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ManageWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (webhookData: { enabled: boolean; url: string; events: string[] }) => void;
  initialData?: {
    enabled: boolean;
    url: string;
    events: string[];
  };
}

const availableEvents = [
  'monitor.created',
  'monitor.updated',
  'monitor.deleted',
  'check.completed',
  'alert.triggered',
];

export default function ManageWebhookModal({ 
  isOpen, 
  onClose, 
  onSave,
  initialData = { enabled: false, url: '', events: [] },
}: ManageWebhookModalProps) {
  const [enabled, setEnabled] = useState(initialData.enabled);
  const [url, setUrl] = useState(initialData.url);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(initialData.events);
  const [error, setError] = useState('');

  useEffect(() => {
    setEnabled(initialData.enabled);
    setUrl(initialData.url);
    setSelectedEvents(initialData.events);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enabled && !url.trim()) {
      setError('Webhook URL is required when enabled');
      return;
    }

    if (enabled && !url.startsWith('https://')) {
      setError('Webhook URL must start with https://');
      return;
    }

    if (enabled && selectedEvents.length === 0) {
      setError('Select at least one event to monitor');
      return;
    }

    onSave({
      enabled,
      url: url.trim(),
      events: selectedEvents,
    });
    onClose();
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents(current =>
      current.includes(event)
        ? current.filter(e => e !== event)
        : [...current, event]
    );
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Manage Webhook
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Configure your webhook to receive real-time updates about your monitors and checks.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-5">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Enable Webhook</label>
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                              enabled ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">Enable webhook</span>
                            <span
                              className={`${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </div>

                        {enabled && (
                          <>
                            <div>
                              <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700">
                                Webhook URL
                              </label>
                              <input
                                type="url"
                                name="webhook-url"
                                id="webhook-url"
                                value={url}
                                onChange={(e) => {
                                  setUrl(e.target.value);
                                  setError('');
                                }}
                                className={`mt-1 block w-full rounded-md border ${
                                  error ? 'border-red-300' : 'border-gray-300'
                                } px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="https://api.example.com/webhook"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Events to Monitor
                              </label>
                              <div className="space-y-2">
                                {availableEvents.map((event) => (
                                  <label
                                    key={event}
                                    className="flex items-center space-x-3 text-sm"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedEvents.includes(event)}
                                      onChange={() => toggleEvent(event)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-900">{event}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {error && <p className="text-sm text-red-600">{error}</p>}
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
