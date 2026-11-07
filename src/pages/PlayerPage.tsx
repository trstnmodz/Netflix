import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import Spinner from '@/components/common/Spinner'
import type { Content } from '@/types'

export default function PlayerPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [item, setItem] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
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
      </div>
    )

  const playable = item.playback_url && item.playback_status === 'playable'

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Link to={`/title/${item.slug}`} className="text-xs text-white/60 hover:text-white">
            ← Back to details
          </Link>
          <h1 className="mt-1 text-2xl font-bold">{item.title}</h1>
        </div>
        {user && <span className="text-xs text-white/40">Signed in</span>}
      </div>

      <div className="overflow-hidden rounded-md bg-black shadow-card">
        {playable ? (
          <video
            ref={videoRef}
            src={item.playback_url ?? undefined}
            controls
            playsInline
            className="aspect-video w-full bg-black"
          />
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-ink-800 text-center">
            <p className="text-lg font-semibold">Playback not available</p>
            <p className="max-w-md text-sm text-white/60">
              {item.playback_status === 'unsupported'
                ? 'This Dropbox link cannot be streamed by the browser.'
                : item.playback_status === 'missing'
                ? 'No Dropbox link has been configured for this title yet.'
                : 'This title has no verified video source.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
