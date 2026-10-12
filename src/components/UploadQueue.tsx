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
        <div className="flex items-center gap-2">
          <Loader size="sm" />
          <h3 className="text-xs font-semibold text-neutral-900">
            Ingestion Queue ({items.length})
          </h3>
        </div>
        <span className="text-[11px] text-neutral-400">Processing</span>
      </div>

      <div className="divide-y divide-neutral-100 max-h-56 overflow-y-auto scrollbar-thin">
        {items.map((item) => {
          const previewSrc = item.localPreviewUrl || item.storageUrl;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 px-1 text-xs"
            >
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                {previewSrc ? (
                  <img
                    src={previewSrc}
                    alt={item.originalName}
                    className="w-7 h-7 rounded-md object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <FileImage className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                )}
                <div className="truncate">
                  <p className="font-medium text-neutral-900 truncate">
                    {item.originalName}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {formatSize(item.fileSizeBytes)}
                  </p>
                </div>
              </div>
              <Loader size="sm" className="shrink-0 text-neutral-400" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
