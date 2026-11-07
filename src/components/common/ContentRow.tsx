import ContentCard from './ContentCard'
import Spinner from './Spinner'
import type { Content } from '@/types'

interface Props {
  title: string
  items: Content[]
  loading?: boolean
  emptyMessage?: string
}

export default function ContentRow({ title, items, loading, emptyMessage }: Props) {
  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="mb-4 px-4 text-lg font-semibold sm:px-6">{title}</h2>
        <Spinner label="Loading…" />
      </section>
    )
  }

  if (!items.length) {
    if (!emptyMessage) return null
    return (
      <section className="mb-10">
        <h2 className="mb-4 px-4 text-lg font-semibold sm:px-6">{title}</h2>
        <p className="px-4 text-sm text-white/50 sm:px-6">{emptyMessage}</p>
      </section>
    )
  }

  return (
    <section className="mb-10">
      <h2 className="mb-4 px-4 text-lg font-semibold sm:px-6">{title}</h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-6">
        {items.map((c) => (
          <ContentCard key={c.id} item={c} />
        ))}
      </div>
    </section>
  )
}
