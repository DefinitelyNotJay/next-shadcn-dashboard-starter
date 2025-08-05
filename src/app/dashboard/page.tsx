// import { auth } from '@clerk/nextjs/server';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { navItems } from '@/constants/data';
import DashboardCard from '@/features/dashboard/dashboard-card';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Dashboard() {
  // const { userId } = await auth();
  // if (!userId) {
  //   return redirect('/auth/sign-in');
  // } else {
  //   redirect('/dashboard/overview');
  // }
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Admin KITS' description='Manage every KITS content' />
        </div>
        <Separator />
        <Suspense
        // key={key}
        >
          <section className='grid grid-cols-4 gap-4'>
            {navItems.map((item, index) => (
              <DashboardCard
                title={item.title}
                desc={item.description ?? ''}
                link={item.url}
                key={index}
              />
            ))}
          </section>
        </Suspense>
      </div>
    </PageContainer>
  );
}
