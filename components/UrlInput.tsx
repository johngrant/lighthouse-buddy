'use client';

import { useState } from 'react';

const UrlInput = () => {
  const [protocol, setProtocol] = useState('https://');
  const [url, setUrl] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the URL submission here
    console.log('Testing URL:', protocol + url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-shrink-0">
          <button
            type="button"
            className="h-12 px-4 flex items-center gap-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {protocol}
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => {
                  setProtocol('https://');
                  setIsDropdownOpen(false);
                }}
              >
                https://
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => {
                  setProtocol('http://');
                  setIsDropdownOpen(false);
                }}
              >
                http://
              </button>
            </div>
          )}
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="apple.com"
          className="flex-1 h-12 px-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          type="submit"
          className="h-12 px-6 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Start Test
        </button>
      </form>
    </div>
  );
};

export default UrlInput;
