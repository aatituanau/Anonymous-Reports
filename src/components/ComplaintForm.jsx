import {APP_TITLE} from "../config";
import SelectorGravedad from "./SelectorGravedad";
import FormSection from "./form/FormSection";
import FieldError from "./form/FieldError";
import TextField from "./form/TextField";
import TextAreaField from "./form/TextAreaField";
import SelectField from "./form/SelectField";
import TermsBlock from "./form/TermsBlock";

export default function ComplaintForm({
  formData,
  onChange,
  onGravedadChange,
  onFieldChange,
  facultades,
  errors = {},
}) {
  const inputClassName =
    "w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    onFieldChange(
      "adjuntos",
      files.map((file) => file.name),
    );
  };

  return (
    <section className="flex h-full flex-col rounded-lg border border-outline-variant bg-white shadow-sm">
      <header className="border-b border-outline-variant bg-white px-6 py-6 lg:px-8">
        <div className="mb-3 flex items-center gap-3">
          {/* Logo institucional (sello) */}
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white p-1 shadow-sm">
            <img
              src="/logo-etica.png"
              alt="Sello UCE"
              className="h-8 w-auto object-contain"
            />
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

      <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <form className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-12">
          <FormSection title="Datos del Denunciante">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Nombre completo *"
                name="nombreDenunciante"
                value={formData.nombreDenunciante}
                onChange={onChange}
                placeholder="Ej. Juan Pérez"
                error={errors.nombreDenunciante}
                className={inputClassName}
              />

              <TextField
                label="Cédula / Pasaporte *"
                name="identificacion"
                value={formData.identificacion}
                onChange={onChange}
                placeholder="1723456789"
                error={errors.identificacion}
                className={inputClassName}
              />
            </div>

            <TextField
              label="Correo institucional *"
              name="correoInstitucional"
              value={formData.correoInstitucional}
              onChange={onChange}
              placeholder="usuario@uce.edu.ec"
              type="email"
              error={errors.correoInstitucional}
              className={inputClassName}
            />

            <SelectField
              label="Facultad *"
              name="facultad"
              value={formData.facultad}
              onChange={onChange}
              error={errors.facultad}
              className={inputClassName}
            >
              <option value="">Seleccione una facultad</option>
              {facultades.map((facultad) => (
                <option key={facultad} value={facultad}>
                  {facultad}
                </option>
              ))}
            </SelectField>

            <div className="md:col-span-2">
              <SelectorGravedad
                inputClassName={inputClassName}
                onSelectionChange={onGravedadChange}
              />
              {errors.gravedad || errors.articuloFalta ? (
                <div className="mt-2 space-y-1">
                  <FieldError message={errors.gravedad} />
                  <FieldError message={errors.articuloFalta} />
                </div>
              ) : null}
            </div>
          </FormSection>

          <FormSection title="Datos del Denunciado">
            <TextField
              label="Nombre del presunto infractor *"
              name="nombreDenunciado"
              value={formData.nombreDenunciado}
              onChange={onChange}
              placeholder="Nombre completo"
              error={errors.nombreDenunciado}
              className={inputClassName}
            />

            <SelectField
              label="Calidad / Cargo *"
              name="calidadDenunciado"
              value={formData.calidadDenunciado}
              onChange={onChange}
              error={errors.calidadDenunciado}
              className={inputClassName}
            >
              <option value="">Seleccione una opción</option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="autoridad">Autoridad</option>
              <option value="empleado">Empleado</option>
              <option value="trabajador">Trabajador</option>
            </SelectField>
          </FormSection>

          <FormSection title="Relación de los Hechos">
            <TextAreaField
              label="Descripción detallada *"
              name="descripcionHechos"
              value={formData.descripcionHechos}
              onChange={onChange}
              placeholder="Describa detalladamente el lugar, fecha y circunstancias exactas del incidente..."
              error={errors.descripcionHechos}
              className={inputClassName + " min-h-[240px] resize-y"}
            />

            <TermsBlock checked={formData.aceptaTerminos} onChange={onChange} />
          </FormSection>
        </form>
      </div>
    </section>
  );
}
