import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  actionText = "Retry",
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      
      <div className="w-16 h-16 rounded-full bg-[#ff0000]/10 flex items-center justify-center mb-4">
        <AlertTriangle size={32} className="text-[#ff0000]" />
      </div>

      <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#F5F5F5]/60 max-w-xs mb-4">
        {message}
      </p>

      {onAction && (
        <button
        //   onClick={onAction}
          className="px-4 py-2 text-sm rounded-lg bg-[#FF007F] hover:bg-[#FF007F]/90 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
