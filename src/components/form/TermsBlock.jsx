export default function TermsBlock({checked, onChange}) {
  return (
    <label className="block cursor-pointer rounded-xl border border-outline-variant bg-background p-4 transition hover:border-primary hover:bg-surface-container/50">
      <div className="flex items-start gap-3">
        <input
          checked={checked}
          className="mt-1 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
          id="aceptaTerminos"
          name="aceptaTerminos"
          onChange={onChange}
          type="checkbox"
        />
        <span className="text-sm leading-6 text-on-surface">
          Acepto los términos legales y declaro bajo juramento que toda la
          información proporcionada es verídica y comprobable.
        </span>
      </div>
    </label>
  );
}
