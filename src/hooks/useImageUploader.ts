import { useState, useEffect, useCallback, useRef } from "react";
import { ALLOWED_FORMATS, UI_CONFIG } from "../constants/index.js";
import type { UploadedImage } from "../types/index.js";

export function useImageUploader() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewMapRef = useRef<Map<string, string>>(new Map());

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/images");
      if (!res.ok) {
        return;
      }
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setImages((prev) => {
          const tempItems = prev.filter((img) => img.id.startsWith("temp-"));
          const mergedServer = json.data.map((item: UploadedImage) => {
            const preview =
              previewMapRef.current.get(item.id) ||
              previewMapRef.current.get(item.originalName) ||
              item.storageUrl;
            return {
              ...item,
              localPreviewUrl: preview,
            };
          });

          return [...tempItems, ...mergedServer];
        });
      }
    } catch (err) {
      console.error("Fetch images error:", err);
    } finally {
      setIsInitialLoading(false);
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
      }, UI_CONFIG.POLL_INTERVAL_MS);
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
      const hasValidExt = ALLOWED_FORMATS.EXTENSIONS.some((ext) =>
        lowerName.endsWith(ext),
      );
      const hasValidMime =
        ALLOWED_FORMATS.MIME_TYPES.has(file.type.toLowerCase()) ||
        file.type === "";

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
        `Invalid format: ${invalidNames.join(", ")}. Only JPG, PNG and HEIC files are allowed.`,
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
      const previewUrl = URL.createObjectURL(file);
      previewMapRef.current.set(tempId, previewUrl);
      previewMapRef.current.set(file.name, previewUrl);

      tempImages.push({
        id: tempId,
        originalName: file.name,
        fileName: file.name,
        storageUrl: "",
        localPreviewUrl: previewUrl,
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

      const uploadResult = await res.json();
      if (Array.isArray(uploadResult.data)) {
        const createdRecords: UploadedImage[] = uploadResult.data.map(
          (rec: any) => {
            const preview = previewMapRef.current.get(rec.originalName) || "";
            if (preview) {
              previewMapRef.current.set(rec.id, preview);
            }
            return {
              ...rec,
              localPreviewUrl: preview,
            };
          },
        );

        setImages((prev) => {
          const nonTemp = prev.filter((img) => !img.id.startsWith("temp-"));
          return [...createdRecords, ...nonTemp];
        });
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
    const previewUrl = URL.createObjectURL(croppedBlob);
    previewMapRef.current.set(id, previewUrl);

    setImages((prev) =>
      prev.map((img) => {
        if (img.id === id) {
          return {
            ...img,
            status: "PROCESSING",
            localPreviewUrl: previewUrl,
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
    isInitialLoading,
    errorMessage,
    clearError: () => setErrorMessage(null),
    uploadFiles,
    deleteImage,
    cropImage,
    seedDemo,
    refresh: fetchImages,
  };
}
