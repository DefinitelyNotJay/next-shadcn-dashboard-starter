// features/course/components/course-view-page.tsx
import { notFound } from 'next/navigation';
import { User } from '@/app/utils/schemaTypes';
import axiosServer from '@/app/utils/axiosServer';
import UserForm from './user-form';

type TUserViewPageProps = {
  userId: string;
  searchParams: {
    page?: string;
    name?: string;
    perPage?: string;
    category?: string;
  };
};

export default async function UserViewPage({
  userId,
  searchParams
}: TUserViewPageProps) {
  let user: User | null = null;
  let pageTitle = 'Create New Course';

  if (userId !== 'new') {
    const res = await axiosServer.get(`/admin/user/${userId}`);
    user = res.data as User;
    if (!user) notFound();
    pageTitle = 'Edit User Account';
  }

  return (
    <>
      <UserForm initialData={user} pageTitle='User Account' />
    </>
  );
}
