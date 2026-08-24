import type { Transaction, Category } from '@/types/finance'
import { Card } from '@/components/ui/Card'
import {
  Utensils,
  Car,
  Home,
  Film,
  ShoppingBag,
  HeartPulse,
  Briefcase,
  TrendingUp,
  Wallet,
  HelpCircle,
} from 'lucide-react'

interface TransactionListProps {
  transactions: Transaction[]
}

// Карта иконок и названий для каждой категории
const categoryConfig: Record<Category, { label: string; icon: React.ElementType }> = {
  salary: { label: 'Зарплата', icon: Wallet },
  freelance: { label: 'Фриланс', icon: Briefcase },
  investments: { label: 'Инвестиции', icon: TrendingUp },
  food: { label: 'Еда и продукты', icon: Utensils },
  transport: { label: 'Транспорт', icon: Car },
  housing: { label: 'Коммуналка', icon: Home },
  entertainment: { label: 'Развлечения', icon: Film },
  shopping: { label: 'Покупки', icon: ShoppingBag },
  health: { label: 'Здоровье', icon: HeartPulse },
  other: { label: 'Другое', icon: HelpCircle },
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center text-slate-500">
        Транзакций пока нет
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => {
        const config = categoryConfig[tx.category] || categoryConfig.other
        const Icon = config.icon
        const isIncome = tx.type === 'income'

        const formattedDate = new Date(tx.date).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'short',
        })

        return (
          <Card
            key={tx.id}
            className="flex items-center justify-between p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${
                  isIncome
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {tx.description || config.label}
                </p>
                <p className="text-xs text-slate-500">
                  {config.label} • {formattedDate}
                </p>
              </div>
            </div>

            <div
              className={`font-semibold text-sm ${
                isIncome ? 'text-emerald-600' : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              {isIncome ? '+' : '-'}
              {tx.amount.toLocaleString('ru-RU')} ₽
            </div>
          </Card>
        )
      })}
    </div>
  )
}