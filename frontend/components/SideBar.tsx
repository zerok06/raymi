import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Logo from './Logo'
import Link from 'next/link'
import { ChartBarStacked, MapPin, Tag } from 'lucide-react'

// This is sample data.
const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Menu',
      url: '#',
      items: [
        {
          title: 'Installation',
          icon: <Tag />,
          url: '#',
        },
        {
          title: 'Project Structure',
          isActive: true,
          url: '#',
        },
      ],
    },
    {
      title: 'Explorar',
      url: '#',
      items: [
        {
          title: 'Etiquetas',
          url: '#',
          isActive: true,
          icon: <Tag />,
        },
        {
          title: 'Categorias',
          url: '#',
          isActive: true,
          icon: <ChartBarStacked />,
        },
        {
          title: 'Maps',
          url: '#',
          isActive: true,
          icon: <MapPin />,
        },
      ],
    },
  ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="pt-10">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map(item => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
