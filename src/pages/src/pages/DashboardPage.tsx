import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { mockSummary } from '@/data/mockData'

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
              Общий баланс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {mockSummary.totalBalance.toLocaleString('ru-RU')} ₽
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Доходы за месяц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              +{mockSummary.totalIncome.toLocaleString('ru-RU')} ₽
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Расходы за месяц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-rose-600">
              -{mockSummary.totalExpenses.toLocaleString('ru-RU')} ₽
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}