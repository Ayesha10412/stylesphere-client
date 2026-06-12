"use client";

export default function PaymentProcessingPage() {
  return (
    <div className="container mx-auto py-20 text-center">
      <div className="max-w-lg mx-auto border rounded-xl p-8">
        <h1 className="text-3xl font-bold">Redirecting to Payment Gateway</h1>

        <p className="mt-4 text-gray-600">
          Please wait while we connect you to SSLCommerz...
        </p>

        <div className="mt-6">
          <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
