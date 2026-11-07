import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import CatalogPage from '@/pages/CatalogPage'
import SearchPage from '@/pages/SearchPage'
import ContentDetailsPage from '@/pages/ContentDetailsPage'
import PlayerPage from '@/pages/PlayerPage'
import MyListPage from '@/pages/MyListPage'
import ProfilePage from '@/pages/ProfilePage'
import SettingsPage from '@/pages/SettingsPage'
import AuthPage from '@/pages/AuthPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import AdminRoute from '@/components/common/AdminRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<CatalogPage contentType="movie" />} />
        <Route path="/anime" element={<CatalogPage contentType="anime" />} />
        <Route path="/series" element={<CatalogPage contentType="series" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/title/:slug" element={<ContentDetailsPage />} />

        <Route
          path="/watch/:slug"
          element={
            <ProtectedRoute>
              <PlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MyListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
