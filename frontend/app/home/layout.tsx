import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SideBar } from '@/components/SideBar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Wrapper from '@/components/Wrapper'
import AuthContext from '@/context/AuthContext'
import { verifySession } from '@/lib/verifyAuth'
import { cookies } from 'next/headers'
interface LayoutProps {
  children: React.ReactNode
}

const LayoutHome: React.FC<LayoutProps> = async ({ children }) => {
  const cookieStore = await cookies()

  const email = cookieStore.get('email')
  const id = cookieStore.get('id')

  return (
    <SidebarProvider>
      <SideBar />
      <AuthContext
        context={{
          id: id ? Number(id.value) : null,
          email: email ? email.value : null,
        }}
      >
        <main className="w-full bg-ui-900">
          <nav className="h-16 border-b px-4 py-2 flex items-center justify-between">
            <div>Buscar</div>
            <div className="flex justify-end gap-4">
              <Button className="font-medium" asChild>
                <Link href="/home/event/new">New Event</Link>
              </Button>
              <div className="bg-ui-100/10 px-2 py-1 rounded-[1rem]">
                <img
                  src="https://github.com/zerok06.png"
                  alt="Eduardo Castilho"
                  className="w-8 h-8 rounded-[0.6rem]"
                />
              </div>
            </div>
          </nav>
          <SidebarTrigger />
          <div className="pt-8">
            <Wrapper>{children}</Wrapper>
          </div>
        </main>
      </AuthContext>
    </SidebarProvider>
  )
}

export default LayoutHome
