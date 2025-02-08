'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewMonitorPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const router = useRouter();
  const [schedule, setSchedule] = useState<'daily' | 'hourly'>('daily');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [headers, setHeaders] = useState<Array<{ key: string; value: string }>>([]);
  const [protocol, setProtocol] = useState('https://');
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const [region, setRegion] = useState('us-east4');
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  const protocolRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    url: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    url: '',
  });
  const [isCreating, setIsCreating] = useState(false);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return 'This field is required';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      url: validateField('url', formData.url),
    };
    setErrors(newErrors);
    setTouched({ name: true, url: true });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsCreating(true);

    // Create the monitor object
    const newMonitor = {
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      name: formData.name,
      url: protocol + formData.url,
      region,
      createdAt: new Date().toISOString(),
      status: 'active',
      lastRun: null,
      schedule,
      device,
    };

    // Get existing monitors from localStorage or initialize empty array
    const existingMonitors = JSON.parse(localStorage.getItem('monitors') || '[]');
    
    // Add new monitor
    const updatedMonitors = [...existingMonitors, newMonitor];
    
    // Save to localStorage
    localStorage.setItem('monitors', JSON.stringify(updatedMonitors));

    // Redirect to monitors page
    router.push(`/app/${org}/monitors`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (protocolRef.current && !protocolRef.current.contains(event.target as Node)) {
        setIsProtocolOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const regions = [
    { name: 'Canada', value: 'northamerica-northeast2', flag: '🇨🇦' },
    { name: 'US East', value: 'us-east4', flag: '🇺🇸' },
    { name: 'US Central', value: 'us-central1', flag: '🇺🇸' },
    { name: 'US West', value: 'us-west1', flag: '🇺🇸' },
    { name: 'Brazil', value: 'southamerica-east1', flag: '🇧🇷' },
    { name: 'Finland', value: 'europe-north1', flag: '🇫🇮' },
    { name: 'United Kingdom', value: 'europe-west2', flag: '🇬🇧' },
    { name: 'Germany', value: 'europe-west3', flag: '🇩🇪' },
    { name: 'Switzerland', value: 'europe-west6', flag: '🇨🇭' },
    { name: 'Spain', value: 'europe-southwest1', flag: '🇪🇸' },
    { name: 'France', value: 'europe-west9', flag: '🇫🇷' },
    { name: 'Israel', value: 'me-west1', flag: '🇮🇱' },
    { name: 'India', value: 'asia-south1', flag: '🇮🇳' },
    { name: 'Singapore', value: 'asia-southeast1', flag: '🇸🇬' },
    { name: 'Japan', value: 'asia-northeast1', flag: '🇯🇵' },
    { name: 'Australia', value: 'australia-southeast1', flag: '🇦🇺' },
  ];

  return (
    <div className="mx-auto mb-20 w-full max-w-3xl flex-1">
      <div className="pb-8">
        <h1 className="text-4xl font-bold text-gray-900">New Lighthouse Monitor</h1>
        <p className="mt-1 text-gray-500">Run Lighthouse periodically for your site</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Lighthouse Monitor"
              className={`block w-full rounded-md border ${
                errors.name && touched.name ? 'border-red-300' : 'border-gray-200'
              } px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 ${
                errors.name && touched.name
                  ? 'focus:border-red-500 focus:ring-red-500'
                  : 'focus:border-blue-500 focus:ring-blue-500'
              } focus:outline-none focus:ring-1`}
              aria-invalid={errors.name && touched.name ? 'true' : 'false'}
              aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600" id="name-error">
                {errors.name}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <div className="mt-1 flex rounded-md">
            <div className="relative" ref={protocolRef}>
              <button
                type="button"
                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-200 bg-white px-3 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                onClick={() => setIsProtocolOpen(!isProtocolOpen)}
              >
                {protocol}
                <svg className="ml-2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isProtocolOpen && (
                <div className="absolute left-0 z-10 mt-1 w-full overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      type="button"
                      className="flex w-full items-center px-3 py-2 text-sm text-gray-900 hover:bg-gray-50"
                      onClick={() => {
                        setProtocol('http://');
                        setIsProtocolOpen(false);
                      }}
                    >
                      http://
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center px-3 py-2 text-sm text-gray-900 hover:bg-gray-50"
                      onClick={() => {
                        setProtocol('https://');
                        setIsProtocolOpen(false);
                      }}
                    >
                      https://
                      <svg className="ml-2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <input
              type="text"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="example.com"
              className={`block w-full rounded-r-md border ${
                errors.url && touched.url ? 'border-red-300' : 'border-gray-200'
              } px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 ${
                errors.url && touched.url
                  ? 'focus:border-red-500 focus:ring-red-500'
                  : 'focus:border-blue-500 focus:ring-blue-500'
              } focus:outline-none focus:ring-1`}
              aria-invalid={errors.url && touched.url ? 'true' : 'false'}
              aria-describedby={errors.url && touched.url ? 'url-error' : undefined}
            />
          </div>
          {errors.url && touched.url && (
            <p className="mt-1 text-sm text-red-600" id="url-error">
              {errors.url}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <div className="relative mt-1" ref={regionRef}>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsRegionOpen(!isRegionOpen)}
            >
              <div className="flex items-center">
                <span className="mr-2 text-base">{regions.find(r => r.value === region)?.flag}</span>
                <span className="text-gray-900">{regions.find(r => r.value === region)?.name}</span>
              </div>
              <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isRegionOpen && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {regions.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    className={`flex w-full items-center px-3 py-2 text-sm ${
                      region === r.value ? 'bg-gray-50 text-gray-900' : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setRegion(r.value);
                      setIsRegionOpen(false);
                    }}
                  >
                    <span className="mr-2 text-base">{r.flag}</span>
                    <span className="flex-1 text-left">{r.name}</span>
                    {region === r.value && (
                      <svg className="ml-2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-12">
          <div>
            <label className="block text-sm font-medium text-gray-700">Schedule</label>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => setSchedule('daily')}
                className={`rounded-md border px-4 py-2 text-sm ${
                  schedule === 'daily'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setSchedule('hourly')}
                className={`rounded-md border px-4 py-2 text-sm ${
                  schedule === 'hourly'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                Hourly
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Device</label>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`rounded-md border px-4 py-2 text-sm ${
                  device === 'mobile'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`rounded-md border px-4 py-2 text-sm ${
                  device === 'desktop'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Headers</label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              No-Referrer
            </button>
          </div>
          <div className="mt-2 space-y-3">
            {headers.map((header, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => {
                    const newHeaders = [...headers];
                    newHeaders[index].key = e.target.value;
                    setHeaders(newHeaders);
                  }}
                  placeholder="KEY"
                  className="w-1/3 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => {
                    const newHeaders = [...headers];
                    newHeaders[index].value = e.target.value;
                    setHeaders(newHeaders);
                  }}
                  placeholder="VALUE"
                  className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setHeaders([...headers, { key: '', value: '' }])}
              className="flex w-full items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Add Header
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link
            href={`/app/${org}/monitors`}
            className="rounded-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-50"
          >
            Back
          </Link>
          <button
            type="submit"
            disabled={isCreating}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? 'Creating...' : 'Create Monitor'}
          </button>
        </div>
      </form>
    </div>
  );
}
