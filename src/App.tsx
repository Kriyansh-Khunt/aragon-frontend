import { useState } from "react";
import { AlertCircle, X, Sparkles, UploadCloud } from "lucide-react";
import { Navbar } from "./components/Navbar.js";
import { Dropzone } from "./components/Dropzone.js";
import { UploadQueue } from "./components/UploadQueue.js";
import { ProcessingSection } from "./components/ProcessingSection.js";
import { AcceptedSection } from "./components/AcceptedSection.js";
import { RejectedSection } from "./components/RejectedSection.js";
import { RequirementsModal } from "./components/RequirementsModal.js";
import { Button } from "./components/common/Button.js";
import { EmptyState } from "./components/common/EmptyState.js";
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
    isInitialLoading,
    errorMessage,
    clearError,
    uploadFiles,
    deleteImage,
    cropImage,
    seedDemo,
  } = useImageUploader();

  const isReady = acceptedImages.length >= 6;

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col font-sans">
      <Navbar
        userName="Kriyansh Khunt"
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onSeedDemo={seedDemo}
        isSeeding={isUploading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={clearError}
              className="p-1 text-red-500 hover:text-red-800 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white border border-neutral-200 rounded-md p-4 sm:p-5">
              <h2 className="text-sm font-bold text-neutral-900 mb-1">
                Upload Source Photos
              </h2>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                Add portraits of yourself. Our AI checks resolution, blur, face
                framing and similarity in real-time.
              </p>

              <Dropzone onFilesSelected={uploadFiles} disabled={isUploading} />
            </div>

            <UploadQueue items={processingImages} />

            <div className="bg-white border border-neutral-200 rounded-md p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  {acceptedImages.length} of 6 photos ready
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Minimum 6 good portraits required
                </p>
              </div>

              <Button
                variant="primary"
                disabled={!isReady}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Train AI
              </Button>
            </div>
          </aside>

          <section className="lg:col-span-8">
            {isInitialLoading ? (
              <div className="bg-white border border-neutral-200 rounded-md p-12 flex flex-col items-center justify-center min-h-60">
                <Loader className="w-5 h-5 text-neutral-500 mb-3" />
                <p className="text-xs font-semibold text-neutral-800">
                  Loading portraits
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Fetching computer vision records
                </p>
              </div>
            ) : (
              <>
                <ProcessingSection
                  images={processingImages}
                  onDelete={deleteImage}
                  onCropSave={cropImage}
                />

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
                  <EmptyState
                    icon={<UploadCloud className="w-5 h-5 text-neutral-500" />}
                    title="No photos uploaded yet"
                    description="Select photos on the left or load a sample test batch to evaluate the computer vision pipeline."
                    action={
                      <Button
                        variant="outline"
                        onClick={seedDemo}
                        isLoading={isUploading}
                      >
                        Load Test Batch
                      </Button>
                    }
                  />
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <RequirementsModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </div>
  );
}

export default App;
