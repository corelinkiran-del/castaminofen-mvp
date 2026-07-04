import React, { useState } from 'react';
import Router from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error?.message || 'Registration failed');
      localStorage.setItem('accessToken', body.data.accessToken || body.data.token || '');
      Router.push('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
      <h2>ثبت نام</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>ایمیل</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>نام کاربری</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>رمز عبور</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
        </div>
        <button type="submit">ثبت نام</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
