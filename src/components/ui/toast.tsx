"use client";
import { create } from "zustand";
import { useEffect } from "react";
import { X } from "lucide-react";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
  duration?: number;
};

type ToastState = {
  toasts: ToastItem[];
  push: (t: Omit<ToastItem, "id">) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (t) =>
    set((s) => ({
      toasts: [...s.toasts, { id: Math.random().toString(36).slice(2), duration: 3000, ...t }],
    })),
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

export function toast(t: Omit<ToastItem, "id">) {
  useToastStore.getState().push(t);
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    const timers = toasts.map((t) => {
      const ms = t.duration ?? 3000;
      const id = setTimeout(() => remove(t.id), ms);
      return () => clearTimeout(id);
    });
    return () => { timers.forEach((fn) => fn()); };
  }, [toasts, remove]);

  return (
    <div className="pointer-events-none fixed right-3 top-3 z-[100] flex w-[min(92vw,380px)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-[12px] border p-3 shadow-lg animate-[fadeUp_.25s_ease-out] ${
            t.variant === "error"
              ? "border-red-500/40 bg-red-50"
              : t.variant === "success"
              ? "border-emerald-500/40 bg-emerald-50"
              : "border-neutral-300 bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-medium">{t.title}</div>
              {t.description && <div className="text-sm text-neutral-600">{t.description}</div>}
            </div>
            <button className="p-1 text-neutral-500 hover:text-neutral-800" onClick={() => remove(t.id)}>
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}