'use client';

export default function WebhooksPage() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-semibold mb-6 text-gray-900">Webhooks</h1>
      <p className="text-gray-600 mb-12">Learn how to integrate with Lighthouse Metrics using webhooks.</p>

      <section id="webhooks-events" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Events</h2>
        <p className="text-gray-600 mb-4">Lighthouse Metrics can send webhook notifications when various events occur in your account. Available events include:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>monitor.created - When a new monitor is created</li>
          <li>monitor.updated - When a monitor&apos;s configuration is changed</li>
          <li>monitor.deleted - When a monitor is deleted</li>
          <li>check.completed - When a Lighthouse check completes</li>
          <li>alert.triggered - When an alert condition is met</li>
        </ul>
      </section>

      <section id="webhooks-http-response" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">HTTP Response</h2>
        <p className="text-gray-600 mb-4">Your endpoint should return a 2xx response code to acknowledge receipt of the webhook. Any other response code will be considered a failed delivery.</p>
        
        <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900">Response Codes</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>200: Success - Webhook received and processed</li>
          <li>201: Created - Webhook received and new resource created</li>
          <li>202: Accepted - Webhook received but processing is delayed</li>
          <li>4xx: Client Error - Invalid webhook payload or authentication</li>
          <li>5xx: Server Error - Your endpoint is experiencing issues</li>
        </ul>
      </section>

      <section id="webhooks-delivery-attempts" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Delivery Attempts and Retries</h2>
        <p className="text-gray-600 mb-4">If a webhook delivery fails, the system will attempt to retry the delivery. Check the logs for more details on delivery attempts.</p>
      </section>
    </div>
  );
}
