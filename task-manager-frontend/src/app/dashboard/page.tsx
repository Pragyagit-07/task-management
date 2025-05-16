'use client';
import { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import Notifications from '@/components/Notifications';
import TaskCard from '@/components/TaskCard';
import DashboardStats from '@/components/DashboardStats';



type Task = {
  _id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high'; 
  dueDate: string;
  assignedTo?: string;  
  createdBy?: string; 
  
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

    const fetchTasks = useCallback( async () => {
      try {
        const token = localStorage.getItem('token'); 
      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }
        const response = await axios.get('http://localhost:5000/api/tasks/dashboard', {
  headers: {
  
    Authorization: `Bearer ${token}`,
  },
});
    const data = response.data;
if (Array.isArray(data)) {
  setTasks(data);
} else {
  console.warn('Expected an array but got:', data);
  setTasks([]); // Fallback to empty array
}
        
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setError('An error occurred while fetching tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
      }, []);
    

    useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  


  const now = new Date();
  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter(
    task => new Date(task.dueDate) < now && task.status !== 'completed'
  ).length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
 

  if (loading) {
   return(
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent w-16 h-16"></div>
      </div>
    ); // Show spinner during loading
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;  // Show error message if there is an error
  }

  if (tasks.length === 0) {
    return <p>No tasks available at the moment. Please try again later.</p>; // Show empty state message
  }
  
  const assignedTasks = tasks.filter(task => task.assignedTo);
  const createdTasks = tasks.filter(task => task.createdBy);
  const overdueTasksList = tasks.filter(
    task => new Date(task.dueDate) < now && task.status !== 'completed'
  );
  


    return (
    
      <div>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
         <Notifications />
        <DashboardStats
        totalTasks={totalTasks}
        overdueTasks={overdueTasks}
        completedTasks={completedTasks}
      />
      
   
        {/* Placeholder content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold">Assigned Tasks</h2>
            <div className="space-y-2">
              {assignedTasks.length > 0 ? (
                assignedTasks.map(task => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    dueDate={task.dueDate}
                    priority={task.priority}
                    status={task.status}
                     
                  />
                ))
              ) : (
                <p>No assigned tasks.</p>
              )}
            </div>
          </div>

          
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold">Created Tasks</h2>
            <div className="space-y-2">
              {createdTasks.length > 0 ? (
                createdTasks.map(task => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    dueDate={task.dueDate}
                    priority={task.priority}
                    status={task.status}
                  />
                ))
              ) : (
                <p>No created tasks.</p>
              )}
            </div>
           </div>
           {/* Overdue task */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold">Overdue Tasks</h2>
            
            <div className="space-y-2">
              {overdueTasksList.length > 0 ? (
                overdueTasksList.map(task => (
                  <TaskCard
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    dueDate={task.dueDate}
                    priority={task.priority}
                    status={task.status}
                  />
                ))
              ) : (
                <p>No overdue tasks.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      </div>
    );
  }
  