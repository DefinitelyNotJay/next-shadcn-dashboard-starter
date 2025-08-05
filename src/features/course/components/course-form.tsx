'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
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
import axiosClient from '@/app/utils/axios';
import { Course } from '@/app/utils/schemaTypes';
import * as z from 'zod';
import Image from 'next/image';
import { CourseFormValues, courseSchema } from '@/schemas/course';
import { IconRefresh, IconRewindBackward10 } from '@tabler/icons-react';
import { resetAccessCode } from '@/services/course.service';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export default function CourseForm({
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
    description: initialData?.description || '',
    access_code: initialData?.access_code || ''
  };

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    values: defaultValues,
    shouldUnregister: true
  });

  const courseStatus = [
    { id: 1, name: 'Active', value: 'active' },
    { id: 2, name: 'Inactive', value: 'inactive' }
  ];

  async function onSubmit(values: CourseFormValues) {
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

  async function onResetAccessCode() {
    try {
      const newAccessCode = await resetAccessCode(initialData?.id ?? 0);
      form.setValue('access_code', newAccessCode);
    } catch (error) {}
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='poster_image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Upload Course Image</FormLabel>
                    <FormControl>
                      <div>
                        <FileUploader
                          value={
                            typeof field.value === 'string' ? [] : field.value
                          }
                          onValueChange={field.onChange}
                          maxFiles={4}
                          maxSize={4 * 1024 * 1024}
                          // disabled={loading}
                          // progresses={progresses}
                          // pass the onUpload function here for direct upload
                          // onUpload={uploadFiles}
                          // disabled={isUploading}
                        />
                        {typeof field.value === 'string' && field.value && (
                          <div className='mt-2'>
                            <p className='mb-2'>Course Image</p>
                            <Image
                              src={`http://localhost:3333/${field.value}`}
                              alt='Course image'
                              width={200}
                              height={200}
                              className='rounded-md border object-cover'
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[2fr_1fr]'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter course name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-3'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='-translate-y-2'>
                      <FormLabel className='text-base font-medium'>
                        Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Choose Status' />
                          </SelectTrigger>
                          <SelectContent>
                            {courseStatus.map((status) => (
                              <SelectItem key={status.id} value={status.value}>
                                {status.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* // access code */}
                {initialData && (
                  <FormField
                    control={form.control}
                    name='access_code'
                    render={({ field }) => (
                      <FormItem className='-translate-y-2'>
                        <FormLabel className='text-base font-medium'>
                          Access Code
                        </FormLabel>
                        <FormControl>
                          <div className='flex items-center space-x-2'>
                            <Input
                              type='text'
                              {...field}
                              disabled
                              value={field.value ?? ''}
                              className='flex-1'
                            />
                            <Button
                              type='button'
                              onClick={onResetAccessCode}
                              className='cursor-pointer'
                            >
                              <IconRefresh />
                            </Button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              {/* <FormField
                control={form.control}
                name=''
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter course description'
                      className='resize-none'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>
              {initialData ? 'Edit Course' : 'Add Course'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
