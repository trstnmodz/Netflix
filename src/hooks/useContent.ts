import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Content, ContentType } from '@/types'

interface UseContentOptions {
  contentType?: ContentType
  featuredOnly?: boolean
  limit?: number
}

interface UseContentResult {
  data: Content[]
  loading: boolean
  error: string | null
  reload: () => void
}

export function useContent(options: UseContentOptions = {}): UseContentResult {
  const { contentType, featuredOnly, limit } = options
  const [data, setData] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const reload = useCallback(() => setTick((n) => n + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    let query = supabase
      .from('content')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (contentType) query = query.eq('content_type', contentType)
    if (featuredOnly) query = query.eq('is_featured', true)
    if (limit) query = query.limit(limit)

    query.then(({ data: rows, error: err }) => {
      if (cancelled) return
      if (err) {
        console.error('[useContent]', err.message)
        setError(err.message)
        setData([])
      } else {
        setData((rows ?? []) as Content[])
      }
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [contentType, featuredOnly, limit, tick])

  return { data, loading, error, reload }
}
