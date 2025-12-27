import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Head } from '@inertiajs/react';

type ServiceSector = {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string | null;
    sort_order: number;
    is_active: boolean;
    icon_url: string | null;
};

export default function AdminServiceSectorsIndex({
    sectors,
}: {
    sectors: ServiceSector[];
}) {
    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Sektor Layanan', href: '/admin/service-sectors' },
            ]}
        >
            <Head title="Sektor Layanan" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Sektor Layanan
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola daftar sektor layanan untuk katalog publik.
                </p>
            </header>

            <section className="mt-8 rounded-2xl border border-black/5 bg-white p-6 text-sm text-[#587166] shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                <p>
                    Data sektor berhasil dimuat: <strong>{sectors.length}</strong> sektor.
                </p>
                <p className="mt-2">
                    UI lengkap (list ringkas + modal CRUD) akan ditambahkan pada fase berikutnya.
                </p>
            </section>
        </AdminSidebarLayout>
    );
}
