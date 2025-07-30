// src/hooks/use-user.ts
import useSWR from 'swr';
import axiosClient from '@/app/utils/axios';
import { User } from '@/app/utils/schemaTypes';

type useUserResponse = {
  user: User;
  message: string;
};

export function useUser() {
  const { data, error, isLoading } = useSWR<User>(
    '/auth/me',
    async (url) => {
      const resp = await axiosClient.get<useUserResponse>(url);
      const res = resp.data;
      return {
        ...resp.data.user,
        fullname: res.user.first_name + ' ' + res.user.last_name
      };
    },
    {
      revalidateOnFocus: false
    }
  );

  return {
    data
  };
}
