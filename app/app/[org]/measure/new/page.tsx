'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Region {
  code: string;
  name: string;
  flagCode: string;
}

interface Header {
  key: string;
  value: string;
}

const regions: Region[] = [
  { code: 'CA', name: 'Canada', flagCode: 'ca' },
  { code: 'US-C', name: 'US Central', flagCode: 'us' },
  { code: 'US-W', name: 'US West', flagCode: 'us' },
  { code: 'US-E', name: 'US East', flagCode: 'us' },
  { code: 'BR', name: 'Brazil', flagCode: 'br' },
  { code: 'FI', name: 'Finland', flagCode: 'fi' },
  { code: 'UK', name: 'United Kingdom', flagCode: 'gb' },
  { code: 'DE', name: 'Germany', flagCode: 'de' },
  { code: 'CH', name: 'Switzerland', flagCode: 'ch' },
  { code: 'ES', name: 'Spain', flagCode: 'es' },
  { code: 'FR', name: 'France', flagCode: 'fr' },
  { code: 'IL', name: 'Israel', flagCode: 'il' },
  { code: 'IN', name: 'India', flagCode: 'in' },
  { code: 'SG', name: 'Singapore', flagCode: 'sg' },
  { code: 'JP', name: 'Japan', flagCode: 'jp' },
  { code: 'AU', name: 'Australia', flagCode: 'au' },
];

export default function NewCheckPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [headers, setHeaders] = useState<Header[]>([]);
  const [version, setVersion] = useState('12.2.1');
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([
    { code: 'US-E', name: 'US East', flagCode: 'us' }
  ]);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [regionSearch, setRegionSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isRegionDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isRegionDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRegionDropdownOpen(false);
        setRegionSearch('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(regionSearch.toLowerCase()) ||
    region.code.toLowerCase().includes(regionSearch.toLowerCase())
  );

  const handleAddRegion = (region: Region) => {
    if (!selectedRegions.find(r => r.code === region.code)) {
      setSelectedRegions([...selectedRegions, region]);
    }
    setIsRegionDropdownOpen(false);
    setRegionSearch('');
  };

  const handleRemoveRegion = (code: string) => {
    setSelectedRegions(selectedRegions.filter(r => r.code !== code));
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">New Lighthouse Check</h1>
        <p className="mt-1 text-gray-500">Run Lighthouse on your site</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="url"
              id="url"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device
            </label>
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setDevice('mobile')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md border ${
                  device === 'mobile'
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setDevice('desktop')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                  device === 'desktop'
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lighthouse Version
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="12.2.1">12.2.1 (latest)</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Regions
          </label>
          <div className="mt-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedRegions.map((region) => (
                <div
                  key={region.code}
                  className="flex items-center space-x-1 bg-gray-200 text-gray-900 px-2 py-1 rounded text-sm"
                >
                  <div className="flex-shrink-0 bg-gray-100/50 drop-shadow-md">
                    <img
                      src={`https://flagcdn.com/w20/${region.flagCode}.png`}
                      alt={`Flag for ${region.name}`}
                      className="rounded-sm w-5 h-3 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-medium">{region.name}</span>
                  <XMarkIcon
                    className="h-4 w-4 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleRemoveRegion(region.code)}
                  />
                </div>
              ))}
            </div>
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => {
                  setIsRegionDropdownOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 0);
                }}
                className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {selectedRegions.length > 0 ? (
                  <span className="text-gray-900">
                    {selectedRegions.length} region{selectedRegions.length !== 1 ? 's' : ''} selected
                  </span>
                ) : (
                  <span className="text-gray-500">Select regions...</span>
                )}
              </div>
              {isRegionDropdownOpen && (
                <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                  <div className="relative border border-gray-200 rounded-md">
                    <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-md">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          ref={searchInputRef}
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 rounded-t-md text-gray-900 placeholder:text-gray-500"
                          placeholder="Search for regions..."
                          value={regionSearch}
                          onChange={(e) => setRegionSearch(e.target.value)}
                          onMouseDown={(e) => e.stopPropagation()}
                          autoComplete="off"
                          role="combobox"
                          aria-expanded="true"
                          aria-controls="regions-listbox"
                          aria-autocomplete="list"
                        />
                      </div>
                    </div>
                    <ul 
                      className="max-h-60 overflow-auto p-2 space-y-1"
                      role="listbox"
                      id="regions-listbox"
                    >
                      {filteredRegions.map((region) => (
                        <li
                          key={region.code}
                          className="flex cursor-pointer items-center px-3 py-2 rounded hover:bg-gray-100"
                          onClick={() => handleAddRegion(region)}
                          role="option"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="flex-shrink-0 bg-gray-100/50 drop-shadow-md">
                              <img
                                src={`https://flagcdn.com/w20/${region.flagCode}.png`}
                                alt={`Flag for ${region.name}`}
                                className="rounded-sm w-5 h-3 object-cover"
                                loading="lazy"
                              />
                            </div>
                            <span className="whitespace-nowrap text-sm text-gray-900 font-medium">
                              {region.name}
                            </span>
                          </div>
                        </li>
                      ))}
                      {filteredRegions.length === 0 && (
                        <li className="px-3 py-2 text-sm text-gray-700">
                          No regions found
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Headers
            </label>
            <button
              onClick={handleAddHeader}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Configure now
            </button>
          </div>
          <div className="space-y-2">
            {headers.map((header, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  placeholder="Authorization"
                  className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  placeholder="YourSecretAuthToken"
                  className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  onClick={() => handleRemoveHeader(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            {headers.length === 0 && (
              <button
                onClick={handleAddHeader}
                className="w-full py-2 px-3 text-sm text-gray-500 border border-gray-300 border-dashed rounded-md hover:border-gray-400 flex items-center justify-center space-x-1"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Header</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Link
            href={`/app/${org}/measure`}
            className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200 text-gray-900"
          >
            Back
          </Link>
          <button className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200">
            Create Check
          </button>
        </div>
      </div>
    </div>
  );
}
