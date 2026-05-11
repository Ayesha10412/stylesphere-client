// types/table.ts

import { Row } from "@tanstack/react-table";

export type TableAction<T> = {
  icon: React.ReactNode;
  className: string;
  name: string;
  hoverText: string;
  onClick: (row: Row<T>) => void;
  permission: string;
  show?: (row: Row<T>) => boolean;
};
