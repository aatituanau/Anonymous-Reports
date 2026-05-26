import EmptyValue from "./EmptyValue";

export function FooterPreview({formData}) {
  return (
    <div className="mt-auto flex flex-col justify-end">
      <div className="mt-4 flex flex-col items-center">
        <div className="mb-2 h-px w-48 border-t border-on-surface" />
        <p className="text-[13px] font-bold uppercase">
          {formData.nombreDenunciante ? (
            formData.nombreDenunciante
          ) : (
            <EmptyValue>________________________</EmptyValue>
          )}
        </p>
      </div>

      <footer className="mt-4 flex justify-between border-t border-outline-variant pt-2 text-[9px] font-bold uppercase text-outline">
        <span>Proceso: Régimen Disciplinario</span>
      </footer>
    </div>
  );
}

export default FooterPreview;
