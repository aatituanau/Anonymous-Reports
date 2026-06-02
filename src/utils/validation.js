export const requiredFields = [
  {
    name: "nombreDenunciante",
    section: "Datos del Denunciante",
    label: "Nombre completo",
  },
  {
    name: "identificacion",
    section: "Datos del Denunciante",
    label: "Cédula / Pasaporte",
  },
  {
    name: "correoInstitucional",
    section: "Datos del Denunciante",
    label: "Correo institucional",
  },
  {name: "facultad", section: "Datos del Denunciante", label: "Facultad"},
  {
    name: "gravedad",
    section: "Gravedad de la falta",
    label: "Nivel de gravedad",
  },
  {
    name: "articuloFalta",
    section: "Gravedad de la falta",
    label: "Artículo o código",
  },
  {
    name: "nombreDenunciado",
    section: "Relación de los Hechos",
    label: "Nombre del presunto infractor",
  },
  {
    name: "calidadDenunciado",
    section: "Relación de los Hechos",
    label: "Calidad / Cargo",
  },
  {
    name: "descripcionHechos",
    section: "Relación de los Hechos",
    label: "Descripción detallada",
  },
  {
    name: "medidasReparacion",
    section: "Medidas de Reparación",
    label: "Medidas de reparación solicitadas",
  },
  {
    name: "aceptaTerminos",
    section: "Términos legales",
    label: "Acepto los términos",
  },
];

export function validateField(name, value) {
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
      if (value.length !== 10)
        return "La cédula debe tener exactamente 10 dígitos.";
      return "";
    case "correoInstitucional":
      if (!value) return "El correo institucional es obligatorio.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Correo institucional inválido.";
      if (!value.toLowerCase().endsWith("@uce.edu.ec"))
        return "El correo debe pertenecer al dominio @uce.edu.ec.";
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
    case "medidasReparacion":
      if (!value || value.trim().length < 10)
        return "Detalle las medidas de reparación solicitadas (mínimo 10 caracteres).";
      return "";
    case "aceptaTerminos":
      if (!value) return "Debe aceptar los términos para continuar.";
      return "";
    default:
      return "";
  }
}

export function buildMissingItems(formData) {
  return requiredFields.reduce((items, field) => {
    const message = validateField(field.name, formData[field.name]);
    if (message) {
      items.push({
        section: field.section,
        label: field.label,
        message,
        name: field.name,
      });
    }
    return items;
  }, []);
}

export function isFormValid(formData) {
  return buildMissingItems(formData).length === 0;
}
