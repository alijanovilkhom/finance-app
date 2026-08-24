import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-500">
        Загрузка...
      </div>
    )
  }

  // Если пользователя нет — редирект на страницу входа
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}