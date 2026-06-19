import { AlertCircle, X } from 'lucide-react';

export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 mx-4 mb-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
      <span className="flex-1 leading-snug">{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
