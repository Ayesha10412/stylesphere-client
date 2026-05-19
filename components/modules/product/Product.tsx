"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import EditProduct from "./EditProduct";
import TableAction, { TableActionType } from "@/components/ui/TableAction";
import api from "@/config/api";
import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/data";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const [data, setData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [editOpen, setEditOpen] = React.useState(false);

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await api.get("/product");
      console.log(res);
      setData(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const topRightButtons = [
    {
      name: "Add Product",
      permission: "all",
      className:
        "text-white hover:text-white cursor-pointer bg-[#008080] hover:bg-[#006666]",
      onClick: () => router.push("/admin-layout/product/addProduct"),
      icon: <Plus />,
    },
  ];

  const actionButtons: TableActionType<Product>[] = [
    {
      icon: <Eye size={18} />,
      name: "View",
      className: "text-blue-600 bg-blue-100",
      hoverText: "View Product",
      permission: "all",
      onClick: (row) => {
        console.log(row.original);
      },
    },

    {
      icon: <Edit size={18} />,
      name: "Edit",
      className: "text-green-600 bg-green-100",
      hoverText: "Edit Product",
      permission: "all",
      onClick: (row) => {
        setSelectedProduct(row.original);
        setEditOpen(true);
      },
    },

    {
      icon: <Trash size={18} />,
      name: "Delete",
      className: "text-red-600 bg-red-100",
      hoverText: "Delete Product",
      permission: "all",
      onClick: (row) => {
        console.log(row.original);
      },
    },
  ];

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "price",
      header: "Price",
    },

    {
      accessorKey: "discountPrice",
      header: "Discount Price",
    },

    {
      accessorKey: "category",
      header: "Category",
    },

    {
      accessorKey: "ratingsAverage",
      header: "Rating",
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <TableAction row={row} actions={actionButtons} />,
    },
  ];

  return (
    <div>
      <DataTable<Product>
        data={data}
        columns={columns}
        loading={loading}
        topRIghtButtons={topRightButtons}
      />

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Edit Product
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <EditProduct
              product={selectedProduct}
              refetch={fetchProducts}
              onClose={() => setEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
