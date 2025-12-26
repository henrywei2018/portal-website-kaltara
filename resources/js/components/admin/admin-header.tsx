import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function AdminHeader({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
    const page = usePage<SharedData>();
    const user = page.props.auth.user;

    return (
        <header className="border-b border-black/5 bg-white/80 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-[#0b1410]/80 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Admin Portal Kaltara
                    </p>
                    {breadcrumbs.length > 0 && (
                        <nav className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#587166] dark:text-[#b0c2b8]">
                            {breadcrumbs.map((item, index) => (
                                <span key={`${item.title}-${index}`} className="flex items-center gap-2">
                                    <Link
                                        href={item.href}
                                        className="font-semibold text-[#123726] hover:text-[#0f6b4f] dark:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-[#9ab1a6]">/</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}
                </div>
                <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-[#587166] shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f6b4f] text-xs font-semibold text-white">
                        {user.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')
                            .toUpperCase()}
                    </div>
                    <div className="leading-tight">
                        <p className="text-sm font-semibold text-[#123726] dark:text-white">{user.name}</p>
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#567365] dark:text-[#b0c2b8]">
                            Administrator
                        </p>
                    </div>
                    <Link
                        href="/settings/profile"
                        className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                    >
                        Pengaturan
                    </Link>
                </div>
            </div>
        </header>
    );
}
