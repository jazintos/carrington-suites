'use client';

import { useRouter } from 'next/navigation'; // ✅ correct router
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter(); // ✅ initialize router

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ important
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('adminToken', data.token);

      // ✅ redirect to dashboard (correct)
      router.push('/admin/dashboard');
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      // ✅ use router instead of window.location
      router.push('/admin/dashboard');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h1 className="text-[#D4AF37] text-2xl mb-6">
          Carrington Admin Login
        </h1>

        <input
          className="w-full mb-3 p-2 bg-black border border-gray-700"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 bg-black border border-gray-700"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#D4AF37] text-black p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}