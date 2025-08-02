import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CardParentProps = {
  title?: string;
  children: React.ReactNode;
};

const CardParent: React.FC<CardParentProps> = ({ title, children }) => {
  return (
    <Card className='mx-auto w-full max-w-full rounded-2xl shadow-lg'>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardParent;
