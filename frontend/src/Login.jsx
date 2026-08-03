import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin Credentials
    if (email === 'admin@hostel.com' && password === 'admin123') {
      toast.success('Admin Login Successful!');
      onLoginSuccess(); // Direct function call to unlock Dashboard
    } else {
      toast.error('Invalid Credentials! Use demo details below.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 text-indigo-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldCheck size={36} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hostel Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-1"></p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition text-slate-900"
                placeholder="admin@hostel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition text-slate-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition duration-200 shadow-md shadow-indigo-200 cursor-pointer"
          >
            Access Admin 
          </button>
        </form>

        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
          <p className="font-bold text-slate-900 mb-1"></p>
          <p className="flex justify-between"><span></span> <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono"></code></p>
          <p className="flex justify-between mt-1"><span></span> <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono"></code></p>
        </div>
      </div>
    </div>
  );
}