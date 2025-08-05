'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconLoader2, IconSpiral, IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import nookies from 'nookies';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axiosClient from '@/app/utils/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string()
});

export default function SignInViewPage({ stars }: { stars: number }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    trigger,
    formState: { isSubmitting }
  } = form;

  const onSubmitHandler = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await axiosClient.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        data
      );
      nookies.set(null, 'authToken', res.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      nookies.set(null, 'role', res.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      router.push(`/dashboard/overview`);
    } catch (err) {
      const message =
        err.response?.data?.message || 'เกิดข้อผิดพลาด ไม่สามารถเข้าสู่ระบบได้';
      toast('เข้าสู่ระบบไม่สำเร็จ', {
        description: message
      });
    }
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Logo
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>IT Innovation for Sustainable Future</p>
            <footer className='text-sm'>
              คณะเทคโนโลยีสารสนเทศ
              สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
            </footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          {/* github link  */}
          <Link
            className={cn('group inline-flex hover:text-yellow-200')}
            target='_blank'
            href={'https://github.com/kiranism/next-shadcn-dashboard-starter'}
          >
            {/* <div className='flex items-center'>
              <GitHubLogoIcon className='size-4' />
              <span className='ml-1 inline'>Star on GitHub</span>{' '}
            </div>
            <div className='ml-2 flex items-center gap-1 text-sm md:flex'>
              <IconStar
                className='size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300'
                fill='currentColor'
              />
              <span className='font-display font-medium'>{stars}</span>
            </div> */}
          </Link>
          {/* <ClerkSignInForm
            initialValues={{
              emailAddress: 'your_mail+clerk_test@example.com'
            }}
          /> */}
          {/* form */}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className='flex flex-col gap-3'
            >
              <FormField
                control={control}
                name={`identifier`} // สมมติคุณเก็บคำตอบสั้นในฟิลด์นี้
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`password`} // สมมติคุณเก็บคำตอบสั้นในฟิลด์นี้
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                variant={'default'}
                className='cursor-pointer'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <IconLoader2 className='ml-2 inline-block h-5 w-5 animate-spin' />
                ) : (
                  'Sign-in '
                )}
              </Button>
            </form>
          </Form>

          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
