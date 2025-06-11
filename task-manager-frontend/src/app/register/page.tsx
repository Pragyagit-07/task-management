'use client'; 
import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-login bg-cover bg-center flex items-center justify-start px-8">
        
          <div className=" backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
          
          

      <AuthForm login={false} /> {/* Pass the login prop as false for registration */}
    </div>
    </div>
  );
}
