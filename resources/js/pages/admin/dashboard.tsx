import { Head, Link } from '@inertiajs/react';

const quickLinks = [
    {
        title: 'Pengguna & Role',
        description: 'Kelola akun admin dan hak akses.',
        href: '#users',
    },
    {
        title: 'Menu Navigasi',
        description: 'Atur menu utama dan sub-menu portal.',
        href: '#navigation',
    },
    {
        title: 'Halaman Dinamis',
        description: 'Buat dan perbarui halaman publik.',
        href: '#pages',
    },
    {
        title: 'Berita & Pengumuman',
        description: 'Kelola konten berita berbasis Markdown.',
        href: '#content',
    },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title="Dashboard Admin" />

            <header className="border-b border-black/5 bg-white/80 py-10 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-5xl px-6">
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
                            href="#settings"
                            className="rounded-full bg-[#0f6b4f] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                        >
                            Pengaturan Admin
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-12">
                <section className="grid gap-6 md:grid-cols-2">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5"
                        >
                            <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                                {item.title}
                            </h2>
                            <p className="mt-2 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}
