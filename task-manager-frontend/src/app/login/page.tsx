'use client';

import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return(
     <div className="min-h-screen bg-login bg-cover bg-center flex items-center justify-start px-8">
    
      <div className=" backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <AuthForm login />
      </div>
    </div>
  
  );
}



