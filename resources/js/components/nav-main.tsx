import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const { url } = usePage()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 text-[#7a6e5f]">

        {/* Navigation Items */}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.url.includes(url);
            
              // || (url.startsWith(item.url) && url !== "/dashboard")

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md
                    ${isActive ? "bg-[#d6a89e] text-white" : "text-[#7a6e5f]"}
                    hover:bg-[#809080] hover:text-white
                    transition-colors duration-200 ease-in-out
                  `}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="size-5" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
