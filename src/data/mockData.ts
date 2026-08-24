import type { Transaction, Account, FinanceSummary } from '@/types/finance'

export const mockAccount: Account = {
  id: 'acc-1',
  userId: 'user-1',
  name: 'Основной счёт (Tinkoff)',
  balance: 245000,
  currency: 'RUB',
  createdAt: new Date().toISOString(),
}

export const mockSummary: FinanceSummary = {
  totalBalance: 245000,
  totalIncome: 120000,
  totalExpenses: 45500,
}

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'user-1',
    accountId: 'acc-1',
    type: 'income',
    category: 'salary',
    amount: 120000,
    description: 'Зарплата за текущий месяц',
    date: '2026-08-10T10:00:00.000Z',
    createdAt: '2026-08-10T10:00:00.000Z',
  },
  {
    id: 'tx-2',
    userId: 'user-1',
    accountId: 'acc-1',
    type: 'expense',
    category: 'food',
    amount: 3200,
    description: 'Покупка продуктов в ВкусВилл',
    date: '2026-08-12T14:30:00.000Z',
    createdAt: '2026-08-12T14:30:00.000Z',
  },
  {
    id: 'tx-3',
    userId: 'user-1',
    accountId: 'acc-1',
    type: 'expense',
    category: 'transport',
    amount: 1500,
    description: 'Заправка авто',
    date: '2026-08-15T09:15:00.000Z',
    createdAt: '2026-08-15T09:15:00.000Z',
  },
  {
    id: 'tx-4',
    userId: 'user-1',
    accountId: 'acc-1',
    type: 'expense',
    category: 'entertainment',
    amount: 4800,
    description: 'Билеты в театр и ужин',
    date: '2026-08-18T19:00:00.000Z',
    createdAt: '2026-08-18T19:00:00.000Z',
  },
  {
    id: 'tx-5',
    userId: 'user-1',
    accountId: 'acc-1',
    type: 'expense',
    category: 'housing',
    amount: 8500,
    description: 'Оплата коммунальных услуг',
    date: '2026-08-20T11:00:00.000Z',
    createdAt: '2026-08-20T11:00:00.000Z',
  },
]