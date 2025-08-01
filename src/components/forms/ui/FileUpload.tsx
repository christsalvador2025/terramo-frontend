import React, { useRef, useState } from "react";
import { cn } from "@/lib/_utils/cn";

interface FileUploadProps {
  label?: string;
  required?: boolean;
  error?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  value?: string;
  placeholder?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  required,
  error,
  accept = "image/*",
  onChange,
  value,
  placeholder = "Search files",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onChange?.(file);
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={placeholder}
          value={fileName || value || ""}
          readOnly
          className={cn(
            "flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            error && "border-red-500"
          )}
        />
        <button
          type="button"
          onClick={handleFileSelect}
          className="rounded-md bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Browse
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};