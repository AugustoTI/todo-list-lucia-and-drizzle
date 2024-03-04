import { defineConfig } from 'drizzle-kit'

import { env } from '@/env.mjs'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
