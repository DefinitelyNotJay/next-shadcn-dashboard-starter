import { notFound } from 'next/navigation';
import { Course } from 'utils/schemaTypes';
import axiosServer from 'utils/axiosServer';
import CourseForm from './course-form';
import CourseAttendantForm from './course-attendant-form';
import AttendantListingPage from './attendant/attendant-listing';

type TCourseViewPageProps = {
  courseId: string;
};

export default async function CourseViewPage({
  courseId
}: TCourseViewPageProps) {
  let course = null;
  let pageTitle = 'Create New Course';

  if (courseId !== 'new') {
    // get former
    const data = await axiosServer.get(`/lecturer/${courseId}/course`);
    console.log('data', data);
    course = data.data as Course;
    if (!course) {
      notFound();
    }
    pageTitle = `Edit Course`;
  }

  return (
    <>
      <CourseForm initialData={course} pageTitle={pageTitle} />
      {course && <AttendantListingPage />}
    </>
  );
}
