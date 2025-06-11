'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//  import axios from 'axios'; 
 import axios from './utils/axios';
 import * as rawAxios from 'axios';

type AuthFormProps = {
  login?: boolean;
};

export default function AuthForm({ login }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [name, setName] = useState(''); // Only used for registration
  const [error, setError] = useState('');
  const router = useRouter();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
    if (login) {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });
        const { token } = res.data;
        localStorage.setItem('token', token); // Store token
        router.push('/dashboard');
      } else {
        await axios.post(`${API_URL}/api/auth/register`, {
          name,
          email,
          password,
        });

        // After successful registration, redirect to login page
        router.push('/login');
      }
    } catch(err: unknown) {

     if (rawAxios.isAxiosError(err) && err.response?.data?.message) {
    setError(err.response.data.message);
  } else {
    setError('An error occurred');
        console.error('Error details:', err); // Log the error for debugging
  }
  }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">{login ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!login && (
           <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {login ? 'Login' : 'Register'}
        </button>
        <input
  type="password"
  placeholder="Password"
  className="w-full border px-4 py-2 rounded"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

{login && (
  <p className="text-sm mt-2 text-right">
    <a href="/forgot-password" className="text-blue-600 underline">
      Forgot Password?
    </a>
  </p>
)}

{error && <p className="text-red-500">{error}</p>}

<button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  {login ? 'Login' : 'Register'}
</button>

      </form>
    </div>
  );
}

