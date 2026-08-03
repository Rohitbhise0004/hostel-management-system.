import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuth') === 'true';
  });

  const handleLoginSuccess = () => {
    localStorage.setItem('isAdminAuth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full min-h-screen">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}