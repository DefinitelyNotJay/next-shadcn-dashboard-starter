import { User } from '@/app/utils/schemaTypes';
import { ColumnDef } from '@tanstack/react-table';

export const accountColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'first_name',
    header: 'First Name'
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  }
];
