// src/components/Layout/Header.tsx
'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps)  => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <header className="w-full p-4 bg-gray-800 text-white flex justify-between items-center ">
       <button
        className="sm:hidden text-white text-2xl mr-4"
        onClick={onToggleSidebar}
      >
        ☰
      </button>
      
      <h1 className="text-xl font-semibold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
