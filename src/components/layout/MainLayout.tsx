import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, ReceiptText, PieChart, Settings } from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { path: '/', label: 'Дашборд', icon: LayoutDashboard },
  { path: '/transactions', label: 'Транзакции', icon: ReceiptText },
  { path: '/analytics', label: 'Аналитика', icon: PieChart },
  { path: '/settings', label: 'Настройки', icon: Settings },
]

export const MainLayout = () => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              $
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Finance Tracker
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}