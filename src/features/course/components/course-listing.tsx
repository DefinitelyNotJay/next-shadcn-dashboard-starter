'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { CourseTable } from './course-tables';
import { courseColumns } from './course-tables/columns';
import axiosClient from '@/app/utils/axios'; // สมมุติว่าใช้ axios instance
import { Course } from '@/app/utils/schemaTypes';
import { fetchCourses } from '@/services/course.service';
import { Suspense, useMemo } from 'react';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export default function CourseListingPage() {
  const searchParams = useSearchParams();

  const rawParams = useMemo(
    () => Object.fromEntries(searchParams.entries()) as Record<string, string>,
    [searchParams.toString()]
  );

  const fetchParams = useMemo(
    () => ({
      page: rawParams.page ?? '1',
      perPage: rawParams.perPage ?? '10',
      sort: rawParams.sort ? JSON.parse(rawParams.sort) : []
    }),
    [rawParams.page, rawParams.perPage, rawParams.sort]
  );

  const clientFilters = useMemo(
    () =>
      Object.entries(rawParams).filter(
        ([key]) => !['page', 'perPage', 'sort'].includes(key)
      ),
    [rawParams]
  );

  const { data } = useQuery({
    queryKey: ['courses', fetchParams],
    queryFn: () => fetchCourses(fetchParams)
  });

  console.log('courses', data);

  const courses: Course[] = data?.data || [];
  const totalcourses: number = data?.totalItems || 0;

  const filteredCourses = useMemo(() => {
    return courses.filter((user) =>
      clientFilters.every(([key, value]) => {
        const field = String((user as any)[key] ?? '').toLowerCase();
        return field.includes(value.toLowerCase());
      })
    );
  }, [courses, clientFilters]);

  return (
    <Suspense
      fallback={
        <DataTableSkeleton
          columnCount={courseColumns.length}
          rowCount={8}
          filterCount={2}
        />
      }
    >
      <CourseTable
        data={filteredCourses}
        totalItems={totalcourses}
        columns={courseColumns}
      />
    </Suspense>
  );
}
