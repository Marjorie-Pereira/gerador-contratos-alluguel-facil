import React from "react";

interface LoadingOverlayProps {
  isOpen: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isOpen,
  message = "Gerando arquivo, aguarde...",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col items-center space-y-4 p-6 bg-white/10 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg max-w-xs text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-blue-500" />

          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border border-white/5 animate-ping opacity-25" />
        </div>

        <p className="text-white font-medium text-lg tracking-wide animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
