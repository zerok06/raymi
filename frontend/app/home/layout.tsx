import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SideBar } from '@/components/SideBar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Wrapper from '@/components/Wrapper'
interface LayoutProps {
  children: React.ReactNode
}

const LayoutHome: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <SideBar />
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
    </SidebarProvider>
  )
}

export default LayoutHome
