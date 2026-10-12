import React, { useState } from "react";
import { Trash2, Crop, CheckCircle } from "lucide-react";
import { GuidelineTooltip } from "./GuidelineTooltip.js";
import { CropModal } from "./CropModal.js";
import { Loader } from "./common/Loader.js";
import type { UploadedImage } from "../types/index.js";

interface PhotoCardProps {
  image: UploadedImage;
  onDelete: (id: string) => void;
  onCropSave: (id: string, blob: Blob) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  onDelete,
  onCropSave,
}) => {
  const [isCropOpen, setIsCropOpen] = useState(false);
  const displaySrc = image.localPreviewUrl || image.storageUrl;

  const firstDetail = image.failureDetails?.rejectionDetails?.[0];
  const label =
    firstDetail?.label ||
    image.rejectionReasons[0] ||
    "Did not meet guidelines";
  const description =
    firstDetail?.description ||
    "This photo does not meet our headshot training guidelines. Please upload a clear portrait.";
  const isFar = label.toLowerCase().includes("far");

  return (
    <>
      <div className="flex flex-col items-center group w-40">
        <div className="relative w-40 h-48 bg-neutral-100 border border-neutral-200 rounded-md overflow-hidden flex items-center justify-center">
          {displaySrc ? (
            <img
              src={displaySrc}
              alt={image.originalName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center">
              <Loader size="md" />
            </div>
          )}

          <button
            onClick={() => onDelete(image.id)}
            className="absolute top-2 right-2 w-7 h-7 bg-white/95 hover:bg-white text-neutral-700 hover:text-red-600 rounded-full flex items-center justify-center transition-colors border border-neutral-200"
            title="Delete photo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {image.status === "REJECTED" && isFar && (
            <div className="absolute bottom-2 left-2 right-2 flex justify-center">
              <button
                onClick={() => setIsCropOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/95 hover:bg-white text-neutral-900 text-xs font-medium rounded-md border border-neutral-300 transition-colors"
              >
                <Crop className="w-3.5 h-3.5" />
                <span>Crop</span>
              </button>
            </div>
          )}

          {image.status === "PROCESSING" && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center">
              <Loader size="lg" />
            </div>
          )}
        </div>

        <div className="mt-2 text-center min-h-6 flex items-center justify-center">
          {image.status === "ACCEPTED" && (
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approved</span>
            </div>
          )}

          {image.status === "REJECTED" && (
            <GuidelineTooltip label={label} description={description} />
          )}

          {image.status === "PROCESSING" && <Loader size="sm" />}
        </div>
      </div>

      <CropModal
        isOpen={isCropOpen}
        imageUrl={displaySrc}
        onClose={() => setIsCropOpen(false)}
        onSave={(blob) => onCropSave(image.id, blob)}
      />
    </>
  );
};
