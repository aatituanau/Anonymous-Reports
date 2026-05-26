import EmptyValue from "./EmptyValue";

const labelValueClassName = "font-semibold text-on-surface";

const gravedadLabels = {
  leve: "Leve",
  grave: "Grave",
  muy_grave: "Muy grave",
};

export function BodyPreview({formData, fechaActual, reference}) {
  return (
    <div className="flex-1 space-y-6 text-[14px] leading-7 text-on-surface">
      <div className="text-right text-[13px]">
        <p className="font-bold">Quito, D.M., {fechaActual}</p>
        <p>Ref: {reference}</p>
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
        <p className="min-h-[160px] whitespace-pre-wrap break-words border-l-2 border-slate-200 bg-slate-50 p-4 text-justify italic text-[14px] text-on-surface-variant">
          {formData.descripcionHechos ||
            "La descripción detallada del lugar, fecha y circunstancias se visualizará aquí una vez completada."}
        </p>
      </div>

      {/* II. Anuncio de pruebas: solo si hay datos */}
      {(Array.isArray(formData.adjuntos) && formData.adjuntos.length > 0) ||
      formData.diligencias ? (
        <div className="space-y-2">
          <h4 className="border-l-4 border-primary pl-2 text-[15px] font-bold">
            II. ANUNCIO DE PRUEBAS
          </h4>
          {Array.isArray(formData.adjuntos) && formData.adjuntos.length > 0 ? (
            <p className="text-sm text-on-surface-variant">{`Adjuntos declarados: ${formData.adjuntos.join(", ")}`}</p>
          ) : null}

          {formData.diligencias ? (
            <p className="rounded-lg border border-outline-variant bg-white p-3 text-[13px] text-on-surface-variant">
              <strong>Diligencias solicitadas:</strong> {formData.diligencias}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default BodyPreview;
