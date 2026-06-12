"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto py-20 text-center">
      <div className="max-w-lg mx-auto border rounded-xl p-8">
        <h1 className="text-4xl font-bold">Payment Cancelled</h1>

        <p className="mt-4 text-gray-600">You cancelled the payment process.</p>

        <Link href="/checkout">
          <Button className="mt-6">Back To Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
