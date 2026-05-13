"use client";

import { ReactNode } from "react";

import { Row } from "@tanstack/react-table";

import { CustomTooltip } from "./CustomTooltip";

export type TableActionType<T> = {
  icon: ReactNode;

  className: string;

  name: string;

  hoverText: string;

  onClick: (row: Row<T>) => void;

  permission: string;

  show?: (row: Row<T>) => boolean;
};

type Props<T> = {
  row: Row<T>;

  actions: TableActionType<T>[];
};

export default function TableAction<T>({
  row,
  actions,
}: Props<T>) {
  return (
    <div className="flex gap-2 items-center">
      {actions
        .filter((action) => {
          if (!action.show) return true;

          return action.show(row);
        })
        .map((action, index) => (
          <CustomTooltip
            key={index}
            hoverText={action.hoverText}
          >
            <div
              className={`p-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${action.className}`}
              onClick={() => action.onClick(row)}
            >
              {action.icon}
            </div>
          </CustomTooltip>
        ))}
    </div>
  );
}