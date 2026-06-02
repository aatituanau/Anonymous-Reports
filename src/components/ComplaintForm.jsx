import { ShieldCheck } from "lucide-react";
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
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 hover:border-slate-400";

  return (
    <section className="flex h-full flex-col rounded-2xl bg-white shadow-document border border-slate-200">
      <header className="border-b border-slate-200 bg-slate-50 px-6 py-6 lg:px-10 rounded-t-2xl">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 p-2 border border-blue-200">
            <img
              src="/logo-etica.png"
              alt="Sello UCE"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <ShieldCheck className="hidden text-blue-700 w-full h-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {APP_TITLE}
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Formulario de denuncia oficial
            </p>
          </div>
        </div>
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
          <strong>Importante:</strong> tras enviar la denuncia, el
          reconocimiento físico de firma debe realizarse dentro de 3 días
          hábiles.
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 lg:px-10 custom-scrollbar">
        <form className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-16">
          <div>
            <FormSection title="Datos del Denunciante">
              <div className="grid gap-5 md:grid-cols-2">
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

              <div className="md:col-span-2 mt-2">
                <SelectorGravedad
                  inputClassName={inputClassName}
                  onSelectionChange={onGravedadChange}
                  errorGravedad={errors.gravedad}
                  errorArticulo={errors.articuloFalta}
                />
                {errors.gravedad || errors.articuloFalta ? (
                  <div className="mt-2 space-y-1">
                    <FieldError message={errors.gravedad} />
                    <FieldError message={errors.articuloFalta} />
                  </div>
                ) : null}
              </div>
            </FormSection>
          </div>

          <div>
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
          </div>

          <div>
            <FormSection title="Relación de los Hechos">
              <TextAreaField
                label="Descripción detallada *"
                name="descripcionHechos"
                value={formData.descripcionHechos}
                onChange={onChange}
                placeholder="Describa detalladamente el lugar, fecha y circunstancias exactas del incidente..."
                error={errors.descripcionHechos}
                className={inputClassName + " min-h-[200px] resize-y"}
              />

              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <TermsBlock 
                  checked={formData.aceptaTerminos} 
                  onChange={onChange} 
                  error={errors.aceptaTerminos}
                />
              </div>
            </FormSection>
          </div>
        </form>
      </div>
    </section>
  );
}
