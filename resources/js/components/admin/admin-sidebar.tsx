import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { NavUser } from '@/components/nav-user';
import { type AdminNavGroup, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

function resolvePath(href: string): string {
    try {
        const url = new URL(href, window.location.origin);
        return url.pathname;
    } catch {
        return href;
    }
}

export function AdminSidebar() {
    const page = usePage<SharedData>();
    const adminNav = page.props.adminNav;
    const currentPath = page.url;

    const groups = useMemo<AdminNavGroup[]>(() => adminNav?.groups ?? [], [adminNav]);
    const [openGroups, setOpenGroups] = useState(() =>
        new Set(groups.map((group) => group.title))
    );

    const toggleGroup = (title: string, open: boolean) => {
        setOpenGroups((prev) => {
            const next = new Set(prev);
            if (open) {
                next.add(title);
            } else {
                next.delete(title);
            }
            return next;
        });
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-sidebar-border/60 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f6b4f] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,107,79,0.3)]">
                        KU
                    </div>
                    <div className="leading-tight">
                        <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/70">
                            Admin Portal
                        </p>
                        <p className="text-sm font-semibold text-sidebar-foreground">Kaltara</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="gap-3 px-2 py-4">
                {groups.map((group) => {
                    const isOpen = openGroups.has(group.title);

                    return (
                        <Collapsible
                            key={group.title}
                            open={isOpen}
                            onOpenChange={(open) => toggleGroup(group.title, open)}
                        >
                            <SidebarGroup>
                                <div className="flex items-center justify-between">
                                    <SidebarGroupLabel className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">
                                        {group.title}
                                    </SidebarGroupLabel>
                                    <CollapsibleTrigger asChild>
                                        <SidebarGroupAction className="text-sidebar-foreground/70">
                                            <ChevronDown
                                                className={`size-4 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                                            />
                                        </SidebarGroupAction>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {group.items.map((item) => {
                                                const path = resolvePath(String(item.href));
                                                const isActive =
                                                    item.isActive ??
                                                    currentPath === path ||
                                                    currentPath.startsWith(`${path}/`);

                                                return (
                                                    <SidebarMenuItem key={item.title}>
                                                        <SidebarMenuButton
                                                            asChild
                                                            data-active={isActive}
                                                            className="rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition hover:bg-sidebar-accent hover:text-sidebar-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground"
                                                        >
                                                            <Link href={item.href}>{item.title}</Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                );
                                            })}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    );
                })}
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/60 px-3 py-4">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
