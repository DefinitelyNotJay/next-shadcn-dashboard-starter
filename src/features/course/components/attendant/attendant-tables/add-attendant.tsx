'use client';
import { useState, useEffect } from 'react';
import axiosClient from '@/app/utils/axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  IconPlus,
  IconChalkboard,
  IconBook,
  IconSchool
} from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User } from '@/app/utils/schemaTypes';

// Define available roles
type Role = 'instructor' | 'ta' | 'student';

export const AddAttendant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  // Fetch users based on selected role when modal opens

  useEffect(() => {
    if (open && role) {
      setLoading(true);

      const fetchUrl =
        role === 'instructor'
          ? ''
          : `lecturer/${params.courseId}/enrollments/unenrolled-users`;
      axiosClient
        .get(fetchUrl)
        .then((res) => setUsers(res.data))
        .catch(() => {
          toast.error('Failed to load users');
          setUsers([]);
        })
        .finally(() => setLoading(false));
    }
  }, [open, role, params.courseId]);

  const onConfirm = async (userId: string | number) => {
    setLoading(true);
    const fetchUrl =
      role === 'ta'
        ? `/lecturer/${params.courseId}/staff/addTA/${userId}`
        : role === 'student'
          ? `/lecturer/${params.courseId}/enrollments/course/${userId}`
          : '';
    try {
      await axiosClient.post(fetchUrl, {
        user_id: selectedUser,
        role
      });
      toast.success('Attendee added successfully.');
      setOpen(false);
      setSelectedUser(null);
      setRole(null);
      router.refresh();
    } catch {
      toast.error('Failed to add attendee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary'>
            <IconPlus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Role</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setRole('instructor');
              setOpen(true);
            }}
          >
            <IconChalkboard className='mr-2 h-4 w-4' /> Instructor
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setRole('ta');
              setOpen(true);
            }}
          >
            <IconBook className='mr-2 h-4 w-4' /> Teaching Assistant
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setRole('student');
              setOpen(true);
            }}
          >
            <IconSchool className='mr-2 h-4 w-4' /> Student
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add{' '}
              {role === 'ta'
                ? 'Teaching Assistant'
                : role === 'instructor'
                  ? 'Instructor'
                  : 'Student'}
            </DialogTitle>
            <DialogDescription>
              Select a {role} to add to this course.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 flex h-[180px] flex-col gap-3 overflow-scroll'>
            {users.map((u) => (
              <div key={u.id} className='flex items-center justify-between'>
                <p>
                  {u.first_name} {u.last_name}
                </p>
                <Button
                  onClick={() => {
                    onConfirm(u.id);
                  }}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant='ghost'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
