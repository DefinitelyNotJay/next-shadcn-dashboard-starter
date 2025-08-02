// src/schemas/user.ts
import { z } from 'zod';

export const userFormSchema = z.object({
  id: z.number().optional().nullable(),
  email: z.string().email(),
  username: z.string().optional().nullable(),
  prefix: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  prefix_th: z.string().optional().nullable(),
  first_name_th: z.string().optional().nullable(),
  last_name_th: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  role_id: z.number().optional().nullable(),
  is_itkmitl: z.boolean().optional().nullable()
});

export type UserFormValues = z.infer<typeof userFormSchema>;
