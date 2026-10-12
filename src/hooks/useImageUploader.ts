import { useState, useEffect, useCallback, useRef } from "react";
import type { UploadedImage } from "../types/index.js";

const VALID_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);

const VALID_EXTENSIONS = [".jpg", ".jpeg", ".png", ".heic", ".heif"];

export function useImageUploader() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/images");
      if (!res.ok) {
        return;
      }
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setImages((prev) => {
          const previewMap = new Map<string, string>();
          for (const img of prev) {
            if (img.localPreviewUrl) {
              previewMap.set(img.id, img.localPreviewUrl);
            }
          }
          return json.data.map((item: UploadedImage) => ({
            ...item,
            localPreviewUrl: previewMap.get(item.id) || item.storageUrl,
          }));
        });
      }
    } catch (err) {
      console.error("Fetch images error:", err);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const hasProcessing = images.some((img) => img.status === "PROCESSING");

    if (hasProcessing) {
      pollingRef.current = setTimeout(() => {
        fetchImages();
      }, 1200);
    }

    return () => {
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
      }
    };
  }, [images, fetchImages]);

  const validateFilesClientSide = (
    files: File[],
  ): { valid: File[]; invalidNames: string[] } => {
    const valid: File[] = [];
    const invalidNames: string[] = [];

    for (const file of files) {
      const lowerName = file.name.toLowerCase();
      const hasValidExt = VALID_EXTENSIONS.some((ext) =>
        lowerName.endsWith(ext),
      );
      const hasValidMime =
        VALID_MIME_TYPES.has(file.type.toLowerCase()) || file.type === "";

      if (hasValidExt || hasValidMime) {
        valid.push(file);
      } else {
        invalidNames.push(file.name);
      }
    }

    return { valid, invalidNames };
  };

  const uploadFiles = async (selectedFiles: FileList | File[]) => {
    setErrorMessage(null);
    const fileArray = Array.from(selectedFiles);
    if (fileArray.length === 0) {
      return;
    }

    const { valid, invalidNames } = validateFilesClientSide(fileArray);

    if (invalidNames.length > 0) {
      setErrorMessage(
        `Invalid format: ${invalidNames.join(", ")}. Only JPG, PNG, and HEIC files are allowed.`,
      );
      if (valid.length === 0) {
        return;
      }
    }

    setIsUploading(true);

    const formData = new FormData();
    const tempImages: UploadedImage[] = [];

    for (const file of valid) {
      formData.append("images", file);
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      tempImages.push({
        id: tempId,
        originalName: file.name,
        fileName: file.name,
        storageUrl: "",
        localPreviewUrl: URL.createObjectURL(file),
        mimeType: file.type || "image/jpeg",
        fileSizeBytes: file.size,
        width: null,
        height: null,
        status: "PROCESSING",
        rejectionReasons: [],
        failureDetails: null,
        blurScore: null,
        faceCount: null,
        faceAreaRatio: null,
        createdAt: new Date().toISOString(),
      });
    }

    setImages((prev) => [...tempImages, ...prev]);

    try {
      const res = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.error || "Upload failed");
      }

      await fetchImages();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload images");
      await fetchImages();
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Delete failed:", err);
      await fetchImages();
    }
  };

  const cropImage = async (id: string, croppedBlob: Blob) => {
    const formData = new FormData();
    formData.append("image", croppedBlob, "cropped-face.jpg");

    setImages((prev) =>
      prev.map((img) => {
        if (img.id === id) {
          return {
            ...img,
            status: "PROCESSING",
            localPreviewUrl: URL.createObjectURL(croppedBlob),
          };
        }
        return img;
      }),
    );

    try {
      const res = await fetch(`/api/images/${id}/crop`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Crop re-validation failed");
      }

      await fetchImages();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update cropped image");
      await fetchImages();
    }
  };

  const seedDemo = async () => {
    setIsUploading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/images/seed/demo", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to seed demo photos");
      }
      await fetchImages();
    } catch (err: any) {
      setErrorMessage(err.message || "Demo seeding error");
    } finally {
      setIsUploading(false);
    }
  };

  const acceptedImages = images.filter((img) => img.status === "ACCEPTED");
  const rejectedImages = images.filter((img) => img.status === "REJECTED");
  const processingImages = images.filter((img) => img.status === "PROCESSING");

  return {
    images,
    acceptedImages,
    rejectedImages,
    processingImages,
    isUploading,
    errorMessage,
    clearError: () => setErrorMessage(null),
    uploadFiles,
    deleteImage,
    cropImage,
    seedDemo,
    refresh: fetchImages,
  };
}
