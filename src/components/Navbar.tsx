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
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-neutral-900 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="font-bold text-base text-neutral-900 tracking-tight">
            Aragon.ai
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onSeedDemo}
            isLoading={isSeeding}
            icon={<FlaskConical className="w-3.5 h-3.5 text-neutral-600" />}
          >
            Load Test Batch
          </Button>

          <Button
            onClick={onOpenGuidelines}
            icon={<HelpCircle className="w-3.5 h-3.5 text-neutral-600" />}
          >
            Photo Guidelines
          </Button>

          <div className="h-5 w-px bg-neutral-200" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-xs font-semibold">
              {userName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-neutral-800">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
