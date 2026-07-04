import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type AuthFieldConfig = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

interface AuthFormProps {
  tagline: string;
  headline: string;
  subtitle: string;
  fields: AuthFieldConfig[];
  submitLabel: string;
  error?: string | null;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
}

export default function AuthForm({
  tagline,
  headline,
  subtitle,
  fields,
  submitLabel,
  error,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  onSubmit,
}: AuthFormProps) {
  const [themeMode, setThemeMode] = React.useState<'dark' | 'light'>('dark');

  const toggleTheme = () => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <main className={`auth-page ${themeMode}-mode`}>
      <section className="auth-card">
        <div className="auth-hero">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="auth-hero-inner"
          >
            <svg viewBox="0 0 280 220" aria-hidden="true">
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d7b264" />
                  <stop offset="100%" stopColor="#6ea8ff" />
                </linearGradient>
              </defs>
              <rect x="24" y="24" width="232" height="172" rx="38" fill="rgba(255,255,255,0.06)" />
              <path d="M56 130 C96 70, 184 70, 224 130" fill="none" stroke="url(#heroGradient)" strokeWidth="12" strokeLinecap="round" />
              <circle cx="88" cy="100" r="10" fill="#d7b264" />
              <circle cx="136" cy="82" r="10" fill="#6ea8ff" />
              <circle cx="184" cy="110" r="10" fill="#d7b264" />
            </svg>
            <p>لورم عشق و حرکت در دنیای استریم، فقط با یک لمس.</p>
          </motion.div>
        </div>

        <div className="auth-card-content">
          <div className="auth-brand-row">
            <div className="auth-brand">
              <div className="brand-mark">C</div>
              <div>
                <p className="brand-title">Castaminofen</p>
                <p className="brand-tagline">{tagline}</p>
              </div>
            </div>
            <button type="button" className="theme-toggle" onClick={toggleTheme}>
              {themeMode === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <h2 className="auth-headline">{headline}</h2>
            <p className="auth-subtitle">{subtitle}</p>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {fields.map((field) => (
              <div key={field.name} className="auth-field">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  required
                />
              </div>
            ))}

            <button className="auth-action" type="submit">
              {submitLabel}
            </button>
            {error && <div className="auth-note">{error}</div>}
          </motion.form>

          <div className="auth-footer">
            {footerText}{' '}
            <Link className="auth-link" href={footerLinkHref}>
              {footerLinkLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
