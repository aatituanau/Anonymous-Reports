import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

export default function DownloadNotice({ visible, title, items, onClose }) {
  useEffect(() => {
    if (visible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5 seconds before disappearing
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-auto max-w-sm rounded-xl border border-red-200 bg-white p-4 shadow-xl">
      <button 
        onClick={onClose} 
        className="absolute right-2 top-2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        <X size={16} />
      </button>
      <div className="flex items-start gap-3 pr-4">
        <AlertCircle className="mt-0.5 text-red-500 shrink-0" size={18} />
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          {items && items.length > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              Revisa el formulario, hay {items.length} {items.length === 1 ? 'campo pendiente' : 'campos pendientes'} marcados en rojo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
