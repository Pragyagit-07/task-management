//  src/app/dashboard/tasks/page.tsx
 'use client';
  import { useEffect, useState ,useCallback} from 'react';
import TaskCard from '@/components/TaskCard';
import axios from 'axios';


 interface Task {
     _id: string;
   title: string;
      description: string;
  status: 'pending' | 'in-progress' | 'completed';
   priority: 'low' | 'medium' | 'high';
      dueDate: string;
  assignedTo?: string;
 
 }

export default function AllTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
const [statusFilter, setStatusFilter] = useState('');
const [priorityFilter, setPriorityFilter ] = useState('');
const[assignedTo] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
    const fetchTasks = useCallback(async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
         setLoading(true);
          const params = new URLSearchParams();
    if (search) params.append('title', search);
    if (statusFilter) params.append('status', statusFilter);
    if (priorityFilter) params.append('priority', priorityFilter);
    if (assignedTo && assignedTo.trim() !== '') params.append('assignedTo', assignedTo);
 const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/search?${params.toString()}`, {

        // const res = await axios.get(`http://localhost:5000/api/tasks/search?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
    

        });
        console.log("Search Params:", params.toString());


        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    
    
 
  }, [search, statusFilter, priorityFilter,assignedTo]);
  useEffect(() => {
  fetchTasks();
}, [fetchTasks]);

const handleDelete = async (taskId: string) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {

    // await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove from state
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  } catch (err) {
    console.error('Failed to delete task:', err);
    alert('Failed to delete task. Please try again.');
  }
};
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
{/* Search and filter inputs */}
      <div className="mb-4 flex gap-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="input"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="input"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="input"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={fetchTasks} className= "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Apply Filters
          </button>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
              
  <TaskCard
    key={task._id}
    id={task._id}
    title={task.title}
    dueDate={task.dueDate}
    priority={task.priority}
    status={task.status}
    description={task.description}
  assignedTo={task.assignedTo}
  onDelete={handleDelete}
  />
  
))}

        </div>
      )}
    </div>
  );
}

