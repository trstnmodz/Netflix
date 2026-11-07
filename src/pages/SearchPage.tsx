import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ContentCard from '@/components/common/ContentCard'
import Spinner from '@/components/common/Spinner'
import type { Content } from '@/types'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [debounced, setDebounced] = useState('')
  const [results, setResults] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 300)
    return () => clearTimeout(t)
  }, [q])

  useEffect(() => {
    if (!debounced) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    const needle = `%${debounced}%`
    supabase
      .from('content')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.${needle},description.ilike.${needle}`)
      .order('created_at', { ascending: false })
      .limit(60)
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) setError(err.message)
        else setResults((data ?? []) as Content[])
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [debounced])

  const hasQuery = useMemo(() => debounced.length > 0, [debounced])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Search</h1>
      <div className="mt-6">
        <input
          className="input max-w-xl"
          placeholder="Search titles and descriptions…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        ) : !hasQuery ? (
          <p className="text-sm text-white/50">Type a query to search the catalog.</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-white/50">No matches for “{debounced}”.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((c) => (
              <div key={c.id} className="[&>a]:w-full">
                <ContentCard item={c} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
