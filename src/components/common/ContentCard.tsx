import { Link } from 'react-router-dom'
import type { Content } from '@/types'

export default function ContentCard({ item }: { item: Content }) {
  return (
    <Link
      to={`/title/${item.slug}`}
      className="group relative block w-40 shrink-0 overflow-hidden rounded-md bg-ink-700 shadow-card transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03] sm:w-48"
    >
      <div className="aspect-[2/3] w-full bg-ink-800">
        {item.poster_url ? (
          <img
            src={item.poster_url}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
            No poster
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
        <div className="truncate text-sm font-semibold">{item.title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-white/60">
          {item.release_year && <span>{item.release_year}</span>}
          {item.content_rating && <span className="rounded border border-white/20 px-1">{item.content_rating}</span>}
        </div>
      </div>
    </Link>
  )
}
