import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginUserForm } from '@/components/forms/login-user-form'

export default function LoginPage() {
  return (
    <div className="w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Faça login na sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginUserForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">Não tem uma conta ainda ?</span>
            <Link
              prefetch={false}
              aria-label="Cria conta"
              href="/registro"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Criar conta
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Link
        href="/"
        className="mt-3 flex items-center gap-x-2 text-sm text-primary underline-offset-4 transition-colors hover:underline"
      >
        <MoveLeftIcon size={16} />
        Voltar para página inicial
      </Link>
    </div>
  )
}
