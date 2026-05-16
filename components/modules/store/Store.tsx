"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Edit, Eye, Pencil, Plus, Trash } from "lucide-react";

import api from "@/config/api";

import { DataTable } from "@/components/ui/DataTable";
import { CustomTooltip } from "@/components/ui/CustomTooltip";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StoreDetails from "./StoreDetails";
import EditStore from "./EditStore";
import { Store } from "@/types/data";
import { getStatusColor } from "@/helper/getStatusColor";
import { getStatusLabel } from "@/helper/getStatusLabel";
import TableAction, { TableActionType } from "@/components/ui/TableAction";
import DeleteModal from "@/components/ui/DeleteModal";
import AddStore from "./AddStore";
import { formatDateTime } from "@/helper/dateTime";

export default function StorePage() {
  const [data, setData] = React.useState<Store[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [deleteName, setDeleteName] = React.useState("");
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store | null>(null);

  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const [editOpen, setEditOpen] = React.useState(false);

  const fetchStores = async () => {
    setLoading(true);

    try {
      const res = await api.get("/store");

      setData(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStores();
  }, []);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    setLoadingDelete(true);

    try {
      await api.delete(`/store/${deleteId}`);

      setDeleteOpen(false);
      setDeleteId(null);

      fetchStores();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDelete(false);
    }
  };
  const topRightButtons = [
    {
      name: "Add Store",
      permission: "all",
      className: "text-white bg-[#008080] hover:bg-[#008080]",
      onClick: () => {
        setAddOpen(true);
      },
      icon: <Plus />,
    },
  ];
  const actionButtons: TableActionType<Store>[] = [
    {
      icon: <Eye size={18} />,
      name: "Store",
      className: "text-blue-600 bg-blue-100",
      hoverText: "View Store",
      onClick: (row) => {
        setSelectedStore(row.original);
        setDetailsOpen(true);
      },

      permission: "all",
    },

    // {
    //   icon: <Edit size={18} />,
    //   name: "Store",
    //   className: "text-green-600 bg-green-100",
    //   hoverText: "Edit Store",

    //   onClick: (row) => {
    //     setSelectedStore(row.original);
    //     setEditOpen(true);
    //   },

    //   permission: "all",
    // },

    // {
    //   icon: <Trash size={18} />,
    //   name: "Store",
    //   className: "text-red-600 bg-red-100",
    //   hoverText: "Delete Store",

    //   onClick: (row) => {
    //     setDeleteId(row.original._id);
    //     setDeleteName(row.original.storeName);
    //     setDeleteOpen(true);
    //   },
    //   permission: "all",
    // },
  ];
  const columns: ColumnDef<Store>[] = [
    {
      accessorKey: "storeName",
      header: "Store Name",
    },
    {
      accessorKey: "storeDescription",
      header: "Store Description",
    },

    {
      accessorKey: "isApproved",
      header: "Status",

      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs ${getStatusColor(
            row.original?.isApproved,
          )}`}
        >
          {getStatusLabel(row.original?.isApproved)}
        </span>
      ),
    },

    {
      accessorKey: "totalSales",
      header: "Sales",
    },

    {
      accessorKey: "totalRevenue",
      header: "Revenue",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDateTime(row.original.createdAt ?? "-"),
    },

    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => <TableAction row={row} actions={actionButtons} />,
    },
  ];

  return (
    <div>
      <DataTable<Store>
        data={data}
        columns={columns}
        topRIghtButtons={topRightButtons}
        loading={loading}
      />
      {/* ADD MODAL */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="lg:max-w-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Add Store
            </DialogTitle>
          </DialogHeader>

          <AddStore refetch={fetchStores} onClose={() => setAddOpen(false)} />
        </DialogContent>
      </Dialog>
      {/* DETAILS MODAL */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Store Details
            </DialogTitle>
          </DialogHeader>

          {selectedStore && <StoreDetails store={selectedStore} />}
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="lg:max-w-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Edit Store
            </DialogTitle>
          </DialogHeader>

          {selectedStore && (
            <EditStore
              store={selectedStore}
              refetch={fetchStores}
              onClose={() => setEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteName}
        loading={loadingDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
