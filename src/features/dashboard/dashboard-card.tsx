'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TDashBoardCardProps = {
  title: string;
  desc: string;
  link: string;
};

const DashboardCard = ({ title, desc, link }: TDashBoardCardProps) => {
  const router = useRouter();
  return (
    <Card onClick={() => router.push(link)} className='cursor-pointer'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default DashboardCard;
