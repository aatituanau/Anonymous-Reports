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
    <section className="flex h-full items-start justify-center overflow-y-auto bg-surface-container px-4 py-8 sm:px-8 lg:px-10">
      <div
        id="document-preview"
        className="flex w-full max-w-[842px] min-h-[297mm] flex-col bg-white p-6 shadow-document sm:p-8 lg:p-10"
      >
        <HeaderPreview
          title={INSTITUTION_NAME}
          subtitle={INSTITUTION_SUBTITLE}
        />

        <div className="flex flex-1 flex-col">
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
