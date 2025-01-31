import React from 'react';

export default function FeaturesPage() {
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
        <p className="text-gray-600 mb-4">To get started, you need to create a Slack Incoming Webhook. Slack alerts will send you a message into a Slack channel that you&apos;ve selected upon creation.</p>

        <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Conditions</h3>
        <p className="text-gray-600 mb-4">You can choose between three conditions for alerts:</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Degraded</h4>
        <p className="text-gray-600 mb-4">Degraded means that the metric is getting lower/worse compared to the current datapoint. This condition takes the current average into account to keep notifications to a minimum.</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Below</h4>
        <p className="text-gray-600 mb-4">Below means that the metric is below a certain value. Once the current datapoint is below the specified value, you will be notified. To minimize notifications, this condition takes the current average into account.</p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-gray-900">Above</h4>
        <p className="text-gray-600 mb-4">Above means that the metric is above a certain value. Once the current datapoint is above the specified value, you will be notified. To minimize notifications, this condition takes the current average into account.</p>
      </section>
    </div>
  );
}
