// จากเดิมคุณเขียนเป็น Promise<T> จับมา await เอา params ทีหลัง – ให้เปลี่ยนเป็นรับ params+searchParams ตรงๆ แทน
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import CourseViewPage from '@/features/course/components/course-view-page';
import { Suspense } from 'react';

interface PageProps {
  params: { courseId: string };
  searchParams: {
    page?: string;
    name?: string;
    perPage?: string;
    category?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <CourseViewPage
            courseId={params.courseId}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
