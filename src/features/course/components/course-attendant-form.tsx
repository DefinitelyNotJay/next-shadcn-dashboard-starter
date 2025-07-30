'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axiosClient from 'utils/axios';
import { Course } from 'utils/schemaTypes';
import * as z from 'zod';
import Image from 'next/image';
import StudentForm from './attendant/student-form';
import AttendantForm from './attendant/student-form';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export default function CourseAttendantForm({
  initialData,
  pageTitle
}: {
  initialData: Course | null;
  pageTitle: string;
}) {
  const defaultValues = {
    title: initialData?.title || '',
    status: initialData?.status || 'active',
    poster_image: initialData?.poster_image || '',
    description: initialData?.description || ''
  };

  const formSchema = z.object({
    title: z.string().min(1, { message: 'กรุณากรอกชื่อคอร์สเรียน' }),
    status: z
      .enum(['active', 'inactive', 'archive'], {
        message: 'กรุณาเลือกสถานะคอร์ส'
      })
      .default('active'),
    poster_image: z.any().optional(),
    description: z.string().nullable().optional()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const courseStatus = [
    { id: 1, name: 'Active', value: 'active' },
    { id: 2, name: 'Inactive', value: 'inactive' }
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic would be implemented here
    console.log(values);
    const method = initialData ? axiosClient.patch : axiosClient.post;
    const url = initialData ? `lecturer/${initialData.id}/course/` : `/course`;
    try {
      const response = await method(url, values, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast('Update successfully');
    } catch (error) {
      toast('เกิดข้อผิดพลาด');
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AttendantForm />
      </CardContent>
    </Card>
  );
}
