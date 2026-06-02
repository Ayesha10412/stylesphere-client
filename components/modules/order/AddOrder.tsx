"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/config/api";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
}

type Product = {
  _id: string;
  title: string;
  price: number;
  discountPrice?: number;
  images: string[];
};

type FormValues = {
  name: string;
  phone: string;
  division: string;
  district: string;
  address: string;
};

export default function AddOrder({ id }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const payload = {
        product: id,
        quantity: 1,
        shippingAddress: {
          name: data.name,
          phone: data.phone,
          division: data.division,
          district: data.district,
          address: data.address,
        },
      };

      const res = await api.post("/order", payload);

      // SSLCommerz URL from backend
      const paymentUrl = res?.data?.data?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div className="py-20 text-center">Loading product...</div>;
  }

  const price = product.discountPrice || product.price;
  const deliveryCharge = 60;
  const total = price + deliveryCharge;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("division")}
                placeholder="Division"
                className="w-full border rounded-lg p-3"
              />

              <input
                {...register("district")}
                placeholder="District"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <textarea
              {...register("address")}
              placeholder="Full Address"
              rows={4}
              className="w-full border rounded-lg p-3"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008080] hover:bg-[#006666]"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl border shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-52 object-cover rounded-lg mb-4"
          />

          <h3 className="font-medium">{product.title}</h3>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Product Price</span>
              <span>৳ {price}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>৳ {deliveryCharge}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
