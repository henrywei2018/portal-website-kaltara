import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Tampilan',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Tampilan" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Pengaturan Tampilan"
                        description="Sesuaikan tema tampilan akun Anda."
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AdminSidebarLayout>
    );
}
