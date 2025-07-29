import { notFound } from 'next/navigation';
import { Course } from 'utils/schemaTypes';
import axiosServer from 'utils/axiosServer';
import CourseForm from './course-form';

type TCourseViewPageProps = {
  courseId: string;
};

export default async function CourseViewPage({
  courseId
}: TCourseViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Course';

  if (courseId !== 'new') {
    // get former
    const data = await axiosServer.get(`/lecturer/${courseId}/course`);
    console.log('data', data);
    product = data.data as Course;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Course`;
  }

  return <CourseForm initialData={product} pageTitle={pageTitle} />;
}
