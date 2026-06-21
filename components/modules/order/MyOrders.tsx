"use client"
import { Button } from "@/components/ui/button";
import api from "@/config/api";
import { Order } from "@/types/data";
import { useRouter } from "next/navigation";
import  { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders,setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const router=useRouter()
  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/order/my-order");
      setOrders(res?.data?.data?.order || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    };
    useEffect(() => {
        fetchMyOrders()
    },[])
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center text-[#008080] font-bold mb-6">
        My Orders
      </h1>

      {loading && <p>Loading...</p>}

      <div className="space-y-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Top Info */}
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">
                Order ID: {order._id.slice(-6)}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-t pt-3"
                >
                  <img
                    src={item.product.images?.[0]}
                    className="w-16 h-16 object-cover rounded"
                    alt=""
                  />

                  <div className="flex-1">
                    <h2 className="font-medium">{item.product.title}</h2>
                    <p className="text-sm text-gray-500">
                      Size: {item.variant.size} | Color: {item.variant.color}
                    </p>
                    <p className="text-sm">
                      Qty: {item.quantity} × {item.price}
                    </p>
                  </div>

                  <div className="font-semibold">৳ {item.subTotal}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between mt-4 pt-3 border-t">
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="font-bold">Total: ৳ {order.totalAmount}</p>
            </div>
          </div>
        ))}
          </div>
          <Button onClick={()=>router.push("/common-layout")}>Back to home</Button>
    </div>
  );
}
