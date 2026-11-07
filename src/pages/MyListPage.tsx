import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import ContentCard from '@/components/common/ContentCard'
import Spinner from '@/components/common/Spinner'
import type { Content } from '@/types'

export default function MyListPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    setLoading(true)
    supabase
      .from('watchlist')
      .select('content:content_id(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) setError(err.message)
        else {
          const rows = (data ?? []) as unknown as Array<{ content: Content | null }>
          setItems(rows.map((r) => r.content).filter((c): c is Content => Boolean(c)))
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">My List</h1>
      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-white/60">
            Your list is empty. Add titles from their detail pages.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((c) => (
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
