'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db/client'
import { users } from '@/db/schema'

export async function getUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export async function getUserById(userId: string) {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  })
}
