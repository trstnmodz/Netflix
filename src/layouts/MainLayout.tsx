import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
