'use client';

import { GenericDataTable } from '@/features/components/table/GenericDataTable';
import { accountColumns } from '@/features/account/account-tables/columns';
import { fetchUsers } from '@/services/account.service';

export default function AccountListing() {
  return (
    <GenericDataTable
      title='Accounts'
      columns={accountColumns}
      fetchData={({ page, perPage, ...filters }) =>
        fetchUsers({ page, perPage, ...filters })
      }
    />
  );
}
