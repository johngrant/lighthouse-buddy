import Link from 'next/link';

interface DocSection {
  name: string;
  href: string;
}

interface Sections {
  features: DocSection[];
  api: DocSection[];
  webhooks: DocSection[];
}

export const sections: Sections = {
  features: [
    { name: 'Measure', href: '/docs/features#features-measure' },
    { name: 'Monitors', href: '/docs/features#features-monitors' },
    { name: 'Alerts', href: '/docs/features#features-alerts' },
  ],
  api: [
    { name: 'Authentication', href: '/docs/api#api-authentication' },
    { name: 'Rate Limits', href: '/docs/api#api-rate-limits' },
    { name: 'Endpoints', href: '/docs/api#api-endpoints' },
    { name: 'Issues', href: '/docs/api#api-issues' },
  ],
  webhooks: [
    { name: 'Events', href: '/docs/webhooks#webhooks-events' },
    { name: 'HTTP Response', href: '/docs/webhooks#webhooks-http-response' },
    { name: 'Delivery Attempts and Retries', href: '/docs/webhooks#webhooks-delivery-attempts' },
  ],
};

export default function DocsSidebar() {
  return (
    <div className="w-64 flex-shrink-0 border-r border-gray-200">
      <nav className="sticky top-8 p-6 space-y-8">
        {(Object.keys(sections) as Array<keyof Sections>).map((section) => (
          <div key={section}>
            <h3 className="font-medium text-gray-900 mb-4">
              <Link href={`/docs/${section}`} className="text-gray-900 hover:text-blue-600">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </h3>
            <ul className="space-y-2">
              {sections[section].map((item: DocSection) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-blue-600">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
