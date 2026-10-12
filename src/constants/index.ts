export const ALLOWED_FORMATS = {
  MIME_TYPES: new Set(["image/jpeg", "image/png", "image/heic", "image/heif"]),
  EXTENSIONS: [".jpg", ".jpeg", ".png", ".heic", ".heif"],
  ACCEPT_STRING: ".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic",
} as const;

export const UI_CONFIG = {
  REQUIRED_PHOTOS_COUNT: 6,
  POLL_INTERVAL_MS: 1200,
} as const;

export const GUIDELINE_EXPLANATIONS: Record<string, string> = {
  BLUR: "We detected a blurry face. Please ensure the face is in focus.",
  FAR: "Face is too far from the camera. Please ensure the face is at an appropriate distance.",
  SIMILAR:
    "You've already uploaded images similar to this photo. Our AI suggests uploading a diversity of photos with different backgrounds, lighting, and clothing.",
  MULTIPLE:
    "Multiple people detected. Aragon models require photos with only you in the frame.",
  NO_FACE:
    "No face detected in photo. Please ensure your face is clearly visible.",
  RESOLUTION:
    "Resolution too low. Please upload photos that are at least 512x512 pixels.",
  DEFAULT:
    "This photo does not meet our headshot training guidelines. Please upload a clear portrait.",
} as const;
