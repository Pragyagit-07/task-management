// src/components/DashboardStats.tsx
'use client';
import React from 'react';


type StatsProps = {
  totalTasks: number;
  overdueTasks: number;
  completedTasks: number;
};

const DashboardStats = ({ totalTasks, overdueTasks, completedTasks }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-sm text-gray-500">Total Tasks</h3>
        <p className="text-xl font-bold">{totalTasks}</p>
      </div>
      <div className="bg-red-100 shadow p-4 rounded">
        <h3 className="text-sm text-red-500">Overdue Tasks</h3>
        <p className="text-xl font-bold">{overdueTasks}</p>
      </div>
      <div className="bg-green-100 shadow p-4 rounded">
        <h3 className="text-sm text-green-500">Completed Tasks</h3>
        <p className="text-xl font-bold">{completedTasks}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
