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
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">C</div>
          <div>
            <h1 className="brand-title">Castaminofen</h1>
            <p className="brand-tagline">ثبت نام کنید و به محتوای ویژه و تجربهٔ پریمیوم دسترسی پیدا کنید.</p>
          </div>
        </div>

        <h2 className="auth-headline">حساب کاربری خود را بسازید</h2>
        <p className="auth-subtitle">با یک نام کاربری حرفه‌ای شروع کنید و به سرعت به دنیای رسانه‌های شخصی‌سازی‌شده وارد شوید.</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>ایمیل</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="name@example.com" />
          </div>

          <div className="auth-field">
            <label>نام کاربری</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="نام کاربری شما" />
          </div>

          <div className="auth-field">
            <label>رمز عبور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="رمز عبور قوی انتخاب کنید" />
          </div>

          <button className="auth-action" type="submit">ایجاد حساب جدید</button>
          {error && <div className="auth-note">{error}</div>}
        </form>

        <div className="auth-footer">
          حساب دارید؟ <a href="/auth/login">به صفحه ورود بروید</a>
        </div>
      </section>
    </main>
  );
}
