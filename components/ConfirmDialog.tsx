import { AlertTriangle, FileImage, ShieldCheck } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  message,
  image,
  confirmLabel,
  confirmClass,
  iconsBgClass,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  image?: string;
  confirmLabel: string;
  iconsBgClass: string;
  confirmClass: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 rounded-3xl bg-[#111] border border-white/10 p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`size-10 rounded-2xl ${iconsBgClass} flex items-center justify-center border border-red-500/20`}
          >
            {image ? (
              <FileImage className="text-green-400 size-5" />
            ) : title === "Toggle Admin" ? (
              <ShieldCheck className="text-blue-400 size-5" />
            ) : (
              <AlertTriangle className="text-red-400 size-5" />
            )}
          </div>
          <h3 className="font-bold text-lg text-white">{title}</h3>
        </div>
        {image && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-widest">
              Proof Image
            </p>
            <p className="text-sm text-white/50 leading-relaxed mb-8">
              {message}
            </p>
            <img
              src={image}
              alt="Payment Proof"
              className="w-full rounded-2xl border border-white/10 object-cover max-h-96"
            />
          </div>
        )}
        <p className="text-sm text-white/50 leading-relaxed mb-8">{message}</p>
        <div className="flex gap-3 justify-end">
          {image ? null : (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
