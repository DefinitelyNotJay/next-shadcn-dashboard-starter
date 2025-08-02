'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { CourseTable } from './course-tables';
import { columns } from './course-tables/columns';
import axiosClient from '@/app/utils/axios'; // สมมุติว่าใช้ axios instance
import { Course } from '@/app/utils/schemaTypes';
import { fetchCourses } from '@/services/course.service';

export default function CourseListingPage() {
  const searchParams = useSearchParams();

  const queryParams = {
    page: searchParams.get('page') || '1',
    name: searchParams.get('name') || '',
    perPage: searchParams.get('perPage') || '10',
    category: searchParams.get('category') || ''
  };

  const { data, isLoading } = useQuery({
    queryKey: ['courses', queryParams],
    queryFn: () => fetchCourses(queryParams)
  });

  console.log('course data', data);

  if (isLoading) return <p>Loading...</p>;

  const courses: Course[] = data || [];
  const totalcourses: number = data || 0;

  return (
    <CourseTable data={courses} totalItems={totalcourses} columns={columns} />
  );
}
