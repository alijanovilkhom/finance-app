import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { TransactionList } from '@/components/transactions/TransactionList'
import { transactionService } from '@/services/transactions'
import { mockTransactions } from '@/data/mockData'
import type { Transaction } from '@/types/finance'
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'

export const DashboardPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await transactionService.getAll()
        setTransactions(data.length > 0 ? data : mockTransactions)
      } catch {
        setTransactions(mockTransactions)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Автоматический расчёт итогов
  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Главная панель
      </h1>

      {/* Карточки с метриками */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Общий баланс
            </CardTitle>
            <Wallet className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {loading ? '...' : `${totalBalance.toLocaleString('ru-RU')} ₽`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Доходы
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {loading ? '...' : `+${totalIncome.toLocaleString('ru-RU')} ₽`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Расходы
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {loading ? '...' : `-${totalExpenses.toLocaleString('ru-RU')} ₽`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Последние операции */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Последние транзакции
        </h2>
        {loading ? (
          <div className="text-slate-500">Загрузка...</div>
        ) : (
          <TransactionList transactions={transactions.slice(0, 5)} />
        )}
      </div>
    </div>
  )
}