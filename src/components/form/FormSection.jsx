export default function FormSection({title, children}) {
  return (
    <section className="space-y-5">
      <div className="border-b border-outline-variant pb-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}
