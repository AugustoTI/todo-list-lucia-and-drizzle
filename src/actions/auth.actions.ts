'use server'

import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { db } from '@/db/client'
import { users } from '@/db/schema'
import { getUserByUsername } from '@/lib/fetchers/get-user'
import { lucia } from '@/lib/lucia'
import {
  CreateUserSchema,
  LoginUserSchema,
  type CreateUserSchemaType,
  type LoginUserSchemaType,
} from '@/lib/validations/auth'

export async function createUser(data: CreateUserSchemaType) {
  const validatedFields = CreateUserSchema.safeParse(data)

  if (!validatedFields.success) throw new Error('Campos invalidos. Verifique seus dados')

  const { username, password } = validatedFields.data
  const existingUser = await getUserByUsername(username)

  if (existingUser) throw new Error('Usuário já cadastrado com esse nome. Tente outro')

  const hashedPassword = await new Argon2id().hash(password)
  const userId = generateId(15)

  await db.insert(users).values({
    id: userId,
    username,
    hashedPassword,
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/')
}

export async function loginUser(data: LoginUserSchemaType) {
  const validatedFields = LoginUserSchema.safeParse(data)

  if (!validatedFields.success) throw new Error('Campos invalidos. Verifique seus dados')

  const { username, password } = validatedFields.data
  const existingUser = await getUserByUsername(username)

  if (!existingUser) throw new Error('Nome ou Senha incorretos')

  const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password)
  if (!validPassword) throw new Error('Nome ou Senha incorretos')

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/')
}

export async function logoutUser() {
  const sessionId = cookies().get(lucia.sessionCookieName)

  if (!sessionId) return

  await lucia.invalidateSession(sessionId.value)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/login')
}
