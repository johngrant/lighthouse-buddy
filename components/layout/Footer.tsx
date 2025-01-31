'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Lighthouse"
                width={32}
                height={32}
              />
              <span className="text-lg font-medium text-gray-600">Lighthouse</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Run Lighthouse from multiple locations to get valuable insights for your site across the world
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Product</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/measure" className="text-sm text-gray-600 hover:text-gray-900">
                  Measure
                </Link>
              </li>
              <li>
                <Link href="/monitoring" className="text-sm text-gray-600 hover:text-gray-900">
                  Monitoring
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-gray-600 hover:text-gray-900">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a 
                  href="mailto:support@lighthouse-metrics.com" 
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Support
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/lighthouse_hq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Lighthouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
