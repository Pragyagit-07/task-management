// src/components/TaskCard.tsx
import React from 'react';
import Link from 'next/link';
const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };
  
  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };
  

type TaskCardProps = {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  description?: string;
  assignedTo?: string;
   onDelete?: (id: string) => void;
};

const TaskCard = ({ id, title, dueDate, priority, status ,   description, assignedTo, onDelete ,  }: TaskCardProps) => {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-600 mb-1">{description}</p>}
      <p className="text-sm text-gray-600">Due: {new Date(dueDate).toLocaleDateString()}</p>
      <div className="flex flex-wrap gap-2 text-sm mt-2">
  <span className={`px-2 py-1 rounded ${priorityColors[priority]}`}>
    Priority: {priority}
  </span>
  <span className={`px-2 py-1 rounded ${statusColors[status]}`}>
    Status: {status}
  </span>
</div>
{assignedTo && (
     <div className="mt-2">
        <span className="text-sm text-gray-700 font-medium mr-2">Assigned to:</span>
    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
      {assignedTo}
    </span>
  </div>
        
     )}
 {onDelete && (
      <button
        onClick={() => onDelete(id)}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
       )}
      <div className="mt-4">
      <Link href={`/dashboard/tasks/${id}/edit`}>
        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
          Edit
        </button>
      </Link>
      </div>
     
    </div>
  );
};

export default TaskCard;
