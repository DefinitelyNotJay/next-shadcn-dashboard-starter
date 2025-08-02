import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import UserViewPage from '@/features/account/user-view-page';
import CourseViewPage from '@/features/course/components/course-view-page';
import { Suspense } from 'react';

interface PageProps {
  params: { userId: string };
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
          <UserViewPage userId={params.userId} searchParams={searchParams} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
