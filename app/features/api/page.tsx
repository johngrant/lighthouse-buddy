'use client';

import MarketingNav from '../../../components/MarketingNav';

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Lighthouse as a Service
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Interact with Lighthouse through a powerful API
              </p>
            </div>
          </div>
        </div>

        {/* API Example Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Fast Implementation
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Create reports, manage API tokens, and configure webhooks simply and easily through the UI, making onboarding fast and debugging simple.
              </p>
              <div className="mt-12 bg-gray-900 rounded-lg p-6">
                <pre className="text-sm text-gray-300">
{`POST /v1/lighthouse/check
{
  "url": "https://www.example.com",
  "region": "us-west1"
}`}
                </pre>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Full Access
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Access the full Lighthouse report and build your own custom dashboards, or use the data to enhance your internal tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Webhooks
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    View recent webhook deliveries when necessary. Don't worry if you miss any, all webhook events are retried automatically for 24 hours.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    API Logs
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Monitor your API usage and debug integration issues with detailed request logs and error messages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to integrate?</span>
              <span className="block text-gray-600">Start using our API today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-full shadow">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
