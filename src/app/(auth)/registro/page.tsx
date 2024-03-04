import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreateUserForm } from '@/components/forms/create-user-form'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Crie sua conta gratuitamente</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">Já é cadastrado?</span>
            <Link
              prefetch={false}
              aria-label="Cria conta"
              href="/login"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Faça login
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
