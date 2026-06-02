import html2pdf from "html2pdf.js";

export function generarPdfDenuncia() {
  const elemento = document.getElementById("document-preview");

  if (!elemento) {
    throw new Error(
      'No se encontró el contenedor A4 con el id "document-preview".',
    );
  }

  const opciones = {
    margin: [0, 0, 0, 0], // Sin márgenes extras para no desbordar
    filename: "denuncia-uce.pdf",
    image: {
      type: "jpeg",
      quality: 0.98,
    },
    html2canvas: {
      scale: 2, // Buena calidad
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Se añade un pequeño retardo para asegurar que la UI se actualiza si estaba oculta
  return new Promise((resolve) => {
    setTimeout(() => {
      html2pdf().set(opciones).from(elemento).save().then(resolve);
    }, 150);
  });
}
