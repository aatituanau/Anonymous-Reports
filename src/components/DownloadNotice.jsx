export default function DownloadNotice({visible, title, items}) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[min(92vw,28rem)] rounded-2xl border border-red-200 bg-white p-4 shadow-xl">
      <p className="text-sm font-semibold text-red-700">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
        {items.map((item) => (
          <li
            key={`${item.section}-${item.label}`}
            className="rounded-lg bg-red-50 px-3 py-2 text-red-800"
          >
            <span className="font-semibold">{item.section}:</span> {item.label}{" "}
            - {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
