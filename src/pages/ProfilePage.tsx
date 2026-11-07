import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const { user, profile } = useAuth()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Profile</h1>
      <div className="mt-8 space-y-4 rounded-md border border-white/10 bg-ink-800 p-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/50">Username</div>
          <div className="mt-1">{profile?.username ?? '—'}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/50">Email</div>
          <div className="mt-1">{user?.email ?? '—'}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/50">Role</div>
          <div className="mt-1 capitalize">{profile?.role ?? 'user'}</div>
        </div>
        <div className="flex gap-3 pt-2">
          <Link to="/my-list" className="btn-secondary">My List</Link>
          <Link to="/settings" className="btn-secondary">Settings</Link>
        </div>
      </div>
    </div>
  )
}
