import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-semibold mb-6 text-gray-900">Features</h1>
      <p className="text-gray-600 mb-12">Learn more about specific features on Lighthouse Metrics.</p>

      <section id="features-measure" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Measure</h2>
        <p className="text-gray-600 mb-4">Create Checks to run Lighthouse against your site. Each Check can be run in multiple regions.</p>

        <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Running a Check</h3>
        <p className="text-gray-600 mb-4">To run a check, you need to enter the URL you want to test. You can also choose to run the test in a specific region.</p>
        <p className="text-gray-600 mb-4">Selected regions are counted in runs, as each region performs a separate Lighthouse run.</p>
        <p className="text-gray-600 mb-4"><strong>Example:</strong> A check with three regions will be counted as three runs towards your monthly usage limit.</p>
      </section>

      <section id="features-monitors" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Monitors</h2>
        <p className="text-gray-600 mb-4">Monitors allow you to run Lighthouse against your site on a defined schedule. You can choose between the daily and hourly schedule.</p>

        <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Accessing the Lighthouse Report</h3>
        <p className="text-gray-600 mb-4">Once the monitor has enough data to display, you can hover to see a short summary via the tooltip. Clicking the chart will open the generated Lighthouse report.</p>
      </section>

      <section id="features-alerts" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Alerts</h2>
        <p className="text-gray-600 mb-4">Alerts allow you to be notified when a metric is outside of a certain range. You can set up alerts for specific metrics, and add related Lighthouse Monitors you want to be notified about.</p>

        <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Types of Alerts</h3>
        <p className="text-gray-600 mb-4">You can choose between two types of alerts:</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Email</h4>
        <p className="text-gray-600 mb-4">Email alerts will send you an email when the alert is triggered. You can choose any email address you want to receive the alert, this is not limited to the email address you used to sign up.</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Slack</h4>
        <p className="text-gray-600 mb-4">To get started, you need to create a <Link href="#" className="text-blue-600 hover:text-blue-500">Slack Incoming Webhook</Link>. Slack alerts will send you a message into a Slack channel that you&apos;ve selected upon creation.</p>

        <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Conditions</h3>
        <p className="text-gray-600 mb-4">You can choose between three conditions for alerts:</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Degraded</h4>
        <p className="text-gray-600 mb-4">Degraded means that the metric is getting lower/worse compared to the current datapoint. This condition takes the current average into account to keep notifications to a minimum.</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Below</h4>
        <p className="text-gray-600 mb-4">Below means that the metric is below a certain value. Once the current datapoint is below the specified value, you will be notified. To minimize notifications, this condition takes the current average into account.</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Above</h4>
        <p className="text-gray-600 mb-4">Above means that the metric is above a certain value. Once the current datapoint is above the specified value, you will be notified. To minimize notifications, this condition takes the current average into account.</p>
      </section>

      {/* API Section */}
      <section id="api-authentication" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Authentication</h2>
        <p className="text-gray-600 mb-4">To authenticate with the API, you&apos;ll need to include your API key in the Authorization header of each request.</p>
      </section>

      <section id="api-rate-limits" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Rate Limits</h2>
        <p className="text-gray-600 mb-4">API requests are limited to 100 requests per minute per API key.</p>
      </section>

      <section id="api-endpoints" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Endpoints</h2>
        <p className="text-gray-600 mb-4">Details about available API endpoints and their usage.</p>
      </section>

      <section id="api-issues" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Issues</h2>
        <p className="text-gray-600 mb-4">Common API issues and how to resolve them.</p>
      </section>

      {/* Webhooks Section */}
      <section id="webhooks-events" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Events</h2>
        <p className="text-gray-600 mb-4">List of available webhook events and their payloads.</p>
      </section>

      <section id="webhooks-http-response" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">HTTP Response</h2>
        <p className="text-gray-600 mb-4">Expected response codes and handling webhook responses.</p>
      </section>

      <section id="webhooks-delivery-attempts" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Delivery Attempts and Retries</h2>
        <p className="text-gray-600 mb-4">Information about webhook delivery attempts and retry policies.</p>
      </section>
    </div>
  );
}
