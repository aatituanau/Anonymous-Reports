import html2pdf from "html2pdf.js";

export function generarPdfDenuncia() {
  const elemento = document.getElementById("document-preview");

  if (!elemento) {
    throw new Error(
      'No se encontró el contenedor A4 con el id "document-preview".',
    );
  }

  const opciones = {
    margin: 0,
    filename: "denuncia-uce.pdf",
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
  };

  return html2pdf().set(opciones).from(elemento).save();
}
