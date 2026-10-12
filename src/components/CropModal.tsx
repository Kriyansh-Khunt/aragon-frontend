import React, { useState, useRef, useEffect } from "react";
import { X, Check, ZoomIn } from "lucide-react";
import { Button } from "./common/Button.js";

interface CropModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onSave: (blob: Blob) => void;
}

export const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
  onSave,
}) => {
  const [scale, setScale] = useState<number>(1.4);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      setScale(1.4);
      setPosition({ x: 0, y: 0 });
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {
      return;
    }
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSaveCrop = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");

    if (!ctx || !imgRef.current) {
      return;
    }

    const img = imgRef.current;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 640, 640);

    ctx.save();
    ctx.translate(320 + position.x, 320 + position.y);
    ctx.scale(scale, scale);

    const aspect = img.naturalWidth / img.naturalHeight;
    let drawW = 640;
    let drawH = 640;
    if (aspect > 1) {
      drawH = 640 / aspect;
    } else {
      drawW = 640 * aspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onSave(blob);
          onClose();
        }
      },
      "image/jpeg",
      0.95,
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white border border-neutral-200 rounded-md overflow-hidden text-neutral-900 cursor-default"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
          <h3 className="text-sm font-semibold text-neutral-900">
            Crop Photo Closer
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col items-center">
          <p className="text-xs text-neutral-500 mb-3 text-center">
            Drag photo and use the zoom slider so your face and shoulders fill
            the frame.
          </p>

          <div
            className="relative w-72 h-72 rounded-md overflow-hidden bg-neutral-100 border border-neutral-300 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              crossOrigin="anonymous"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
              }}
              className="w-full h-full object-contain pointer-events-none transition-transform duration-75"
            />
            <div className="absolute inset-0 pointer-events-none border border-emerald-500/50 rounded-md" />
          </div>

          <div className="w-72 mt-4 flex items-center gap-3">
            <ZoomIn className="w-4 h-4 text-neutral-500" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(Number.parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-neutral-100 bg-neutral-50/50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveCrop}
            icon={<Check className="w-3.5 h-3.5" />}
          >
            Apply & Re-validate
          </Button>
        </div>
      </div>
    </div>
  );
};
