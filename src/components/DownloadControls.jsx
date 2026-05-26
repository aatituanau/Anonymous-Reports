export default function DownloadControls({
  onTogglePreview,
  onDownload,
  previewVisible,
  downloadEnabled,
  disabledReason,
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <button
        onClick={onTogglePreview}
        type="button"
        className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-95"
        title={previewVisible ? "Ocultar vista previa" : "Ver PDF"}
        aria-pressed={previewVisible}
      >
        {previewVisible ? "Ocultar PDF" : "Ver PDF"}
      </button>

      <button
        className={
          "flex items-center gap-3 rounded-full px-6 py-4 text-sm font-bold text-white shadow-2xl transition active:scale-95 sm:px-8 " +
          (downloadEnabled
            ? "bg-primary hover:-translate-y-1 hover:bg-secondary shadow-primary/30"
            : "bg-gray-400 opacity-60 hover:opacity-70")
        }
        onClick={onDownload}
        type="button"
        title={downloadEnabled ? "Descargar PDF Oficial" : disabledReason}
        aria-disabled={!downloadEnabled}
      >
        Descargar PDF Oficial
      </button>
    </div>
  );
}
