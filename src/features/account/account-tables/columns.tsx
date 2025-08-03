'use client';

import { User } from '@/app/utils/schemaTypes';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { IconCheck, IconX } from '@tabler/icons-react';
import { CellAction } from './cell-action';

export const accountColumns: ColumnDef<User>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    enableColumnFilter: true
  },
  {
    id: 'first_name',
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    meta: {
      label: 'First Name',
      placeholder: 'Search first name...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'last_name',
    accessorKey: 'last_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    meta: {
      label: 'Last Name',
      placeholder: 'Search last name...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    meta: {
      label: 'Email',
      placeholder: 'Search email...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'username',
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<string>() || '-'}</div>,
    meta: {
      label: 'Username',
      placeholder: 'Search username...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'phone_number',
    header: 'Phone Number',
    accessorKey: 'phone_number'
  },
  {
    id: 'is_itkmitl',
    accessorKey: 'is_itkmitl',
    cell: ({ cell }) => (
      <div className='w-full text-center'>
        {cell.getValue<boolean>() ? <IconCheck /> : <IconX />}
      </div>
    ),
    header: 'IT KMITL',
    meta: {
      label: 'Is IT KMITL',
      placeholder: '',
      variant: 'text'
    },
    enableColumnFilter: false
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction key={row.original.id} data={row.original} />
  }
];
