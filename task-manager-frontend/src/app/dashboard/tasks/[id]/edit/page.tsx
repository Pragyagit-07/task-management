//src/app/dashboard/tasks/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import TaskForm from '@/components/TaskForm';


export default function EditTaskPage() {
  const { id } = useParams(); // get task ID from route
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {

        // const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(res.data);
      } catch (err) {
        console.error('Error fetching task:', err);
        alert('Failed to load task');
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id , router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      {task && (
        <TaskForm
          mode="edit"
          taskId={id as string}
          defaultValues={task}
        />
      )}
    </div>
  );
}