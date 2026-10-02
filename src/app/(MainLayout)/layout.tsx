'use client';


import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../providers/auth";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import AppSidebar from "../../components/layout/app-sidebar";


export default function RootLayout() {
    return (
        <AuthProvider>
            <SidebarProvider className="min-w-0 w-full">
                <AppSidebar/>
                <main className="flex min-w-0 w-full flex-1 flex-col">
                    <SidebarTrigger/>
                    <div className="min-w-0 w-full flex-1">
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
        </AuthProvider>
    )
}