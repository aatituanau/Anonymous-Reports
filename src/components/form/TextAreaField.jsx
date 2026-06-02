import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 6,
  error,
  className,
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        className={`${className} ${error ? '!border-red-500 !ring-red-500/20' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
      <FieldError message={error} />
    </div>
  );
}
