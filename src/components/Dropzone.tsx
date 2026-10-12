import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

interface DropzoneProps {
  onFilesSelected: (files: FileList | File[]) => void;
  disabled?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  disabled = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) {
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative w-full border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragOver
          ? "border-emerald-500 bg-emerald-500/5"
          : "border-neutral-800 hover:border-neutral-700 bg-neutral-900/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />

      <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 mb-3 border border-neutral-700">
        {isDragOver ? (
          <UploadCloud className="w-6 h-6 text-emerald-400" />
        ) : (
          <ImageIcon className="w-6 h-6 text-neutral-400" />
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-white mb-1">
          Drag & drop your photos here, or{" "}
          <span className="text-emerald-400 underline underline-offset-2">
            browse files
          </span>
        </p>
        <p className="text-xs text-neutral-400">
          Supports JPEG, PNG, and Apple HEIC (min 512x512, up to 25MB each)
        </p>
      </div>
    </div>
  );
};
