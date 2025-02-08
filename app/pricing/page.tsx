'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Indie',
      price: isAnnual ? 16 : 20,
      description: 'Perfect to get started',
      features: [
        '5 daily monitors',
        '100 on-demand tests',
        'Basic support',
      ],
    },
    {
      name: 'Startup',
      price: isAnnual ? 31 : 39,
      description: 'Ideal for small teams and agencies',
      features: [
        '25 daily monitors',
        'Email notifications',
        'Faster support',
      ],
    },
    {
      name: 'Pro',
      price: isAnnual ? 79 : 99,
      description: 'Ideal for teams with many pages',
      features: [
        '50 daily monitors',
        'Unlimited on-demand tests',
        'Custom headers',
        'Team members',
        'API Access',
        'Priority support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <main>
        {/* Header */}
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pricing for teams of all sizes
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Get simple & predictable pricing that scales with your website from anywhere in the world
            </p>
          </div>

          {/* Toggle Annual/Monthly */}
          <div className="mt-12 flex justify-center items-center gap-3">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAnnual ? 'bg-gray-900' : 'bg-gray-200'
              }`}
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annually <span className="text-green-500 font-medium">(-20%)</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">{plan.name}</h2>
                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                    <span className="text-base font-medium text-gray-500">/month</span>
                  </p>
                  <a
                    href="/signup"
                    className="mt-8 block w-full rounded-full border border-gray-800 bg-gray-900 py-2 text-center text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    Start for free
                  </a>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-sm font-medium text-gray-900">What&apos;s included</h3>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-12 lg:mt-24">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-8 sm:py-12 sm:px-12">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Enterprise</h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Custom pricing starting at $399/mo. Need more than 50 monitors? Want a custom SLA? Contact us for more information.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:flex lg:items-center lg:justify-end">
                  <a
                    href="mailto:sales@lighthouse-metrics.com"
                    className="inline-flex items-center justify-center rounded-full border border-gray-800 bg-gray-900 px-5 py-3 text-base font-medium text-white hover:bg-gray-800"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
