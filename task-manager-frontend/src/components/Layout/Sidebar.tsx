'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/tasks', label: 'All Tasks' },
  { href: '/dashboard/tasks/create', label: 'Create Task' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (

    <>
    {/* Overlay on mobile */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
        onClick={onClose}
      />
    )}
    <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 fixed sm:relative top-0 left-0 z-40   w-64 bg-gray-800 text-white p-4 space-y-4 transition-transform duration-300`}
      >

   
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded hover:bg-gray-700 transition-colors ${
              pathname.startsWith(link.href) ? 'bg-gray-700 font-semibold' : ''
            }`}
            onClick={onClose} // close on nav tap in mobile
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
    </>
  );
}
