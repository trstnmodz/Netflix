import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-ink-800/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div>
          <div className="text-xl font-extrabold tracking-tight text-brand">NETFLX</div>
          <p className="mt-2 text-xs text-white/50">
            An original streaming platform. Not affiliated with any third-party trademark.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">Browse</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/movies" className="hover:text-white">Movies</Link></li>
            <li><Link to="/anime" className="hover:text-white">Anime</Link></li>
            <li><Link to="/series" className="hover:text-white">Series</Link></li>
            <li><Link to="/search" className="hover:text-white">Search</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">Account</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            <li><Link to="/settings" className="hover:text-white">Settings</Link></li>
            <li><Link to="/my-list" className="hover:text-white">My List</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">Legal</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><span className="cursor-default">Privacy</span></li>
            <li><span className="cursor-default">Terms</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} NetFlx. All rights reserved.
      </div>
    </footer>
  )
}
