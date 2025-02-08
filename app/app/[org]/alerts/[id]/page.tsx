'use client';

import { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Monitor } from '@/types/monitor';
import { Alert } from '@/types/alert';

const metrics = [
  { id: 'performance', name: 'Performance Score' },
  { id: 'accessibility', name: 'Accessibility Score' },
  { id: 'best-practices', name: 'Best Practices Score' },
  { id: 'seo', name: 'SEO Score' },
];

const conditions = [
  { id: 'degraded', name: 'Degraded', recommended: true },
  { id: 'above', name: 'Above' },
  { id: 'below', name: 'Below' },
];

export default function UpdateAlertPage({
  params,
}: {
  params: Promise<{ org: string; id: string }>;
}) {
  const { org, id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: 'email' as 'email' | 'slack',
    email: '',
    metric: '',
    condition: '',
    value: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    metric: false,
    condition: false,
    value: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    metric: '',
    condition: '',
    value: '',
  });
  const [isMetricOpen, setIsMetricOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([]);
  const [monitorFilter, setMonitorFilter] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const metricRef = useRef<HTMLDivElement>(null);
  const conditionRef = useRef<HTMLDivElement>(null);

  // Get monitors from localStorage
  const monitors = JSON.parse(localStorage.getItem('monitors') || '[]');
  const filteredMonitors = monitors.filter((monitor: Monitor) => 
    monitor.name.toLowerCase().includes(monitorFilter.toLowerCase())
  );

  useEffect(() => {
    // Get alert data from localStorage
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    const alert = alerts.find((a: Alert) => a.id === id);
    if (alert) {
      setFormData({
        name: alert.name,
        type: alert.type,
        email: alert.email || '',
        metric: alert.metric,
        condition: alert.condition,
        value: alert.value || '',
      });
      setSelectedMonitors(alert.monitors || []);
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (metricRef.current && !metricRef.current.contains(event.target as Node)) {
        setIsMetricOpen(false);
      }
      if (conditionRef.current && !conditionRef.current.contains(event.target as Node)) {
        setIsConditionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateField = (field: string, value: string) => {
    if (!value) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Invalid email address';
    }
    if (field === 'value' && !/^\d+$/.test(value)) {
      return 'Value must be a number';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: formData.type === 'email' ? validateField('email', formData.email) : '',
      metric: validateField('metric', formData.metric),
      condition: validateField('condition', formData.condition),
      value: formData.condition !== 'degraded' ? validateField('value', formData.value) : '',
    };
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      metric: true,
      condition: true,
      value: true,
    });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Get existing alerts
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    
    // Update the alert
    const updatedAlerts = alerts.map((alert: Alert) => {
      if (alert.id === id) {
        return {
          ...alert,
          ...formData,
          monitors: selectedMonitors,
          updatedAt: new Date().toISOString(),
        };
      }
      return alert;
    });
    
    // Save to localStorage
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));

    // Redirect to alerts page
    router.push(`/app/${org}/alerts`);
  };

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    // Get existing alerts
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    
    // Remove the alert
    const updatedAlerts = alerts.filter((alert: Alert) => alert.id !== id);
    
    // Save to localStorage
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));

    // Redirect to alerts page
    router.push(`/app/${org}/alerts`);
  };

  return (
    <div className="mx-auto mb-20 w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Alert name"
            className={`mt-1 block w-full rounded-md border ${
              errors.name && touched.name ? 'border-red-300' : 'border-gray-200'
            } px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 ${
              errors.name && touched.name
                ? 'focus:border-red-500 focus:ring-red-500'
                : 'focus:border-blue-500 focus:ring-blue-500'
            } focus:outline-none focus:ring-1`}
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <div className="mt-1 grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'email' }))}
              className={`py-2 px-4 text-sm font-medium ${
                formData.type === 'email'
                  ? 'bg-gray-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'slack' }))}
              className={`py-2 px-4 text-sm font-medium border-l border-gray-200 ${
                formData.type === 'slack'
                  ? 'bg-gray-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Slack
            </button>
          </div>
        </div>

        {formData.type === 'email' && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Email address"
              className={`mt-1 block w-full rounded-md border ${
                errors.email && touched.email ? 'border-red-300' : 'border-gray-200'
              } px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 ${
                errors.email && touched.email
                  ? 'focus:border-red-500 focus:ring-red-500'
                  : 'focus:border-blue-500 focus:ring-blue-500'
              } focus:outline-none focus:ring-1`}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="metric" className="block text-sm font-medium text-gray-700">
            Metric
          </label>
          <div className="relative mt-1" ref={metricRef}>
            <button
              type="button"
              onClick={() => setIsMetricOpen(!isMetricOpen)}
              className={`flex w-full items-center justify-between rounded-md border ${
                errors.metric && touched.metric ? 'border-red-300' : 'border-gray-200'
              } bg-white px-3 py-2 text-left text-sm ${
                formData.metric ? 'text-gray-900' : 'text-gray-500'
              } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {formData.metric ? metrics.find(m => m.id === formData.metric)?.name : 'Select metric...'}
              <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isMetricOpen && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {metrics.map((metric) => (
                  <button
                    key={metric.id}
                    type="button"
                    className={`flex w-full items-center px-3 py-2 text-sm ${
                      formData.metric === metric.id
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, metric: metric.id }));
                      setIsMetricOpen(false);
                    }}
                  >
                    {metric.name}
                    {formData.metric === metric.id && (
                      <svg className="ml-2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.metric && touched.metric && (
            <p className="mt-1 text-sm text-red-600">{errors.metric}</p>
          )}
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <div className="relative mt-1" ref={conditionRef}>
            <button
              type="button"
              onClick={() => setIsConditionOpen(!isConditionOpen)}
              className={`flex w-full items-center justify-between rounded-md border ${
                errors.condition && touched.condition ? 'border-red-300' : 'border-gray-200'
              } bg-white px-3 py-2 text-left text-sm ${
                formData.condition ? 'text-gray-900' : 'text-gray-500'
              } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {formData.condition ? conditions.find(c => c.id === formData.condition)?.name : 'Select condition...'}
              <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isConditionOpen && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    type="button"
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm ${
                      formData.condition === condition.id
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, condition: condition.id }));
                      setIsConditionOpen(false);
                    }}
                  >
                    <span className="flex items-center">
                      {condition.name}
                      {condition.recommended && (
                        <span className="ml-2 text-xs text-gray-500">recommended</span>
                      )}
                    </span>
                    {formData.condition === condition.id && (
                      <svg className="ml-auto h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.condition && touched.condition && (
            <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
          )}
        </div>

        {formData.condition !== 'degraded' && (
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              type="text"
              name="value"
              id="value"
              value={formData.value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Numeric value for the condition"
              className={`mt-1 block w-full rounded-md border ${
                errors.value && touched.value ? 'border-red-300' : 'border-gray-200'
              } px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 ${
                errors.value && touched.value
                  ? 'focus:border-red-500 focus:ring-red-500'
                  : 'focus:border-blue-500 focus:ring-blue-500'
              } focus:outline-none focus:ring-1`}
            />
            {errors.value && touched.value && (
              <p className="mt-1 text-sm text-red-600">{errors.value}</p>
            )}
          </div>
        )}

        <div>
          <h2 className="text-lg font-medium text-gray-900">Lighthouse Monitors</h2>
          <div className="mt-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedMonitors.length > 0 && selectedMonitors.length === monitors.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMonitors(monitors.map((m: Monitor) => m.id));
                    } else {
                      setSelectedMonitors([]);
                    }
                  }}
                />
                <span className="ml-3 text-sm text-gray-900">Select all</span>
              </div>
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-64 rounded-md border border-gray-200 pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Filter..."
                  value={monitorFilter}
                  onChange={(e) => setMonitorFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredMonitors.map((monitor: Monitor) => (
                <div key={monitor.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedMonitors.includes(monitor.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMonitors([...selectedMonitors, monitor.id]);
                        } else {
                          setSelectedMonitors(selectedMonitors.filter(id => id !== monitor.id));
                        }
                      }}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{monitor.name}</p>
                      <p className="text-sm text-gray-500">{monitor.url}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
              isDeleting
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isDeleting ? 'Confirm Delete' : 'Delete'}
          </button>
          <div className="flex space-x-3">
            <Link
              href={`/app/${org}/alerts`}
              className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </Link>
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Update Alert
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
