"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, RefreshCcw, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import api from "@/config/api";
import { DataTable } from "@/components/ui/DataTable";
import TableAction, { TableActionType } from "@/components/ui/TableAction";
import DeleteModal from "@/components/ui/DeleteModal";

interface Report {
  _id: string;
  title: string;
  reportType: string;
  createdAt: string;
  status: string;
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

      setData(res?.data?.data || []);
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
      name: "Add Report",
      permission: "all",
      className: "text-white hover:text-white bg-[#008080] hover:bg-[#006666]",
      icon: <Plus />,
      onClick: () => router.push("/admin-layout/report/addReport"),
    },
  ];

  // ==========================
  // Table Actions
  // ==========================
  const actionButtons: TableActionType<Report>[] = [
    {
      icon: <Eye size={18} />,
      name: "View",
      hoverText: "View Report",
      permission: "all",
      className: "text-blue-600 bg-blue-100",
      onClick: (row) => {
        router.push(`/admin-layout/report/${row.original._id}`);
      },
    },

    {
      icon: <Trash size={18} />,
      name: "Delete",
      hoverText: "Delete Report",
      permission: "all",
      className: "text-red-600 bg-red-100",
      onClick: (row) => {
        setSelectedReport(row.original);
        setDeleteOpen(true);
      },
    },
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
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "reportType",
      header: "Report Type",
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.original.status === "Published"
              ? "bg-green-100 text-green-700"
              : row.original.status === "Draft"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },

    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <TableAction row={row} actions={actionButtons} />,
    },
  ];

  return (
    <div>
      <DataTable<Report>
        data={data}
        columns={columns}
        loading={loading}
        topRIghtButtons={topRightButtons}
      />

      <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={selectedReport?.title}
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
