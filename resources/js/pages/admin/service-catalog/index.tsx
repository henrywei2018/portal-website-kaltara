import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Head } from '@inertiajs/react';

type ServiceSectorOption = {
    id: number;
    name: string;
};

type ServiceCatalogItem = {
    id: number;
    title: string;
    sector_id: number;
    sector_name: string | null;
    slug: string;
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    infographic_url: string | null;
    is_active: boolean;
    faqs: Array<{ question: string; answer: string; sort_order: number }>;
};

export default function AdminServiceCatalogIndex({
    items,
    sectors,
}: {
    items: ServiceCatalogItem[];
    sectors: ServiceSectorOption[];
}) {
    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Katalog Layanan', href: '/admin/service-catalog' },
            ]}
        >
            <Head title="Katalog Layanan" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Katalog Layanan
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola daftar layanan publik berdasarkan sektor.
                </p>
            </header>

            <section className="mt-8 rounded-2xl border border-black/5 bg-white p-6 text-sm text-[#587166] shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                <p>
                    Data layanan dimuat: <strong>{items.length}</strong> item, sektor tersedia{' '}
                    <strong>{sectors.length}</strong>.
                </p>
                <p className="mt-2">
                    UI lengkap (filter sektor + list ringkas + modal CRUD) akan ditambahkan pada
                    fase berikutnya.
                </p>
            </section>
        </AdminSidebarLayout>
    );
}
