// src/app/page.tsx
'use client';
import Link from 'next/link';
import "../app/globals.css";
 export default function HomePage() {
  

    
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-hero p-6 text-center ">
         
        <h1 className="text-6xl font-bold mb-4 text-black text-500">Welcome to Task Manager</h1>
        <p className="text-2xl font-bold text-blue text-100 mb-6">Manage your tasks efficiently with ease.</p>
  
        <div className="space-y-3">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 block"
          >
            Login
          </Link>
  
          <p className="text-lg text-white text-shadow">New here?{' '}
  
          <Link
            href="/register"
            className="text-red-500 font-bold text-xl text-shadow mb-4 hover:underline"
          >
            Create an Account
          </Link>
          </p>
        </div>
      </div>
      
    );


     
  
  }
  


