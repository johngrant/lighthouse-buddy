'use client';

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Monitor Lighthouse Scores
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Performance monitoring for your website
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Feature 1: Periodic Checks */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Periodic Lighthouse Checks</h2>
              <p className="mt-4 text-lg text-gray-500">
                Daily or hourly Lighthouse checks from any location around the globe. Monitor your website's performance consistently and catch issues before they impact users.
              </p>
            </div>

            {/* Feature 2: Global Coverage */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Global Coverage</h2>
              <p className="mt-4 text-lg text-gray-500">
                Monitor your site performance across your customers' key markets. Run tests from 16 locations around the world to ensure consistent performance globally.
              </p>
            </div>

            {/* Feature 3: Performance Tracking */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Performance Tracking</h2>
              <p className="mt-4 text-lg text-gray-500">
                Track performance trends over time with detailed graphs and analytics. Identify patterns and optimize your site based on real data.
              </p>
            </div>

            {/* Feature 4: Notifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Smart Notifications</h2>
              <p className="mt-4 text-lg text-gray-500">
                Get notified when your performance scores change. Stay on top of your website's performance with email alerts and webhook notifications.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-gray-600">Start monitoring your site today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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
