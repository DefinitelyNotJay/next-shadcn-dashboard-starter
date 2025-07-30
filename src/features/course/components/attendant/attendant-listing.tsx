// file: app/dashboard/course/[courseId]/components/attendant-listing.tsx
import AttendantTable from './attendant-table';
import { columns } from './attendant-tables/columns';
import axiosServer from '@/app/utils/axiosServer';
import { CourseAttendantWithUser } from '@/app/utils/schemaTypes';

interface Props {
  params: { courseId: string };
  searchParams: {
    page?: string;
    name?: string;
    perPage?: string;
    category?: string;
  };
}

export default async function AttendantListingPage({
  params,
  searchParams
}: Props) {
  const { courseId } = params;
  const page = Number(searchParams.page ?? '1');
  const perPage = Number(searchParams.perPage ?? '10');
  const name = searchParams.name ?? '';
  const category = searchParams.category ?? '';

  // fetch บน server
  const response = await axiosServer.get<CourseAttendantWithUser[]>(
    `/lecturer/${courseId}/enrollments/attendants`,
    {
      params: {
        page,
        limit: perPage,
        ...(name && { search: name }),
        ...(category && { categories: category })
      }
    }
  );
  const attendants = response.data;
  const totalAttendees = attendants.length;

  return (
    <AttendantTable
      attendants={attendants}
      page={page}
      perPage={perPage}
      totalAttendees={totalAttendees}
    />
  );
}
