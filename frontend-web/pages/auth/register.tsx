import React, { useState } from 'react';
import Router from 'next/router';
import AuthForm from '../../components/AuthForm';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <AuthForm
      tagline="ثبت نام کنید و به محتوای ویژه و تجربهٔ پریمیوم دسترسی پیدا کنید."
      headline="حساب کاربری خود را بسازید"
      subtitle="با یک نام کاربری حرفه‌ای شروع کنید و به سرعت به دنیای رسانه‌های شخصی‌سازی‌شده وارد شوید."
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
          name: 'username',
          label: 'نام کاربری',
          type: 'text',
          placeholder: 'نام کاربری شما',
          value: username,
          onChange: setUsername,
        },
        {
          name: 'password',
          label: 'رمز عبور',
          type: 'password',
          placeholder: 'رمز عبور قوی انتخاب کنید',
          value: password,
          onChange: setPassword,
        },
      ]}
      submitLabel="ایجاد حساب جدید"
      error={error}
      footerText="حساب دارید؟"
      footerLinkHref="/auth/login"
      footerLinkLabel="به صفحه ورود بروید"
      onSubmit={handleSubmit}
    />
  );
}
