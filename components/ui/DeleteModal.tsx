"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  itemName?: string;

  loading?: boolean;

  onConfirm: () => void;
};

export default function DeleteModal({
  open,
  onOpenChange,
  itemName = "this item",
  loading = false,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl space-y-2">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-xl">
            Delete Confirmation
          </DialogTitle>
        </DialogHeader>

        <p className="text-lg text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{itemName}</span>?
        </p>

        <div className="flex justify-end gap-2 ">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}