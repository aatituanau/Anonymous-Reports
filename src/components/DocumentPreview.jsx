import {
  DOCUMENT_REFERENCE,
  INSTITUTION_NAME,
  INSTITUTION_SUBTITLE,
} from "../config";
import HeaderPreview from "./preview/HeaderPreview";
import BodyPreview from "./preview/BodyPreview";
import FooterPreview from "./preview/FooterPreview";

export default function DocumentPreview({formData}) {
  const fechaActual = new Date().toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex h-full items-start justify-center overflow-y-auto bg-slate-100 px-4 py-8 sm:px-8 lg:px-10 custom-scrollbar">
      <div
        id="document-preview"
        className="box-border flex h-[296mm] w-full max-w-[842px] flex-col overflow-hidden bg-white p-6 shadow-md"
      >
        <HeaderPreview
          title={INSTITUTION_NAME}
          subtitle={INSTITUTION_SUBTITLE}
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <BodyPreview
            formData={formData}
            fechaActual={fechaActual}
            reference={DOCUMENT_REFERENCE}
          />

          <FooterPreview formData={formData} />
        </div>
      </div>
    </section>
  );
}
