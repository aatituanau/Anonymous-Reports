import {useState} from "react";
import ComplaintForm from "./components/ComplaintForm";
import DocumentPreview from "./components/DocumentPreview";
import {facultades} from "./data/facultades";
import {generarPdfDenuncia} from "./utils/pdfGenerator";

const estadoInicial = {
  nombreDenunciante: "",
  identificacion: "",
  correoInstitucional: "",
  facultad: "",
  gravedad: "",
  articuloFalta: "",
  descripcionArticuloFalta: "",
  nombreDenunciado: "",
  calidadDenunciado: "",
  descripcionHechos: "",
  diligencias: "",
  adjuntos: [],
  aceptaTerminos: false,
};

export default function App() {
  const [formData, setFormData] = useState(estadoInicial);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "nombreDenunciante": {
        if (!value) return "Ingrese nombre completo.";
        const texto = value.trim();
        if (texto.length < 5) return "Nombre demasiado corto.";
        if (!/^[A-Za-zÀ-ÿ'´`\-\s]+$/.test(texto))
          return "El nombre no debe contener números ni símbolos.";
        const partes = texto.split(/\s+/).filter(Boolean);
        if (partes.length < 2) return "Ingrese al menos nombre y apellido.";
        if (partes.some((p) => p.length < 2))
          return "Cada parte del nombre debe tener al menos 2 letras.";
        return "";
      }
      case "identificacion":
        if (!value) return "La identificación es obligatoria.";
        if (!/^[0-9]+$/.test(value))
          return "La cédula solo debe contener números.";
        if (value.length < 6) return "Identificación demasiado corta.";
        return "";
      case "correoInstitucional":
        if (!value) return "El correo institucional es obligatorio.";
        // simple email check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Correo institucional inválido.";
        return "";
      case "facultad":
        if (!value) return "Seleccione la facultad.";
        return "";
      case "gravedad":
        if (!value) return "Seleccione el nivel de gravedad.";
        return "";
      case "articuloFalta":
        if (!value) return "Seleccione el artículo o código de falta.";
        return "";
      case "nombreDenunciado": {
        if (!value) return "Ingrese nombre del denunciado.";
        const textoD = value.trim();
        if (textoD.length < 5) return "Nombre demasiado corto.";
        if (!/^[A-Za-zÀ-ÿ'´`\-\s]+$/.test(textoD))
          return "El nombre no debe contener números ni símbolos.";
        const partesD = textoD.split(/\s+/).filter(Boolean);
        if (partesD.length < 2) return "Ingrese al menos nombre y apellido.";
        if (partesD.some((p) => p.length < 2))
          return "Cada parte del nombre debe tener al menos 2 letras.";
        return "";
      }
      case "calidadDenunciado":
        if (!value) return "Seleccione la calidad o cargo.";
        return "";
      case "descripcionHechos":
        if (!value || value.trim().length < 20)
          return "Describa los hechos con al menos 20 caracteres.";
        return "";
      case "aceptaTerminos":
        if (!value) return "Debe aceptar los términos para continuar.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const camposRequeridos = [
      "nombreDenunciante",
      "identificacion",
      "correoInstitucional",
      "facultad",
      "gravedad",
      "articuloFalta",
      "nombreDenunciado",
      "calidadDenunciado",
      "descripcionHechos",
      "aceptaTerminos",
    ];

    const nuevosErrores = {};
    camposRequeridos.forEach((campo) => {
      const valor = formData[campo];
      const mensaje = validateField(campo, valor);
      if (mensaje) nuevosErrores[campo] = mensaje;
    });

    setErrors((prev) => ({...prev, ...nuevosErrores}));

    return Object.keys(nuevosErrores).length === 0;
  };

  const isFormValid = () => {
    const camposRequeridos = [
      "nombreDenunciante",
      "identificacion",
      "correoInstitucional",
      "facultad",
      "gravedad",
      "articuloFalta",
      "nombreDenunciado",
      "calidadDenunciado",
      "descripcionHechos",
      "aceptaTerminos",
    ];

    for (const campo of camposRequeridos) {
      const valor = formData[campo];
      const mensaje = validateField(campo, valor);
      if (mensaje) return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const {name, type, value: rawValue, checked} = event.target;
    let value = type === "checkbox" ? checked : rawValue;

    // Regla: identificación solo números — eliminamos cualquier carácter no numérico
    if (name === "identificacion") {
      value = String(value).replace(/\D/g, "");
    }

    setFormData((estadoPrevio) => ({
      ...estadoPrevio,
      [name]: value,
    }));

    // Validar campo y actualizar errores
    const mensaje = validateField(name, value);
    setErrors((prev) => ({...prev, [name]: mensaje}));
  };

  const handleFieldChange = (campo, valor) => {
    setFormData((estadoPrevio) => ({
      ...estadoPrevio,
      [campo]: valor,
    }));
  };

  const handleGravedadChange = ({gravedad, articulo, descripcionArticulo}) => {
    setFormData((estadoPrevio) => ({
      ...estadoPrevio,
      gravedad,
      articuloFalta: articulo,
      descripcionArticuloFalta: descripcionArticulo,
    }));

    setErrors((estadoPrevio) => ({
      ...estadoPrevio,
      gravedad: gravedad ? "" : validateField("gravedad", gravedad),
      articuloFalta: articulo ? "" : validateField("articuloFalta", articulo),
    }));
  };

  const descargarPdf = async () => {
    const valido = validateAll();
    if (!valido) {
      // Mensaje corto para el usuario; los errores se muestran inline en el formulario
      alert(
        "Complete todos los campos obligatorios antes de descargar el PDF.",
      );
      return;
    }

    await generarPdfDenuncia();
  };

  const formIsValid = isFormValid();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-on-surface lg:flex-row">
      <div className={"w-full " + (showPreview ? "lg:w-1/2" : "lg:w-full")}>
        <ComplaintForm
          facultades={facultades}
          formData={formData}
          onChange={handleChange}
          onGravedadChange={handleGravedadChange}
          onFieldChange={handleFieldChange}
          errors={errors}
        />
      </div>

      {showPreview && (
        <div className="w-full lg:w-1/2">
          <DocumentPreview formData={formData} />
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => setShowPreview((v) => !v)}
          type="button"
          className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-95"
          title={showPreview ? "Ocultar vista previa" : "Ver PDF"}
          aria-pressed={showPreview}
        >
          {showPreview ? "Ocultar PDF" : "Ver PDF"}
        </button>

        <button
          className={
            "flex items-center gap-3 rounded-full px-6 py-4 text-sm font-bold text-white shadow-2xl transition active:scale-95 sm:px-8 " +
            (formIsValid
              ? "bg-primary hover:-translate-y-1 hover:bg-secondary shadow-primary/30"
              : "bg-gray-400 cursor-not-allowed opacity-60")
          }
          onClick={descargarPdf}
          type="button"
          disabled={!formIsValid}
          title={
            !formIsValid
              ? "Complete todos los campos obligatorios para descargar"
              : "Descargar PDF Oficial"
          }
          aria-disabled={!formIsValid}
        >
          Descargar PDF Oficial
        </button>
      </div>
    </main>
  );
}
