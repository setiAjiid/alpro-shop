// components/ui/Toast.tsx
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToastStore } from "@/store/useToastStore";

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export const Toast: React.FC<ToastProps> = ({ id, message, type }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  const variants = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border p-4 shadow-lg",
        variants[type],
      )}
    >
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => removeToast(id)}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};
