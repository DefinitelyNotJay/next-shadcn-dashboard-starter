'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { AttendantTable } from './attendant-tables';
import { columns } from './attendant-tables/columns';
import axiosClient from 'utils/axios';
import { Course, CourseAttendantWithUser } from 'utils/schemaTypes';

async function fetchAttendants(
  params: Record<string, string | string[] | undefined>
) {
  const { page, name, perPage, category } = params;

  const filters: any = {
    page,
    limit: perPage,
    ...(name && { search: name }),
    ...(category && { categories: category })
  };

  // create new api attendant fetch
  const response = await axiosClient.get<CourseAttendantWithUser[]>(
    `/lecturer/${page}/enrollments/attendants`,
    { params: filters }
  );
  console.log('response', response.data);
  return response.data;
}

export default function AttendantListingPage() {
  const searchParams = useSearchParams();

  const queryParams = {
    page: searchParams.get('page') || '1',
    name: searchParams.get('name') || '',
    perPage: searchParams.get('perPage') || '10',
    category: searchParams.get('category') || ''
  };

  const { data, isLoading } = useQuery({
    queryKey: ['attendants', queryParams],
    queryFn: () => fetchAttendants(queryParams)
  });

  if (isLoading) return <p>Loading...</p>;

  const attendants: CourseAttendantWithUser[] = data || [];
  const totalAttendants: number = attendants.length || 0;

  return (
    <AttendantTable
      data={attendants}
      totalItems={totalAttendants}
      columns={columns}
    />
  );
}
