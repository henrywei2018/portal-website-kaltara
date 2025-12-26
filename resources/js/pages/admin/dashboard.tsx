import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({
    stats,
    quickActions,
    quickLinks,
}: {
    stats: {
        pages: number;
        navigation: number;
        content: number;
        published_content: number;
    };
    quickActions: {
        label: string;
        href: string;
    }[];
    quickLinks: {
        title: string;
        description: string;
        href: string;
    }[];
}) {
    const cards = [
        {
            title: 'Halaman Aktif',
            value: stats.pages,
            detail: 'Total halaman dinamis terdaftar.',
        },
        {
            title: 'Menu Navigasi',
            value: stats.navigation,
            detail: 'Item navigasi utama dan submenu.',
        },
        {
            title: 'Konten Portal',
            value: stats.content,
            detail: 'Total berita, artikel, pengumuman.',
        },
        {
            title: 'Konten Terbit',
            value: stats.published_content,
            detail: 'Konten yang sudah dipublikasikan.',
        },
    ];

    return (
        <AdminSidebarLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin' }]}>
            <Head title="Dashboard Admin" />

            <div className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_20px_50px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Dashboard Pengelolaan Portal Kaltara
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola navigasi, halaman, konten, dan pengguna tanpa perlu mengubah codebase.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/"
                        className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                    >
                        Lihat Portal Publik
                    </Link>
                    <Link
                        href="/settings/profile"
                        className="rounded-full bg-[#0f6b4f] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                    >
                        Pengaturan Admin
                    </Link>
                </div>
            </div>

            <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_14px_30px_rgba(15,107,79,0.1)] dark:border-white/10 dark:bg-white/5"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            {card.title}
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-[#0b2d1d] dark:text-white">
                            {card.value}
                        </p>
                        <p className="mt-2 text-xs text-[#587166] dark:text-[#b0c2b8]">
                            {card.detail}
                        </p>
                    </div>
                ))}
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Quick Actions
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="rounded-full bg-[#0f6b4f] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                            >
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Modul Utama
                    </p>
                    <div className="mt-4 grid gap-3">
                        {quickLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="rounded-xl border border-black/5 bg-white/80 px-4 py-3 text-sm font-semibold text-[#123726] shadow-[0_10px_20px_rgba(15,107,79,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,107,79,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                <span>{item.title}</span>
                                <p className="mt-1 text-xs font-normal text-[#587166] dark:text-[#b0c2b8]">
                                    {item.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </AdminSidebarLayout>
    );
}
