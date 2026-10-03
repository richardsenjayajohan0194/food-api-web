import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Utensils,
  Settings,
  ChefHat,
  LogOut,
  CircleUser,
  LogIn,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { capitalizeFirstWord, cn } from "../../lib/utils";
import { useCurrentUser } from "../../hooks/use-current-user";
import type { User } from "../../types/auth";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useCurrentUser();

  function handleClick(user: User | null) {
    if (user?.name) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("User");
    }
    navigate("/", {
      replace: true,
    });
  }

  console.log("render sidebar");

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* Header */}
      <SidebarHeader className="gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center justify-start gap-2">
                <ChefHat className="size-5! text-primary" />
                <h1 className="text-2xl font-bold text-primary">
                  Gusto
                </h1>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className={cn(
                    "mb-1 px-5 py-6 text-md",
                    pathname === item.href &&
                      "bg-primary font-semibold text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Link
                    to={item.href}
                    className="flex items-center justify-start gap-2"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className="
                flex w-full items-center gap-1
                group-data-[collapsible=icon]:flex-col
              "
            >
              {/* User */}
              <SidebarMenuButton
                tooltip={user?.name ?? "User"}
                className="
                  min-w-0 flex-1 px-3
                  group-data-[collapsible=icon]:size-10
                  group-data-[collapsible=icon]:flex-none
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:px-0
                "
              >
                <CircleUser className="size-5 shrink-0" />

                <span
                  className="
                    truncate
                    group-data-[collapsible=icon]:hidden
                  "
                >
                  {capitalizeFirstWord(user?.name ?? "User")}
                </span>
              </SidebarMenuButton>

              {/* Logout */}
              <SidebarMenuButton
                type="button"
                tooltip="Logout"
                onClick={() => handleClick(user)}
                className="
                  size-10 shrink-0 justify-center
                  text-muted-foreground
                  hover:bg-taupe-100
                  hover:text-taupe-100-foreground
                  group-data-[collapsible=icon]:flex-none
                "
              >
                {user === null ? <LogIn className="size-5" /> : <LogOut className="size-5" />}
                <span className="sr-only">Logout</span>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
});

export default AppSidebar;