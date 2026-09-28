'use client';

import AppSidebar from "../components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../providers/auth";

export default function RootLayout() {
    return (
        <AuthProvider>
            <SidebarProvider>
                <AppSidebar/>
                <main className="flex-1 pr-3">
                    <SidebarTrigger/>
                    <Outlet/>
                </main>
            </SidebarProvider>
        </AuthProvider>
    )
}