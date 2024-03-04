import { z } from 'zod'

export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(1, 'Esse campo é obrigatorio')
    .min(4, 'O nome precisa conter pelo menos 4 caracteres'),
  password: z
    .string()
    .min(1, 'Esse campo é obrigatorio')
    .min(6, 'A senha precisa conter pelo menos 6 caracteres'),
})
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>

export const LoginUserSchema = CreateUserSchema
export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>
