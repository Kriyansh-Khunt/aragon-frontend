import React from "react";
import { HelpCircle, FlaskConical } from "lucide-react";
import { Button } from "./common/Button.js";

interface NavbarProps {
  userName?: string;
  onOpenGuidelines: () => void;
  onSeedDemo: () => void;
  isSeeding: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  userName = "Kriyansh Khunt",
  onOpenGuidelines,
  onSeedDemo,
  isSeeding,
}) => {
  return (
    <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-neutral-900 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
            A
          </div>
          <span className="font-bold text-sm sm:text-base text-neutral-900 tracking-tight">
            Aragon.ai
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            size="sm"
            onClick={onSeedDemo}
            isLoading={isSeeding}
            icon={<FlaskConical className="w-3.5 h-3.5 text-neutral-600" />}
          >
            <span className="hidden sm:inline">Load Test Batch</span>
            <span className="sm:hidden">Test Batch</span>
          </Button>

          <Button
            size="sm"
            onClick={onOpenGuidelines}
            icon={<HelpCircle className="w-3.5 h-3.5 text-neutral-600" />}
          >
            <span className="hidden sm:inline">Photo Guidelines</span>
            <span className="sm:hidden">Guidelines</span>
          </Button>

          <div className="h-4 sm:h-5 w-px bg-neutral-200 mx-0.5 sm:mx-1" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-xs font-semibold shrink-0">
              {userName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-neutral-800 hidden md:inline truncate max-w-30">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
