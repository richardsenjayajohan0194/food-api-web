import { Link, useLocation } from "react-router-dom";
import { Utensils, Settings, ChefHat } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { cn } from '../../lib/utils';
import React from "react";

const sidebarItems = [
  {
    label: "Food Menu",
    icon: <Utensils />,
    href: "/food-menu",
  },
  {
    label: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
];

 const AppSidebar = React.memo(function AppSidebar() {

  const pathname = useLocation().pathname;
  console.log("render sidebar");
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="gap-2 flex-row items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex gap-2 justify-start items-center">
                <ChefHat className="text-primary size-5!"/>
                <h1 className="text-2xl font-bold text-primary">Gusto</h1>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className={cn(
                    'py-6 px-5 text-md mb-1',
                    pathname === item.href && 'bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground'
                  )}
                >
                  <Link className="flex justify-start items-center gap-2" to={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
});

export default AppSidebar;