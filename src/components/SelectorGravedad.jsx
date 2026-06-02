import {useState} from "react";

const catalogoFaltas = {
  leve: [
    { codigo: "Art. 23 lit. a", descripcion: "No emitir rúbrica, de parte del docente, para la pronta recalificación de trabajos, exámenes y otros tipos de evaluaciones solicitados por el estudiante;" },
    { codigo: "Art. 23 lit. b", descripcion: "Faltar a los procesos electorales universitarios, reglamentariamente convocados sin la debida justificación;" },
    { codigo: "Art. 23 lit. c", descripcion: "Incurrir en conductas académicas inapropiadas en las tareas académicas o de evaluación; estos casos serán resueltos por el profesor;" },
    { codigo: "Art. 23 lit. d", descripcion: "Usar los símbolos universitarios para fraude, ventas, promoción comercial o prácticas engañosas;" },
    { codigo: "Art. 23 lit. e", descripcion: "Aplicar y receptar evaluaciones fuera de los predios universitarios sin la respectiva autorización del Director de Carrera;" },
    { codigo: "Art. 23 lit. f", descripcion: "Incumplir las actividades académicas previstas en la ficha de asignación de carga horaria sin la debida justificación;" },
    { codigo: "Art. 23 lit. g", descripcion: "No entregar las evaluaciones y/o demorar la entrega de calificaciones, fuera de la fecha del calendario académico;" },
    { codigo: "Art. 23 lit. h", descripcion: "No asistir por parte del docente a más del diez por ciento de sus horas clases en un mes y las actividades programadas para el período académico, sin la debida justificación o licencia reglamentariamente concedida; y" },
    { codigo: "Art. 23 lit. i", descripcion: "Todas las que no estén encuadradas como faltas graves y/o muy graves determinadas en el Reglamento del Código de Ética." },
  ],
  grave: [
    { codigo: "Art. 24 lit. a", descripcion: "Obstaculizar o interferir mediante acciones violentas en el normal desenvolvimiento de las actividades académicas, culturales y deportivas de la institución;" },
    { codigo: "Art. 24 lit. b", descripcion: "Ofenderse recíprocamente u ofender a los miembros de la comunidad universitaria o atentar contra los intereses de la Universidad Central del Ecuador;" },
    { codigo: "Art. 24 lit. c", descripcion: "No acatar la designación para la conformación del Tribunal de Honor;" },
    { codigo: "Art. 24 lit. d", descripcion: "Atentar contra la institucionalidad y la autonomía universitaria; pasquines, mal uso de redes sociales, entre otros;" },
    { codigo: "Art. 24 lit. e", descripcion: "Utilizar los bienes, espacios físicos, y recursos institucionales para actividades de carácter comercial sin previa autorización;" },
    { codigo: "Art. 24 lit. f", descripcion: "No cumplir con los principios y disposiciones contenidas en el ordenamiento jurídico ecuatoriano, el presente estatuto o la normativa interna de la Universidad Central del Ecuador" },
    { codigo: "Art. 24 lit. g", descripcion: "Obligar a los estudiantes a participar en manifestaciones políticas partidistas a cambio de beneficios académicos;" },
    { codigo: "Art. 24 lit. h", descripcion: "Incumplir sin justificación con las comisiones asignadas por las autoridades universitarias;" },
    { codigo: "Art. 24 lit. i", descripcion: "Obligar a organizar y participar en paseos y programas sociales e estudiantiles;" },
    { codigo: "Art. 24 lit. j", descripcion: "Organizar giras estudiantiles sin justificación académica y sin autorización del Decanato;" },
    { codigo: "Art. 24 lit. k", descripcion: "Cambiar la carga de horas clases y aprendizaje práctico experimental, sin la debida autorización del Director de Carrera;" },
    { codigo: "Art. 24 lit. l", descripcion: "Vender o entregar textos o materiales de cualquier tipo para el desarrollo de las actividades académicas curriculares y extra curriculares a cambio de beneficios de cualquier naturaleza; y," },
    { codigo: "Art. 24 lit. m", descripcion: "Inducir a votar por chantaje para beneficios personales, políticos o partidistas." },
  ],
  muy_grave: [
    { codigo: "Art. 25 lit. a", descripcion: "Cometer cualquier acto de violencia de hecho o de palabra contra cualquier miembro de la comunidad educativa, autoridades, ciudadanos y colectivos sociales;" },
    { codigo: "Art. 25 lit. b", descripcion: "No excusarse de la conformación del Tribunal de Honor cuando se presentan los impedimentos señalados en este Estatuto;" },
    { codigo: "Art. 25 lit. c", descripcion: "Incurrir en actos u omisiones de violencia de género, psicológica o sexual, que se traducen en conductas abusivas dirigidas a perseguir, chantajear e intimidar con el propósito o efecto de crear un entorno de desigualdad, ofensivo, humillante, hostil o vergonzoso para la victima;" },
    { codigo: "Art. 25 lit. d", descripcion: "Incurrir en acoso tipificado en la Ley y en el Código de Ética;" },
    { codigo: "Art. 25 lit. e", descripcion: "Cometer fraude académico conforme a los señalado en el Reglamento de Régimen Académico;" },
    { codigo: "Art. 25 lit. f", descripcion: "Recibir coimas o exigir cobros a los estudiantes; y," },
    { codigo: "Art. 25 lit. g", descripcion: "Deteriorar o destruir en forma voluntaria las instalaciones institucionales y los bienes públicos" },
  ],
};

