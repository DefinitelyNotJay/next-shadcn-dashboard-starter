'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle, Archive } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { Course } from '@/app/utils/schemaTypes';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'poster_image',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={`http://localhost:3333/` + row.getValue('poster_image')}
            alt={'123'}
            fill
            className='rounded-lg'
            unoptimized
          />
        </div>
      );
    }
  },
  {
    id: 'title',
    accessorKey: 'title',
    header: ({ column }: { column: Column<Course, unknown> }) => (
      <DataTableColumnHeader column={column} title='TITLE' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Course['title']>()}</div>,
    meta: {
      label: 'Title',
      placeholder: 'Search products...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  // {
  //   accessorKey: 'status',
  //   header: 'STATUS'
  // },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<Course, unknown> }) => (
      <DataTableColumnHeader column={column} title='STATUS' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Course['status']>();
      const Icon =
        status === 'active'
          ? CheckCircle2
          : status === 'archive'
            ? Archive
            : XCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true
    // meta: {
    //   label: 'categories',
    //   variant: 'multiSelect',
    //   options: CATEGORY_OPTIONS
    // }
  },
  {
    accessorKey: 'is_public',
    cell: ({ cell }) => {
      const isPublic = cell.getValue<Course['is_public']>();
      return <p>{isPublic ? 'Public' : 'Private'}</p>;
    },
    header: 'PUBLIC'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ cell }) => {
      const desc = cell.getValue<Course['description']>() || '';
      const shortDesc = desc.length > 70 ? desc.slice(0, 70) + '...' : desc;
      return <p className='line-clamp-2'>{shortDesc}</p>;
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
