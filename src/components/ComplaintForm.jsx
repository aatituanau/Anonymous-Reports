import {APP_TITLE} from "../config";
import SelectorGravedad from "./SelectorGravedad";

export default function ComplaintForm({
  formData,
  onChange,
  onGravedadChange,
  onFieldChange,
  facultades,
  errors = {},
}) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    onFieldChange(
      "adjuntos",
      files.map((file) => file.name),
    );
  };

  const inputClassName =
    "w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <section className="flex h-full flex-col border-r border-outline-variant bg-white">
      <header className="border-b border-outline-variant bg-white px-6 py-6 lg:px-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20">
            UCE
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              {APP_TITLE}
            </h1>
            <p className="text-sm text-on-surface-variant">
              Formulario de denuncia.
            </p>
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
          <strong>Importante:</strong> tras enviar la denuncia, el
          reconocimiento físico de firma debe realizarse dentro de 3 días
          hábiles.
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-8">
        <form className="mx-auto flex w-full max-w-2xl flex-col gap-10 pb-24">
          <section className="space-y-5">
            <div className="border-b border-outline-variant pb-2">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Datos del Denunciante
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Nombre completo *
                </label>
                <input
                  className={inputClassName}
                  name="nombreDenunciante"
                  value={formData.nombreDenunciante}
                  onChange={onChange}
                  placeholder="Ej. Juan Pérez"
                  type="text"
                />
                {errors.nombreDenunciante ? (
                  <p className="text-xs text-red-600">
                    {errors.nombreDenunciante}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Cédula / Pasaporte *
                </label>
                <input
                  className={inputClassName}
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={onChange}
                  placeholder="1723456789"
                  type="text"
                />
                {errors.identificacion ? (
                  <p className="text-xs text-red-600">
                    {errors.identificacion}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Correo institucional *
              </label>
              <input
                className={inputClassName}
                name="correoInstitucional"
                value={formData.correoInstitucional}
                onChange={onChange}
                placeholder="usuario@uce.edu.ec"
                type="email"
              />
              {errors.correoInstitucional ? (
                <p className="text-xs text-red-600">
                  {errors.correoInstitucional}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Facultad *
              </label>
              <select
                className={inputClassName}
                name="facultad"
                value={formData.facultad}
                onChange={onChange}
              >
                <option value="">Seleccione una facultad</option>
                {facultades.map((facultad) => (
                  <option key={facultad} value={facultad}>
                    {facultad}
                  </option>
                ))}
              </select>
              {errors.facultad ? (
                <p className="text-xs text-red-600">{errors.facultad}</p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <SelectorGravedad
                inputClassName={inputClassName}
                onSelectionChange={onGravedadChange}
              />
              {errors.gravedad || errors.articuloFalta ? (
                <div className="mt-2 space-y-1">
                  {errors.gravedad ? (
                    <p className="text-xs text-red-600">{errors.gravedad}</p>
                  ) : null}
                  {errors.articuloFalta ? (
                    <p className="text-xs text-red-600">
                      {errors.articuloFalta}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>

          <section className="space-y-5">
            <div className="border-b border-outline-variant pb-2">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Datos del Denunciado
              </h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Nombre del presunto infractor *
              </label>
              <input
                className={inputClassName}
                name="nombreDenunciado"
                value={formData.nombreDenunciado}
                onChange={onChange}
                placeholder="Nombre completo"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Calidad / Cargo *
              </label>
              <select
                className={inputClassName}
                name="calidadDenunciado"
                value={formData.calidadDenunciado}
                onChange={onChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="estudiante">Estudiante</option>
                <option value="docente">Docente</option>
                <option value="autoridad">Autoridad</option>
                <option value="empleado">Empleado</option>
                <option value="trabajador">Trabajador</option>
              </select>
            </div>
          </section>

          <section className="space-y-5">
            <div className="border-b border-outline-variant pb-2">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Relación de los Hechos
              </h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Descripción detallada *
              </label>
              <textarea
                className={inputClassName}
                name="descripcionHechos"
                onChange={onChange}
                placeholder="Describa detalladamente el lugar, fecha y circunstancias exactas del incidente..."
                rows={8}
                value={formData.descripcionHechos}
              />
            </div>
          </section>

          <section className="space-y-5">
            {/**
            <div className="border-b border-outline-variant pb-2">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Anuncio de Pruebas
              </h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Prueba documental (adjuntos)
              </label>
              Campo de adjuntos comentado — uso para pruebas/pruebas de evidencia. No activado en esta versión.
               <input className="w-full cursor-pointer rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-secondary" multiple onChange={handleFileChange} type="file" />
              {formData.adjuntos.length > 0 ? (
                <p className="text-xs text-on-surface-variant">
                  Archivos cargados: {formData.adjuntos.join(", ")}
                </p>
              ) : null}
            </div> 

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Diligencias probatorias solicitadas
              </label>
              <textarea
                className={inputClassName}
                name="diligencias"
                onChange={onChange}
                placeholder="Ej. Solicito revisión de cámaras de seguridad del pasillo B..."
                rows={4}
                value={formData.diligencias}
              />
            </div>*/}
          </section>

          <section className="space-y-5 pb-8">
            <div className="flex items-start gap-3 rounded-xl border border-outline-variant bg-background p-4">
              <input
                checked={formData.aceptaTerminos}
                className="mt-1 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                name="aceptaTerminos"
                onChange={onChange}
                type="checkbox"
              />
              <label className="cursor-pointer text-sm leading-6 text-on-surface">
                Acepto los términos legales y declaro bajo juramento que toda la
                información proporcionada es verídica y comprobable.
              </label>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
}
