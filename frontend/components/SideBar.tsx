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
import { ChartBarStacked, MapPin, MapPinCheck, Tag } from 'lucide-react'

// This is sample data.
const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Menu',
      url: '#',
      items: [
        {
          title: 'Likes',
          icon: <Tag />,
          url: '/home/profile/likes',
        },
        {
          title: 'Mis eventos',
          isActive: false,
          url: '/home/profile/events',
          icon: <MapPinCheck />,
        },
      ],
    },
    {
      title: 'Explorar',
      url: '#',
      items: [
        {
          title: 'Etiquetas',
          url: '/home/tags',
          isActive: false,
          icon: <Tag />,
        },
        {
          title: 'Categorias',
          url: '/home/categories',
          isActive: false,
          icon: <ChartBarStacked />,
        },
        {
          title: 'Maps',
          url: '/home/map',
          isActive: false,
          icon: <MapPin />,
        },
      ],
    },
  ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="pt-10 ">
        <div className="flex justify-center">
          <Logo />
        </div>
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
