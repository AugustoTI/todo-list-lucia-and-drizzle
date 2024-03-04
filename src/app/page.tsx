import Link from 'next/link'

import { validateRequest } from '@/lib/lucia'
import { Button } from '@/components/ui/button'
import { MenuUser } from '@/components/menu-user'
import { ThemeSwitch } from '@/components/theme-switch'

export default async function HomePage() {
  const { user } = await validateRequest()

  return (
    <>
      <ThemeSwitch /> <br />
      {user ? (
        <>
          <Button asChild>
            <Link href="/dashboard">Ir para o App</Link>
          </Button>
          <br />
          <MenuUser />
        </>
      ) : (
        <Button asChild>
          <Link href="/registro">Criar conta</Link>
        </Button>
      )}
    </>
  )
}
