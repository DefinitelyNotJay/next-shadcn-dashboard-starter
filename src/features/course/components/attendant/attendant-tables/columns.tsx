'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CourseAttendant } from '@/app/utils/schemaTypes';

export const attendantColumns: ColumnDef<CourseAttendant>[] = [
  {
    id: 'username',
    header: 'Username',
    accessorFn: (row) => row.user.username,
    cell: (info) => info.getValue()
  },
  {
    id: 'fullName',
    header: 'Name',
    accessorFn: (row) => `${row.user.first_name} ${row.user.last_name}`,
    cell: (info) => info.getValue()
  },
  {
    id: 'thaiName',
    header: 'ชื่อ (ไทย)',
    accessorFn: (row) => `${row.user.first_name_th} ${row.user.last_name_th}`,
    cell: (info) => info.getValue()
  },
  {
    id: 'email',
    header: 'Email',
    accessorFn: (row) => row.user.email,
    cell: (info) => info.getValue()
  },
  {
    id: 'role',
    header: 'Role',
    accessorFn: (row) => row.role.name,
    cell: (info) => info.getValue()
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: (info) => info.getValue()
  },
  {
    id: 'lastViewed',
    header: 'Last Viewed',
    accessorKey: 'last_viewed_at',
    cell: (info) => {
      const v = info.getValue<string | null>();
      return v ? new Date(v).toLocaleString() : '-';
    }
  }
];
