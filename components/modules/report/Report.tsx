"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Plus, RefreshCcw, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import api from "@/config/api";
import { DataTable } from "@/components/ui/DataTable";
import TableAction, { TableActionType } from "@/components/ui/TableAction";
import DeleteModal from "@/components/ui/DeleteModal";
import { formatDateTime } from "@/helper/dateTime";

interface Report {
  _id: string;
  user?: {
    name: string;
    email: string
  };
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function Report() {
  const router = useRouter();

  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ==========================
  // Fetch Reports
  // ==========================
  const fetchReports = async () => {
    setLoading(true);

    try {
      const res = await api.get("/report");

      setData(res?.data?.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [refresh]);

  // ==========================
  // Delete Report
  // ==========================
  const handleDelete = async () => {
    if (!selectedReport) return;

    setDeleteLoading(true);

    try {
      await api.delete(`/report/${selectedReport._id}`);

      setRefresh((prev) => !prev);

      setDeleteOpen(false);
      setSelectedReport(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // ==========================
  // Top Buttons
  // ==========================
  const topRightButtons = [
    {
      permission: "all",
      className: "text-white hover:text-white bg-[#008080] hover:bg-[#006666]",
      icon: <RefreshCcw />,
      onClick: () => setRefresh((prev) => !prev),
    },

    {
      name: "Export",
      permission: "all",
      className: "text-white hover:text-white bg-[#008080] hover:bg-[#006666]",
      icon: <Download />,
      onClick: () => router.push("/admin-layout/report/addReport"),
    },
  ];

  // ==========================
  // Table Actions
  // ==========================
  const actionButtons: TableActionType<Report>[] = [
    // {
    //   icon: <Eye size={18} />,
    //   name: "View",
    //   hoverText: "View Report",
    //   permission: "all",
    //   className: "text-blue-600 bg-blue-100",
    //   onClick: (row) => {
    //     router.push(`/admin-layout/report/${row.original._id}`);
    //   },
    // },

    // {
    //   icon: <Trash size={18} />,
    //   name: "Delete",
    //   hoverText: "Delete Report",
    //   permission: "all",
    //   className: "text-red-600 bg-red-100",
    //   onClick: (row) => {
    //     setSelectedReport(row.original);
    //     setDeleteOpen(true);
    //   },
    // },
  ];

  // ==========================
  // Table Columns
  // ==========================
const columns: ColumnDef<Report>[] = [
  {
    id: "serial",
    header: "ID",
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: "name",
    header: "User",cell:({row})=>row.original.user?.name ??""
  },
  {
    accessorKey: "email",
    header: "Email",cell:({row})=>row.original.user?.email ??""
  },

  {
    accessorKey: "totalAmount",
    header: "Amount",
  },

  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },

  {
    accessorKey: "status",
    header: "Order Status",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDateTime(row.original.createdAt ?? ""),
  },

  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => <TableAction row={row} actions={actionButtons} />,
  // },
];

  return (
    <div>
      <DataTable<Report>
        data={data}
        columns={columns}
        loading={loading}
        topRIghtButtons={topRightButtons}
      />

      {/* <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={selectedReport?._id}
        loading={deleteLoading}
        onConfirm={handleDelete}
      /> */}
    </div>
  );
}
