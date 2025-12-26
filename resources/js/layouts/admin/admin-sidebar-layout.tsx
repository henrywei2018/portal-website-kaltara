import AdminHeader from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AdminSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <div className="flex min-h-screen w-full bg-[#f6f8f7] dark:bg-[#0b1410]">
                <AdminSidebar />
                <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
                    <AdminHeader breadcrumbs={breadcrumbs} />
                    <main className="flex-1 px-6 pb-10 pt-8 md:px-8">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
