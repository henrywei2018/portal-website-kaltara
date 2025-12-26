import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden bg-[#f6f8f7] pb-10 dark:bg-[#0b1410]"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="px-6 pb-6 pt-8 md:px-8">{children}</div>
            </AppContent>
        </AppShell>
    );
}
