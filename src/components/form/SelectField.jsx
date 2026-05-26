import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  children,
  error,
  className,
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <select
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <FieldError message={error} />
    </div>
  );
}
