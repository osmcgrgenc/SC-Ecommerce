"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Yanıtı doğrudan loglayarak kontrol edelim
      console.log(response);

      if (!response.ok) {
        const errorMessage = await response.text(); // Hata mesajını yakala
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/admin'); // Giriş başarılıysa admin paneline yönlendir

    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Eğer bir hata varsa ekrana yazdırıyoruz */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
