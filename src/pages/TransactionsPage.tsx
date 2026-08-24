import { useState } from 'react'
import { mockTransactions } from '@/data/mockData'
import { TransactionList } from '@/components/transactions/TransactionList'
import { TransactionForm } from '@/components/transactions/TransactionForm'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import type { CreateTransactionDTO, Transaction } from '@/types/finance'

export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTransaction = (dto: CreateTransactionDTO) => {
    const newTx: Transaction = {
      ...dto,
      id: `tx-${Date.now()}`,
      userId: 'user-1',
      createdAt: new Date().toISOString(),
    }
    setTransactions((prev) => [newTx, ...prev])
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          История транзакций
        </h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Добавить
        </Button>
      </div>

      <TransactionList transactions={transactions} />

      {isModalOpen && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}