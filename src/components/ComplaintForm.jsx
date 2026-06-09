import { ShieldCheck, Info } from "lucide-react";
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

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 lg:px-8 custom-scrollbar">
        <form className="mx-auto flex w-full max-w-4xl flex-col gap-8 pb-16">
          <div>
            <FormSection title="1. Datos del Denunciante">
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
                label="Facultad o Dependencia *"
                name="facultad"
                value={formData.facultad}
                onChange={onChange}
                error={errors.facultad}
                className={inputClassName}
              >
                <option value="">Seleccione una facultad o dependencia</option>
                {facultades.map((facultad) => (
                  <option key={facultad} value={facultad}>
                    {facultad}
                  </option>
                ))}
              </SelectField>

              {formData.facultad === "PLANTA CENTRAL" && (
                <TextField
                  label="Especifique a qué dependencia pertenece *"
                  name="dependenciaEspecifica"
                  value={formData.dependenciaEspecifica || ""}
                  onChange={onChange}
                  error={errors.dependenciaEspecifica}
                  className={inputClassName}
                  placeholder="Ej. Dirección de Bienestar Estudiantil"
                />
              )}
            </FormSection>
          </div>

          <div>
            <FormSection title="2. Clasificación de la Falta">
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
            </FormSection>
          </div>

          <div>
            <FormSection title="3. Relación de los Hechos">
              <div className="mb-6 grid gap-5 md:grid-cols-2 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="md:col-span-2">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
                    Identificación del Presunto Infractor
                  </h3>
                </div>
                <TextField
                  label="Nombre del denunciado *"
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
              </div>

              <TextAreaField
                label="Descripción detallada de los hechos *"
                name="descripcionHechos"
                value={formData.descripcionHechos}
                onChange={onChange}
                placeholder="Describa detalladamente el lugar, fecha y circunstancias exactas del incidente..."
                error={errors.descripcionHechos}
                className={inputClassName + " min-h-[200px] resize-y"}
              />
            </FormSection>
          </div>

          <div>
            <FormSection title="4. Medidas de Reparación">
              <div className="mb-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div className="text-sm text-blue-900 w-full">
                  <p className="font-bold mb-2">Guía Legal - Sección V: De las Medidas de Reparación</p>
                  <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-3 text-[13px] leading-relaxed">
                    <p>
                      <strong>Art. 54.- Finalidad. -</strong> En caso de declararse la vulneración de derechos a través de la determinación de responsabilidad, debido al cometimiento de algún tipo de falta, se ordenará la reparación integral por el daño inmaterial. La reparación integral procurará que la persona o personas titulares del derecho violado gocen y disfruten el derecho de la manera más adecuada posible y que se restablezca a la situación anterior a la violación.
                    </p>
                    <p>
                      <strong>Art. 55.- Tipos de medidas de reparación. -</strong> Las medidas de reparación integral que se podrán solicitar serán las siguientes:
                      <br/>a) Satisfacción: publicación o difusión de la resolución, acto público de reconocimiento de responsabilidad, medidas de conmemoración de las víctimas y/o los hechos, medidas de carácter artístico, entre otras.
                      <br/>b) Garantías de no repetición: procesos de capacitación y/o sensibilización, campañas de prevención de vulneración de derechos, reformas de resoluciones, normativas o protocolos.
                      <br/>c) Rehabilitación: este tipo de medidas podrá ser médica (para daños físicos que afecten a la integridad y/o salud), psicológica (daños psíquicos o morales), social (cuando se requiera intervención y trabajo con un curso o colectivo que se relacione a las afectaciones) y académica (cuando los daños hayan causado detrimento en la carrera académica de la víctima).
                      <br/>d) Restitución: podrá ser carácter simbólico inmaterial. Y en el ámbito académico: corrección de notas, promoción, matrículas, titulación.
                    </p>
                    <p>
                      <strong>Art. 56.- Implementación de las medidas. -</strong> El Tribunal de Honor, la CEAD y el HCU cuando emitan una resolución con responsabilidad por el cometimiento de una falta, deberán establecer las medidas de reparación que se otorgan en cada caso y las entidades universitarias obligadas a cumplirlas. Las medidas de reparación, que serán simbólicas e inmateriales, no son responsabilidad exclusiva de la o las personas que cometen una falta, ya que, bajo el principio de corresponsabilidad, toda la comunidad universitaria debe estar involucrada en restituir los derechos conculcados.
                    </p>
                    <p>
                      <strong>Art. 57.- Seguimiento. -</strong> El Comité de Ética será la entidad encargada de dar seguimiento de la ejecución de las medidas de reparación. En el caso de incumplimiento del acta o resoluciones y de las medidas de reparación, remitirá un informe al HCU para que se emita un dictamen de obligatoriedad de cumplimiento de los acuerdos y medidas de reparación.
                    </p>
                  </div>
                </div>
              </div>

              <TextAreaField
                label="¿Qué medidas de reparación solicita? *"
                name="medidasReparacion"
                value={formData.medidasReparacion}
                onChange={onChange}
                placeholder="Basándose en la guía legal (Art. 55), redacte aquí su petición de medidas de reparación..."
                error={errors.medidasReparacion}
                className={inputClassName + " min-h-[120px] resize-y"}
              />
            </FormSection>
          </div>

          <div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <TermsBlock 
                checked={formData.aceptaTerminos} 
                onChange={onChange} 
                error={errors.aceptaTerminos}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
