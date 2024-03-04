'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { LoginUserSchema, type LoginUserSchemaType } from '@/lib/validations/auth'
import { loginUser } from '@/actions/auth.actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function LoginUserForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<LoginUserSchemaType>({
    defaultValues: { username: '', password: '' },
    resolver: zodResolver(LoginUserSchema),
    disabled: isPending,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function onSubmit(data: LoginUserSchemaType) {
    startTransition(async () => {
      try {
        await loginUser(data)
      } catch (error) {
        if (error instanceof Error) {
          form.setError('root', { message: error.message })
        }
      }
    })
  }

  const {
    formState: { errors },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digite seu nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digite sua senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="gap-x-2">
          {isPending && (
            <Loader2Icon size={16} className="animate-spin" aria-hidden="true" />
          )}
          Entrar
        </Button>
        {errors.root && (
          <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <AlertTriangleIcon size={16} />
            <p>{errors.root.message}</p>
          </div>
        )}
      </form>
    </Form>
  )
}
