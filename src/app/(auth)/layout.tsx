import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/lucia'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest()

  if (user) redirect('/')

  return (
    <div className="grid min-h-screen items-center justify-items-center px-4">
      {children}
    </div>
  )
}
