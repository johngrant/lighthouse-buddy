export type Metric = 'First Contentful Paint' | 'Speed Index' | 'Largest Contentful Paint' | 'Time to Interactive' | 'Total Blocking Time' | 'Cumulative Layout Shift';

export type MetricData = {
  [key in Metric]: { date: string; value: number }[];
};

export const metricUnits: { [key in Metric]: string } = {
  'First Contentful Paint': 's',
  'Speed Index': 's',
  'Largest Contentful Paint': 's',
  'Time to Interactive': 's',
  'Total Blocking Time': 'ms',
  'Cumulative Layout Shift': '',
};