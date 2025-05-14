'use client'; 
import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <AuthForm login={false} /> {/* Pass the login prop as false for registration */}
    </div>
  );
}
