// features/course/components/course-view-page.tsx
import { notFound } from 'next/navigation';
import { Course } from '@/app/utils/schemaTypes';
import axiosServer from '@/app/utils/axiosServer';
import CourseForm from './course-form';
import AttendantListingPage from './attendant/attendant-listing';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { AddAttendant } from './attendant/attendant-tables/add-attendant';
import CardParent from '@/features/auth/components/card-parent';

type TCourseViewPageProps = {
  courseId: string;
  searchParams: {
    page?: string;
    name?: string;
    perPage?: string;
    category?: string;
  };
};

export default async function CourseViewPage({
  courseId,
  searchParams
}: TCourseViewPageProps) {
  let course: Course | null = null;
  let pageTitle = 'Create New Course';

  if (courseId !== 'new') {
    const res = await axiosServer.get(`/lecturer/${courseId}/course`);
    course = res.data as Course;
    if (!course) notFound();
    pageTitle = 'Edit Course';
  }

  return (
    <>
      <CourseForm initialData={course} pageTitle={pageTitle} />

      {course && (
        <CardParent>
          <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
              <div className='flex items-start justify-between'>
                <Heading
                  title='Attendants'
                  description='Manage attendants (Server side table functionalities.)'
                />
                <AddAttendant />
              </div>
              <Separator />
              <Suspense
                fallback={
                  <DataTableSkeleton
                    columnCount={5}
                    rowCount={8}
                    filterCount={2}
                  />
                }
              >
                {/* ส่ง params+searchParams ลงไป */}
                <AttendantListingPage
                  params={{ courseId }}
                  searchParams={searchParams}
                />
              </Suspense>
            </div>
          </PageContainer>
        </CardParent>
      )}
    </>
  );
}
