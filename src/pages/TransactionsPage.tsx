import { useEffect, useState } from 'react'
import { mockTransactions } from '@/data/mockData'
import { transactionService } from '@/services/transactions'
import { TransactionList } from '@/components/transactions/TransactionList'
import { TransactionForm } from '@/components/transactions/TransactionForm'
import { Button } from '@/components/ui/Button'
import { Plus, RefreshCw } from 'lucide-react'
import type { CreateTransactionDTO, Transaction } from '@/types/finance'

export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadTransactions = async () => {
    setLoading(true)
    try {
      const data = await transactionService.getAll()
      // Если базовая таблица Supabase пуста или ещё не настроена — берем моки
      if (data.length === 0) {
        setTransactions(mockTransactions)
      } else {
        setTransactions(data)
      }
    } catch {
      setTransactions(mockTransactions)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  const handleAddTransaction = async (dto: CreateTransactionDTO) => {
    const newTx = await transactionService.create(dto)
    
    if (newTx) {
      setTransactions((prev) => [newTx, ...prev])
    } else {
      // Фолбэк для работы без подключённой базы Supabase
      const fallbackTx: Transaction = {
        ...dto,
        id: `tx-${Date.now()}`,
        userId: 'user-1',
        createdAt: new Date().toISOString(),
      }
      setTransactions((prev) => [fallbackTx, ...prev])
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          История транзакций
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadTransactions}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Добавить
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Загрузка данных...</div>
      ) : (
        <TransactionList transactions={transactions} />
      )}

      {isModalOpen && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}