import { mockTransactions } from '@/data/mockData'
import { TransactionList } from '@/components/transactions/TransactionList'

export const TransactionsPage = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          История транзакций
        </h1>
      </div>

      <TransactionList transactions={mockTransactions} />
    </div>
  )
}