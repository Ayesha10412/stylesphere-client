/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
  ColumnDef,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Columns2,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/context/SessionProvider";
import TableWrapper from "./TableWrapper";
import { Input } from "./input";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  topRIghtButtons: {
    name: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    permission: string;
    customRender?: React.ReactNode;
  }[];
  filterkey?: string;
  backendPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onSearchChange?: (query: string) => void;

  loading?: boolean;
};

export function DataTable<T>({
  data,
  columns,
  topRIghtButtons,
  filterkey,
  backendPagination,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onSearchChange,
  loading,
}: DataTableProps<T>): React.JSX.Element {
  const { session } = useSession();
  const userRoles = (session?.role || []).map((r: string) => r.toLowerCase());
  console.log("DataTable filterkey:", filterkey);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const userPermissions = session?.permission_names || [];
  const isSuperAdmin = userRoles.includes("super_admin");

  const table = useReactTable<T>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // ❗ disable frontend filtering when backend search is used
    ...(onSearchChange ? {} : { getFilteredRowModel: getFilteredRowModel() }),

    onGlobalFilterChange: onSearchChange ? () => {} : setGlobalFilter,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <TableWrapper>
      <div className="w-full space-y-4 ">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center  sm:justify-between  bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
       
          <div className="relative w-full sm:max-w-xs md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(event:any) => {
                const value = event.target.value;

                setGlobalFilter(value); // <-- always update local filter

                if (onSearchChange) {
                  // Debounce mechanism without global window pollution
                  if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }
                  searchTimeoutRef.current = setTimeout(() => {
                    onSearchChange(value);
                    if (backendPagination && onPageChange) onPageChange(1);
                  }, 400);
                }
              }}
              className="pl-9 w-full"
            />
          </div>
          {/* Right side buttons and dropdown */}
          {/* <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end border-2 border-red-500" > */}
          <div className="flex items-center gap-2 justify-start sm:justify-end  whitespace-nowrap">
            {/* Column Selector Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-9 font-medium text-xs"
                >
                  <Columns2 className="w-4 h-4" />
                  Columns
                  <ChevronDown className=" h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {table
                  .getAllColumns()
                  .filter((column:any) => column.getCanHide())
                  .map((column:any) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value:any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Top Right Buttons */}
            {topRIghtButtons.map(
              (button, index) =>
                // (userPermissions.includes(button.permission) ||
                //   button.permission === "all")
                (isSuperAdmin ||
                  button.permission === "all" ||
                  userPermissions.includes(button.permission)) &&
                (button.customRender ? (
                  <div key={index} className="w-full sm:w-auto">
                    {button.customRender}
                  </div>
                ) : (
                  <Button
                    key={index}
                    variant="outline"
                    className={
                      "flex items-center gap-2 w-full sm:w-auto h-9 font-medium text-xs " +
                      button?.className
                    }
                    onClick={() => button.onClick && button.onClick()}
                  >
                    {button.icon}
                    {button.name}
                  </Button>
                )),
            )}
            {/* ///////////////// */}
          </div>
        </div>

        <div className="overflow-x-auto w-full bg-white rounded-xl border border-gray-100 shadow-sm ">
          <Table className="min-w-max table-auto">
            <TableHeader className="border-b border-emerald-900/10">
              {table.getHeaderGroups().map((headerGroup:any) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-[#1B5B34] hover:bg-[#1B5B34] border-none"
                >
                  {headerGroup.headers.map((header:any) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none py-3 px-4"
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1.5 text-white font-semibold text-xs tracking-wider uppercase">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <ArrowUp className="w-4 h-4" />,
                            desc: <ArrowDown className="w-4 h-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowUpDown className="w-4 h-4 opacity-50" />
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center"
                  >
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-slate-600"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row:any) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell:any) => (
                      <TableCell
                        key={cell.id}
                        className="py-3.5 px-4 text-sm text-gray-700 font-medium"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

      
        {/* Pagination Controls */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-transparent text-slate-600 bg-transparent">
          {/* Numbered Pagination — LEFT */}
          <PaginationBar
            currentPage={
              backendPagination
                ? currentPage
                : table.getState().pagination.pageIndex + 1
            }
            totalPages={backendPagination ? totalPages : table.getPageCount()}
            onPageChange={(page) => {
              if (backendPagination) {
                onPageChange?.(page);
              } else {
                table.setPageIndex(page - 1);
              }
            }}
          />

          {/* Page info — RIGHT */}
          <div className="text-sm font-medium">
            {backendPagination ? (
              <>
                Page <span className="text-slate-900">{currentPage}</span> of{" "}
                <span className="text-slate-900">{totalPages}</span> | Total
                Items: <span className="text-slate-900">{totalItems}</span>
              </>
            ) : (
              <>
                Page{" "}
                <span className="text-slate-900">
                  {table.getState().pagination.pageIndex + 1}
                </span>{" "}
                of{" "}
                <span className="text-slate-900">{table.getPageCount()}</span> |
                Total Items:{" "}
                <span className="text-slate-900">
                  {table.getFilteredRowModel().rows.length}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </TableWrapper>
  );
}

/* ─── Smart Pagination Bar ─────────────────────────────────── */

function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  /** Build the list of page tokens – numbers or "…" */
  const getPages = (): (number | "…")[] => {
    const delta = 2; // how many pages to show on each side of current
    const pages: (number | "…")[] = [];

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) pages.push("…");

    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);

    if (rangeEnd < totalPages - 1) pages.push("…");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const btnBase =
    "h-8 min-w-[2rem] px-2.5 rounded-md text-xs font-semibold border transition-colors duration-150 select-none";
  const btnActive = "bg-[#1B5B34] text-white border-[#1B5B34] shadow-sm";
  const btnInactive =
    "bg-white text-slate-700 border-gray-200 hover:bg-[#1B5B34]/10 hover:border-[#1B5B34]/40 hover:text-[#1B5B34]";
  const btnNav =
    "bg-white text-slate-700 border-gray-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center gap-1">
      {/* Previous */}
      <button
        className={`${btnBase} ${btnNav}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="h-8 min-w-[2rem] flex items-center justify-center text-xs text-slate-400 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            className={`${btnBase} ${page === currentPage ? btnActive : btnInactive}`}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className={`${btnBase} ${btnNav}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}