"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="mt-8 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-green-100 p-6 space-y-4 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className=" text-4xl font-bold text-gray-900">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className=" text-gray-600 text-lg leading-relaxed">
          Thank you for your purchase. Your payment has been received and your
          order has been placed successfully.
        </p>

        {/* Status Badge */}
        <div className=" inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Order Confirmed
        </div>

        {/* Divider */}
        <div className="my-8 border-t"></div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/customer-layout/order/myOrder">
            <Button
              className=" bg-[#008080] hover:bg-[#008080]"
            >
              View My Orders
            </Button>
          </Link>

          <Link href="/products">
            <Button   className="bg-[#008080]/10 text-[#008080] hover:bg-[#008080]/20 border-none">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Footer Message */}
        <p className=" text-sm text-gray-500">
          A confirmation of your order has been processed successfully.
        </p>
      </div>
    </div>
  );
}
