// Тип операции: доход или расход
export type TransactionType = 'income' | 'expense'

// Категории финансовых операций
export type Category =
  | 'salary'        // Зарплата
  | 'freelance'     // Фриланс / Проекты
  | 'investments'   // Инвестиции
  | 'food'          // Еда и продукты
  | 'transport'     // Транспорт и авто
  | 'housing'       // Коммуналка и жилье
  | 'entertainment' // Развлечения
  | 'shopping'      // Покупки
  | 'health'        // Здоровье
  | 'other'         // Другое

// Финансовый счёт / источник средств
export interface Account {
  id: string
  userId: string
  name: string
  balance: number
  currency: string
  createdAt: string
}

// Отдельная транзакция
export interface Transaction {
  id: string
  userId: string
  accountId: string
  type: TransactionType
  category: Category
  amount: number
  description?: string
  date: string
  createdAt: string
}

// Данные для создания новой транзакции (без автосгенерированных id и дат)
export type CreateTransactionDTO = Omit<Transaction, 'id' | 'createdAt' | 'userId'>

// Итоговая статистика для дашборда
export interface FinanceSummary {
  totalBalance: number
  totalIncome: number
  totalExpenses: number
}