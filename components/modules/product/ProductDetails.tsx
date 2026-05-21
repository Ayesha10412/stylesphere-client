"use client";

import api from "@/config/api";
import { formatDateTime } from "@/helper/dateTime";
import { Product, ProductVariant } from "@/types/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

export default function ProductDetails( {id} : Props) {
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(false);
  console.log(id);
  const fetchProduct = async () => {
    setLoading(true);

    try {
      const res = await api.get(`/product/${id}`);

      setProduct(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No Product Found</p>;
  }

  return (
    <div className="bg-white p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE - IMAGES */}

          <div className="space-y-3 mt-6">
            {product.images?.map((img, index) => (
              <div key={index} className="rounded-md overflow-hidden">
                <img
                  src={img}
                  className="w-full h-[480px] object-cover rounded-md"
                  alt="product"
                />
              </div>
            ))}
        </div>

        {/* RIGHT SIDE - INFO */}
        <div className="space-y-6">
          {/* BASIC INFO */}
          <div>
            <h2 className="font-semibold mb-3 bg-gray-50 p-2 rounded">
              Basic Information
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>Title :</span>
                <span>{product.title}</span>
              </div>

              <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>Price :</span>
                <span>৳ {product.price}</span>
              </div>

              <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>Discount :</span>
                <span>
                  {product.discountPrice ? `৳ ${product.discountPrice}` : "-"}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>Ratings :</span>
                <span>{product.ratingsCount}</span>
              </div>

              <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>Status :</span>
                <span>{product.isApproved ? "Approved" : "Pending"}</span>
              </div>

              <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>Created :</span>
                <span>{formatDateTime(product.createdAt ?? "-")}</span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h2 className="font-semibold mb-2 bg-gray-50 p-2 rounded">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* VARIANTS */}
          <div>
            <h2 className="font-semibold mb-3 bg-gray-50 p-2 rounded">
              Variants
            </h2>

            <div className="space-y-2 text-sm">
              {product.variants?.map((v, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 bg-gray-50 px-3 py-2 rounded"
                >
                  <div>Size : {v.size}</div>
                  <div>Color : {v.color}</div>
                  <div>Stock : {v.stock}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
