import { Link } from 'react-router-dom'
import { Play, Info } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import ContentRow from '@/components/common/ContentRow'

export default function HomePage() {
  const { data: featured, loading: fLoading } = useContent({
    featuredOnly: true,
    limit: 1,
  })
  const { data: movies, loading: mLoading } = useContent({ contentType: 'movie', limit: 20 })
  const { data: anime, loading: aLoading } = useContent({ contentType: 'anime', limit: 20 })
  const { data: series, loading: sLoading } = useContent({ contentType: 'series', limit: 20 })

  const hero = featured[0]

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate min-h-[70vh] w-full">
        {hero?.backdrop_url ? (
          <img
            src={hero.backdrop_url}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
          />
        ) : (
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-800 to-ink-900" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-32">
          {fLoading ? (
            <div className="h-40 animate-pulse rounded-md bg-white/5" />
          ) : hero ? (
            <div className="max-w-2xl animate-fadeIn">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">{hero.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
                {hero.release_year && <span>{hero.release_year}</span>}
                {hero.content_rating && (
                  <span className="rounded border border-white/30 px-1.5 py-0.5 text-xs">
                    {hero.content_rating}
                  </span>
                )}
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs uppercase">
                  {hero.content_type}
                </span>
              </div>
              {hero.description && (
                <p className="mt-4 line-clamp-3 text-base text-white/80 sm:text-lg">
                  {hero.description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/watch/${hero.slug}`} className="btn-primary">
                  <Play className="h-4 w-4" /> Watch Now
                </Link>
                <Link to={`/title/${hero.slug}`} className="btn-secondary">
                  <Info className="h-4 w-4" /> More Info
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                Welcome to NetFlx
              </h1>
              <p className="mt-4 text-white/70">
                Movies, anime, and TV series. Publish titles from the admin dashboard to
                populate this page.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ROWS */}
      <div className="mx-auto max-w-7xl">
        <ContentRow title="Popular Movies" items={movies} loading={mLoading} />
        <ContentRow title="Popular Anime" items={anime} loading={aLoading} />
        <ContentRow title="Latest TV Series" items={series} loading={sLoading} />
      </div>
    </div>
  )
}
