import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setInfo(null)

    if (mode === 'register') {
      const { data, error: err } = await supabase.auth.signUp({ email, password })
      if (err) {
        setError(err.message)
      } else if (data.user) {
        // Create profile row (RLS allows the user to insert their own profile).
        await supabase
          .from('profiles')
          .upsert({ id: data.user.id, username: username || null }, { onConflict: 'id' })
        setInfo('Account created. Check your email to confirm, then sign in.')
        setTimeout(() => navigate('/login'), 1200)
      }
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) setError(err.message)
      else navigate(location.state?.from ?? '/')
    }
    setBusy(false)
  }

  const title = mode === 'login' ? 'Sign in' : 'Create account'

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-ink-800 p-8 shadow-card">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-brand">NETFLX</Link>
        <h1 className="mt-6 text-2xl font-bold">{title}</h1>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="username" className="label">Username</label>
              <input
                id="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Optional"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {info && <p className="text-sm text-emerald-400">{info}</p>}
          <button disabled={busy} type="submit" className="btn-primary w-full">
            {busy ? 'Please wait…' : title}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <Link to="/register" className="text-brand hover:underline">Create an account</Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-brand hover:underline">Sign in</Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
