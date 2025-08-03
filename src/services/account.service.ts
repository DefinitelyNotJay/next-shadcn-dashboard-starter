import axiosClient from '@/app/utils/axios';
import axiosServer from '@/app/utils/axiosServer';
import { UserFormValues } from '@/schemas/user';
import { User } from '@sentry/nextjs';

// services/user.service.ts

export async function fetchUsers(params: {
  page: string;
  perPage: string;
  sort: { id: string; desc: boolean }[];
  [key: string]: any;
}) {
  const { page, perPage, sort, ...filters } = params;
  console.log('filtetrs', filters);

  const resp = await axiosClient.get('/admin/user', {
    params: {
      page,
      perPage,
      sort: JSON.stringify(sort),
      ...filters
    }
  });

  return {
    data: resp.data.data,
    totalItems: resp.data.meta.total as number
  };
}

export async function createUser(data: UserFormValues) {
  const resp = await axiosClient.post('/admin/user', data);
  console.log('account data', resp.data);
  return { data: resp.data, totalItems: resp.data.total || 4 };
}

export async function updateUser(data: UserFormValues) {
  const resp = await axiosClient.put(`/admin/user/${data.id}`, data);
  console.log('account data', resp.data);
  return { data: resp.data, totalItems: resp.data.total || 4 };
}

export async function deleteUser(data: UserFormValues) {
  console.log('data delete', data);
  const resp = await axiosClient.delete(`/admin/user/${data.id}`);
  return resp.data;
}
