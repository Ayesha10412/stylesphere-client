"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  return (
    <div className="container mx-auto py-20 text-center">
      <div className="max-w-lg mx-auto border rounded-xl p-8">
        <h1 className="text-4xl font-bold text-red-500">Payment Failed</h1>

        <p className="mt-4 text-gray-600">
          Your payment could not be completed.
        </p>

        <Link href="/checkout">
          <Button className="mt-6">Try Again</Button>
        </Link>
      </div>
    </div>
  );
}
