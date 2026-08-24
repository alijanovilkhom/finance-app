import { mockTransactions } from '@/data/mockData'
import { ExpenseChart } from '@/components/analytics/ExpenseChart'

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Аналитика расходов
      </h1>

      <ExpenseChart transactions={mockTransactions} />
    </div>
  )
}