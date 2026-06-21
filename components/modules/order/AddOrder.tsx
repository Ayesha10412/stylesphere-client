"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/config/api";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
import { handleApiError } from "@/helper/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/schema";

type FormValues = {
  name: string;
  phone: string;

  shippingAddress: {
    division: string;
    district: string;
    address: string;
  };
};

export default function AddOrder() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(orderSchema) });
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await api.get("/cart/my-cart");
      setCart(res.data.data);
    };

    fetchCart();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
        if (!cart?.items?.length) {
          throw new Error("Cart is empty");
        }
      const payload = {
        items: cart.items.map((item: any) => ({
          product: item.product._id,
          seller: item.product.seller,
          variant: item.variant,
          price: item.product.price,
          quantity: item.quantity,
          subTotal: item.product.price * item.quantity,
        })),

        totalAmount: cart.totalPrice,

        platformCommission: cart.totalPrice * 0.1,

        sellerAmount: cart.totalPrice * 0.9,

        paymentStatus: "pending",

        paymentMethod: "sslcommerz",

        shippingAddress: data.shippingAddress,
      };
    
      const res = await api.post("/order", payload);

      const orderId = res.data.data.order._id;

      const paymentRes = await api.post(`/payment/init/${orderId}`);

      const paymentUrl = paymentRes?.data?.data?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error(error);
      handleApiError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return <div className="py-20 text-center">Loading cart...</div>;
  }

  const price = cart.items.reduce((total: number, item: any) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);
  const deliveryCharge = 60;
  const total = price + deliveryCharge;

  return (
    <div className="p-4 mt-12">
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 grid grid-cols-2 gap-4"
          >
            <CustomInput
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              register={register}
              control={control}
              required
              error={errors.name}
            />

            <CustomInput
              name="phone"
              label="Phone Number"
              placeholder="01XXXXXXXXX"
              register={register}
              control={control}
              required
              error={errors.phone}
            />
            <CustomInput
              name="shippingAddress.division"
              label="Division"
              placeholder="Dhaka"
              register={register}
              required
              control={control}
              error={errors.shippingAddress?.division}
            />

            <CustomInput
              name="shippingAddress.district"
              label="District"
              placeholder="Gazipur"
              register={register}
              required
              control={control}
              error={errors.shippingAddress?.district}
            />

            <div className="col-span-2">
              <CustomInput
                name="shippingAddress.address"
                label="Full Address"
                type="textarea"
                required
                register={register}
                placeholder="House #, Road #, Area, etc."
                control={control}
                error={errors.shippingAddress?.address}
              />
            </div>

            <div className="col-span-2 flex gap-2 justify-end mt-6">
              <Button
                type="button"
                disabled={loading}
                className=" bg-red-100 hover:bg-red-200 text-red-600 "
              >
                {loading ? "Cancelling..." : "Cancel Order"}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className=" bg-[#008080] hover:bg-[#006666]"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl border shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <img
            src={cart.items[0]?.product.images?.[0]}
            alt={cart.items[0]?.product.title}
            className="w-full h-52 object-cover rounded-lg mb-4"
          />

          <h3 className="font-medium">{cart.items[0]?.product.title}</h3>

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
