import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Play, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import Spinner from '@/components/common/Spinner'
import type { Content } from '@/types'

export default function ContentDetailsPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [item, setItem] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inList, setInList] = useState(false)
  const [listBusy, setListBusy] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    supabase
      .from('content')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) setError(err.message)
        else setItem(data as Content | null)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    if (!user || !item) return
    let cancelled = false
    supabase
      .from('watchlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('content_id', item.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setInList(Boolean(data))
      })
    return () => {
      cancelled = true
    }
  }, [user, item])

  async function toggleList() {
    if (!user || !item) return
    setListBusy(true)
    if (inList) {
      await supabase.from('watchlist').delete().eq('user_id', user.id).eq('content_id', item.id)
      setInList(false)
    } else {
      await supabase.from('watchlist').insert({ user_id: user.id, content_id: item.id })
      setInList(true)
    }
    setListBusy(false)
  }

  if (loading) return <Spinner />
  if (error)
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      </div>
    )
  if (!item)
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <h1 className="text-2xl font-bold">Title not found</h1>
        <p className="mt-2 text-white/60">This title may have been removed.</p>
      </div>
    )

  return (
    <div>
      <div className="relative isolate min-h-[50vh]">
        {item.backdrop_url && (
          <img
            src={item.backdrop_url}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{item.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
            {item.release_year && <span>{item.release_year}</span>}
            {item.runtime_minutes && <span>{item.runtime_minutes} min</span>}
            {item.content_rating && (
              <span className="rounded border border-white/30 px-1.5 py-0.5 text-xs">
                {item.content_rating}
              </span>
            )}
            {item.status && <span className="capitalize">{item.status}</span>}
          </div>
          {item.description && <p className="mt-4 max-w-2xl text-white/80">{item.description}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/watch/${item.slug}`} className="btn-primary">
              <Play className="h-4 w-4" /> Watch Now
            </Link>
            <button
              onClick={toggleList}
              disabled={!user || listBusy}
              className="btn-secondary"
            >
              <Plus className="h-4 w-4" /> {inList ? 'Remove from My List' : 'Add to My List'}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <dl className="grid gap-6 sm:grid-cols-2">
          {item.director && (
            <div>
              <dt className="text-xs uppercase tracking-wider text-white/50">Director</dt>
              <dd className="mt-1">{item.director}</dd>
            </div>
          )}
          {item.cast_members && (
            <div>
              <dt className="text-xs uppercase tracking-wider text-white/50">Cast</dt>
              <dd className="mt-1">{item.cast_members}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
