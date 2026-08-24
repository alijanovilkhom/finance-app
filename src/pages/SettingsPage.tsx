import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, LogOut, Shield } from 'lucide-react'

export const SettingsPage = () => {
  const { user, signOut } = useAuth()

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Настройки профиля
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" /> Учетная запись
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">
              Email пользователя
            </label>
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-800 dark:text-slate-200 text-sm font-mono">
              {user?.email || 'Гостевой режим'}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">
              ID пользователя (Supabase)
            </label>
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-mono truncate">
              {user?.id || '—'}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" /> Безопасность и сессия
          </CardTitle>
        </CardHeader>
        <CardContent>
        <Button
          variant="danger"
          onClick={signOut}
          className="flex items-center gap-2"
        >
            <LogOut className="h-4 w-4" /> Выйти из аккаунта
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}