import type { Transaction } from '@/types/finance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

// Пример использования типа для проверки (VS Code будет давать автодополнение полей)
const testTransaction: Transaction = {
  id: '1',
  userId: 'user-1',
  accountId: 'acc-1',
  type: 'expense',
  category: 'food',
  amount: 1500,
  description: 'Покупка продуктов',
  date: new Date().toISOString(),
  createdAt: new Date().toISOString(),
}

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Дашборд
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Тестовая операция ({testTransaction.category})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {testTransaction.amount} ₽
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}