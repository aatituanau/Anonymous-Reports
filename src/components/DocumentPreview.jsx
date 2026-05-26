import {
  DOCUMENT_REFERENCE,
  INSTITUTION_NAME,
  INSTITUTION_SUBTITLE,
} from "../config";

const labelValueClassName = "font-semibold text-on-surface";

const gravedadLabels = {
  leve: "Leve",
  grave: "Grave",
  muy_grave: "Muy grave",
};

function EmptyValue({children}) {
  return (
    <span className="border-b border-dotted border-outline-variant px-1 text-on-surface-variant">
      {children}
    </span>
  );
}

export default function DocumentPreview({formData}) {
  const fechaActual = new Date().toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex h-full items-start justify-center overflow-y-auto bg-surface-container px-4 py-8 sm:px-8 lg:px-10">
      <div
        id="document-preview"
        className="flex w-full max-w-[840px] flex-col bg-white p-8 shadow-document sm:p-10"
        style={{aspectRatio: "1 / 1.414"}}
      >
        <header className="mb-8 flex items-center justify-between border-b-2 border-primary pb-5">
          <img src="/logo-uce.png" alt="Logo UCE" className="w-20 h-auto" />

          <div className="flex-1 px-4 text-center">
            <h3 className="text-[18px] font-bold uppercase leading-tight text-primary">
              {INSTITUTION_NAME}
            </h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {INSTITUTION_SUBTITLE}
            </p>
            <p className="mt-1 text-[10px] italic text-on-surface-variant">
              "Omnium Potentior Est Sapientia"
            </p>
          </div>

          <img
            src="/logo-etica.png"
            alt="Sello Ética"
            className="w-20 h-auto"
          />
        </header>

        <div className="flex-1 space-y-6 text-[14px] leading-7 text-on-surface">
          <div className="text-right text-[13px]">
            <p className="font-bold">Quito, D.M., {fechaActual}</p>
            <p>Ref: {DOCUMENT_REFERENCE}</p>
          </div>

          <div className="space-y-4">
            <p className="font-bold uppercase">A LA PROCURADURÍA GENERAL,</p>
            <p>
              Yo,{" "}
              <span className={labelValueClassName}>
                {formData.nombreDenunciante || (
                  <EmptyValue>________________________</EmptyValue>
                )}
              </span>
              , con identificación No.{" "}
              <span className={labelValueClassName}>
                {formData.identificacion || (
                  <EmptyValue>________________</EmptyValue>
                )}
              </span>
              , correo institucional{" "}
              <span className={labelValueClassName}>
                {formData.correoInstitucional || (
                  <EmptyValue>________________</EmptyValue>
                )}
              </span>
              , facultad{" "}
              <span className={labelValueClassName}>
                {formData.facultad || <EmptyValue>________________</EmptyValue>}
              </span>
              , comparezco y denuncio a:
            </p>

            <p className="mt-4 font-bold uppercase">Datos del denunciado:</p>
            <p>
              Sr./Sra.{" "}
              <span className={labelValueClassName}>
                {formData.nombreDenunciado || (
                  <EmptyValue>________________________</EmptyValue>
                )}
              </span>
              , en su calidad de{" "}
              <span className={labelValueClassName}>
                {formData.calidadDenunciado || (
                  <EmptyValue>________________</EmptyValue>
                )}
              </span>{" "}
              de esta institución.
            </p>

            <p>
              Nivel de gravedad de la denuncia:{" "}
              <span className={labelValueClassName}>
                {gravedadLabels[formData.gravedad] || (
                  <EmptyValue>________________</EmptyValue>
                )}
              </span>
            </p>

            <p>
              Artículo / código de falta:{" "}
              <span className={labelValueClassName}>
                {formData.articuloFalta || (
                  <EmptyValue>________________</EmptyValue>
                )}
              </span>
            </p>

            {formData.descripcionArticuloFalta ? (
              <p className="rounded-lg border border-outline-variant bg-slate-50 p-3 text-[13px] leading-6 text-on-surface-variant">
                <strong>Descripción referencial:</strong>{" "}
                {formData.descripcionArticuloFalta}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <h4 className="border-l-4 border-primary pl-2 text-[15px] font-bold">
              I. RELACIÓN DE LOS HECHOS
            </h4>
            <p className="min-h-[120px] border-l-2 border-slate-200 bg-slate-50 p-4 text-justify italic text-[14px] text-on-surface-variant">
              {formData.descripcionHechos ||
                "La descripción detallada del lugar, fecha y circunstancias se visualizará aquí una vez completada."}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="border-l-4 border-primary pl-2 text-[15px] font-bold">
              II. ANUNCIO DE PRUEBAS
            </h4>
            <p>
              Se adjuntan los documentos probatorios pertinentes y se solicitan
              las diligencias detalladas en el formulario de ingreso.
            </p>
            <p className="text-sm text-on-surface-variant">
              {formData.adjuntos.length > 0
                ? `Adjuntos declarados: ${formData.adjuntos.join(", ")}`
                : "No se han cargado adjuntos aún."}
            </p>
            {formData.diligencias ? (
              <p className="rounded-lg border border-outline-variant bg-white p-3 text-[13px] text-on-surface-variant">
                <strong>Diligencias solicitadas:</strong> {formData.diligencias}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="mb-2 h-px w-48 border-t border-on-surface" />
          <p className="text-[13px] font-bold uppercase">
            Firma del Denunciante
          </p>
          <p className="text-[12px] text-on-surface-variant">
            (Documento generado digitalmente)
          </p>
        </div>

        <footer className="mt-auto flex justify-between border-t border-outline-variant pt-4 text-[9px] font-bold uppercase text-outline">
          {/* Control Documental UCE v3.0 eliminado para la versión descargable. */}
          <span>Proceso: Régimen Disciplinario</span>
          <span>Página 01 de 01</span>
        </footer>
      </div>
    </section>
  );
}
