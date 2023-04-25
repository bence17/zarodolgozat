/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor('villany', {
		header: () => "Villany",
    cell: (cell) => cell.getValue(),
  }),
  columnHelper.accessor('gaz', {
		header: () => "Gáz",
    cell: (cell) => cell.getValue(),
  }),
  columnHelper.accessor('viz', {
		header: () => "Víz",
    cell: (cell) => cell.getValue(),
  }),
  columnHelper.accessor('datum', {
		header: () => "Dátum",
    cell: (cell) => {
      return new Date(cell.getValue()).toLocaleDateString('hu', {
        dateStyle: 'long',
      })
    },
  }),
]

export default function Table({ oraAllasok }) {
  const [data] = React.useState(oraAllasok)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className='mx-auto w-full max-w-3xl text-center border-spacing-0 border-collapse'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className='border-2 border-slate-600  bg-slate-700'
          >
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='capitalize py-3'>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className='border-2 border-slate-600 '>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-2 py-3'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
