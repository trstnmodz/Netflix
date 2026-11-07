import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, User } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/anime', label: 'Anime' },
  { to: '/series', label: 'Series' },
  { to: '/my-list', label: 'My List' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-brand">NETFLX</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-white' : 'text-white/70 hover:text-white',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-brand' : 'text-brand/80 hover:text-brand',
                )
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/search"
            aria-label="Search"
            className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/profile"
                aria-label="Profile"
                className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <User className="h-5 w-5" />
              </Link>
              <button onClick={signOut} className="btn-ghost">
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:inline-flex btn-primary">
              Sign in
            </Link>
          )}

          <button
            className="rounded-md p-2 text-white/80 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-ink-900 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-3 text-sm font-medium',
                    isActive ? 'bg-white/5 text-white' : 'text-white/70',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-brand"
              >
                Admin
              </NavLink>
            )}
            <div className="my-2 border-t border-white/5" />
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-white/70"
                >
                  Profile
                </NavLink>
                <button
                  onClick={async () => {
                    setOpen(false)
                    await signOut()
                  }}
                  className="rounded-md px-3 py-3 text-left text-sm font-medium text-white/70"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-brand"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
