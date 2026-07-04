import React, { useState } from 'react';
import Router from 'next/router';
import AuthForm from '../../components/AuthForm';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      localStorage.setItem('accessToken', body.data.accessToken || body.data.token || '');
      Router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <AuthForm
      tagline="پلتفرم مدیا برای تجربه‌های صوتی و تصویری حرفه‌ای"
      headline="به دنیای استریم حرفه‌ای خوش آمدید"
      subtitle="با ورود به حساب کاربری، پلی‌لیست‌های هوشمند، محتوای اختصاصی و تجربه شخصی‌سازی‌شده را فعال کنید."
      fields={[
        {
          name: 'email',
          label: 'ایمیل',
          type: 'email',
          placeholder: 'name@example.com',
          value: email,
          onChange: setEmail,
        },
        {
          name: 'password',
          label: 'رمز عبور',
          type: 'password',
          placeholder: 'رمز عبور خود را وارد کنید',
          value: password,
          onChange: setPassword,
        },
      ]}
      submitLabel="ورود به حساب"
      error={error}
      footerText="هنوز حساب ندارید؟"
      footerLinkHref="/auth/register"
      footerLinkLabel="ثبت نام کنید"
      onSubmit={handleSubmit}
    />
  );
}
