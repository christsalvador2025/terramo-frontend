"use client";
import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface FormStatusProps {
  type: "success" | "error" | "warning";
  message: string;
  onDismiss?: () => void;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  type,
  message,
  onDismiss,
}) => {
  const styles = {
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: XCircle,
      iconColor: "text-red-500",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: AlertCircle,
      iconColor: "text-yellow-500",
    },
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-md border p-4 ${config.container}`}>
      <div className="flex items-center">
        <Icon className={`mr-3 size-5 ${config.iconColor}`} />
        <p className="text-sm font-medium">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};