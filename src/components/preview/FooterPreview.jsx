import EmptyValue from "./EmptyValue";

export function FooterPreview({formData}) {
  return (
    <div className="mt-auto flex flex-col justify-end">
      <div className="mt-4 flex flex-col items-center">
        <div className="mb-2 h-px w-64 border-t border-slate-800" />
        <p className="text-[13px] font-bold uppercase text-slate-800">
          {formData.nombreDenunciante ? (
            formData.nombreDenunciante
          ) : (
            <EmptyValue>________________________</EmptyValue>
          )}
        </p>
        <p className="text-[12px] font-medium uppercase text-slate-600 mt-1">
          {formData.identificacion ? (
            `CI / Pasaporte: ${formData.identificacion}`
          ) : (
            <EmptyValue>CI: ________________</EmptyValue>
          )}
        </p>
      </div>

      <footer className="mt-6 flex justify-between border-t border-slate-300 pt-2 text-[9px] font-bold uppercase text-slate-400">
        <span>Proceso: Régimen Disciplinario</span>
      </footer>
    </div>
  );
}

export default FooterPreview;
