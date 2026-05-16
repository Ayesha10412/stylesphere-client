"use client";

import { Store } from "@/types/data";


type Props = {
  store: Store;
};

export default function StoreDetails({ store }: Props) {
  return (
    <div className="space-y-4 p-4">
      {store.storeBanner && (
        <img
          src={store.storeBanner}
          alt={store.storeName}
          className="w-full h-52 object-cover rounded-xl"
        />
      )}

      <div>
        <h2 className="text-xl font-bold">
          {store.storeName}
        </h2>

        <p className="text-gray-600 mt-2">
          {store.storeDescription || "No description"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Total Sales
          </p>

          <h3 className="text-lg font-bold">
            {store.totalSales || 0}
          </h3>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <h3 className="text-lg font-bold">
            ${store.totalRevenue || 0}
          </h3>
        </div>
      </div>
    </div>
  );
}