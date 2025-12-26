import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profil',
        href: edit(),
        icon: null,
    },
    {
        title: 'Kata Sandi',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Autentikasi 2FA',
        href: show(),
        icon: null,
    },
    {
        title: 'Tampilan',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-6 py-8">
            <Heading
                title="Pengaturan Akun"
                description="Kelola profil, keamanan, dan tampilan akun Anda."
            />

            <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                <aside className="rounded-3xl border border-black/5 bg-white/90 p-4 shadow-[0_16px_32px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                    <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Navigasi
                    </p>
                    <nav className="flex flex-col gap-2">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${resolveUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn(
                                    'justify-start rounded-full px-4 py-2 text-sm font-semibold text-[#123726] transition hover:bg-[#e6f1ec] dark:text-white dark:hover:bg-white/10',
                                    {
                                        'bg-[#e6f1ec] text-[#0f6b4f] dark:bg-white/10':
                                            isSameUrl(currentPath, item.href),
                                    },
                                )}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <div className="rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                    <section className="space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
