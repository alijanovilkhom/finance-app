import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Transaction, Category } from '@/types/finance'

interface ExpenseChartProps {
  transactions: Transaction[]
}

const CATEGORY_NAMES: Record<Category, string> = {
  salary: 'Зарплата',
  freelance: 'Фриланс',
  investments: 'Инвестиции',
  food: 'Еда и продукты',
  transport: 'Транспорт',
  housing: 'Коммуналка',
  entertainment: 'Развлечения',
  shopping: 'Покупки',
  health: 'Здоровье',
  other: 'Другое',
}

const COLORS = [
  '#f43f5e', // rose
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#f59e0b', // amber
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#ec4899', // pink
]

export const ExpenseChart = ({ transactions }: ExpenseChartProps) => {
  // Фильтруем только расходы и группируем по категориям
  const expenses = transactions.filter((tx) => tx.type === 'expense')

  const categoryTotals = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount
    return acc
  }, {} as Record<Category, number>)

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: CATEGORY_NAMES[category as Category] || category,
    value: amount,
  }))

  if (data.length === 0) {
    return (
      <Card className="p-8 text-center text-slate-500">
        Нет данных о расходах для отображения
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Структура расходов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString('ru-RU')} ₽`, 'Сумма']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}