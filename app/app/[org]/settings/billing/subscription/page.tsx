'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  price: number;
  features: PlanFeature[];
  isCurrentPlan?: boolean;
  buttonText: string;
}

export default function SubscriptionPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = use(params);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  
  const plans: Plan[] = [
    {
      name: 'Indie',
      price: 25,
      isCurrentPlan: true,
      buttonText: 'Current Plan',
      features: [
        { text: '5 daily monitors' },
        { text: '100 on-demand tests' },
        { text: 'Basic support' },
      ],
    },
    {
      name: 'Startup',
      price: 49,
      buttonText: 'Subscribe to Startup',
      features: [
        { text: '25 daily monitors' },
        { text: '50 on-demand tests' },
        { text: '3 team members' },
        { text: 'Basic support' },
      ],
    },
    {
      name: 'Pro',
      price: 119,
      buttonText: 'Subscribe to Pro',
      features: [
        { text: '50 daily monitors' },
        { text: '5 hourly monitors' },
        { text: '200 on-demand tests' },
        { text: 'Custom headers' },
        { text: '15 team members' },
        { text: 'API Access' },
        { text: 'Priority support' },
      ],
    },
  ];

  return (
    <div className="mx-auto mb-20 w-full max-w-6xl flex-1">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href={`/app/${org}/settings/billing`} className="hover:text-gray-900">
          Back to Usage & Billing
        </Link>
      </div>

      <div className="relative pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Subscription</h1>
        <p className="mt-1 text-gray-500">Manage your team's subscription</p>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                billingCycle === 'annually'
                  ? 'bg-white shadow'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Annually with 2 months free
            </button>
          </div>
        </div>
        <button
          onClick={() => {/* Handle subscription cancellation */}}
          className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 text-gray-900"
        >
          Cancel Subscription
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border ${
              plan.isCurrentPlan ? 'border-blue-500' : 'border-gray-200'
            } p-6 flex flex-col h-full`}
          >
            {plan.isCurrentPlan && (
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Currently using
                </span>
              </div>
            )}
            <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
            <p className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                ${plan.price}
              </span>
              <span className="text-sm font-medium text-gray-500">
                /per month
              </span>
            </p>
            <ul className="mt-6 space-y-4 flex-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span className="ml-2 text-sm text-gray-500">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full rounded-full px-4 py-2 text-sm font-medium ${
                plan.isCurrentPlan
                  ? 'bg-gray-100 text-gray-900 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
              disabled={plan.isCurrentPlan}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
