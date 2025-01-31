export type Monitor = {
  id: string;
  name: string;
  url: string;
  region: {
    code: string;
    name: string;
  };
  status?: 'waiting' | 'active' | 'error';
};
