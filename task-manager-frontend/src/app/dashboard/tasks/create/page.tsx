'use client';


import TaskForm from '@/components/TaskForm';

export default function CreateTaskPage() {
  



  return (
    <div className=" w-full max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <TaskForm mode="create"/>
            
    </div>
  );
}
      
