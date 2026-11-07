import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="mt-3 text-white/60">We can’t find that page.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
    </div>
  )
}
