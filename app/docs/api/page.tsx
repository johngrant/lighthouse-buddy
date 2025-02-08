'use client';

export default function ApiPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="flex-1">
        <div className="prose max-w-none">
          <h1 className="text-4xl font-semibold mb-6 text-gray-900">API Reference</h1>
          <p className="text-gray-600 mb-12">Complete reference documentation for the Lighthouse Metrics API.</p>

          <section id="authentication" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Authentication</h2>
            <p className="text-gray-600 mb-4">To authenticate with the API, you&apos;ll need to include your API key in the Authorization header of each request.</p>
            <pre className="bg-gray-50 p-4 rounded-lg">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </section>

          <section id="rate-limits" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Rate Limits</h2>
            <p className="text-gray-600 mb-4">API requests are limited to 100 requests per minute per API key. Rate limit information is included in the response headers:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>X-RateLimit-Limit: Maximum number of requests allowed per window</li>
              <li>X-RateLimit-Remaining: Number of requests remaining in the current window</li>
              <li>X-RateLimit-Reset: Time when the rate limit will reset</li>
            </ul>
          </section>

          <section id="endpoints" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Endpoints</h2>
            <p className="text-gray-600 mb-4">The Lighthouse Metrics API is organized around REST. Our API accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>
            
            <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Base URL</h3>
            <pre className="bg-gray-50 p-4 rounded-lg">
              <code>https://api.lighthouse-metrics.com/v1</code>
            </pre>
          </section>

          <section id="issues" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Issues</h2>
            <p className="text-gray-600 mb-4">Common API issues and troubleshooting steps:</p>
            
            <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Authentication Errors</h3>
            <p className="text-gray-600 mb-4">If you receive a 401 Unauthorized response, check that you&apos;re using the correct API key and that it&apos;s properly formatted in the Authorization header.</p>
            
            <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Rate Limit Exceeded</h3>
            <p className="text-gray-600 mb-4">If you&apos;re receiving a 429 Too Many Requests error, you&apos;ve exceeded your rate limit. Wait until your rate limit window resets before making additional requests.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
