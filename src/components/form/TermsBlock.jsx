export default function TermsBlock({checked, onChange, error}) {
  return (
    <label 
      className={`block cursor-pointer rounded-xl border p-4 transition ${
        error 
          ? 'border-red-500 bg-red-50/50 hover:border-red-600' 
          : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          checked={checked}
          className={`mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-600 ${
            error ? 'border-red-500' : 'border-slate-300'
          }`}
          id="aceptaTerminos"
          name="aceptaTerminos"
          onChange={onChange}
          type="checkbox"
        />
        <span className={`text-sm leading-6 ${error ? 'text-red-800 font-medium' : 'text-slate-800'}`}>
          Acepto los términos legales y declaro bajo juramento que toda la
          información proporcionada es verídica y comprobable.
        </span>
      </div>
      {error && <p className="mt-2 text-sm text-red-600 font-medium ml-7">{error}</p>}
    </label>
  );
}
