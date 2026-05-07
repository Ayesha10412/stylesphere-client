/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable"; // adjust path
import api from "@/config/api";
import { Button } from "@/components/ui/button";
import { User } from "@/types/data";
import { Edit, Eye, Plus, Settings, Trash } from "lucide-react";
import { CustomTooltip } from "@/components/ui/CustomTooltip";
import { formatDateTime } from "@/helper/dateTime";

export default function AllUser() {
  const [data, setData] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  // pagination (optional backend)
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);

  // search
  const [search, setSearch] = React.useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user");
      console.log("User:", res);
      // 🔁 adjust based on your API response
      setData(res.data.data || []);
      setTotalPages(res.data.meta?.totalPages || 1);
      setTotalItems(res.data.meta?.total || 0);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, [page, search]);
  const actionButtons = [
        {
      icon: <Settings size="1.3em" />,
      className: "text-green-500 bg-green-100",
      name: "Manage User",
      hoverText: "Manage",
      onClick: (row: any) => {
        console.log("editing");
      },
      permission: "all",
    },
    {
      icon: <Edit size="1.3em" />,
      className: "text-blue-500 bg-blue-100",
      name: "Edit User",
      hoverText: "Edit User",
      onClick: (row: any) => {
        console.log("viewing..");
      },
      permission: "all",
    },

    {
      icon: <Trash size="1.3em" />,
      className: "text-red-500 bg-red-100",
      name: "Delete",
      hoverText: "Delete",
      onClick: (row: any) => console.log("deleting"),
      permission: "all",
    },
  ];

  // ✅ Top buttons
  const topButtons = [
    {
      name: "Add User",
      permission: "create_user",
      className: "text-white bg-[#008080] hover:bg-[#008080]",
      onClick: () => {
        console.log("Add user clicked");
      },
      icon: <Plus />,
    },
  ];
  // ✅ Columns (fully typed)
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }) => row.original?.role ?? "N/A",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => 
        formatDateTime(row.original.createdAt) ?? "-"
      },
    
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }: { row: { original: User } }) => (
        <div className="flex gap-2 items-center">
          {actionButtons.map(
            (action, index) =>
              action.permission === "all" && (
                <CustomTooltip key={index} hoverText={action.hoverText}>
                  <div
                    className={`p-2 rounded-lg cursor-pointer ${action.className}`}
                    onClick={() => action.onClick(row)}
                  >
                    {action.icon}
                  </div>
                </CustomTooltip>
              ),
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable<User>
        data={data}
        columns={columns}
        topRIghtButtons={topButtons}
        loading={loading}
        backendPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setPage}
        onSearchChange={setSearch}
      />
    </div>
  );
}
