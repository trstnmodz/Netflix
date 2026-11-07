import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Counts {
  total: number
  movies: number
  anime: number
  series: number
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data, error: err } = await supabase
        .from('content')
        .select('content_type', { count: 'exact' })
      if (err) {
        setError(err.message)
        return
      }
      const rows = (data ?? []) as Array<{ content_type: string }>
      setCounts({
        total: rows.length,
        movies: rows.filter((r) => r.content_type === 'movie').length,
        anime: rows.filter((r) => r.content_type === 'anime').length,
        series: rows.filter((r) => r.content_type === 'series').length,
      })
    }
    void load()
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Admin</h1>
      <p className="mt-2 text-sm text-white/60">
        Content management tools will be added in a later phase.
      </p>

      {error ? (
        <div className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total titles" value={counts?.total} />
          <Stat label="Movies" value={counts?.movies} />
          <Stat label="Anime" value={counts?.anime} />
          <Stat label="Series" value={counts?.series} />
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink-800 p-5">
      <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value ?? '—'}</div>
    </div>
  )
}
