import {useState} from "react";

const catalogoFaltas = {
  leve: [
    {
      codigo: "Art. 23",
      descripcion:
        "Llegar tarde de forma reiterada a actividades académicas sin justificación.",
    },
    {
      codigo: "Art. 24",
      descripcion:
        "Incumplir la entrega de un trabajo asignado dentro del plazo establecido.",
    },
    {
      codigo: "Art. 25",
      descripcion:
        "Utilizar lenguaje inapropiado o irrespetuoso en espacios institucionales.",
    },
  ],
  grave: [
    {
      codigo: "Art. 31",
      descripcion:
        "Suplantar la identidad de otra persona en una actividad académica o administrativa.",
    },
    {
      codigo: "Art. 32",
      descripcion:
        "Alterar o falsificar documentos, registros o evidencias institucionales.",
    },
    {
      codigo: "Art. 33",
      descripcion:
        "Acosar, intimidar o ejercer hostigamiento verbal dentro de la universidad.",
    },
  ],
  muy_grave: [
    {
      codigo: "Art. 41",
      descripcion:
        "Ejercer agresión física contra miembros de la comunidad universitaria.",
    },
    {
      codigo: "Art. 42",
      descripcion:
        "Cometer actos de discriminación grave por razón de género, origen o condición.",
    },
    {
      codigo: "Art. 43",
      descripcion:
        "Presentar, divulgar o encubrir conductas que comprometan seriamente la integridad institucional.",
    },
  ],
};

export default function SelectorGravedad({onSelectionChange, inputClassName}) {
  const [gravedad, setGravedad] = useState("");
  const [articulo, setArticulo] = useState("");

  const articulosDisponibles = gravedad ? catalogoFaltas[gravedad] || [] : [];

  const handleGravedadChange = (event) => {
    const nuevaGravedad = event.target.value;

    setGravedad(nuevaGravedad);
    setArticulo("");

    onSelectionChange?.({
      gravedad: nuevaGravedad,
      articulo: "",
      descripcionArticulo: "",
    });
  };

  const handleArticuloChange = (event) => {
    const nuevoArticulo = event.target.value;
    const faltaSeleccionada = articulosDisponibles.find(
      (falta) => falta.codigo === nuevoArticulo,
    );

    setArticulo(nuevoArticulo);

    onSelectionChange?.({
      gravedad,
      articulo: nuevoArticulo,
      descripcionArticulo: faltaSeleccionada?.descripcion || "",
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-outline-variant bg-surface-container p-4 shadow-sm">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Gravedad de la infracción *
        </label>
        <select
          className={inputClassName}
          name="gravedad"
          onChange={handleGravedadChange}
          value={gravedad}
        >
          <option value="">Seleccione la gravedad</option>
          <option value="leve">Leve</option>
          <option value="grave">Grave</option>
          <option value="muy_grave">Muy grave</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Artículo / Código de falta *
        </label>
        <select
          className={inputClassName}
          disabled={!gravedad}
          name="articulo"
          onChange={handleArticuloChange}
          value={articulo}
        >
          <option value="">
            {gravedad
              ? "Seleccione el artículo"
              : "Primero seleccione la gravedad"}
          </option>
          {articulosDisponibles.map((falta) => (
            <option key={falta.codigo} value={falta.codigo}>
              {falta.codigo} - {falta.descripcion}
            </option>
          ))}
        </select>
      </div>

      {articulo ? (
        <p className="text-xs leading-5 text-on-surface-variant">
          Selección actual: {articulo}
        </p>
      ) : null}
    </div>
  );
}
