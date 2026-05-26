import {useState} from "react";
import ComplaintForm from "./components/ComplaintForm";
import DownloadControls from "./components/DownloadControls";
import DownloadNotice from "./components/DownloadNotice";
import DocumentPreview from "./components/DocumentPreview";
import {facultades} from "./data/facultades";
import {generarPdfDenuncia} from "./utils/pdfGenerator";
import {
  buildMissingItems,
  isFormValid,
  validateField,
} from "./utils/validation";

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
  const [downloadNotice, setDownloadNotice] = useState("");
  const [downloadMissingItems, setDownloadMissingItems] = useState([]);

  const getDisabledReason = () => {
    const missingItems = buildMissingItems(formData);
    if (missingItems.length > 0) {
      const first = missingItems[0];
      return `Falta completar ${first.section} - ${first.label}: ${first.message}`;
    }

    if (errors && errors.correoInstitucional) return errors.correoInstitucional;
    if (
      formData.correoInstitucional &&
      !formData.correoInstitucional.toLowerCase().endsWith("@uce.edu.ec")
    ) {
      return "El correo debe pertenecer al dominio @uce.edu.ec.";
    }

    return "Complete todos los campos obligatorios para descargar";
  };

  const handleChange = (event) => {
    const {name, type, value: rawValue, checked} = event.target;
    let value = type === "checkbox" ? checked : rawValue;

    if (name === "identificacion") {
      value = String(value).replace(/\D/g, "");
    }

    setFormData((estadoPrevio) => ({
      ...estadoPrevio,
      [name]: value,
    }));

    const mensaje = validateField(name, value);
    setErrors((prev) => ({...prev, [name]: mensaje}));
    setDownloadNotice("");
    setDownloadMissingItems([]);
  };

  const handleFieldChange = (campo, valor) => {
    setFormData((estadoPrevio) => ({
      ...estadoPrevio,
      [campo]: valor,
    }));
    setDownloadNotice("");
    setDownloadMissingItems([]);
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
    setDownloadNotice("");
    setDownloadMissingItems([]);
  };

  const descargarPdf = async () => {
    const missingItems = buildMissingItems(formData);

    if (missingItems.length > 0) {
      setDownloadMissingItems(missingItems);
      setDownloadNotice(
        "No se puede generar el PDF todavía. Falta completar lo siguiente:",
      );
      return;
    }

    setDownloadNotice("");
    setDownloadMissingItems([]);
    await generarPdfDenuncia();
  };

  const downloadEnabled = isFormValid(formData);

  return (
    <main className="relative flex h-screen flex-col overflow-hidden bg-background text-on-surface lg:flex-row">
      <div
        className={
          "h-full w-full overflow-hidden " +
          (showPreview ? "lg:w-3/5" : "lg:mx-auto lg:w-11/12")
        }
      >
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
        <div className="h-full w-full overflow-hidden border-l border-outline-variant lg:w-2/5">
          <DocumentPreview formData={formData} />
        </div>
      )}

      <DownloadControls
        onTogglePreview={() => setShowPreview((v) => !v)}
        onDownload={descargarPdf}
        previewVisible={showPreview}
        downloadEnabled={downloadEnabled}
        disabledReason={getDisabledReason()}
      />

      <DownloadNotice
        visible={!downloadEnabled && Boolean(downloadNotice)}
        title={downloadNotice}
        items={downloadMissingItems}
      />
    </main>
  );
}
