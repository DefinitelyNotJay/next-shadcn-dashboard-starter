import axiosClient from '@/app/utils/axios';
import { UserFormValues } from '@/schemas/user';

// services/auth.service.ts

export async function signOut() {
  const resp = await axiosClient.post('/auth/logout');
  return resp;
}
