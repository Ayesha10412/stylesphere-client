"use client";
console.log("ProductPage rendered");
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Eye, Plus, RefreshCcw, Trash } from "lucide-react";
import TableAction, { TableActionType } from "@/components/ui/TableAction";
import api from "@/config/api";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Order, Product } from "@/types/data";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/ui/DeleteModal";
import { formatDateTime } from "@/helper/dateTime";
import { getStatusColor } from "@/helper/getStatusColor";

export default function Orders() {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await api.get("/order");

      setData(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [refresh]);
  //delete api
  const handleDelete = async () => {
    if (!selectedProduct) return;

    setDeleteLoading(true);

    try {
      // 👉 YOUR API ENDPOINT GOES HERE
      await api.delete(`/product/${selectedProduct._id}`);

      // refresh table after delete
      setRefresh((prev) => !prev);

      // close modal
      setDeleteOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  const topRightButtons = [
    {
      permission: "all",
      className:
        "text-white hover:text-white cursor-pointer bg-[#008080] hover:bg-[#006666]",
      onClick: () => setRefresh((pev) => !pev),
      icon: <RefreshCcw />,
    },
    {
      name: "Add Product",
      permission: "all",
      className:
        "text-white hover:text-white cursor-pointer bg-[#008080] hover:bg-[#006666]",
      onClick: () => router.push("/admin-layout/product/addProduct"),
      icon: <Plus />,
    },
  ];
  // const filters = [
  //   // Category Filter
  //   {
  //     key: "category",
  //     placeholder: "Category",
  //     options: categories.map((c) => ({
  //       label: c.label,
  //       value: c.value,
  //     })),
  //     value: category,
  //     onChange: (value: string | string[]) => setCategory(value as string),
  //   },

  //   // Price Filter
  //   {
  //     key: "price",
  //     placeholder: "Price",
  //     options: [
  //       { label: "Below ৳500", value: "0-500" },
  //       { label: "৳500 - ৳1000", value: "500-1000" },
  //       { label: "৳1000 - ৳5000", value: "1000-5000" },
  //       { label: "Above ৳5000", value: "5000-above" },
  //     ],
  //     value: priceRange,
  //     onChange: (value: string | string[]) => setPriceRange(value as string),
  //   },
  // ];

  const actionButtons: TableActionType<Product>[] = [
    {
      icon: <Eye size={18} />,
      name: "View",
      className: "text-blue-600 bg-blue-100",
      hoverText: "View Product",
      permission: "all",
      onClick: (row) => {
        router.push(`/admin-layout/product/${row.original._id}`);
      },
    },

    {
      icon: <Edit size={18} />,
      name: "Edit",
      className: "text-green-600 bg-green-100",
      hoverText: "Edit Product",
      permission: "all",
      onClick: (row) => {
        router.push(`/admin-layout/product/editProduct/${row.original?._id}`);
      },
    },

    {
      icon: <Trash size={18} />,
      name: "Delete",
      className: "text-red-600 bg-red-100",
      hoverText: "Delete Product",
      permission: "all",
      onClick: (row) => {
        setSelectedProduct(row.original);
        setDeleteOpen(true);
      },
    },
  ];

  const columns: ColumnDef<Order>[] = [
    {
      id: "serial",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      id: "name",
      header: "User",
      cell: ({ row }) => row.original?.user?.name ?? "",
    },

    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => formatDateTime(row.original.createdAt),
    },

    {
      id: "quantity",
      header: "Items",
      cell: ({ row }) =>
        row.original.items.reduce((sum, item) => sum + item.quantity, 0),
    },

    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => `৳${row.original.totalAmount}`,
    },

    {
      accessorKey: "sellerAmount",
      header: "Seller Amount",
      cell: ({ row }) => `৳${row.original.sellerAmount}`,
    },

    {
      accessorKey: "platformCommission",
      header: "Commission",
      cell: ({ row }) => `৳${row.original.platformCommission}`,
    },

    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
    },

    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs ${getStatusColor(
            row.original.paymentStatus,
          )}`}
        >
          {row.original.paymentStatus}
        </span>
      ),
    },

    {
      accessorKey: "status",
      header: "Order Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs ${getStatusColor(
            row.original.status,
          )}`}
        >
          {row.original.status}
        </span>
      ),
    },

    {
      id: "address",
      header: "Address",
      cell: ({ row }) => row.original.shippingAddress?.address,
    },
  ];

  return (
    <div>
      <DataTable<Order>
        data={data}
        // filters={filters}
        columns={columns}
        loading={loading}
        topRIghtButtons={topRightButtons}
      />
      <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={selectedProduct?.title}
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
