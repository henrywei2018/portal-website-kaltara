import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { edit as editProfile } from '@/routes/profile';
import { edit as editPassword } from '@/routes/user-password';
import { show as showTwoFactor } from '@/routes/two-factor';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-6">
                <section className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_20px_50px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Ringkasan Akun
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                        Selamat datang, {auth.user.name}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                        Kelola pengaturan akun Anda dan akses cepat ke portal publik dari
                        dashboard ini.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href={editProfile()}
                            className="rounded-full bg-[#0f6b4f] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                        >
                            Edit Profil
                        </Link>
                        <Link
                            href={editPassword()}
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Perbarui Kata Sandi
                        </Link>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: 'Status Akun',
                            value: auth.user.email_verified_at ? 'Terverifikasi' : 'Belum Verifikasi',
                            detail: 'Pastikan email aktif untuk keamanan akun.',
                        },
                        {
                            title: 'Keamanan',
                            value: auth.user.two_factor_enabled ? '2FA Aktif' : '2FA Nonaktif',
                            detail: 'Aktifkan autentikasi dua faktor untuk keamanan tambahan.',
                        },
                        {
                            title: 'Portal Publik',
                            value: 'Kunjungi',
                            detail: 'Lihat halaman publik portal informasi.',
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                {card.title}
                            </p>
                            <p className="mt-4 text-2xl font-semibold text-[#0b2d1d] dark:text-white">
                                {card.value}
                            </p>
                            <p className="mt-2 text-xs text-[#587166] dark:text-[#b0c2b8]">
                                {card.detail}
                            </p>
                            {card.title === 'Portal Publik' && (
                                <Link
                                    href="/"
                                    className="mt-4 inline-flex rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Buka Portal
                                </Link>
                            )}
                        </div>
                    ))}
                </section>

                <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Akses Cepat
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <Link
                            href={editProfile()}
                            className="rounded-xl border border-black/5 bg-white/80 px-4 py-3 text-sm font-semibold text-[#123726] shadow-[0_10px_20px_rgba(15,107,79,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,107,79,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            Perbarui data profil dan kontak
                        </Link>
                        <Link
                            href={showTwoFactor()}
                            className="rounded-xl border border-black/5 bg-white/80 px-4 py-3 text-sm font-semibold text-[#123726] shadow-[0_10px_20px_rgba(15,107,79,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,107,79,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            Kelola autentikasi dua faktor (2FA)
                        </Link>
                    </div>
                </section>
            </div>
        </AdminSidebarLayout>
    );
}
