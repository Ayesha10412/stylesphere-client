"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/config/api";

export type Category = {
  _id: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get("/category");

      const raw: Category[] = res?.data?.data?.data || [];

      const formatted: SelectOption[] = raw
        .filter((c) => !c.isDeleted)
        .map((c) => ({
          value: c._id,
          label: c.name,
        }));

      setCategories(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refetch: fetchCategories,
  };
};
