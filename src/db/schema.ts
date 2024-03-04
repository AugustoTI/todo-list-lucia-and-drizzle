import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
})

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect

export const usersRelation = relations(users, ({ many }) => ({
  sessions: many(sessions),
}))

export const sessions = sqliteTable('sessions', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id').notNull(),
  expiresAt: integer('expires_at').notNull(),
})

export const sessionsRelation = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))
