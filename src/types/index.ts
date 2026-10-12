export type ImageStatus = "PROCESSING" | "ACCEPTED" | "REJECTED";

export interface RejectionDetail {
  code: string;
  label: string;
  description: string;
}

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
  rejectionDetails?: RejectionDetail[];
  failureDetails?: {
    blurScore?: number;
    isBlurry?: boolean;
    faceCount?: number;
    faceAreaRatio?: number;
    perceptualHash?: string;
    isDuplicate?: boolean;
    matchedImageId?: string;
    rejectionDetails?: RejectionDetail[];
  } | null;
  blurScore: number | null;
  faceCount: number | null;
  faceAreaRatio: number | null;
  createdAt: string;
  localPreviewUrl?: string;
}
