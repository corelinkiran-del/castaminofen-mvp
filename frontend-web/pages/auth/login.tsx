import React, { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error?.message || 'Login failed');
      // store token (very simple)
      localStorage.setItem('accessToken', body.data.accessToken || body.data.token || '');
      Router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">C</div>
          <div>
            <h1 className="brand-title">Castaminofen</h1>
            <p className="brand-tagline">پلتفرم مدیا برای تجربه‌های صوتی و تصویری حرفه‌ای</p>
          </div>
        </div>

        <h2 className="auth-headline">به دنیای استریم حرفه‌ای خوش آمدید</h2>
        <p className="auth-subtitle">با ورود به حساب کاربری، پلی‌لیست‌های هوشمند، محتوای اختصاصی و تجربه شخصی‌سازی‌شده را فعال کنید.</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>ایمیل</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="name@example.com" />
          </div>

          <div className="auth-field">
            <label>رمز عبور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="رمز عبور خود را وارد کنید" />
          </div>

          <button className="auth-action" type="submit">ورود به حساب</button>
          {error && <div className="auth-note">{error}</div>}
        </form>

        <div className="auth-footer">
          هنوز حساب ندارید؟ <a href="/auth/register">ثبت نام کنید</a>
        </div>
      </section>
    </main>
  );
}
