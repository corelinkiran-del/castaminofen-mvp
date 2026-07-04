// Next.js main page

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Media Platform - پلتفرم چندرسانه‌ای</h1>
      <p>پادکست، کتاب صوتی، و ویدیو در یک جا</p>
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link href="/auth/login">
          <button>ورود</button>
        </Link>
        <Link href="/auth/register">
          <button>ثبت نام</button>
        </Link>
        <Link href="/explore">
          <button>کاوش</button>
        </Link>
      </div>
    </div>
  );
}
