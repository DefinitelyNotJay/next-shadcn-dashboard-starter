// src/app/dashboard/account/page.tsx
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import AccountListing from '@/features/account/account-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { accountColumns } from '@/features/account/account-tables/columns';

export const metadata = {
  title: 'Dashboard: Accounts'
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Accounts' description='Manage accounts' />
          <Link
            href='/dashboard/account/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>

        <Separator />

        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={accountColumns.length}
              rowCount={8}
              filterCount={2}
            />
          }
        >
          <AccountListing />
        </Suspense>
      </div>
    </PageContainer>
  );
}
