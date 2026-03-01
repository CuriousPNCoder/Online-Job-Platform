import { ReactNode } from "react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends { id?: string }>({ columns, rows }: Props<T>): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-xl border border-brand-100 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-brand-50 text-brand-900">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 font-semibold">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id ?? idx} className="border-t border-brand-100">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-slate-700">
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[String(col.key)] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
