import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-white border border-neutral-200 rounded-md p-8 text-center flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center mb-2.5 border border-neutral-200">
        {icon}
      </div>
      <h3 className="text-xs font-semibold text-neutral-800">{title}</h3>
      <p className="text-[11px] text-neutral-500 mt-1 max-w-sm leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-3.5">{action}</div>}
    </div>
  );
};
