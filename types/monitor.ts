import { Region } from "./region";

export type Monitor = {
  id: string;
  name: string;
  url: string;
  region: Region;
  status?: 'waiting' | 'active' | 'error';
  createdAt?: string;
  schedule?: 'daily' | 'hourly';
  device?: 'mobile' | 'desktop'
};