const gravedadLabels = {
  leve: "Leve",
  grave: "Grave",
  muy_grave: "Muy grave"
};

export default function SelectorGravedad({onSelectionChange, inputClassName, errorGravedad, errorArticulo}) {
  const [gravedad, setGravedad] = useState("");
  const [articulo, setArticulo] = useState("");

  const handleArticuloChange = (event) => {
    const nuevoArticulo = event.target.value;
    setArticulo(nuevoArticulo);

    if (!nuevoArticulo) {
      setGravedad("");
      onSelectionChange?.({
        gravedad: "",
        articulo: "",
        descripcionArticulo: "",
      });
      return;
    }

    // Buscar a qué gravedad pertenece el artículo seleccionado
    let gravedadEncontrada = "";
    let descripcionEncontrada = "";

    for (const [keyGravedad, faltas] of Object.entries(catalogoFaltas)) {
      const falta = faltas.find(f => f.codigo === nuevoArticulo);
      if (falta) {
        gravedadEncontrada = keyGravedad;
        descripcionEncontrada = falta.descripcion;
        break;
      }
    }

    setGravedad(gravedadEncontrada);

    onSelectionChange?.({
      gravedad: gravedadEncontrada,
      articulo: nuevoArticulo,
      descripcionArticulo: descripcionEncontrada,
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-outline-variant bg-surface-container p-4 shadow-sm">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Artículo / Código de falta *
        </label>
        <select
          className={`${inputClassName} ${errorArticulo ? '!border-red-500 !ring-red-500/20' : ''}`}
          name="articulo"
          onChange={handleArticuloChange}
          value={articulo}
        >
          <option value="">Seleccione el artículo</option>
          <optgroup label="Faltas Leves (Art. 23)">
            {catalogoFaltas.leve.map((falta) => (
              <option key={falta.codigo} value={falta.codigo}>
                {falta.codigo} - {falta.descripcion.substring(0, 80)}...
              </option>
            ))}
          </optgroup>
          <optgroup label="Faltas Graves (Art. 24)">
            {catalogoFaltas.grave.map((falta) => (
              <option key={falta.codigo} value={falta.codigo}>
                {falta.codigo} - {falta.descripcion.substring(0, 80)}...
              </option>
            ))}
          </optgroup>
          <optgroup label="Faltas Muy Graves (Art. 25)">
            {catalogoFaltas.muy_grave.map((falta) => (
              <option key={falta.codigo} value={falta.codigo}>
                {falta.codigo} - {falta.descripcion.substring(0, 80)}...
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Gravedad de la infracción
        </label>
        <input
          type="text"
          className={`${inputClassName} bg-slate-100 cursor-not-allowed ${errorGravedad ? '!border-red-500 !ring-red-500/20' : ''}`}
          name="gravedad"
          disabled
          value={gravedad ? gravedadLabels[gravedad] : "Se asignará automáticamente"}
        />
      </div>
    </div>
  );
}
