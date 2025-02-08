export type Alert = {
  id: string;
  name: string;
  type: string;
  email?: string;
  metric: string;
  condition: string;
  value?: string;
  monitors: string[];
};
