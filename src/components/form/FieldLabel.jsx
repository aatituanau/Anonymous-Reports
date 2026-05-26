export default function FieldLabel({children}) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
      {children}
    </label>
  );
}
