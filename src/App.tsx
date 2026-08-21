import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Тест UI-Kit</CardTitle>
          <CardDescription>Компоненты Button, Input и Card готовы к работе.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Email" placeholder="example@mail.com" />
          <div className="flex gap-2">
            <Button variant="primary">Основная</Button>
            <Button variant="secondary">Вторичная</Button>
            <Button variant="outline">Контур</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}