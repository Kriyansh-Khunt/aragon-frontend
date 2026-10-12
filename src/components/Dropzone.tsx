import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { ALLOWED_FORMATS } from "../constants/index.js";

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
      className={`w-full border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragOver
          ? "border-emerald-600 bg-emerald-50/50"
          : "border-neutral-300 hover:border-neutral-400 bg-white"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ALLOWED_FORMATS.ACCEPT_STRING}
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />

      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 mb-3 border border-neutral-200">
        {isDragOver ? (
          <UploadCloud className="w-5 h-5 text-emerald-600" />
        ) : (
          <ImageIcon className="w-5 h-5 text-neutral-600" />
        )}
      </div>

      <div className="text-center">
        <p className="text-xs font-semibold text-neutral-800 mb-1">
          Drag & drop photos or{" "}
          <span className="text-emerald-700 underline underline-offset-2">
            browse
          </span>
        </p>
        <p className="text-[11px] text-neutral-500">
          Supports JPG, PNG, and HEIC (up to 25MB each)
        </p>
      </div>
    </div>
  );
};
