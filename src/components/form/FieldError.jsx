export default function FieldError({message}) {
  if (!message) return null;

  return <p className="text-xs text-red-600">{message}</p>;
}
