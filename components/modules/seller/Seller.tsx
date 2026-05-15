"use client";

import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/DataTable";
import { CustomTooltip } from "@/components/ui/CustomTooltip";

import api from "@/config/api";

import { Check, Eye, Trash, X } from "lucide-react";
import type { Seller } from "@/types/data";
import TableAction, { TableActionType } from "@/components/ui/TableAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SellerDetails from "./SellerDetails";
import { getStatusColor } from "@/helper/getStatusColor";
import ReviewApplication from "./ReviewApplication";

export default function Seller() {
  const [data, setData] = React.useState<Seller[]>([]);
  const [loading, setLoading] = React.useState(false);

  // pagination
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedSeller, setSelectedSeller] = React.useState<Seller | null>(
    null,
  );
  // search
  const [search, setSearch] = React.useState("");
  const [reviewOpen, setReviewOpen] = React.useState(false);

  const [reviewType, setReviewType] = React.useState<
    "approved" | "rejected" | null
  >(null);

  const [selectedReviewSeller, setSelectedReviewSeller] =
    React.useState<Seller | null>(null);
  const fetchSeller = async () => {
    setLoading(true);

    try {
      const res = await api.get("/seller");

      console.log("Seller:", res);

      setData(res.data.data || []);
      setTotalPages(res.data.meta?.totalPages || 1);
      setTotalItems(res.data.meta?.total || 0);
    } catch (err) {
      console.error("Failed to fetch seller", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSeller();
  }, [page, search]);

  const actionButtons: TableActionType<Seller>[] = [
    {
      icon: <Eye size="1.3em" />,
      className: "text-blue-500 bg-blue-100",
      name: "View Seller",
      hoverText: "View Seller",
      onClick: (row) => {
        setSelectedSeller(row.original);
        setOpen(true);
      },
      permission: "all",
    },

    {
      icon: <Check size="1.3em" />,
      className: "text-green-500 bg-green-100",
      name: "Approve Seller",
      hoverText: "Approve",

      show: (row) => row.original.status === "pending",

      onClick: (row) => {
        setSelectedReviewSeller(row.original);
        setReviewType("approved");
        setReviewOpen(true);
      },
      permission: "all",
    },

    {
      icon: <X size="1.3em" />,
      className: "text-yellow-500 bg-yellow-100",
      name: "Reject Seller",
      hoverText: "Reject",

      show: (row) => row.original.status === "pending",

      onClick: (row) => {
        setSelectedReviewSeller(row.original);
        setReviewType("rejected");
        setReviewOpen(true);
      },
      permission: "all",
    },
    {
      icon: <Trash size="1.3em" />,
      className: "text-red-500 bg-red-100",
      name: "Delete Seller",
      hoverText: "Delete Seller",
      onClick: (row) => {
        console.log("Delete seller", row.original);
      },
      permission: "all",
    },
  ];

  const columns: ColumnDef<Seller>[] = [
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => row.original.user?.name ?? "N/A",
    },

    {
      id: "email",
      header: "Email",
      cell: ({ row }) => row.original.user?.email ?? "N/A",
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }) => row.original.user?.role ?? "N/A",
    },

    {
      accessorKey: "motivation",
      header: "Motivation",
      cell: ({ row }) => (
        <p className="max-w-[300px] truncate">
          {row.original.motivation ?? "N/A"}
        </p>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
            row.original.status,
          )}`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "cvLink",
      header: "CV",
      cell: ({ row }) => (
        <CustomTooltip hoverText="View CV">
          <a
            href={row.original.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline cursor-pointer"
          >
            CV
          </a>
        </CustomTooltip>
      ),
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Created At",
    //   cell: ({ row }) =>
    //     formatDateTime(row.original?.created ?? "-") ,
    // },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => <TableAction row={row} actions={actionButtons} />,
    },
  ];

  return (
    <div>
      <DataTable<Seller>
        data={data}
        columns={columns}
        loading={loading}
        backendPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setPage}
        onSearchChange={setSearch}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#008080] text-xl">
              Seller Details
            </DialogTitle>
          </DialogHeader>

          {selectedSeller && <SellerDetails seller={selectedSeller} />}
        </DialogContent>
      </Dialog>
      <ReviewApplication
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        seller={selectedReviewSeller}
        type={reviewType}
        refetch={fetchSeller}
      />
    </div>
  );
}
