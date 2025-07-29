import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { Course } from 'utils/schemaTypes';
import axiosServer from 'utils/axiosServer';

type TProductViewPageProps = {
  courseId: string;
};

export default async function ProductViewPage({
  courseId
}: TProductViewPageProps) {
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

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
