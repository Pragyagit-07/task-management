'use client';
import { useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex-1 flex flex-col w-full">
    
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
     
  
    <div className= "flex min-h-screen">

    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <main className="p-6 md:p-8 max-w-4xl mx-auto w-full">{children}</main>
  </div>
     </div>
  );
}
