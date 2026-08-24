import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Category, CreateTransactionDTO, TransactionType } from '@/types/finance'

// Схема валидации формы с помощью Zod
const transactionSchema = z.object({
  type: z.enum(['income', 'expense'] as const),
  category: z.string().min(1, 'Выберите категорию'),
  amount: z.coerce.number().gt(0, 'Сумма должна быть больше 0'),
  description: z.string().optional(),
  date: z.string().min(1, 'Укажите дату'),
})

type TransactionFormData = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionDTO) => void
  onClose: () => void
}

const categories: { value: Category; label: string; type: TransactionType }[] = [
  { value: 'salary', label: 'Зарплата', type: 'income' },
  { value: 'freelance', label: 'Фриланс', type: 'income' },
  { value: 'investments', label: 'Инвестиции', type: 'income' },
  { value: 'food', label: 'Еда и продукты', type: 'expense' },
  { value: 'transport', label: 'Транспорт', type: 'expense' },
  { value: 'housing', label: 'Коммуналка', type: 'expense' },
  { value: 'entertainment', label: 'Развлечения', type: 'expense' },
  { value: 'shopping', label: 'Покупки', type: 'expense' },
  { value: 'health', label: 'Здоровье', type: 'expense' },
  { value: 'other', label: 'Другое', type: 'expense' },
]

export const TransactionForm = ({ onSubmit, onClose }: TransactionFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      category: 'food',
      amount: undefined,
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  })

  const currentType = watch('type')
  const filteredCategories = categories.filter((c) => c.type === currentType)

  const handleFormSubmit = (data: TransactionFormData) => {
    onSubmit({
      accountId: 'acc-1',
      type: data.type,
      category: data.category as Category,
      amount: data.amount,
      description: data.description,
      date: new Date(data.date).toISOString(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Новая транзакция
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Переключатель Типа */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => register('type').onChange({ target: { value: 'expense', name: 'type' } })}
              className={`py-2 text-sm font-medium rounded-lg transition-colors ${
                currentType === 'expense'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Расход
            </button>
            <button
              type="button"
              onClick={() => register('type').onChange({ target: { value: 'income', name: 'type' } })}
              className={`py-2 text-sm font-medium rounded-lg transition-colors ${
                currentType === 'income'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Доход
            </button>
          </div>

          {/* Сумма */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Сумма (₽)</label>
            <Input
              type="number"
              placeholder="0.00"
              {...register('amount')}
            />
            {errors.amount && (
              <p className="text-xs text-rose-500 mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Категория */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Категория</label>
            <select
              {...register('category')}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filteredCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Описание */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Описание</label>
            <Input
              placeholder="Например: Покупка продуктов"
              {...register('description')}
            />
          </div>

          {/* Дата */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Дата</label>
            <Input
              type="date"
              {...register('date')}
            />
          </div>

          {/* Кнопки действия */}
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}