import React from "react";
import { FileImage } from "lucide-react";
import { Loader } from "./common/Loader.js";
import type { UploadedImage } from "../types/index.js";

interface UploadQueueProps {
  items: UploadedImage[];
}

export const UploadQueue: React.FC<UploadQueueProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  const formatSize = (bytes: number): string => {
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(1)} MB`;
    }
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-md p-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100">
        <h3 className="text-xs font-semibold text-neutral-800">
          Validating Queue ({items.length})
        </h3>
        <Loader size="sm" />
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-md border border-neutral-200 text-xs"
          >
            <div className="flex items-center gap-2.5 overflow-hidden pr-2">
              <FileImage className="w-4 h-4 text-neutral-500 shrink-0" />
              <div className="truncate">
                <p className="font-medium text-neutral-900 truncate">
                  {item.originalName}
                </p>
                <p className="text-[10px] text-neutral-500">
                  {formatSize(item.fileSizeBytes)}
                </p>
              </div>
            </div>
            <Loader size="sm" className="shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
