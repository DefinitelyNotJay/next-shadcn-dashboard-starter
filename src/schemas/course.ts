import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, { message: 'กรุณากรอกชื่อคอร์สเรียน' }),
  status: z
    .enum(['active', 'inactive', 'archive'], {
      message: 'กรุณาเลือกสถานะคอร์ส'
    })
    .default('active'),
  access_code: z.string().optional(),
  poster_image: z.any().optional(),
  description: z.string().nullable().optional()
});

export type CourseFormValues = z.infer<typeof courseSchema>;
