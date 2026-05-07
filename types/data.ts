export type User = {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  }[];
  createdAt: string;
};