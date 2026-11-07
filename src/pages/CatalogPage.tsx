import { useMemo, useState } from 'react'
import { useContent } from '@/hooks/useContent'
import ContentCard from '@/components/common/ContentCard'
import Spinner from '@/components/common/Spinner'
import type { ContentType } from '@/types'

export default function CatalogPage({ contentType }: { contentType: ContentType }) {
  const { data, loading, error } = useContent({ contentType })
  const [q, setQ] = useState('')
  const [year, setYear] = useState<string>('')
  const [sort, setSort] = useState<'newest' | 'title'>('newest')

  const years = useMemo(() => {
    const ys = new Set<number>()
    data.forEach((c) => c.release_year && ys.add(c.release_year))
    return Array.from(ys).sort((a, b) => b - a)
  }, [data])

  const filtered = useMemo(() => {
    let rows = data
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      rows = rows.filter((c) => c.title.toLowerCase().includes(needle))
    }
    if (year) rows = rows.filter((c) => String(c.release_year) === year)
    if (sort === 'title') {
      rows = [...rows].sort((a, b) => a.title.localeCompare(b.title))
    }
    return rows
  }, [data, q, year, sort])

  const label = contentType === 'movie' ? 'Movies' : contentType === 'anime' ? 'Anime' : 'Series'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">{label}</h1>
      <p className="mt-2 text-sm text-white/60">Browse all published {label.toLowerCase()}.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          className="input max-w-xs"
          placeholder="Search by title…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search by title"
        />
        <select
          className="input max-w-[10rem]"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          aria-label="Filter by year"
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          className="input max-w-[10rem]"
          value={sort}
          onChange={(e) => setSort(e.target.value as 'newest' | 'title')}
          aria-label="Sort"
        >
          <option value="newest">Newest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            Failed to load: {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-md border border-white/10 bg-ink-800 p-8 text-center text-white/60">
            No results.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((c) => (
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
