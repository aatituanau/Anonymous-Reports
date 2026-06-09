const env = import.meta.env;

export const APP_TITLE = env.VITE_APP_TITLE || "Generador de Denuncias";
export const INSTITUTION_NAME =
  env.VITE_INSTITUTION_NAME || "Universidad Central del Ecuador";
export const INSTITUTION_SUBTITLE =
  env.VITE_INSTITUTION_SUBTITLE || "Comité de Ética";
export const DOCUMENT_REFERENCE =
  env.VITE_DOCUMENT_REFERENCE || "DENUNCIA-PRELIMINAR-UCE";
