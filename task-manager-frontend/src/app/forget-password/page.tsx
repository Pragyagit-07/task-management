'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1: enter email, Step 2: enter OTP & new password
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMessage(`OTP sent successfully. OTP (for demo): ${res.data.otp}`);
      setStep(2);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Error sending OTP');
      } else {
        setError('Error sending OTP');
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post('/api/auth/reset-password', { email, otp, newPassword });
      setMessage('Password reset successfully! You can now log in.');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Error resetting password');
      } else {
        setError('Error resetting password');
      }
    }
  };

  return (
     <div className="min-h-screen bg-login bg-cover bg-center flex items-center justify-start px-8">
      <div className="backdrop-blur-md bg-white/70 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Forgot Password</h1>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 border px-4 py-2 rounded"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-2 border px-4 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 border px-4 py-2 rounded"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Reset Password
            </button>
          </>
        )}

        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
    
  );
}

