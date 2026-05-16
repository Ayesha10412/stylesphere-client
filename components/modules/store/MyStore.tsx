"use client";

import api from "@/config/api";
import { useEffect, useState } from "react";
import EditStore from "./EditStore";
import { Store } from "@/types/data";
import { formatDateTime } from "@/helper/dateTime";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MyStore() {
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchStore = async () => {
    setLoading(true);
    try {
      const res = await api.get("/store/me");
      setStore(res?.data?.data?.data); // IMPORTANT FIX
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (loading) {
    return <p className="p-6">Loading store...</p>;
  }

  if (!store) {
    return <p className="p-6">No store found</p>;
  }

  return (
    <div className="  mx-auto">
      {/* STORE CARD */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-48 w-full bg-gray-100 p-4 rounded">
          {store.storeBanner && (
            <img
              src={store.storeBanner}
              alt="store banner"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{store.storeName}</h2>
              <p className="text-gray-500 text-sm">{store.storeDescription}</p>
              <p className="text-gray-400 text-sm">
                {formatDateTime(store.createdAt ?? "-")}
              </p>
            </div>

            <button
              onClick={() => setOpenEdit(true)}
              className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Edit Store
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Sales</p>
              <p className="text-lg font-bold">{store.totalSales}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-lg font-bold">${store.totalRevenue}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`text-sm font-semibold ${
                  store.isApproved ? "text-green-600" : "text-red-500"
                }`}
              >
                {store.isApproved ? "Approved" : "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="lg:max-w-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Edit Store
            </DialogTitle>
          </DialogHeader>

          {store && (
            <EditStore
              store={store}
              refetch={fetchStore}
              onClose={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
