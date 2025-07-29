'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';
import { Course } from 'utils/schemaTypes';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'poster_image',
    header: 'IMAGE',
    cell: ({ row }) => {
      console.log(row.getValue('poster_image'));
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
      <DataTableColumnHeader column={column} title='Title' />
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
  //   id: 'category',
  //   accessorKey: 'category',
  //   header: ({ column }: { column: Column<Course, unknown> }) => (
  //     <DataTableColumnHeader column={column} title='Category' />
  //   ),
  //   cell: ({ cell }) => {
  //     const status = cell.getValue<Course['category']>();
  //     const Icon = status === 'active' ? CheckCircle2 : XCircle;

  //     return (
  //       <Badge variant='outline' className='capitalize'>
  //         <Icon />
  //         {status}
  //       </Badge>
  //     );
  //   },
  //   enableColumnFilter: true,
  //   meta: {
  //     label: 'categories',
  //     variant: 'multiSelect',
  //     options: CATEGORY_OPTIONS
  //   }
  // },
  // {
  //   accessorKey: 'price',
  //   header: 'PRICE'
  // },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
