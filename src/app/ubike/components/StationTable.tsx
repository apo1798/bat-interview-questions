import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const columnHelper = createColumnHelper<StationInfo>();

const columns = [
  columnHelper.display({
    header: '縣市',
    id: 'city/county',
    cell: '台北市',
  }),
  columnHelper.accessor('sarea', {
    header: '區域',
  }),
  columnHelper.accessor('sna', {
    header: '站點名稱',
    id: 'sna',
  }),
  columnHelper.accessor('sbi', {
    header: '可借車輛',
  }),
  columnHelper.accessor('bemp', {
    header: '可還空位',
  }),
];

type Props = { data: StationInfo[] };

const StationTable = ({ data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className=''>
      <table className='my-8 w-full border-separate border-spacing-0'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                    className={clsx(
                      'sticky top-16 border-y border-solid border-gray-300 bg-lime-500 px-2 py-3 text-sm font-normal text-white first:rounded-tl-xl first:border-l last:rounded-tr-xl last:border-r md:whitespace-nowrap md:px-8 md:text-base',
                      header.column.getCanSort() &&
                        'cursor-pointer select-none hover:bg-lime-600'
                    )}
                    key={header.id}
                  >
                    <span className='inline-flex items-center gap-x-2'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaArrowUp />,
                        desc: <FaArrowDown />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr className='group even:bg-gray-100 hover:bg-lime-200'>
              <td
                className={clsx(
                  'border-solid border-gray-300 px-2 py-4 first:border-l last:border-r first:group-last:rounded-bl-xl group-last:last:rounded-br-xl md:px-4',
                  'border-b border-solid border-gray-200'
                )}
                colSpan={5}
              >
                目前尚未有相關資料，請更改搜尋條件
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className='group even:bg-gray-100 hover:bg-lime-200'
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={clsx(
                          'border-solid border-gray-300 px-2 py-4 first:border-l last:border-r first:group-last:rounded-bl-xl group-last:last:rounded-br-xl md:px-4',
                          !cell.id.includes('sna') && 'text-center',
                          row.index === data.length - 1 &&
                            'border-b border-solid border-gray-200'
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};
export default StationTable;
