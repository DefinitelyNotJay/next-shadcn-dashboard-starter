import axiosClient from '@/app/utils/axios';
export async function fetchCourses(
  params: Record<string, string | string[] | undefined>
) {
  const { page, name, perPage, category } = params;

  const filters: any = {
    page,
    limit: perPage,
    ...(name && { search: name }),
    ...(category && { categories: category })
  };

  const response = await axiosClient.get('/courses', { params: filters });
  return response.data;
}
