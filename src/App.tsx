import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Navbar } from "./components/Navbar.js";
import { Dropzone } from "./components/Dropzone.js";
import { AcceptedSection } from "./components/AcceptedSection.js";
import { RejectedSection } from "./components/RejectedSection.js";
import { RequirementsModal } from "./components/RequirementsModal.js";
import { Loader } from "./components/common/Loader.js";
import { useImageUploader } from "./hooks/useImageUploader.js";

export function App() {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

  const {
    images,
    acceptedImages,
    rejectedImages,
    processingImages,
    isUploading,
    errorMessage,
    clearError,
    uploadFiles,
    deleteImage,
    cropImage,
    seedDemo,
  } = useImageUploader();

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col font-sans">
      <Navbar
        acceptedCount={acceptedImages.length}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onSeedDemo={seedDemo}
        isSeeding={isUploading}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/80 rounded-md text-red-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={clearError}
              className="p-1 text-red-400 hover:text-white rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Upload Your Source Photos
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Our ingestion AI evaluates each photo in real-time across
            resolution, blur, framing, face count, and diversity to guarantee
            studio-quality headshots.
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <Dropzone onFilesSelected={uploadFiles} disabled={isUploading} />
        </div>

        {processingImages.length > 0 && (
          <div className="mb-6 p-3 bg-neutral-900 border border-neutral-800 rounded-md flex items-center gap-3">
            <Loader size="sm" />
            <span className="text-xs text-neutral-300">
              Validating {processingImages.length} photo
              {processingImages.length > 1 ? "s" : ""} through computer vision
              pipeline
            </span>
          </div>
        )}

        <AcceptedSection
          images={acceptedImages}
          onDelete={deleteImage}
          onCropSave={cropImage}
        />

        <RejectedSection
          images={rejectedImages}
          acceptedCount={acceptedImages.length}
          onDelete={deleteImage}
          onCropSave={cropImage}
        />

        {images.length === 0 && !isUploading && (
          <div className="text-center py-12 border border-neutral-800/50 rounded-md bg-neutral-900/20">
            <p className="text-xs text-neutral-400">
              No photos uploaded yet. Drop photos above or click{" "}
              <button
                onClick={seedDemo}
                className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
              >
                Load Test Batch
              </button>{" "}
              to test the validation pipeline with sample cases.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-neutral-800/60 py-4 text-center text-[11px] text-neutral-400">
        Aragon.ai Technical Evaluation &bull; Computer Vision Pre-Ingestion
        Architecture
      </footer>

      <RequirementsModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </div>
  );
}

export default App;
