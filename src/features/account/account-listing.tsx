'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { UserTable } from './account-tables';
import { accountColumns } from './account-tables/columns';
import { fetchUsers } from '@/services/account.service';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import type { User } from '@/app/utils/schemaTypes';

export default function CourseListingPage() {
  const searchParams = useSearchParams();

  const rawParams = useMemo(
    () => Object.fromEntries(searchParams.entries()) as Record<string, string>,
    [searchParams.toString()]
  );

  const fetchParams = useMemo(
    () => ({
      page: rawParams.page ?? '1',
      perPage: rawParams.perPage ?? '10',
      sort: rawParams.sort ? JSON.parse(rawParams.sort) : []
    }),
    [rawParams.page, rawParams.perPage, rawParams.sort]
  );

  const { data, isLoading } = useQuery({
    queryKey: ['users', fetchParams],
    queryFn: () => fetchUsers(fetchParams)
  });

  const clientFilters = useMemo(
    () =>
      Object.entries(rawParams).filter(
        ([key]) => !['page', 'perPage', 'sort'].includes(key)
      ),
    [rawParams]
  );

  const users: User[] = data?.data || [];
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      clientFilters.every(([key, value]) => {
        const field = String((user as any)[key] ?? '').toLowerCase();
        return field.includes(value.toLowerCase());
      })
    );
  }, [users, clientFilters]);

  const totalClientItems = filteredUsers.length;

  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <UserTable
      data={filteredUsers}
      totalItems={totalClientItems}
      columns={accountColumns}
    />
  );
}
