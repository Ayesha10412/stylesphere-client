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

// types/seller.ts

export type Seller = {
  _id: string;
  user?: {
    name: string;
    email: string;
    role?: string;
  };
  motivation: string;
  cvLink: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
};
//store
export interface Store {
  _id: string;
  owner: string;

  storeName: string;
  storeBanner?: string;
  storeDescription?: string;

  ratingAverage?: number;
  totalSales?: number;
  totalRevenue?: number;

  isApproved?: boolean;

  createdAt?: string;
  updatedAt?: string;
}
//product
export interface ProductVariant {
  size: string;

  color: string;

  stock: number;

  sku?: string;
}

export interface Product {
  _id: string;

  title: string;

  description: string;

  price: number;

  category: string;

  images: string[];

  variants: ProductVariant[];
}