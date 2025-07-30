'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CourseAttendantWithUser } from '@/app/utils/schemaTypes';

export const columns: ColumnDef<CourseAttendantWithUser>[] = [
  {
    accessorKey: 'user.profile_image',
    id: 'image',
    header: 'IMAGE',
    cell: ({ getValue }) => {
      const url = getValue<string>();
      if (!url) {
        return (
          <div className='relative flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200'>
            <span className='text-xs text-gray-500'>No Image</span>
          </div>
        );
      }
      return (
        <div className='relative h-10 w-10'>
          <Image
            src={url}
            alt='Profile'
            fill
            className='rounded-lg object-cover'
            unoptimized
            onError={(e) => {
              console.log('Image load error:', e);
            }}
          />
        </div>
      );
    }
  },
  {
    accessorFn: (row) =>
      `${row.user?.first_name || ''} ${row.user?.last_name || ''}`.trim(),
    id: 'fullname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='FULLNAME' />
    ),
    cell: ({ getValue }) => {
      const name = getValue<string>();
      return (
        <Badge variant='outline' className='capitalize'>
          {name || 'Unknown User'}
        </Badge>
      );
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'user.email',
    id: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='EMAIL' />
    ),
    cell: ({ getValue }) => {
      const email = getValue<string>();
      return <span className='text-sm'>{email || 'No email'}</span>;
    }
  }
];
