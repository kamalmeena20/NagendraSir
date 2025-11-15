export default function Table({ columns = [], data = [], actions }) {
  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-[#009E66] text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3">{col}</th>
            ))}
            {actions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="py-6 text-center text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item._id || idx} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3">{item[col.toLowerCase()]}</td>
                ))}

                {actions && (
                  <td className="px-4 py-3">{actions(item)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
