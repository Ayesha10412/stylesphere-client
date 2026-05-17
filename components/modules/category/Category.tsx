"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Edit, Eye, Plus, Trash } from "lucide-react";

import api from "@/config/api";

import { DataTable } from "@/components/ui/DataTable";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TableAction, { TableActionType } from "@/components/ui/TableAction";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { formatDateTime } from "@/helper/dateTime";
import { getStatusColor } from "@/helper/getStatusColor";
import { Button } from "@/components/ui/button";

export type Category = {
  _id: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: string;
};

export default function Category() {
  const [data, setData] = React.useState<Category[]>([]);

  const [loading, setLoading] = React.useState(false);

  const [addOpen, setAddOpen] = React.useState(false);

  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await api.get("/category");

      console.log(res?.data?.data?.data);

      setData(res.data.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/category/${id}`);

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const topRightButtons = [
    {
      name: "Add Category",
      permission: "all",
      className: "text-white bg-[#008080] hover:bg-[#006666]",
      onClick: () => setAddOpen(true),
      icon: <Plus />,
    },
  ];

  const actionButtons: TableActionType<Category>[] = [
    {
      icon: <Eye size={18} />,
      name: "View",
      className: "text-green-600 bg-green-100",
      hoverText: "View Category",
      permission: "all",

      onClick: (row) => {
        setSelectedCategory(row.original);
        setViewOpen(true);
      },
    },
    {
      icon: <Edit size={18} />,
      name: "Edit",
      className: "text-blue-600 bg-blue-100",
      hoverText: "Edit Category",
      permission: "all",

      onClick: (row) => {
        setSelectedCategory(row.original);

        setEditOpen(true);
      },
    },

    {
      icon: <Trash size={18} />,
      name: "Delete",
      className: "text-red-600 bg-red-100",
      hoverText: "Delete Category",
      permission: "all",

      onClick: (row) => {
        handleDelete(row.original._id);
      },
    },
  ];

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: " Name",
    },
    {
      accessorKey: "isDeleted",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.isDeleted;

        return (
          <span
            className={`px-2 py-1 rounded text-xs ${getStatusColor(status)}`}
          >
            {status ? "Deleted" : "Active"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDateTime(row?.original?.createdAt ?? "-"),
    },

    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => <TableAction row={row} actions={actionButtons} />,
    },
  ];

  return (
    <div>
      <DataTable<Category>
        data={data}
        columns={columns}
        loading={loading}
        topRIghtButtons={topRightButtons}
      />

      {/* ADD MODAL */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Add Category
            </DialogTitle>
          </DialogHeader>

          <AddCategory
            refetch={fetchCategories}
            onClose={() => setAddOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Edit Category
            </DialogTitle>
          </DialogHeader>

          {selectedCategory && (
            <EditCategory
              category={selectedCategory}
              refetch={fetchCategories}
              onClose={() => setEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* DETAILS MODAL */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Category Details
            </DialogTitle>
          </DialogHeader>

          {selectedCategory && (
            <div className="space-y-4 text-sm grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-900">
                  {selectedCategory.name}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>

                <span
                  className={`px-2 py-1 rounded text-xs ${getStatusColor(
                    selectedCategory?.isDeleted,
                  )}`}
                >
                  {selectedCategory?.isDeleted ? "Deleted" : "Active"}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Created At</p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(selectedCategory.createdAt ?? "-")}
                </p>
              </div>

              <div className="flex justify-end col-span-2">
                <Button
                  onClick={() => setViewOpen(false)}
                  className="bg-red-100  hover:bg-red-200 text-red-500"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
