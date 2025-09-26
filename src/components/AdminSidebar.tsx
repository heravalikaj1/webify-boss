import { NavLink } from "react-router-dom"
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Newspaper,
  Menu
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Products", url: "/products", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "News & Content", url: "/news", icon: Newspaper },
]

export function AdminSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground"

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} bg-gradient-light border-r`} collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-white/50">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-primary">Admin Dashboard</h2>
        )}
        <SidebarTrigger className="h-8 w-8 text-primary hover:bg-primary/10" />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}