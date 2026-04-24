"use client";

type ToastType = "success" | "error";

type ToastPayload = {
  type: ToastType;
  message: string;
};

const listeners = new Set<(payload: ToastPayload) => void>();

export function emitToast(payload: ToastPayload) {
  listeners.forEach((listener) => listener(payload));
}

export function subscribeToast(
  listener: (payload: ToastPayload) => void
) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}