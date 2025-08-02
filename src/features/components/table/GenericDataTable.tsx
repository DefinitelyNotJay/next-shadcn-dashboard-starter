// components/table/GenericDataTable.tsx
'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef
} from '@tanstack/react-table';
import { useDataFetcherHook } from '@/hooks/use-data-fetcher';
import { IconLoader2 } from '@tabler/icons-react';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

interface GenericDataTableProps<T> {
  columns: ColumnDef<T, any>[];
  fetchData: (params: {
    page: number;
    perPage: number;
    [key: string]: any;
  }) => Promise<{ data: T[]; totalItems: number }>;
  title?: string;
}

export function GenericDataTable<T>({
  columns,
  fetchData,
  title
}: GenericDataTableProps<T>) {
  // เปลี่ยน query param name ให้เป็น generic
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));

  // เรียก fetchData เมื่อ page / perPage หรือ filter เปลี่ยน
  const { data, totalItems, isLoading } = useDataFetcherHook<T>(
    ['generic-table', page, perPage],
    () => fetchData({ page, perPage })
  );

  const pageCount = Math.ceil((totalItems ?? 0) / perPage);

  const { table } = useDataTable({
    data, // Course data
    columns, // Course columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });

  console.log('🏷️ Rows in table model:', table.getRowModel().rows);

  return (
    <div>
      {title && <h2 className='mb-4 text-xl font-semibold'>{title}</h2>}
      {isLoading ? (
        // ถ้า loading แสดง skeleton หรือ spinner เท่านั้น
        <DataTableSkeleton
          rowCount={perPage}
          columnCount={columns.length}
          filterCount={1}
        />
      ) : (
        // พอโหลดเสร็จแล้วค่อย render DataTable จริง ๆ
        <DataTable table={table}>
          <DataTableToolbar table={table} />
        </DataTable>
      )}
    </div>
  );
}
