"use client";

import React, { useState } from "react";

import api from "@/config/api";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { AlertTriangle, CheckCircle2 } from "lucide-react";

import type { Seller } from "@/types/data";
import { handleApiError } from "@/helper/handleApiError";
import { CreateSellerFormData } from "@/lib/schema";
import { toast } from "sonner";

type ReviewApplicationProps = {
  open: boolean;
  onClose: () => void;
  seller: Seller | null;
  type: "approved" | "rejected" | null;
  refetch: () => void;
};

export default function ReviewApplication({
  open,
  onClose,
  seller,
  type,
  refetch,
}: ReviewApplicationProps) {
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!seller || !type) return;

    setLoading(true);

    try {
      await api.patch(`/seller/${seller._id}`, {
        status: type,
      });

      refetch();

      onClose();
    } catch (error: unknown) {
      console.error(error);

      toast.error("Updated failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <div className="flex flex-col items-center text-center py-4">
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              type === "approved" ? "bg-[#008080]/10" : "bg-red-100"
            }`}
          >
            {type === "approved" ? (
              <CheckCircle2 className="w-8 h-8 text-[#008080]" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-500" />
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {type === "approved" ? "Approve Seller?" : "Reject Seller?"}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2">
            {type === "approved"
              ? "Are you sure you want to approve this seller application?"
              : "Are you sure you want to reject this seller application?"}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-6 w-full">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={loading}
              onClick={handleReview}
              className={
                type === "approved"
                  ? "flex-1 bg-[#008080] hover:bg-[#008080]"
                  : "flex-1 bg-red-500 hover:bg-red-600"
              }
            >
              {loading
                ? "Processing..."
                : type === "approved"
                  ? "Approve"
                  : "Reject"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
