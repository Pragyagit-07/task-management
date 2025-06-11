// src/components/TaskForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const TaskSchema = z.object({
  title: z.string().min(1,'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'in-progress', 'completed']),
  assignedTo: z.string().min(1,'Assignee is required'),
    
});

type TaskFormProps = {
  defaultValues?: Partial<z.infer<typeof TaskSchema>>;
  mode?: 'create' | 'edit';
  taskId?: string;
  users?: { id: string; name: string }[];
};
const TaskForm = ({
    defaultValues = {},
    mode = 'create',
    taskId,
    users = [], 
  }: TaskFormProps) => {

  const router = useRouter();
  const [availableUsers, setAvailableUsers] = useState<{ id: string; name: string }[]>(users);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues,
  });
// Fetch users if not passed as props
  useEffect(() => {
    if (users.length === 0) {
      const token = localStorage.getItem('token');
    console.log('Token:', token); 
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {

      // axios.get('http://localhost:5000/api/users',{
headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
        })
        .then((response) => {
      console.log('Fetched users:', response.data);

          setAvailableUsers(response.data);
          })
        .catch((err) => console.error('Error fetching users', err));
    }
  }, [users]);
  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    try {
      if (mode === 'edit' && taskId) {
        
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, data, {

        // await axios.put(`http://localhost:5000/api/tasks/${taskId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, data, {

        // await axios.post('http://localhost:5000/api/tasks', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      }
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  w-full">
        <label htmlFor="title">Title</label>
      <input {...register('title')} placeholder="Title" className="input" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <label htmlFor="description">Description</label>
      <textarea {...register('description')} placeholder="Description" className="input" />

      <label htmlFor="dueDate">Due Date</label>
      <input type="date" {...register('dueDate')} className="input" />
      <label htmlFor="priority">Priority</label>
      <select {...register('priority')} className="input">
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label htmlFor="status">Status</label>
      <select {...register('status')} className="input">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      <label htmlFor="assignee">Assignee</label>
      <select {...register('assignedTo')} className="input">
  <option value="">Select Assignee</option>
 {availableUsers?.map(user => (
    <option key={user.id} value={user.id}>
        {user.name || `User ID: ${user.id}`}
    </option>
  ))}
</select>
{errors.assignedTo && <p className="text-red-500">{errors.assignedTo.message}</p>}
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {mode === 'edit' ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
