import { Eye, EyeOff, Download } from "lucide-react";

export default function DownloadControls({
  onTogglePreview,
  onDownload,
  previewVisible,
  downloadEnabled,
  disabledReason,
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-xl border border-slate-200">
      <button
        onClick={onTogglePreview}
        type="button"
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-slate-100 px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 border border-slate-200"
        title={previewVisible ? "Ocultar vista previa" : "Ver PDF"}
        aria-pressed={previewVisible}
      >
        {previewVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        <span className="hidden sm:inline">{previewVisible ? "Ocultar PDF" : "Vista Previa"}</span>
      </button>

      <button
        className={
          "flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-white transition-colors " +
          (downloadEnabled
            ? "bg-blue-600 hover:bg-blue-700 shadow-md"
            : "bg-slate-400 cursor-not-allowed opacity-80")
        }
        onClick={onDownload}
        type="button"
        title={downloadEnabled ? "Descargar PDF Oficial" : disabledReason}
        aria-disabled={!downloadEnabled}
      >
        <Download size={18} />
        Descargar Oficial
      </button>
    </div>
  );
}
