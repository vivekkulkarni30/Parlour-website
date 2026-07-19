import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { getSupabaseSetupMessage, isSupabaseConfigured, supabase } from '../lib/supabase.js';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error(getSupabaseSetupMessage());
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Welcome back.');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <span className="auth-icon">
          <LockKeyhole size={24} />
        </span>
        <p className="eyebrow">Admin access</p>
        <h1>Sign in to manage appointments</h1>
        <label className="field">
          <span>Email</span>
          <input value={email} type="email" autoComplete="email" onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {!isSupabaseConfigured && <p className="config-note">{getSupabaseSetupMessage()}</p>}
        <button className="button button--primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
