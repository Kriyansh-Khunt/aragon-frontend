import React from "react";
import { Sparkles, HelpCircle, FlaskConical } from "lucide-react";

interface NavbarProps {
  acceptedCount: number;
  onOpenGuidelines: () => void;
  onSeedDemo: () => void;
  isSeeding: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  acceptedCount,
  onOpenGuidelines,
  onSeedDemo,
  isSeeding,
}) => {
  const isReady = acceptedCount >= 6;

  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-linear-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white tracking-tight">
                Aragon.ai
              </span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded-md border border-neutral-700">
                Studio Intake
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              AI Headshot Model Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSeedDemo}
            disabled={isSeeding}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-md border border-neutral-800 transition-colors disabled:opacity-50"
          >
            <FlaskConical className="w-3.5 h-3.5 text-teal-400" />
            <span>{isSeeding ? "Seeding..." : "Load Test Batch"}</span>
          </button>

          <button
            onClick={onOpenGuidelines}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-md border border-neutral-800 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Photo Guidelines</span>
          </button>

          <div className="h-6 w-px bg-neutral-800" />

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Status:</span>
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                isReady
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              {acceptedCount} / 6 Good Photos
            </span>
          </div>

          <button
            disabled={!isReady}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              isReady
                ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Headshots</span>
          </button>
        </div>
      </div>
    </header>
  );
};
