export default function Table({ columns = [], data = [], actions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-soft backdrop-blur-md">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">{col}</th>
            ))}
            {actions && <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="py-8 text-center text-white/50">
                No data found
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item._id || idx} className="transition hover:bg-white/5">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3.5 text-white/80">{item[col.toLowerCase()]}</td>
                ))}

                {actions && (
                  <td className="px-4 py-3.5">{actions(item)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
