import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { CourseAttendantWithUser } from '@/app/utils/schemaTypes';
import { Badge } from '@/components/ui/badge';
import { CellAction } from './attendant-tables/cell-action';

const AttendantTable = ({
  attendants,
  totalAttendees,
  page,
  perPage
}: {
  attendants: CourseAttendantWithUser[];
  totalAttendees: number;
  page: number;
  perPage: number;
}) => {
  const roleName = (name: string) => {
    switch (name) {
      case 'ta':
        return <Badge variant={'outline'}>Teaching Assistant</Badge>;
      case 'instructor':
        return <Badge>Instructor</Badge>;
      case 'student':
        return <Badge variant={'outline'}>Student</Badge>;
    }
  };
  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableCaption>Total: {totalAttendees}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendants.map((att, idx) => (
            <TableRow key={att.id ?? idx}>
              <TableCell>{(page - 1) * perPage + idx + 1}</TableCell>
              <TableCell>
                {att.user.first_name + ' ' + att.user.last_name}
              </TableCell>
              <TableCell>{att.user.email}</TableCell>
              <TableCell>{roleName(att.role.name)}</TableCell>
              {/* <TableCell>{att.category}</TableCell> */}
              <TableCell>{att.created_at || '22/03/08'}</TableCell>
              <TableCell>
                <CellAction data={att} />
              </TableCell>
            </TableRow>
          ))}
          {attendants.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                ไม่พบข้อมูลผู้เข้าอบรม
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendantTable;
