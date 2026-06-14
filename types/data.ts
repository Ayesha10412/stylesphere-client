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

  stock: string;

  sku?: string;
}

export interface Product {
  _id: string;

  title: string;

  description: string;

  price: number;
  discountPrice?: string;

  category: {
    _id: string;
    name: string;
  };

  images: string[];

  variants: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  isApproved?: boolean;
  ratingsCount?: number;
}
 export interface Order {
  _id: string;
  user: string;

  items: {
    product: string;
    quantity: number;
    price: number;
    subTotal: number;
  }[];

  totalAmount: number;
  platformCommission: number;
  sellerAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  status: string;

  shippingAddress: {
    division: string;
    district: string;
    address: string;
  };

  createdAt: string;
}


