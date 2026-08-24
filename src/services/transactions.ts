import { supabase } from '@/lib/supabase'
import type { Transaction, CreateTransactionDTO } from '@/types/finance'

export const transactionService = {
  // Получить все транзакции текущего пользователя
  async getAll(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Ошибка при получении транзакций:', error.message)
      return []
    }

    return data as Transaction[]
  },

  // Создать новую транзакцию
  async create(dto: CreateTransactionDTO): Promise<Transaction | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error('Пользователь не авторизован')

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          ...dto,
          userId: user.id,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Ошибка при создании транзакции:', error.message)
      return null
    }

    return data as Transaction
  },

  // Удалить транзакцию по ID
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Ошибка при удалении транзакции:', error.message)
      return false
    }

    return true
  },
}