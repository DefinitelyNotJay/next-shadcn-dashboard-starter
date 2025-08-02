'use client';
import { User } from '@/app/utils/schemaTypes';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';

export const accountColumns: ColumnDef<User>[] = [
  {
    id: 'first_name',
    accessorKey: 'first_name',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row, cell }) => {
      return <div>{cell.getValue<User['first_name']>()}</div>;
    },
    enableColumnFilter: true
  }
];
