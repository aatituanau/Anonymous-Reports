import EmptyValue from "./EmptyValue";

const labelValueClassName = "font-semibold text-on-surface";

const gravedadLabels = {
  leve: "Leve",
  grave: "Grave",
  muy_grave: "Muy grave",
};

export function BodyPreview({formData, fechaActual, reference}) {
  return (
    <div className="min-h-0 flex-1 space-y-4 overflow-hidden text-[14px] leading-6 text-on-surface">
      <div className="text-right text-[13px]">
        <p className="font-bold">Quito, D.M., {fechaActual}</p>
      </div>

      <div className="space-y-3">
        <p className="font-bold">
          Doctor<br/>
          Marco Medina Vega<br/>
          PRESIDENTE DEL COMITÉ DE ÉTICA<br/>
          Presente.-
        </p>
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
          , facultad o dependencia{" "}
          <span className={labelValueClassName}>
            {formData.facultad 
              ? (formData.facultad === "PLANTA CENTRAL" ? `PLANTA CENTRAL - ${formData.dependenciaEspecifica?.toUpperCase() || ""}` : formData.facultad) 
              : <EmptyValue>________________</EmptyValue>}
          </span>
          , comparezco y expongo:
        </p>
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="border-l-4 border-primary pl-2 text-[14px] font-bold uppercase">
          I. Infracción Cometida
        </h4>
        <div className="pl-3">
          <p className="text-justify text-[14px]">
            Que corresponde al{" "}
            <span className={labelValueClassName}>
              {formData.articuloFalta || <EmptyValue>________________</EmptyValue>}
            </span>{" "}
            del estatuto del orden de régimen disciplinario, por lo tanto es una falta{" "}
            <span className={labelValueClassName}>
              {gravedadLabels[formData.gravedad] ? gravedadLabels[formData.gravedad].toLowerCase() : <EmptyValue>________________</EmptyValue>}
            </span>.
          </p>
          {formData.descripcionArticuloFalta ? (
            <p className="mt-2 text-[13px] leading-5 text-on-surface-variant italic">
              (Descripción: {formData.descripcionArticuloFalta})
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="border-l-4 border-primary pl-2 text-[14px] font-bold uppercase">
          II. Relación de los Hechos
        </h4>
        <div className="pl-3 space-y-2">
          <p>
            En contra de: Sr./Sra.{" "}
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
          <p className="whitespace-pre-wrap text-justify text-[14px] mt-2">
            {formData.descripcionHechos || (
              <span className="italic text-slate-400">
                La descripción detallada del lugar, fecha y circunstancias se visualizará aquí una vez completada.
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="border-l-4 border-primary pl-2 text-[14px] font-bold uppercase">
          III. Medidas de Reparación Solicitadas
        </h4>
        <div className="pl-3">
          <p className="whitespace-pre-wrap text-justify text-[14px]">
            {formData.medidasReparacion || (
              <span className="italic text-slate-400">
                Las medidas de reparación solicitadas por el denunciante se detallarán en esta sección.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BodyPreview;
