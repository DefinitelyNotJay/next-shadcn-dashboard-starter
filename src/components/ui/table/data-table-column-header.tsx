'use client';

import type { Column } from '@tanstack/react-table';
import { EyeOff } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CaretSortIcon,
  Cross2Icon
} from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort();
  const canHide = column.getCanHide();
  const canFilter = column.getCanFilter();
  const [open, setOpen] = useState(false);

  const filterValue = (column.getFilterValue() ?? '') as string;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'hover:bg-accent focus:ring-ring data-[state=open]:bg-accent -ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 focus:ring-1 focus:outline-none',
          className
        )}
        {...props}
      >
        {title}
        {canSort &&
          (column.getIsSorted() === 'desc' ? (
            <ChevronDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ChevronUpIcon />
          ) : (
            <CaretSortIcon />
          ))}
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='w-48 space-y-1 p-2'>
        {canFilter && (
          <div className='pt-2'>
            <Input
              ref={inputRef}
              placeholder={column.columnDef.meta?.placeholder as string}
              value={filterValue}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          </div>
        )}

        {canSort && (
          <>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false)}
            >
              <ChevronUpIcon /> Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true)}
            >
              <ChevronDownIcon /> Desc
            </DropdownMenuCheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenuItem onClick={() => column.clearSorting()}>
                <Cross2Icon /> Reset
              </DropdownMenuItem>
            )}
          </>
        )}

        {canHide && (
          <DropdownMenuCheckboxItem
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff /> Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
