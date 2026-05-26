import EmptyValue from "./EmptyValue";

export function FooterPreview({formData}) {
  return (
    <div className="mt-auto flex flex-col">
      <div className="mt-8 flex flex-col items-center">
        <div className="mb-3 h-px w-48 border-t border-on-surface" />
        <p className="text-[13px] font-bold uppercase">
          {formData.nombreDenunciante ? (
            formData.nombreDenunciante
          ) : (
            <EmptyValue>________________________</EmptyValue>
          )}
        </p>
        <p className="text-[12px] text-on-surface-variant italic">
          (Nombre del denunciante según formulario)
        </p>
      </div>

      <footer className="mt-auto flex justify-between border-t border-outline-variant pt-4 text-[9px] font-bold uppercase text-outline">
        <span>Proceso: Régimen Disciplinario</span>
        <span>Página 01 de 01</span>
      </footer>
    </div>
  );
}

export default FooterPreview;
