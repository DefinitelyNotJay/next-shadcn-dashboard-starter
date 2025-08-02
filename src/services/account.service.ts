import axiosClient from '@/app/utils/axios';

// services/user.service.ts
export async function fetchUsers({
  page,
  perPage
}: {
  page: number;
  perPage: number;
}) {
  const resp = await axiosClient.get('/admin/user', {
    params: { page, perPage }
  });
  console.log('account data', resp.data);
  return { data: resp.data, totalItems: resp.data.total || 4 };
}
