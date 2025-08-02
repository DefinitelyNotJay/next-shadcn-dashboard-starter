'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { UserTable } from './account-tables';
import { accountColumns } from './account-tables/columns';
import axiosClient from '@/app/utils/axios'; // สมมุติว่าใช้ axios instance
import { Course, User } from '@/app/utils/schemaTypes';
import { fetchCourses } from '@/services/course.service';
import { fetchUsers } from '@/services/account.service';

export default function CourseListingPage() {
  const searchParams = useSearchParams();

  const queryParams = {
    page: searchParams.get('page') || '1',
    name: searchParams.get('name') || '',
    perPage: searchParams.get('perPage') || '10',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort')
  };

  const { data, isLoading } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => fetchUsers(queryParams)
  });

  console.log('user data', data);

  if (isLoading) return <p>Loading...</p>;

  const courses: User[] = data?.data || [];
  const totalcourses: number = data?.totalItems || 0;

  return (
    <UserTable
      data={courses}
      totalItems={totalcourses}
      columns={accountColumns}
    />
  );
}
