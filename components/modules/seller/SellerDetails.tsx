"use client";

import type { Seller } from "@/types/data";

type Props = {
  seller: Seller;
};

export default function SellerDetails({ seller }: Props) {
  return (
    <div className="space-y-4">
      {/* USER INFO */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">
          User Information
        </h3>

        <div className="rounded-xl border bg-gray-50 p-4 space-y-2 text-sm">
          <p>
            <span className="text-gray-500">Name:</span> {seller.user?.name}
          </p>
          <p>
            <span className="text-gray-500">Email:</span> {seller.user?.email}
          </p>
          <p>
            <span className="text-gray-500">Role:</span> {seller.user?.role}
          </p>
        </div>
      </div>
<hr />
      {/* STATUS */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Status</span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            seller.status === "approved"
              ? "bg-green-100 text-green-700"
              : seller.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {seller.status}
        </span>
      </div>
<hr />
      {/* MOTIVATION */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Motivation</p>

        <div className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-700">
          {seller.motivation || "N/A"}
        </div>
      </div>

      {/* CV */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">CV</span>

        <a
          href={seller.cvLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#008080] hover:underline"
        >
          View CV
        </a>
      </div>
    </div>
  );
}
