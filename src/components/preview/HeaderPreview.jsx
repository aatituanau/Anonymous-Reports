export function HeaderPreview({leftLogo, rightLogo, title, subtitle}) {
  return (
    <header className="mb-8 flex items-center justify-between border-b-2 border-primary pb-5">
      {/* Left logo - reemplazar por el logo institucional */}
      <img
        src={leftLogo || "/logo-uce.png"}
        alt="Logo UCE"
        className="w-16 h-auto object-contain"
      />

      <div className="flex-1 px-4 text-center">
        <h3 className="text-[18px] font-bold uppercase leading-tight text-primary">
          {title}
        </h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {subtitle}
        </p>
        <p className="mt-1 text-[10px] italic text-on-surface-variant">
          "Omnium Potentior Est Sapientia"
        </p>
      </div>

      {/* Right seal/sello - reemplazar por sello institucional */}
      <img
        src={rightLogo || "/logo-etica.png"}
        alt="Sello Ética"
        className="w-16 h-auto object-contain"
      />
    </header>
  );
}

export default HeaderPreview;
