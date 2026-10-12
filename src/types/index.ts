export type ImageStatus = "PROCESSING" | "ACCEPTED" | "REJECTED";

export interface UploadedImage {
  id: string;
  originalName: string;
  fileName: string;
  storageUrl: string;
  mimeType: string;
  fileSizeBytes: number;
  width: number | null;
  height: number | null;
  status: ImageStatus;
  rejectionReasons: string[];
  failureDetails?: {
    blurScore?: number;
    isBlurry?: boolean;
    faceCount?: number;
    faceAreaRatio?: number;
    perceptualHash?: string;
    isDuplicate?: boolean;
    matchedImageId?: string;
  } | null;
  blurScore: number | null;
  faceCount: number | null;
  faceAreaRatio: number | null;
  createdAt: string;
  localPreviewUrl?: string;
}
