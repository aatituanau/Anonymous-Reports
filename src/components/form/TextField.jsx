import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";

export default function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  className,
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <input
        className={`${className} ${error ? '!border-red-500 !ring-red-500/20' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      <FieldError message={error} />
    </div>
  );
}
