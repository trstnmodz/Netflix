import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    setErr(null)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setErr(error.message)
    else {
      setMsg('Password updated.')
      setPassword('')
    }
    setBusy(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Settings</h1>

      <section className="mt-8 rounded-md border border-white/10 bg-ink-800 p-6">
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="mt-1 text-sm text-white/60">{user?.email}</p>
        <button onClick={signOut} className="btn-secondary mt-4">
          Sign out
        </button>
      </section>

      <section className="mt-6 rounded-md border border-white/10 bg-ink-800 p-6">
        <h2 className="text-lg font-semibold">Change password</h2>
        <form onSubmit={updatePassword} className="mt-4 space-y-3">
          <div>
            <label htmlFor="new-password" className="label">New password</label>
            <input
              id="new-password"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          {msg && <p className="text-sm text-emerald-400">{msg}</p>}
          <button type="submit" disabled={busy} className="btn-primary">
            {busy ? 'Saving…' : 'Update password'}
          </button>
        </form>
      </section>
    </div>
  )
}
